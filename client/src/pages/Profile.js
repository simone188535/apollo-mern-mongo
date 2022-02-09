import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
import UserList from '../components/UserList';
import './assets/css/profile.css'

const Profile = () => {
  const { id } = useParams();

  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

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

  const renderUserList = () => {
    if (usersLoading) return null;

    const notMeUsers = users.filter(o => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    return (
      <div className="container py-3 mx-auto">
        <div>
          <h4>Username: {user.username}</h4>
          <h4>Email: {user.email}</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid profile-styles min-vh-100">
      <div>
        <h2 className="text-decoration-none">
          Viewing {id ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>
      <div className="card-profile border border-dark p-3 shadow-md mt-5 m-3 col-md-3 vw-25">
        {renderCurrentUserInfo()}
        {renderUserList()}
      </div>
    </div>
  );
};

export default Profile;
