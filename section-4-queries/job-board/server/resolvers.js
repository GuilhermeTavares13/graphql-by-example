import { getJobs, getJob } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: (_root,args) => { // _root the underscore means its unused
            // console.log(args)
            return getJob(args.id)
        }
    },
    Job: {
        date: job => toIsoDate(job.createdAt),
        company: job => getCompany(job.companyId)
    }
};

function toIsoDate(value) {
    return value.slice(0,'yyyy-mm-dd'.length);
}