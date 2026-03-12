import { companyById, jobsQuery, jobByIdQuery, createJobMutation } from './queries';
import { useQuery, useMutation } from "@apollo/client/react";

export function useCompany(id) {
    const { loading, error, data } = useQuery(companyById, {
        variables: { id }
    });
    return { company: data?.company, loading, error: Boolean(error) }
}

export function useCreateJob() {
    const [mutate, { loading }] = useMutation(createJobMutation);
    const createJob = async (title, description) => {
        const { data: { job } } = await mutate({
            variables: { input: { title, description } },
            update: (cache, { data }) => {
                cache.writeQuery({
                    query: jobByIdQuery,
                    variables: { id: data.job.id },
                    data,
                });
            },
        });
        return job;
    };
    return {
        createJob,
        loading,
    };
}

export function useJob(id) {
    const { loading, error, data } = useQuery(jobByIdQuery, {
        variables: { id }
    });
    return { job: data?.job, loading, error: Boolean(error) }
}

export function useJobs() {
    const { loading, error, data } = useQuery(jobsQuery);
    return { jobs: data?.jobs, loading, error: Boolean(error) }
} 