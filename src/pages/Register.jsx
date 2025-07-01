import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/action/authAction';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(form, navigate));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-sm mx-auto mt-20 p-6 border rounded shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Inscription</h2>

      <input
        type="text"
        name="name"
        placeholder="Nom complet"
        onChange={handleChange}
        required
        className="mb-4 p-3 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="mb-4 p-3 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        required
        className="mb-4 p-3 border rounded"
      />

      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirmer le mot de passe"
        onChange={handleChange}
        required
        className="mb-6 p-3 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default Register;
