import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: (_root, args) => { // _root the underscore means its unused
            // console.log(args)
            return getJob(args.id);
        },
        company: (_root, args) => {
            return getCompany(args.id);
        }
    },
    Job: {
        date: job => toIsoDate(job.createdAt),
        company: job => getCompany(job.companyId)
    },
    Company: {
        jobs: company => getJobsByCompany(company.id)
    } 
};

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}