import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import FormikStatus from "../components/Common/FormikStatus";
import Auth from "../utils/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./assets/css/auth.css";
import "./assets/css/signup.css";


const Signup = () => {
  const [addUser] = useMutation(ADD_USER);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const { username, email, password } = values;

    try {
      if (successfulSubmission) setSuccessfulSubmission(false);

      const { data } = await addUser({
        variables: { username, email, password },
      });

      Auth.login(data.addUser.token);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSuccessfulSubmission(true);
    }
  };

  return (
    <section className="signup-page container mt-5 min-vh-100">
      <div className="row">
        <h4 className="col">Sign Up</h4>
      </div>
      <div className="row">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string()
              .min(5, "longer than 5 characters")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={handleFormSubmit}
        >
          <Form className="col d-flex flex-column">
            <label htmlFor="username" className="mb-2">Username</label>
            <Field name="username" type="text" className="mb-2 form-control" />
            <ErrorMessage name="username" component="div" className="text-danger mb-2" />

            <label htmlFor="email" className="mb-2">Email Address</label>
            <Field name="email" type="email" className="mb-2 form-control" />
            <ErrorMessage name="email" component="div" className="text-danger mb-2" />

            <label htmlFor="password" className="mb-2">Password</label>
            <Field name="password" type="password" className="mb-2 form-control" />
            <ErrorMessage name="password" component="div" className="text-danger mb-3" />

            <button type="submit" className="btn text-light submit-btn mb-2">Submit</button>
            <FormikStatus err={successfulSubmission} successMessage="Sign Up Successful!" />
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Signup;
