import { getJobs, getJob, getJobsByCompany, createJob, deleteJob, updateJob } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";
import { GraphQLError } from 'graphql';
import { getUser } from "./db/users.js";

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
        createJob: async (_root, { input: { title, description } }, { user }) => {

            if (!user) {
                throw unathorizedError('Missing authentication!');
            }
            console.log(user);
            return null;
            // const { companyId } = await getUser(auth.sub);
            // console.log(companyId);
            // return createJob({ companyId, title, description });
        },
        deleteJob: (__root, args) => {
            return deleteJob(args.id);
        },
        updateJob: (__root, { input: { id, title, description } }) => {
            return updateJob({ id, title, description });
        }
    }
};

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}

function unathorizedError(message) {
    return new GraphQLError(message, {
        extensions: {
            code: 'UNATHORIZED'
        }
    });
}

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: {
            code: 'NOT_FOUND'
        }
    });
}