import axios from 'axios'

export const apiServices = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  mode: 'cors'
})
