import { getJobs, getJob, getJobsByCompany, createJob } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: async (_root, args) => { // _root the underscore means its unused

            const job = await getJob(args.id);

            if (!job) {
                throw notFoundError('No job found with id ' + id);
            }

            return job;
        },
        company: async (_root, args) => {
            const company = await getCompany(args.id);

            if (!company) {
                throw notFoundError('No company found with id ' + id);
            }

            return company;
        }
    },
    Job: {
        date: job => toIsoDate(job.createdAt),
        company: job => getCompany(job.companyId)
    },
    Company: {
        jobs: company => getJobsByCompany(company.id)
    },
    Mutation: { 
        createJob: (_root, args) => {
            const companyId = 'f3YzmnBZpK0o';
            return createJob(companyId, args.title, args.description);
        }
    }
};

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: {
            code: 'NOT_FOUND'
        }
    });
}