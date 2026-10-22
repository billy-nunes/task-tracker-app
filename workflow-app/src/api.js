import axios from 'axios'

// One shared axios instance: points at the Express server and sends the session cookie
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  withCredentials: true,
})

export default api
