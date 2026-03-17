<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const stats = [
  { value: '24 MARET 22:00', label: 'Tanggal & Waktu' },
  { value: '12 JAM', label: 'Musik Non-Stop' },
  { value: '30+', label: 'Artis Tampil' },
  { value: '5', label: 'Panggung Utama' },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=400&fit=crop',
]

const artists = [
  { name: 'The Sigit', genre: 'Stoner Rock', image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=300&h=300&fit=crop' },
  { name: 'Burgerkill', genre: 'Metalcore', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
  { name: 'Seringai', genre: 'Hard Rock', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { name: 'Superman Is Dead', genre: 'Punk Rock', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop' },
  { name: 'Kelompok Penerbang Roket', genre: 'Psychedelic Rock', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
  { name: 'Koil', genre: 'Alternative Metal', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=300&fit=crop' },
  { name: '/rif', genre: 'Hard Rock', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&h=300&fit=crop' },
  { name: 'Power Metal', genre: 'Heavy Metal', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&h=300&fit=crop' },
]

const reasons = [
  {
    icon: '🎸',
    title: 'Lineup Legendaris',
    desc: 'Lebih dari 30 band rock terbaik Indonesia dan internasional tampil dalam satu panggung megah.'
  },
  {
    icon: '🔊',
    title: 'Sound System Kelas Dunia',
    desc: 'Sistem audio terkini dengan kualitas suara jernih yang menggetarkan jiwa.'
  },
  {
    icon: '🎪',
    title: 'Zona Interaktif',
    desc: 'Area food court, merchandise eksklusif, dan zona foto yang instagramable.'
  },
  {
    icon: '🏕️',
    title: 'Camping Area',
    desc: 'Rasakan pengalaman camping bersama komunitas rocker dari seluruh Indonesia.'
  },
]

const activeGallery = ref(0)
</script>

<template>
  <div>
    <!-- HERO SECTION -->
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&h=1080&fit=crop"
          alt="Concert"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-darkest via-transparent to-transparent"></div>
      </div>

      <!-- Age Badge -->
      <div class="absolute top-24 right-8 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg z-10">
        18+
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div class="max-w-2xl">
          <div class="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-gold/30">
            🔥 24 MARET 2026 — JAKARTA
          </div>
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            ROK-FESTIVAL
            <br />
            <span class="text-primary">TERBESAR</span>
            <br />
            DI INDONESIA
          </h1>
          <p class="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            Rasakan energi musik rock yang menggelegar. Lebih dari 30 artis, 12 jam musik non-stop, dan pengalaman tak terlupakan.
          </p>
          <div class="flex flex-wrap gap-4">
            <RouterLink
              to="/info"
              class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              BELI TIKET
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </RouterLink>
            <a
              href="#gallery"
              class="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:bg-white/10"
            >
              LIHAT VIDEO
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <section class="bg-gold relative z-20 -mt-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/20">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="py-5 px-4 text-center"
          >
            <div class="text-black font-extrabold text-sm sm:text-base">{{ stat.value }}</div>
            <div class="text-black/60 text-xs sm:text-sm mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY SECTION -->
    <section id="gallery" class="py-20 bg-darkest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2 class="text-3xl sm:text-4xl font-black text-white uppercase mb-3">
            Bagaimana Tahun Lalu?
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl">
            Kilas balik ROCKSTAGE 2025, momen-momen epik yang membuat semua orang ingin kembali lagi.
          </p>
        </div>

        <!-- Photo Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div
            v-for="(img, idx) in galleryImages.slice(0, 4)"
            :key="idx"
            class="aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
          >
            <img
              :src="img"
              :alt="'Gallery ' + (idx + 1)"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        <!-- Video / Large Image -->
        <div class="relative aspect-video rounded-xl overflow-hidden group cursor-pointer mb-8">
          <img
            src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=600&fit=crop"
            alt="Concert crowd"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>

        <!-- Second Row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            v-for="(img, idx) in galleryImages.slice(4, 8)"
            :key="idx"
            class="aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
          >
            <img
              :src="img"
              :alt="'Gallery ' + (idx + 5)"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- REASONS SECTION -->
    <section class="py-20 bg-darker">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl sm:text-4xl font-black text-white uppercase mb-4">
              Kenapa Kamu Harus Datang
              <br />
              <span class="text-primary">Ke Festival Ini...</span>
            </h2>
            <p class="text-gray-400 text-lg mb-8">
              Bahkan jika kamu introvert, kami menciptakan tempat yang nyaman agar kamu bisa menikmati musik dari zona personal-mu.
            </p>
            <div class="grid sm:grid-cols-2 gap-6">
              <div
                v-for="reason in reasons"
                :key="reason.title"
                class="bg-dark/50 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-colors duration-300"
              >
                <div class="text-3xl mb-3">{{ reason.icon }}</div>
                <h3 class="text-white font-bold text-lg mb-2">{{ reason.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ reason.desc }}</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=1000&fit=crop"
                alt="Festival vibes"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Floating badges -->
            <div class="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm rotate-6 shadow-lg">
              🎵 Non-Stop Music!
            </div>
            <div class="absolute -bottom-4 -left-4 bg-gold text-black px-4 py-2 rounded-lg font-bold text-sm -rotate-3 shadow-lg">
              🔥 Limited Tickets
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ARTISTS SECTION -->
    <section class="py-20 bg-darkest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-black text-white uppercase mb-3">
            Bintang Program Kami
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Para legenda dan artis terbaik yang siap menghiburmu sepanjang malam.
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div
            v-for="artist in artists"
            :key="artist.name"
            class="group cursor-pointer"
          >
            <div class="relative aspect-square overflow-hidden rounded-xl mb-3">
              <img
                :src="artist.image"
                :alt="artist.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <div class="bg-primary/90 text-white text-xs px-2 py-1 rounded inline-block mb-1">
                  {{ artist.genre }}
                </div>
              </div>
            </div>
            <h3 class="text-white font-bold text-sm sm:text-base group-hover:text-primary transition-colors">
              {{ artist.name }}
            </h3>
          </div>
        </div>

        <div class="text-center mt-10">
          <RouterLink
            to="/info"
            class="inline-flex items-center gap-2 text-primary hover:text-white font-bold text-lg transition-colors"
          >
            Lihat Semua Artis & Line-up
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="py-20 bg-darker relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1920&h=600&fit=crop"
          alt="Concert"
          class="w-full h-full object-cover opacity-20"
        />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-4xl sm:text-5xl font-black text-white uppercase mb-6">
          Jangan Sampai Ketinggalan!
        </h2>
        <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Tiket terbatas dan selalu habis sebelum hari H. Amankan tiketmu sekarang dan jadilah bagian dari sejarah musik rock Indonesia.
        </p>
        <RouterLink
          to="/info"
          class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
        >
          BELI TIKET SEKARANG
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
