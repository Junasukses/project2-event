import { reactive } from 'vue'

export const store = reactive({
  cart: {
    tickets: [],
    totalAmount: 0
  },
  payment: {
    name: '',
    email: '',
    phone: '',
    method: 'bank_transfer'
  },
  orderConfirmed: false,
  orderId: null,

  addTicket(ticket) {
    const existing = this.cart.tickets.find(t => t.id === ticket.id)
    if (existing) {
      existing.quantity += 1
    } else {
      this.cart.tickets.push({ ...ticket, quantity: 1 })
    }
    this.calculateTotal()
  },

  removeTicket(ticketId) {
    this.cart.tickets = this.cart.tickets.filter(t => t.id !== ticketId)
    this.calculateTotal()
  },

  updateQuantity(ticketId, qty) {
    const ticket = this.cart.tickets.find(t => t.id === ticketId)
    if (ticket) {
      ticket.quantity = Math.max(1, Math.min(10, qty))
    }
    this.calculateTotal()
  },

  calculateTotal() {
    this.cart.totalAmount = this.cart.tickets.reduce(
      (sum, t) => sum + t.price * t.quantity, 0
    )
  },

  confirmOrder() {
    this.orderConfirmed = true
    this.orderId = 'RS-' + Date.now().toString(36).toUpperCase()
  },

  resetOrder() {
    this.cart.tickets = []
    this.cart.totalAmount = 0
    this.payment = { name: '', email: '', phone: '', method: 'bank_transfer' }
    this.orderConfirmed = false
    this.orderId = null
  }
})
