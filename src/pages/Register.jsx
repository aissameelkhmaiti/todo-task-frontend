import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/action/authAction'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector(state => state.auth.loading)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [error, setError] = useState('')

  // Mise à jour des champs
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  // Validation simple avant envoi
  const handleSubmit = e => {
    e.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.password || !form.password_confirmation) {
      setError('Veuillez remplir tous les champs.')
      return
    }

    if (form.password !== form.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    dispatch(register(form, navigate))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        noValidate
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Inscription</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Votre nom complet"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          autoComplete="name"
        />

        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="exemple@domaine.com"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          autoComplete="email"
        />

        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          autoComplete="new-password"
        />

        <label htmlFor="password_confirmation" className="block text-gray-700 font-semibold mb-1">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder="Confirmez le mot de passe"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
            loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>

        {/* Lien vers connexion */}
        <p className="mt-6 text-center text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
