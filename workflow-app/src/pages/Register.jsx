import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/register', { username, password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="card text-white mb-3" style={{ width: '45%', minWidth: 300 }}>
        <h3 className="card-header text-center mb-3">Register</h3>
        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="register-username" className="form-label mt-4">Username</label>
              <input type="text" className="form-control" id="register-username" placeholder="Enter username"
                value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="register-password" className="form-label mt-4">Password</label>
              <input type="password" className="form-control" id="register-password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-lg btn-primary" style={{ marginTop: '1rem' }}>Submit</button>
              <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
