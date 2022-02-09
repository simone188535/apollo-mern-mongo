// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
// import Auth from '../utils/auth';
import { QUERY_VINYLS } from '../utils/queries';
// Components
// import UserList from '../components/UserList';


import './assets/css/home.css'

const Home = () => {
  const { loading, data } = useQuery(QUERY_VINYLS);
  const vinyls = data?.vinyls || [];

  console.log(vinyls)

  // const renderVinyls = () => {
  //   if (loading) {
  //     return <h2>Loading...</h2>
  //   } else {
  //     return <h1>{vinyls[0].title}</h1>
  //   }
  // }

  return (
    <main className="container-fluid home min-vh-100">
      <ul className="row justify-content-center mb-0">
        {vinyls.map((vinyl) => {
          return (
            <li
              className="card border border-dark p-3 mt-5 m-3 col-md-3"
              key={vinyl.id}>
              <h2
                className="text-center fs-3 fw-bold text-muted">{vinyl.title}</h2>
              <img
                className="resultImage d-block mx-auto"
                alt={vinyl.title}
                src={vinyl.cover_image} />
            </li>
          )
        })}
        {/* <h1>test</h1>
        {vinyls[0].title}
        <img alt='' src={vinyls[0].cover_image} />
        {renderVinyls()} */}
      </ul>
    </main>
  );
};

export default Home;