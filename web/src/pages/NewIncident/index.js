import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import "./styles.css";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import logo from "../../assets/logo.svg";

const NewIncident = () => {
  const [formError, setFormError] = useState("");
  const ongId = localStorage.getItem("token");
  const history = useHistory();

  return (
    <div className="new_incident_container fade">
      <div className="content">
        <section>
          <img src={logo} alt="Logo" />

          <h1>New incident</h1>
          <p>Fill out all the details of the incident on the next form.</p>
          <Link to="/profile" className="back_link">
            <FiArrowLeft className="login_icon" />
            Cancel
          </Link>
        </section>

        <Formik
          initialValues={{ title: "", description: "", value: "" }}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            value: Yup.number("Value must be a number").required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await api.post("incidents", values, {
                headers: { Authorization: ongId },
              });
              setSubmitting(false);
              history.push("/profile");
            } catch (err) {
              setSubmitting(false);
              setFormError(err.response.data.error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form_group">
                <Field placeholder="Title of incident" name="title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <div className="form_group">
                <Field
                  component="textarea"
                  placeholder="Description"
                  name="description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form_group">
                <Field placeholder="Value" name="value" />
                <ErrorMessage name="value" component="div" className="error" />
              </div>
              <div className="form_error">{formError && formError}</div>
              <button type="submit" disabled={isSubmitting} className="button">
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewIncident;
