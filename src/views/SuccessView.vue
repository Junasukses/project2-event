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
const orderId = computed(() => store.orderId)
const customerName = computed(() => store.payment.name)
const customerEmail = computed(() => store.payment.email)
const totalAmount = computed(() => {
  const subtotal = store.cart.totalAmount
  const fee = Math.round(subtotal * 0.05)
  return subtotal + fee
})

// Generate a fake license key
const licenseKey = computed(() => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const segments = []
  for (let s = 0; s < 4; s++) {
    let seg = ''
    for (let i = 0; i < 5; i++) {
      seg += chars[Math.floor(Math.random() * chars.length)]
    }
    segments.push(seg)
  }
  return segments.join('-')
})

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

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
          <div class="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl font-black text-white mb-3">
          Pembayaran Berhasil! 🎉
        </h1>
        <p class="text-gray-400 text-lg mb-8">
          Lisensi APPSYNC kamu sudah aktif. Selamat menggunakan!
        </p>

        <!-- Order Details -->
        <div class="bg-darker rounded-2xl p-6 text-left mb-8 border border-white/5">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <span class="text-gray-400 text-sm">Order ID</span>
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
              <span class="text-gray-400">Tipe Lisensi</span>
              <span class="text-white">Permanent (Lifetime)</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Platform</span>
              <span class="text-white">Windows / macOS / Linux</span>
            </div>
          </div>

          <!-- License items -->
          <div class="space-y-2 mb-4 pb-4 border-b border-white/10">
            <div class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Lisensi</div>
            <div
              v-for="item in ticketDetails"
              :key="item.id"
              class="flex justify-between text-sm"
            >
              <span class="text-white">{{ item.name }} x{{ item.quantity }}</span>
              <span class="text-white">{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-white font-bold">Total Pembayaran</span>
            <span class="text-primary font-black text-2xl">{{ formatPrice(totalAmount) }}</span>
          </div>
        </div>

        <!-- License Key -->
        <div class="bg-darker rounded-2xl p-6 mb-8 border border-primary/30">
          <div class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">🔑 License Key</div>
          <div class="bg-darkest rounded-xl p-4 font-mono text-primary text-lg sm:text-xl font-bold tracking-widest select-all">
            {{ licenseKey }}
          </div>
          <p class="text-gray-500 text-xs mt-3">Simpan license key ini. Kamu akan membutuhkannya saat aktivasi aplikasi.</p>
        </div>

        <p class="text-gray-400 text-sm mb-8">
          License key dan link download telah dikirim ke
          <span class="text-primary font-medium">{{ customerEmail }}</span>.
        </p>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download APPSYNC
          </button>
          <button
            @click="backToHome"
            class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer"
          >
            Kembali ke Beranda
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- System Requirements -->
      <div class="mt-8 bg-accent/10 border border-accent/30 rounded-2xl p-6">
        <p class="text-accent font-bold text-lg mb-3">� System Requirements</p>
        <div class="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div class="text-white font-medium mb-1">🪟 Windows</div>
            <div class="text-gray-400">Windows 10/11 64-bit<br/>RAM 4 GB+<br/>Storage 500 MB</div>
          </div>
          <div>
            <div class="text-white font-medium mb-1">🍎 macOS</div>
            <div class="text-gray-400">macOS 12 Monterey+<br/>RAM 4 GB+<br/>Storage 500 MB</div>
          </div>
          <div>
            <div class="text-white font-medium mb-1">🐧 Linux</div>
            <div class="text-gray-400">Ubuntu 20.04+ / Fedora 36+<br/>RAM 4 GB+<br/>Storage 500 MB</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
