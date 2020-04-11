import "./styles.css";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";

import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";
import heroImg from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";

const Login = () => {
  const [formError, setFormError] = useState("");
  const history = useHistory();

  return (
    <div className="login_container fade">
      <section className="form">
        <img src={logo} alt="Logo" />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await api.post("auth", values);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("ongName", response.data.name);
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
                <Field name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form_group">
                <Field type="password" placeholder="Password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form_error">{formError && formError}</div>
              <button type="submit" disabled={isSubmitting} className="button">
                Login
              </button>
            </Form>
          )}
        </Formik>

        <Link to="/register" className="back_link">
          <FiLogIn className="login_icon" />
          Create new account
        </Link>
      </section>
      <img src={heroImg} alt="Heroes" className="heroes_img" />
    </div>
  );
};

export default Login;
