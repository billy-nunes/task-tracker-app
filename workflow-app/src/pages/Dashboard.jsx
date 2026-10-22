import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Only logged-in users can see the dashboard
  useEffect(() => {
    api.get('/user')
      .then((res) => setUser(res.data))
      .catch(() => navigate('/login'))
  }, [navigate])

  const logout = async () => {
    await api.post('/logout')
    navigate('/login')
  }

  if (!user) return <p className="text-center mt-4">Loading…</p>

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Welcome, {user.username}</h2>
        <button className="btn btn-outline-secondary" onClick={logout}>Log out</button>
      </div>
      <p className="mt-3">Your tasks will go here.</p>
    </div>
  )
}

export default Dashboard
