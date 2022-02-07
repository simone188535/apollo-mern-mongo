import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Card from 'react-bootstrap/Card'
import Auth from '../utils/auth';
import './assets/css/signup.css'

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      )
    }
    return (
      <form onSubmit={handleFormSubmit}>
        <div className='formInput'>
          <input
            placeholder="Username"
            name="username"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div className='formInput'>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className='formInput'>
          <input
            placeholder='Password'
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  };

  return (
    <Card className='signupCard bg-dark text-light'>
      <h4>Sign Up</h4>
      {renderForm()}
      {error && <div>{error.message}</div>}
    </Card>
  );
};

export default Signup;
