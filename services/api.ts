import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8081/'
})

console.log('ENV',process.env.BASE_URL)
