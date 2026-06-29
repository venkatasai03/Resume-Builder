import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth'
})

export const googleAuth = (code: string) => api.post(`/google?code=${code}`)