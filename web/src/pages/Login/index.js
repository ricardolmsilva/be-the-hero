import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';
import heroImg from '../../assets/heroes.png';

const Login = () => {
  const [id, setId] = useState('');

  const history = useHistory();

  function handleChange(e) {
    setId(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('auth', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      history.push('/');
    }
  }

  return (
    <div className="login_container fade">
      <section className="form">

        <img src={logo} alt="Logo" />

        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            placeholder="Enter your credential"
            onChange={handleChange}
          />
          <button type="submit" className="button">Login</button>
        </form>

        <Link to="/register" className="back_link">
          <FiLogIn className="login_icon" />
          Create new account
        </Link>

      </section>
      <img src={heroImg} alt="Heroes" />
    </div>
  );
};

export default Login;
