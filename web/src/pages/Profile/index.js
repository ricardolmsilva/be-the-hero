import "./styles.css";

import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import api from "../../services/api";
import logo from "../../assets/logo.svg";

const Profile = () => {
  const token = localStorage.getItem("token");
  const ongName = localStorage.getItem("ongName");
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    function fetchData() {
      api
        .get("profile", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setIncidents(response.data);
        });
    }
    fetchData();
  }, [token]);

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert("error");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile_container fade">
      <header>
        <img src={logo} alt="Logo" />
        <span>Welcome, {ongName}</span>
        <Link className="button" to="/incidents/new">
          New incident
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower />
        </button>
      </header>

      <div className="incidents_header">
        <h1>Incidents</h1>
        <Link className="button" to="/incidents/new">
          New incident
        </Link>
      </div>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Incident:</strong>
            <p>{incident.title}</p>

            <strong>Description:</strong>
            <p>{incident.description}</p>

            <strong>Value:</strong>
            <p>
              {Intl.NumberFormat("en-en", {
                style: "currency",
                currency: "GBP",
              }).format(incident.value)}
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
