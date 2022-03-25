import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.BASE_URL
})

console.log(process.env.BASE_URL)
