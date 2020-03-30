import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

const Register = () => {
  const [form, setForm] = useState({});

  const history = useHistory();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('ongs', form);
      history.push('/');
    } catch (err) {
      history.push('/register');
    }
  }


  return (

    <div className="register_container fade">
      <div className="content">
        <section>
          <img src={logo} alt="Logo" />

          <h1>Sign-up</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <Link to="/" className="back_link">
            <FiArrowLeft className="login_icon" />
            Back
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name of ONG"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />

          <div className="input_group">
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
            />
            <input
              name="district"
              placeholder="District"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="button">Sign-up</button>
        </form>

      </div>
    </div>
  );
};

export default Register;
