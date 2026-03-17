<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/store'

const router = useRouter()

const tickets = [
  {
    id: 'festival',
    name: 'Festival Pass',
    price: 350000,
    description: 'Akses ke semua area festival, standing zone.',
    features: ['Akses all stage', 'Standing area', 'Free welcome drink'],
    color: 'border-gray-500',
    badge: null,
  },
  {
    id: 'vip',
    name: 'VIP Pass',
    price: 750000,
    description: 'Akses VIP zone lebih dekat ke panggung, include merchandise.',
    features: ['Akses all stage', 'VIP zone depan', 'Exclusive merch', 'Lounge access'],
    color: 'border-gold',
    badge: 'POPULER',
  },
  {
    id: 'vvip',
    name: 'VVIP Pass',
    price: 1500000,
    description: 'Pengalaman terbaik, backstage meet & greet dengan artis.',
    features: ['Akses all stage', 'VVIP front row', 'Meet & Greet', 'Backstage access', 'Premium merch pack', 'Free food & drink'],
    color: 'border-primary',
    badge: 'EKSKLUSIF',
  },
]

const lineup = [
  { time: '18:00', stage: 'Main Stage', artist: 'The Sigit', type: 'Stoner Rock' },
  { time: '19:00', stage: 'Stage 2', artist: 'Rosemary', type: 'Punk Rock' },
  { time: '19:30', stage: 'Main Stage', artist: 'Burgerkill', type: 'Metalcore' },
  { time: '20:30', stage: 'Stage 2', artist: 'Koil', type: 'Alternative Metal' },
  { time: '21:00', stage: 'Main Stage', artist: 'Seringai', type: 'Hard Rock' },
  { time: '22:00', stage: 'Stage 2', artist: '/rif', type: 'Hard Rock' },
  { time: '22:30', stage: 'Main Stage', artist: 'Superman Is Dead', type: 'Punk Rock' },
  { time: '23:30', stage: 'Main Stage', artist: 'Kelompok Penerbang Roket', type: 'Psychedelic Rock' },
  { time: '00:30', stage: 'Main Stage', artist: 'Power Metal', type: 'Heavy Metal' },
  { time: '02:00', stage: 'Main Stage', artist: 'DJ Afterparty', type: 'Electronic' },
]

const activeTab = ref('tickets')

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}

function addToCart(ticket) {
  store.addTicket({
    id: ticket.id,
    name: ticket.name,
    price: ticket.price,
  })
  router.push('/payment')
}
</script>

<template>
  <div class="pt-16">
    <!-- Hero Banner -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&h=600&fit=crop"
          alt="Concert"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/70"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary/30">
          🎫 TIKET TERSEDIA
        </div>
        <h1 class="text-4xl sm:text-5xl font-black text-white uppercase mb-4">
          Info Konser & Tiket
        </h1>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          ROCKSTAGE 2026 — 24 Maret 2026, Gelora Bung Karno, Jakarta
        </p>
      </div>
    </section>

    <!-- Tab Navigation -->
    <section class="bg-darker border-b border-white/10 sticky top-16 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-8">
          <button
            @click="activeTab = 'tickets'"
            :class="[
              'py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors',
              activeTab === 'tickets' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
            ]"
          >
            🎫 Tiket
          </button>
          <button
            @click="activeTab = 'schedule'"
            :class="[
              'py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors',
              activeTab === 'schedule' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
            ]"
          >
            📅 Jadwal
          </button>
          <button
            @click="activeTab = 'venue'"
            :class="[
              'py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors',
              activeTab === 'venue' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
            ]"
          >
            📍 Lokasi
          </button>
        </div>
      </div>
    </section>

    <!-- TICKETS TAB -->
    <section v-if="activeTab === 'tickets'" class="py-16 bg-darkest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-white uppercase mb-3">Pilih Tiketmu</h2>
          <p class="text-gray-400 text-lg">Dapatkan pengalaman terbaik sesuai budget-mu</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            :class="[
              'relative bg-dark rounded-2xl p-6 lg:p-8 border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
              ticket.color,
              ticket.badge === 'POPULER' ? 'ring-2 ring-gold/50' : '',
              ticket.badge === 'EKSKLUSIF' ? 'ring-2 ring-primary/50' : ''
            ]"
          >
            <!-- Badge -->
            <div
              v-if="ticket.badge"
              :class="[
                'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold',
                ticket.badge === 'POPULER' ? 'bg-gold text-black' : 'bg-primary text-white'
              ]"
            >
              {{ ticket.badge }}
            </div>

            <h3 class="text-xl font-bold text-white mb-2">{{ ticket.name }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ ticket.description }}</p>

            <div class="mb-6">
              <span class="text-3xl font-black text-white">{{ formatPrice(ticket.price) }}</span>
              <span class="text-gray-400 text-sm"> / orang</span>
            </div>

            <ul class="space-y-3 mb-8">
              <li
                v-for="feature in ticket.features"
                :key="feature"
                class="flex items-center gap-3 text-sm text-gray-300"
              >
                <svg class="w-4 h-4 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                {{ feature }}
              </li>
            </ul>

            <button
              @click="addToCart(ticket)"
              :class="[
                'w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer',
                ticket.badge === 'EKSKLUSIF'
                  ? 'bg-primary hover:bg-primary-dark text-white'
                  : ticket.badge === 'POPULER'
                    ? 'bg-gold hover:bg-yellow-600 text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              ]"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SCHEDULE TAB -->
    <section v-if="activeTab === 'schedule'" class="py-16 bg-darkest">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-white uppercase mb-3">Jadwal Penampilan</h2>
          <p class="text-gray-400 text-lg">24 Maret 2026 — Mulai pukul 18:00 WIB</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, idx) in lineup"
            :key="idx"
            class="bg-dark rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 border border-white/5 hover:border-white/20 transition-colors"
          >
            <div class="sm:w-20 text-gold font-bold text-lg">{{ item.time }}</div>
            <div class="sm:w-32">
              <span class="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                {{ item.stage }}
              </span>
            </div>
            <div class="flex-1">
              <h3 class="text-white font-bold text-lg">{{ item.artist }}</h3>
              <p class="text-gray-400 text-sm">{{ item.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VENUE TAB -->
    <section v-if="activeTab === 'venue'" class="py-16 bg-darkest">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-white uppercase mb-3">Lokasi Festival</h2>
          <p class="text-gray-400 text-lg">Gelora Bung Karno, Senayan, Jakarta Pusat</p>
        </div>

        <div class="bg-dark rounded-2xl overflow-hidden border border-white/10">
          <div class="aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4131080507947!2d106.79941931!3d-6.218335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14e28b0b7e7%3A0x5c7e728dbcc31979!2sGelora%20Bung%20Karno%20Main%20Stadium!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              class="w-full h-full"
              style="border:0"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
          <div class="p-6 sm:p-8">
            <h3 class="text-white font-bold text-xl mb-4">Stadion Utama Gelora Bung Karno</h3>
            <div class="grid sm:grid-cols-2 gap-4 text-sm">
              <div class="flex items-start gap-3">
                <span class="text-primary text-lg">📍</span>
                <div>
                  <div class="text-white font-medium">Alamat</div>
                  <div class="text-gray-400">Jl. Pintu Satu Senayan, Gelora, Tanah Abang, Jakarta Pusat 10270</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-primary text-lg">🕐</span>
                <div>
                  <div class="text-white font-medium">Waktu</div>
                  <div class="text-gray-400">Gate Open: 16:00 WIB<br/>Show Start: 18:00 WIB</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-primary text-lg">🚗</span>
                <div>
                  <div class="text-white font-medium">Parkir</div>
                  <div class="text-gray-400">Tersedia area parkir luas di kawasan GBK</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-primary text-lg">🚇</span>
                <div>
                  <div class="text-white font-medium">Transportasi</div>
                  <div class="text-gray-400">MRT Stasiun Senayan / Istora<br/>TransJakarta Halte GBK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
