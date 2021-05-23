import axios from 'axios'
import env from '@/config/environemnt'

export const apiServices = axios.create({
  baseURL: env.serveConfig,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  mode: 'cors'
})
