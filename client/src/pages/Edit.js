import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_ME } from '../utils/queries';
import FormikStatus from "../components/Common/FormikStatus";
import Auth from "../utils/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./assets/css/auth.css";


const Edit = () => {
  const id = Auth.getProfile()?.data?._id;
  const [updateUser] = useMutation(UPDATE_USER);
  const { data } = useQuery(QUERY_ME, {
    variables: { id },
  });
  const { email, username } = data?.me || []

  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const { username, email, password } = values;

    try {
      if (successfulSubmission) setSuccessfulSubmission(false);

      await updateUser({
        variables: { id, username, email, password },
      });

      setSubmitting(false);
      window.location.assign('/me');
    } catch (err) {
      console.error(err);
      setSuccessfulSubmission(true);
    }
  };

  return (
    <section className="edit-page auth container mt-5 min-vh-100">
      <div className="row">
        <h4 className="col">Edit</h4>
      </div>
      <div className="row">
        <Formik
          initialValues={{ username, email, password: "" }}
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
          enableReinitialize
        >
          <Form className="col d-flex flex-column">
            <label htmlFor="username" className="mb-2">New Username</label>
            <Field name="username" type="text" className="mb-2 form-control" />
            <ErrorMessage name="username" component="div" className="text-danger mb-2" />

            <label htmlFor="email" className="mb-2">New Email Address</label>
            <Field name="email" type="email" className="mb-2 form-control" />
            <ErrorMessage name="email" component="div" className="text-danger mb-2" />

            <label htmlFor="password" className="mb-2">New Password</label>
            <Field name="password" type="password" className="mb-2 form-control" placeholder="Please enter a new password"/>
            <ErrorMessage name="password" component="div" className="text-danger mb-3" />

            <button type="submit" className="btn text-light submit-btn mt-3">Submit</button>
            <FormikStatus err={successfulSubmission} successMessage="Edit Successful!" />
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Edit;
