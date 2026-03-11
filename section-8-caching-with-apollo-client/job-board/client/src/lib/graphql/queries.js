import { ApolloClient, ApolloLink, concat, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { getAccessToken } from '../auth';

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' })

const authLink = new ApolloLink((operation, forward) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        operation.setContext({
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
    }
    return forward(operation);
});

const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache()
});

const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        date
        title
        company {
            id
            name
        }
        description
    }
`;

export async function getCompany(id) {
    const query = gql`
        query CompanyId($id: ID!) {
            company(id: $id) {
                id
                description
                name
                jobs {
                    id
                    date
                    title
                }
            }
        }
    `;

    const { data } = await apolloClient.query({
        query,
        variables: { id }
    });

    return data.company;
}

export async function getJob(id) {
    const { data } = await apolloClient.query({
        query: jobByIdQuery,
        variables: { id }
    });

    return data.job;
}

const jobByIdQuery = gql`
    query JobById($id: ID!) {
        job(id: $id) {
            ...JobDetail    
        }
    }
    ${jobDetailFragment}
`;

export async function createJob(input) {
    const mutation = gql`
        mutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                ...JobDetail
            }
        }

        ${jobDetailFragment}
    `;

    const { data } = await apolloClient.mutate({
        mutation,
        variables: { input },
        update: (cache, { data }) => {
            cache.writeQuery({
                query: jobByIdQuery,
                variables: { id: data.job.id },
                data
            })
        }
    });

    return data.job;
}

export async function updateJob(input) {
    const mutation = gql`
        mutation UpdateJob($input: UpdateJobInput!) {
        updateJob(input: $input) {
            id
            title
            description
            }
        }
    `;

    const { job } = await client.request(mutation, { input });

    return job;
}

export async function deleteJob(id) {
    const mutation = gql`
        mutation($id: ID!) {
            job: deleteJob(id: $id) {
                id
            }
        }
    `;

    const { job } = await client.request(mutation, { id });
    return job;
}

export async function getJobs() {
    const query = gql`
        query Jobs {
            jobs {
                id
                title
                date
                company {
                    name
            } 
        }
    }`;

    const { data } = await apolloClient.query({
        query,
        fetchPolicy: 'network-only'
    });
    return data.jobs;
}