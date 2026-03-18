import { reactive } from 'vue'

const API_BASE = 'http://localhost:8000/api/v1'

export const store = reactive({
  cart: {
    tickets: [],
    totalAmount: 0,
  },
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
  paymentResult: null, // { order_number, payment_method, payment_status, amount, payment_time, registrant }

  addTicket(ticket) {
    const existing = this.cart.tickets.find((t) => t.id === ticket.id)
    if (existing) {
      existing.quantity += 1
    } else {
      this.cart.tickets.push({ ...ticket, quantity: 1 })
    }
    this.calculateTotal()
  },

  removeTicket(ticketId) {
    this.cart.tickets = this.cart.tickets.filter((t) => t.id !== ticketId)
    this.calculateTotal()
  },

  updateQuantity(ticketId, qty) {
    const ticket = this.cart.tickets.find((t) => t.id === ticketId)
    if (ticket) {
      ticket.quantity = Math.max(1, Math.min(10, qty))
    }
    this.calculateTotal()
  },

  calculateTotal() {
    this.cart.totalAmount = this.cart.tickets.reduce((sum, t) => sum + t.price * t.quantity, 0)
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
    this.cart.tickets = []
    this.cart.totalAmount = 0
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
