import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import FormikStatus from "../components/Common/FormikStatus";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Upload = () => {
  const [addUser] = useMutation(ADD_USER);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    //   const { username, email, password } = values;
    //   try {
    //     if (successfulSubmission) setSuccessfulSubmission(false);
    //     const { data } = await addUser({
    //       variables: { username, email, password },
    //     });
    //     setSubmitting(false);
    //   } catch (err) {
    //     console.error(err);
    //     setSuccessfulSubmission(true);
    //   }
  };

  return (
    <section className="upload-page container mt-5">
      <div className="row">
        <h4 className="col">Upload</h4>
      </div>
      <div className="row">
        <Formik
          initialValues={{
            title: "",
            format: [],
            label: [],
            type: "",
            genre: [],
            style: [],
            coverImage: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            format: Yup.array().min(1, "A format must be provided"),
            label: Yup.array().min(1, "A label must be provided"),
            type: Yup.string().required("Required"),
            genre: Yup.array().min(1, "A genre must be provided"),
            style: Yup.array().min(1, "A style must be provided"),
            coverImage: Yup.string().required("A cover image is required."),
          })}
          onSubmit={handleFormSubmit}
        >
          <Form className="col d-flex flex-column">
            <label htmlFor="title" className="mb-2">
              <strong>Title:</strong>
            </label>
            <Field name="title" type="text" className="mb-2 form-control" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-danger mb-2"
            />

            <label htmlFor="format" className="mb-2">
              <strong>Format: (Select one or multiple)</strong>
            </label>
            <Field
              as="select"
              name="format"
              className="mb-2 form-control"
              multiple={true}
            >
              <option value="Vinyl">Vinyl</option>
              <option value="LP">LP</option>
              <option value="Album">Album</option>
              <option value="Mono">Mono</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage
              name="format"
              component="div"
              className="text-danger mb-2"
            />

            <label htmlFor="label" className="mb-2">
              <strong>Music Label: (Select one or multiple)</strong>
            </label>
            <Field
              as="select"
              name="label"
              className="mb-2 form-control"
              multiple={true}
            >
              <option value="EMI">EMI</option>
              <option value="Sony BMG">Sony BMG</option>
              <option value="Universal Music Group">
                Universal Music Group
              </option>
              <option value="Warner Music Group">Warner Music Group</option>
              <option value="Island Records">Island Records</option>
              <option value="Capitol Music Group">Capitol Music Group</option>
              <option value="Republic Records">Republic Records</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage
              name="label"
              component="div"
              className="text-danger mb-2"
            />

            <label htmlFor="type" className="mb-2">
              <strong>Type:</strong>
            </label>
            <label>
              <Field type="radio" name="type" value="release" /> Release
            </label>
            <label>
              <Field type="radio" name="type" value="master" /> Master
            </label>
            <label>
              <Field type="radio" name="type" value="artist" /> Artist
            </label>
            <label className="mb-2">
              <Field type="radio" name="type" value="label" /> Label
            </label>
            <ErrorMessage
              name="type"
              component="div"
              className="text-danger mb-2"
            />

            <label htmlFor="genre" className="mb-2">
              <strong>Genre(s): (Select one or multiple)</strong>
            </label>
            <Field
              as="select"
              name="genre"
              className="mb-2 form-control"
              multiple={true}
            >
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Country">Country</option>
              <option value="Blues">Blues</option>
              <option value="Classical">Classical</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage
              name="genre"
              component="div"
              className="text-danger mb-2"
            />

            <label htmlFor="style" className="mb-2">
              <strong>Music Style: (Select one or multiple)</strong>
            </label>
            <Field
              as="select"
              name="style"
              className="mb-2 form-control"
              multiple={true}
            >
              <option value="Dance Pop">Dance Pop</option>
              <option value="Pop Dance">Pop Dance</option>
              <option value="Electropop">
              Electropop
              </option>

              <option value="Modern Rock">Modern Rock</option>
              <option value="Classic Rock">Classic Rock</option>
              <option value="Soft Rock">Soft Rock</option>

              <option value="Melodic Rap">Melodic Rap</option>
              <option value="Gangster Rap">Gangster Rap</option>
              <option value="Trap">Trap</option>

              <option value="Country Pop">Country Pop</option>
              <option value="Contemporary Country">Contemporary Country</option>
              <option value="Country Rock">Country Rock</option>

              <option value="Blues Rock">Blues Rock</option>
              <option value="Rhythm And Blues">Rhythm And Blues</option>
              <option value="Traditional Blues">Traditional Blues</option>
              <option value="Modern Blues">Modern Blues</option>

              <option value="Acoustic">Acoustic</option>
              <option value="Contemporary Classical">Contemporary Classical</option>
              <option value="Modern Classical">Modern Classical</option>

              <option value="Other">Other</option>
            </Field>
            <ErrorMessage
              name="style"
              component="div"
              className="text-danger mb-2"
            />

            <label htmlFor="coverImage" className="mb-2">
              <strong>Cover Image: (Provide a String)</strong>
            </label>
            <Field
              name="coverImage"
              type="text"
              className="mb-2 form-control"
            />
            <ErrorMessage
              name="coverImage"
              component="div"
              className="text-danger mb-2"
            />

            <button type="submit" className="btn text-light submit-btn mb-2">
              Submit
            </button>
            <FormikStatus
              err={successfulSubmission}
              successMessage="Upload Successful!"
            />
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Upload;
