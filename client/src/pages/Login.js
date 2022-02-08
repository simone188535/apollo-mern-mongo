import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import FormikStatus from "../components/Common/FormikStatus";
import Auth from "../utils/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./assets/css/auth.css";

const Login = () => {
  const [login] = useMutation(LOGIN_USER);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  // submit form
  const handleFormSubmit = (async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      if (successfulSubmission) setSuccessfulSubmission(false);

      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSuccessfulSubmission(true);
    }

  });


  return (
    <section className="login-page container mt-5">
    <div className="row">
    <h4 className="col">Login</h4>
    </div>
    <div className="row">
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={handleFormSubmit}
    >
      <Form className="col d-flex flex-column">
        <label htmlFor="email" className="mb-2">Email Address</label>
        <Field name="email" type="email" className="mb-2 form-control"/>
        <ErrorMessage name="email" component="div" className="text-danger mb-2"/>

        <label htmlFor="password" className="mb-2">Password</label>
        <Field name="password" type="password" className="mb-2 form-control"/>
        <ErrorMessage name="password" component="div" className="text-danger mb-3"/>

        <button type="submit" className="btn text-light submit-btn mb-2">Submit</button>
        <FormikStatus err={successfulSubmission} successMessage="Login Successful!"/>
      </Form>
    </Formik>
    </div>
  </section>
  );
};

export default Login;
