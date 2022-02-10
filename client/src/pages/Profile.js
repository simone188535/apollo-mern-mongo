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
    <div className="container-fluid profile-styles min-vh-100">
      <div className="row">
        <div className="card-profile border border-dark p-3 shadow-md mt-5 m-3 col-3 col-md-3 vw-25">
          {renderCurrentUserInfo()}
        </div>
        <div className='card col vw-75 p-3 mt-5 m-3'>
          <ul className="justify-content-center mb-0">
            {user.vinyl.map((vinyl) => {
              return (
                <li
                  className="card border border-dark p-3 mt-5 m-3 col-md-3"
                  key={vinyl.id}>
                  <h2
                    className="text-center fs-3 fw-bold text-muted">{vinyl.title}</h2>
                  <button onClick={() => submit(user._id, vinyl.id)}>Remove from Favorites</button>
                  <img
                    className="resultImage d-block mx-auto"
                    alt={vinyl.title}
                    src={vinyl.cover_image} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Profile;
