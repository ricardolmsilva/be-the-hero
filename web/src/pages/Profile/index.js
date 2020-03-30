import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './styles.css';

const Profile = () => {
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      },
    }).then((response) => {
      setIncidents(response.data);
    });
  }, [ongId]);

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert('error');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile_container fade">
      <header>
        <img src={logo} alt="Logo" />
        <span>
          Bem vinda,
          {' '}
          {ongName}
        </span>

        <Link className="button" to="/incidents/new">Create new incident</Link>
        <button type="button" onClick={handleLogout}><FiPower /></button>
      </header>

      <h1>Indicents</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Indicent:</strong>
            <p>{incident.title}</p>

            <strong>Description:</strong>
            <p>{incident.description}</p>

            <strong>Value:</strong>
            <p>

              {Intl.NumberFormat('en-en', { style: 'currency', currency: 'GBP' }).format(incident.value)}
            </p>

            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Profile;
