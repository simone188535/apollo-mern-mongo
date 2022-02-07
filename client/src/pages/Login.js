import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Card from 'react-bootstrap/Card'
import './assets/css/login.css'
import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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
    <Card className='loginCard bg-danger'>
      <h4>Login</h4>
      {renderForm()}
      {error && <div>{error.message}</div>}
    </Card>
  );
};

export default Login;
