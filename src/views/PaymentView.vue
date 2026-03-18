<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/store'

const router = useRouter()

// Redirect if no items
if (store.cart.tickets.length === 0) {
  router.push('/info')
}

const isProcessing = ref(false)
const errors = ref({})
const apiError = ref('')

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

const serviceFee = computed(() => Math.round(store.cart.totalAmount * 0.05))
const grandTotal = computed(() => store.cart.totalAmount + serviceFee.value)

function validate() {
  const e = {}
  if (!store.payment.name.trim()) e.name = 'Nama wajib diisi'
  if (!store.payment.email.trim()) e.email = 'Email wajib diisi'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.payment.email))
    e.email = 'Format email tidak valid'
  if (!store.payment.phone.trim()) e.phone = 'Nomor telepon wajib diisi'
  else if (!/^[\d+\-\s]{10,15}$/.test(store.payment.phone)) e.phone = 'Nomor telepon tidak valid'
  errors.value = e
  return Object.keys(e).length === 0
}

/**
 * Poll payment status until paid, then redirect to success.
 */
async function pollPaymentStatus() {
  const maxAttempts = 60 // poll for up to 5 minutes (every 5s)
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 5000))
    try {
      const data = await store.checkPaymentStatus()
      if (data.success && data.data.payment_status === 'paid') {
        store.confirmOrder()
        router.push('/success')
        return
      }
    } catch {
      // ignore polling errors, keep trying
    }
  }
}

/**
 * Wait until payment status is 'paid' and serial_number is available.
 * Retries up to maxAttempts with a delay between each.
 */
async function waitForPaidStatus(maxAttempts = 10, delayMs = 2000) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const data = await store.checkPaymentStatus()
      if (
        data.success &&
        data.data.payment_status === 'paid' &&
        data.data.registrant?.serial_number
      ) {
        return true
      }
    } catch {
      // ignore, retry
    }
    await new Promise((r) => setTimeout(r, delayMs))
  }
  return false
}

/**
 * 1. Register → get snap_token
 * 2. Open Midtrans Snap popup
 * 3. On success → wait for paid status with serial_number → redirect
 */
async function processPayment() {
  if (!validate()) return
  apiError.value = ''
  isProcessing.value = true

  try {
    // 1. Call register API
    await store.register()

    // 2. Open Midtrans Snap popup
    if (window.snap && store.snapToken) {
      window.snap.pay(store.snapToken, {
        onSuccess: async () => {
          // Payment completed — wait until backend confirms paid + serial_number
          await waitForPaidStatus()
          store.confirmOrder()
          router.push('/success')
        },
        onPending: () => {
          // Payment pending — start polling in background
          pollPaymentStatus()
        },
        onError: () => {
          apiError.value = 'Pembayaran gagal. Silakan coba lagi.'
          isProcessing.value = false
        },
        onClose: () => {
          // User closed popup without completing — start polling in case they paid
          isProcessing.value = false
          pollPaymentStatus()
        },
      })
    } else if (store.redirectUrl) {
      // Fallback: redirect to Midtrans web if Snap.js not loaded
      window.location.href = store.redirectUrl
    } else {
      apiError.value = 'Tidak bisa memulai pembayaran. Coba lagi.'
      isProcessing.value = false
    }
  } catch (err) {
    apiError.value = err.message || 'Terjadi kesalahan. Silakan coba lagi.'
    isProcessing.value = false
  }
}
</script>

<template>
  <div class="pt-16 min-h-screen bg-darkest">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-8">
        <button
          @click="router.push('/info')"
          class="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition-colors cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke pilihan paket
        </button>
        <h1 class="text-3xl font-black text-white uppercase">Pembayaran</h1>
        <p class="text-gray-400 mt-1">Lengkapi data diri dan pilih metode pembayaran</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Info -->
          <div class="bg-dark rounded-2xl p-6 border border-white/10">
            <h2 class="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span
                class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm font-bold"
                >1</span
              >
              Data Pembeli
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">Nama Lengkap</label>
                <input
                  v-model="store.payment.name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  :class="[
                    'w-full bg-darker border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                    errors.name ? 'border-red-500' : 'border-white/10',
                  ]"
                />
                <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input
                    v-model="store.payment.email"
                    type="email"
                    placeholder="email@example.com"
                    :class="[
                      'w-full bg-darker border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                      errors.email ? 'border-red-500' : 'border-white/10',
                    ]"
                  />
                  <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
                </div>
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">Nomor Telepon</label>
                  <input
                    v-model="store.payment.phone"
                    type="tel"
                    placeholder="+62 812-xxxx-xxxx"
                    :class="[
                      'w-full bg-darker border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                      errors.phone ? 'border-red-500' : 'border-white/10',
                    ]"
                  />
                  <p v-if="errors.phone" class="text-red-400 text-xs mt-1">{{ errors.phone }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-dark rounded-2xl p-6 border border-white/10 sticky top-24">
            <h2 class="text-white font-bold text-lg mb-6">Ringkasan Pesanan</h2>

            <!-- Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in store.cart.tickets"
                :key="item.id"
                class="flex items-start justify-between gap-4"
              >
                <div class="flex-1">
                  <div class="text-white font-medium text-sm">{{ item.name }}</div>
                  <div class="flex items-center gap-3 mt-2">
                    <button
                      @click="store.updateQuantity(item.id, item.quantity - 1)"
                      class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span class="text-white text-sm font-medium w-6 text-center">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="store.updateQuantity(item.id, item.quantity + 1)"
                      class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      @click="store.removeTicket(item.id)"
                      class="text-red-400 hover:text-red-300 text-xs ml-auto transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <div class="text-white font-medium text-sm">
                  {{ formatPrice(item.price * item.quantity) }}
                </div>
              </div>
            </div>

            <div class="border-t border-white/10 pt-4 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Subtotal</span>
                <span class="text-white">{{ formatPrice(store.cart.totalAmount) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Biaya Layanan (5%)</span>
                <span class="text-white">{{ formatPrice(serviceFee) }}</span>
              </div>
              <div class="border-t border-white/10 pt-3 flex justify-between">
                <span class="text-white font-bold">Total</span>
                <span class="text-primary font-black text-xl">{{ formatPrice(grandTotal) }}</span>
              </div>
            </div>

            <!-- API Error -->
            <div
              v-if="apiError"
              class="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
            >
              {{ apiError }}
            </div>

            <button
              @click="processPayment"
              :disabled="isProcessing || store.cart.tickets.length === 0"
              :class="[
                'w-full mt-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer',
                isProcessing
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30',
              ]"
            >
              <span v-if="isProcessing" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </span>
              <span v-else>Bayar Sekarang</span>
            </button>

            <p class="text-gray-500 text-xs text-center mt-4">
              🔒 Pembayaran diproses melalui Midtrans
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
