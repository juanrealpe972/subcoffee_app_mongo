import axios from 'axios'

const API = 'http://localhost:3000/api'

export const registerRequest = async (user) => axios.post(`${API}/register`, user);
export const loginRequest = async (user) => axios.post(`${API}/login`, user)