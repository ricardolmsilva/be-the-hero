import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import './styles.css';

const NewIncident = () => {
  const [form, setForm] = useState({});
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('incidents', form, { headers: { Authorization: ongId } });
      history.push('/profile');
    } catch (error) {
      console.log('something was wrong');
    }
  }


  return (
    <div className="new_incident_container fade">
      <div className="content">
        <section>
          <img src={logo} alt="Logo" />

          <h1>New incident</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <Link to="/profile" className="back_link">
            <FiArrowLeft className="login_icon" />
            Back
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title of incident" onChange={handleChange} />
          <textarea name="description" placeholder="Description" onChange={handleChange} />
          <input name="value" placeholder="Value" onChange={handleChange} />

          <div className="button_group">
            <Link to="/profile" className="button grey">Cancel</Link>
            <button type="submit" className="button">Create</button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default NewIncident;
