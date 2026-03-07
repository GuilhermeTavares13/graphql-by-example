import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

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

    const { company } = await client.request(query, { id });

    return company;
}

export async function getJob(id) {
    const query = gql`
        query JobById($id: ID!) {
            job(id: $id) {
                id
                title
                date
                company {
                    id
                    name
                } 
                description
        }
    }`;

    const { job } = await client.request(query, { id });

    return job;
}

export async function createJob(input) {
    const mutation = gql`
        mutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
                date
                title
                company {
                    id
                    name
                    }
                }
            }
    `;

    const { job } = await client.request(mutation, { input });

    return job;
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
        query{
            jobs {
                id
                title
                date
                company {
                    name
            } 
        }
    }`;

    const { jobs } = await client.request(query);

    return jobs;
}