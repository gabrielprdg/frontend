import axios from 'axios'

export const mercadopagoApi = axios.create({
    baseURL: 'https://api.mercadopago.com/checkout/'
})

