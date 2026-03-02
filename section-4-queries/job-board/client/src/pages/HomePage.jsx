import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { getJobs } from '../lib/graphql/queries';

function HomePage() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const allJobs = async () => {
      const result = await getJobs();
      setJobs(result);
    }
    
    allJobs();
  }, [])

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
