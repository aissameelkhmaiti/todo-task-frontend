import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/action/authAction'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector(state => state.auth.loading)

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  // Mise à jour des champs
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  // Soumission du formulaire
  const handleSubmit = async e => {
    e.preventDefault()

    if (!form.email.trim() || !form.password.trim()) {
      setError('Veuillez remplir tous les champs.')
      return
    }

    try {
      await dispatch(login(form, navigate))
    } catch {
      setError("Échec de connexion. Vérifiez vos identifiants.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
        noValidate
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Connexion</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
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
          placeholder="Votre mot de passe"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
          required
          autoComplete="current-password"
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
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>

        {/* Lien vers la page d'inscription */}
        <p className="mt-6 text-center text-gray-600">
          Nouveau ici ?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
