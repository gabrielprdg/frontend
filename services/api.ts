import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.usefashionstorelook.com.br/'
})

console.log(process.env.BASE_URL)
