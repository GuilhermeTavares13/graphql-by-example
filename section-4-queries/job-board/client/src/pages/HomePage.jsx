import JobList from '../components/JobList';
import { request, GraphQLClient } from 'graphql-request';

// const fetchJobs = async () => {
//   const response = await fetch('http://localhost:9000/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `#graphql
//           query{
//             jobs {
//               id
//               title
//               date
//               company {
//                 name
//               }
//             }
//           }
//         `
//     })
//   });
//   const { data } = await response.json();
//   console.log(data);
//   return data;
// }

// const fetchedJobs = await fetchJobs();


// const client = new GraphQLClient(endpoint, { headers: {} })

function HomePage() {

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      {/* <JobList jobs={fetchedJobs.jobs} /> */}
    </div>
  );
}

export default HomePage;
