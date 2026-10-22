import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/login', { username, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="card text-white mb-3" style={{ width: '45%', minWidth: 300 }}>
        <h3 className="card-header text-center mb-3">Login</h3>
        <div className="card-body">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="login-username" className="form-label mt-4">Username</label>
              <input type="text" className="form-control" id="login-username" placeholder="Enter username"
                value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="login-password" className="form-label mt-4">Password</label>
              <input type="password" className="form-control" id="login-password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-lg btn-primary" style={{ marginTop: '1rem' }}>Submit</button>
              <Link to="/register" className="btn btn-link">Don't have an account? Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
