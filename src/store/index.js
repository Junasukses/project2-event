import { reactive } from 'vue'

const API_BASE = 'http://localhost:8000/api/v1'

// Single product — no plan selection needed
const PRODUCT = {
  name: 'APPSYNC License',
  price: 142857,
}

export const store = reactive({
  product: { ...PRODUCT },

  payment: {
    name: '',
    email: '',
    phone: '',
  },

  // Order / Midtrans state
  orderConfirmed: false,
  orderId: null,
  orderNumber: null,
  snapToken: null,
  redirectUrl: null,
  registrantId: null,

  // Payment result (from status check)
  paymentResult: null,

  get totalAmount() {
    return this.product.price
  },

  get serviceFee() {
    return Math.round(this.totalAmount * 0.05)
  },

  get grandTotal() {
    return this.totalAmount + this.serviceFee
  },

  /**
   * Register & create order via API → returns { order, registrant }
   */
  async register() {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registrant: {
          name: this.payment.name,
          email: this.payment.email,
          phone: this.payment.phone,
        },
      }),
    })
    if (!res.ok) throw new Error('Gagal mendaftar, coba lagi.')
    const data = await res.json()

    this.orderId = data.order.order_id
    this.orderNumber = data.order.order_number
    this.snapToken = data.order.midtrans_snap_token
    this.redirectUrl = data.order.redirect_url
    this.registrantId = data.registrant.id

    return data
  },

  /**
   * Check payment status via API
   */
  async checkPaymentStatus() {
    if (!this.orderNumber) throw new Error('Order number tidak tersedia')
    const res = await fetch(`${API_BASE}/orders/${this.orderNumber}/status`)
    if (!res.ok) throw new Error('Gagal mengecek status pembayaran')
    const data = await res.json()
    if (data.success) {
      this.paymentResult = data.data
    }
    return data
  },

  confirmOrder() {
    this.orderConfirmed = true
  },

  resetOrder() {
    this.product = { ...PRODUCT }
    this.payment = { name: '', email: '', phone: '' }
    this.orderConfirmed = false
    this.orderId = null
    this.orderNumber = null
    this.snapToken = null
    this.redirectUrl = null
    this.registrantId = null
    this.paymentResult = null
  },
})
