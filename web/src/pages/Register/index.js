import './styles.css';

import * as Yup from 'yup';

import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/logo.svg';

const Register = () => {
  const [formError, setFormError] = useState('');
  const history = useHistory();

  return (
    <div className="register_container fade">
      <div className="content">
        <section>
          <img src={logo} alt="Logo" />

          <h1>Sign-up</h1>
          <p>Fill out all the details on the next form.</p>
          <Link to="/" className="back_link">
            <FiArrowLeft className="login_icon" />
            Back
          </Link>
        </section>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            city: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref('password'), null],
              'Passwords must match',
            ),
            phone: Yup.number('Phone must be a number').required('Required'),
            city: Yup.string().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await api.post('ongs', values);
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('ongName', response.data.name);
              setSubmitting(false);
              history.push('/profile');
            } catch (err) {
              setSubmitting(false);
              setFormError(err.response.data.error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form_group">
                <Field placeholder="Name of ONG" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
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
              <div className="form_group">
                <Field
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form_group">
                <Field placeholder="Phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              <div className="form_group">
                <Field placeholder="City" name="city" />
                <ErrorMessage name="city" component="div" className="error" />
              </div>
              <div className="form_error">{formError && formError}</div>
              <button type="submit" disabled={isSubmitting} className="button">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
