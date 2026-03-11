import { companyById, jobsQuery } from './queries';
import { useQuery } from "@apollo/client/react";

export function useCompany(id) {
    const { loading, error, data } = useQuery(companyById, {
        variables: { id }
    });
    return { company: data?.company, loading, error: Boolean(error) }
}

export function useJobs() {
    const { loading, error, data } = useQuery(jobsQuery);
    console.log('teste: ' + data);
    return { jobs: data?.jobs, loading, error: Boolean(error) }
} 