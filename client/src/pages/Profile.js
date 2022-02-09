// Node Modules
import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USERS, QUERY_USER, QUERY_ME } from "../utils/queries";
// Components
import UserList from "../components/UserList";

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
      <ul>
        <li>username: {user.username}</li>
        <li>email: {user.email}</li>
      </ul>
    );
  };

  return (
    <section className="container profile-page mt-5 min-vh-100">
      <div className="row">
        <h2>Viewing {id ? `${user.username}'s` : "your"} profile.</h2>
        {renderCurrentUserInfo()}
        {renderUserList()}
      </div>
    </section>
  );
};

export default Profile;
