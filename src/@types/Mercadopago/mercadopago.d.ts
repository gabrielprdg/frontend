import MercadoPago from './index'

declare global {
  interface Window {
    Mercadopago: MercadoPago
  }
}
