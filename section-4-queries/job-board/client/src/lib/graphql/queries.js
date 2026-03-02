import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');


export async function getJob() {
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