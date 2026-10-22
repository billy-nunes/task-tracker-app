import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

// Bootstrap colour class for each status
const statusColours = {
  'To do': 'bg-secondary',
  'In progress': 'bg-warning',
  'Done': 'bg-success',
}

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  // Check who's logged in, then load their tasks
  useEffect(() => {
    api.get('/user')
      .then((res) => {
        setUser(res.data)
        return api.get('/tasks')
      })
      .then((res) => setTasks(res.data))
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

      {tasks.length === 0 ? (
        <p className="mt-3">No tasks yet.</p>
      ) : (
        <ul className="list-group mt-3">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong>
                {task.description && <div className="small text-muted">{task.description}</div>}
              </div>
              <span className={`badge ${statusColours[task.status]}`}>{task.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard