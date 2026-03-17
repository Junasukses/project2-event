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

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}

// Confetti animation
const confettiPieces = ref([])
onMounted(() => {
  const colors = ['#c8102e', '#d4a017', '#ffffff', '#ff6b6b', '#ffd93d']
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
          transform: 'rotate(' + (Math.random() * 360) + 'deg)',
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

        <h1 class="text-3xl sm:text-4xl font-black text-white uppercase mb-3">
          Pembayaran Berhasil! 🎉
        </h1>
        <p class="text-gray-400 text-lg mb-8">
          Tiketmu sudah dikonfirmasi. Sampai jumpa di ROCKSTAGE 2026!
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
              <span class="text-gray-400">Tanggal Event</span>
              <span class="text-white">24 Maret 2026</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Lokasi</span>
              <span class="text-white">GBK, Jakarta</span>
            </div>
          </div>

          <!-- Tickets -->
          <div class="space-y-2 mb-4 pb-4 border-b border-white/10">
            <div class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Tiket</div>
            <div
              v-for="ticket in ticketDetails"
              :key="ticket.id"
              class="flex justify-between text-sm"
            >
              <span class="text-white">{{ ticket.name }} x{{ ticket.quantity }}</span>
              <span class="text-white">{{ formatPrice(ticket.price * ticket.quantity) }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-white font-bold">Total Pembayaran</span>
            <span class="text-primary font-black text-2xl">{{ formatPrice(totalAmount) }}</span>
          </div>
        </div>

        <!-- QR Code Placeholder -->
        <div class="bg-white rounded-xl p-6 inline-block mb-8">
          <div class="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-20 h-20 text-gray-800 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 11h2v2H3zm0-4h2v2H3zm4 4h2v2H7zM7 3h2v2H7zm4 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm4-8h2v2h-2zm0 4h2v2h-2zm4 0h2v2h-2zm0-4h2v2h-2zm0 8h2v2h-2zM3 3h2v2H3zm0 8h2v2H3zm4 4h2v2H7zm8 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zM3 15h2v2H3zm0 4h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
              </svg>
              <p class="text-gray-600 text-xs font-medium mt-1">E-Ticket QR</p>
            </div>
          </div>
        </div>

        <p class="text-gray-400 text-sm mb-8">
          E-ticket dan QR code telah dikirim ke <span class="text-primary font-medium">{{ customerEmail }}</span>.
          <br/>Tunjukkan QR code ini di pintu masuk.
        </p>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Download E-Ticket
          </button>
          <button
            @click="backToHome"
            class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Kembali ke Beranda
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
        </div>
      </div>

      <!-- Event Reminder -->
      <div class="mt-8 bg-gold/10 border border-gold/30 rounded-2xl p-6 text-center">
        <p class="text-gold font-bold text-lg mb-2">📅 Catat Tanggalnya!</p>
        <p class="text-gray-300 text-sm">
          <strong class="text-white">ROCKSTAGE 2026</strong> — 24 Maret 2026, 18:00 WIB
          <br/>Gelora Bung Karno, Jakarta
        </p>
      </div>
    </div>
  </div>
</template>
