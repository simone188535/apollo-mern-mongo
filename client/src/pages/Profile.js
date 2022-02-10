import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { DELETE_VINYL } from '../utils/mutations';

import './assets/css/profile.css'

const Profile = () => {
  const { id } = useParams();
  const [deleteVinyl] = useMutation(DELETE_VINYL);
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  const submit = (userId, vinylId) => {
    deleteVinyl({
      variables: { userId, vinylId }
    });
  }

  const user = data?.me || data?.user || {};
  console.log(user)

  if (error) console.log(error);

  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <section className="container profile-page mt-5 min-vh-100">
        <div className="row">
          <h4>
            You need to be logged in to see this. Use the navigation links above
            to sign up or log in!
          </h4>
        </div>
      </section>
    );
  }



  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <>
        <h4>Username: {user.username}</h4>
        <h4>Email: {user.email}</h4>
      </>
    );
  };

  return (
    <main className="container-fluid home ">
      <section className="row">
        <div className='col-3'>
          <div className="card shadow-md mt-5 m-3 ">
            {renderCurrentUserInfo()}
          </div>
        </div>
        <div className='col-9'>
          <div className="container-fluid min-vh-100">
          <ul className="row justify-content-center mb-0">
            {user.vinyl.map((vinyl) => {
              return (
                <li
                  className="card d-flex flex-colum border border-dark p-3 mt-5 m-3 col-md-3"
                  key={vinyl.id}>
                  <h2
                    className="text-center fs-3 fw-bold text-muted">{vinyl.title}</h2>
                  
                  <img
                    className="resultImage d-block mx-auto"
                    alt={vinyl.title}
                    src={vinyl.cover_image} />
                    <br />
                    <button 
                    className='mt-auto'
                    onClick={() => submit(user._id, vinyl.id)}
                    >Remove from Favorites</button>
                </li>
              )
            })}
          </ul>
          </div>
        </div>
      </section>
    </main>
  );
};


export default Profile;
