<script setup>
import { useRouter } from 'vue-router'
import { store } from '@/store'
import { computed, onMounted, ref } from 'vue'

const router = useRouter()

// Redirect if no confirmed order
if (!store.orderConfirmed) {
  router.push('/')
}

const ticketDetails = computed(() => store.cart.tickets)
const orderId = computed(() => store.orderNumber || store.orderId)
const customerName = computed(() => store.paymentResult?.registrant?.name || store.payment.name)
const customerEmail = computed(() => store.paymentResult?.registrant?.email || store.payment.email)
const customerPhone = computed(() => store.paymentResult?.registrant?.phone || store.payment.phone)
const paymentMethod = computed(() => store.paymentResult?.payment_method || '-')
const paymentTime = computed(() => store.paymentResult?.payment_time || '-')
const totalAmount = computed(() => {
  if (store.paymentResult?.amount) return store.paymentResult.amount
  const subtotal = store.cart.totalAmount
  const fee = Math.round(subtotal * 0.05)
  return subtotal + fee
})

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

// Fetch payment status on mount if not already available
const isLoading = ref(false)
onMounted(async () => {
  if (!store.paymentResult && store.orderNumber) {
    isLoading.value = true
    try {
      await store.checkPaymentStatus()
    } catch {
      // ignore
    } finally {
      isLoading.value = false
    }
  }
})

// Confetti animation
const confettiPieces = ref([])
onMounted(() => {
  const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#ffffff', '#a78bfa']
  for (let i = 0; i < 50; i++) {
    confettiPieces.value.push({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      size: 6 + Math.random() * 8,
    })
  }
})

function backToHome() {
  store.resetOrder()
  router.push('/')
}
</script>

<template>
  <div class="pt-16 min-h-screen bg-darkest relative overflow-hidden">
    <!-- Confetti -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="piece in confettiPieces"
        :key="piece.id"
        class="absolute top-0 animate-bounce"
        :style="{
          left: piece.left + '%',
          width: piece.size + 'px',
          height: piece.size + 'px',
          backgroundColor: piece.color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          animationDelay: piece.delay + 's',
          animationDuration: piece.duration + 's',
          opacity: 0.8,
          transform: 'rotate(' + Math.random() * 360 + 'deg)',
        }"
      ></div>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Success Card -->
      <div class="bg-dark rounded-3xl p-8 sm:p-12 border border-white/10 text-center">
        <!-- Animated Check -->
        <div class="mb-8">
          <div
            class="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center animate-pulse"
          >
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl font-black text-white mb-3">Pembayaran Berhasil! 🎉</h1>
        <p class="text-gray-400 text-lg mb-8">
          Registrasi kamu sudah berhasil. Selamat menikmati event!
        </p>

        <!-- Loading state -->
        <div v-if="isLoading" class="text-gray-400 text-sm mb-8">
          <svg class="animate-spin w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24">
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
          Memuat detail pembayaran...
        </div>

        <!-- Order Details -->
        <div class="bg-darker rounded-2xl p-6 text-left mb-8 border border-white/5">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <span class="text-gray-400 text-sm">Order Number</span>
            <span class="text-primary font-mono font-bold">{{ orderId }}</span>
          </div>

          <div class="space-y-3 mb-4 pb-4 border-b border-white/10">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Nama</span>
              <span class="text-white">{{ customerName }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Email</span>
              <span class="text-white">{{ customerEmail }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Telepon</span>
              <span class="text-white">{{ customerPhone }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Metode Pembayaran</span>
              <span class="text-white">{{ paymentMethod }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Waktu Pembayaran</span>
              <span class="text-white">{{ paymentTime }}</span>
            </div>
          </div>

          <!-- License items -->
          <div class="space-y-2 mb-4 pb-4 border-b border-white/10">
            <div class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Lisensi
            </div>
            <div v-for="item in ticketDetails" :key="item.id" class="flex justify-between text-sm">
              <span class="text-white">{{ item.name }} x{{ item.quantity }}</span>
              <span class="text-white">{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-white font-bold">Total Pembayaran</span>
            <span class="text-primary font-black text-2xl">{{ formatPrice(totalAmount) }}</span>
          </div>
        </div>

        <p class="text-gray-400 text-sm mb-8">
          Detail registrasi telah dikirim ke
          <span class="text-primary font-medium">{{ customerEmail }}</span
          >.
        </p>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="backToHome"
            class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Kembali ke Beranda
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
