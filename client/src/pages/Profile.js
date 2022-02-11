import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { DELETE_VINYL, DELETE_USER } from '../utils/mutations';

import './assets/css/profile.css'

const Profile = () => {
  const { id } = useParams();
  const profileUsersId = Auth.getProfile().data._id;
  const [deleteVinyl] = useMutation(DELETE_VINYL);
  const [deleteUser] = useMutation(DELETE_USER);
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  const user = data?.me || data?.user;

  const submit = async (userId, vinylId) => {
    await deleteVinyl({
      variables: { userId, vinylId }
    });
  }


  console.log('!!!!', user)

  if (error) console.log(error);

  if (Auth.loggedIn() && profileUsersId === id) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user) {
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

  const deleteCurrentUserOnClick = async () => {
    try {
      await deleteUser({
        variables: { id: profileUsersId }
      });
      Auth.logout();
      window.location.assign('/');
    } catch (err) {
      console.log(err);
    }
  }


  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <>
        <h4 className="username cu-text-field mt-4 mb-2">Username: {user.username}</h4>
        <h4 className="email cu-text-field mb-4">Email: {user.email}</h4>
        <h4 className="favorites cu-text-field mb-4">Favorites: {user.vinyl.length}</h4>
        <Link to="/edit" className="text-decoration-none">
          <button type="button" className="btn btn-outline-success d-block mx-auto">Edit Profile</button>
        </Link>
        <br />
        <button type="button" className="btn btn-outline-danger d-block mx-auto" onClick={deleteCurrentUserOnClick}>Delete User</button>
      </>
    );
  };

  return (
    <main className="container-fluid home ">
      <section className="row">
        <div className='col-xl-3 col-sm-12'>
          <div className="card shadow-md mt-5 m-3 ">
            {renderCurrentUserInfo()}
          </div>
        </div>
        <div className='col-md-12 col-xl-9'>
          <div className="container-fluid min-vh-100">
            <ul className="row justify-content-center mb-0">
              {user.vinyl.map((vinyl) => {
                return (
                  <li
                    className="card d-flex flex-column border border-dark p-3 mt-5 m-3 col-md-4 justify-content-center text-center"
                    key={vinyl.id}>
                    <h2
                      className="text-center fs-3 fw-bold text-muted">{vinyl.title}</h2>
                    <div>
                      <img
                        className="resultImage d-block mx-auto img-fluid"
                        alt={vinyl.title}
                        src={vinyl.cover_image} />
                    </div>
                    <br />
                    <div>
                      <button
                        className="btn btn-rounded btn-light btn-white w-10 border border-info"
                        onClick={() => submit(user._id, vinyl.id)}
                      >Remove from Favorites</button>
                    </div>
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
