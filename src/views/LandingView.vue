<script setup>
import { RouterLink } from 'vue-router'

const stats = [
  { value: '50.000+', label: 'Pengguna Aktif' },
  { value: '4.9/5', label: 'Rating Pengguna' },
  { value: '99.9%', label: 'Uptime Server' },
  { value: '24/7', label: 'Customer Support' },
]

const features = [
  {
    icon: '📊',
    title: 'Dashboard Analytics',
    desc: 'Pantau performa bisnis dengan dashboard real-time yang interaktif dan mudah dipahami.',
  },
  {
    icon: '📁',
    title: 'Manajemen Proyek',
    desc: 'Kelola proyek, tugas, dan deadline tim kamu dalam satu platform terintegrasi.',
  },
  {
    icon: '💬',
    title: 'Kolaborasi Tim',
    desc: 'Chat, video call, dan file sharing langsung dari dalam aplikasi tanpa perlu alat lain.',
  },
  {
    icon: '🔒',
    title: 'Keamanan Terjamin',
    desc: 'Enkripsi end-to-end dan backup otomatis menjaga data bisnismu tetap aman.',
  },
  {
    icon: '⚡',
    title: 'Performa Cepat',
    desc: 'Dibangun dengan teknologi native. Ringan, cepat, dan tidak membebani perangkatmu.',
  },
  {
    icon: '🔄',
    title: 'Sync Multi-Device',
    desc: 'Data tersinkronisasi otomatis di semua perangkat. Mulai di PC, lanjutkan di laptop.',
  },
]

const screenshots = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
]

const testimonials = [
  {
    name: 'Andi Pratama',
    role: 'CEO, TechStartup.id',
    text: 'APPSYNC mengubah cara kerja tim kami. Produktivitas naik 40% dalam 3 bulan pertama!',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Sari Dewi',
    role: 'Project Manager, KreasiDigital',
    text: 'Fitur manajemen proyek yang luar biasa. Semua terorganisir dan mudah dipantau kapan saja.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Budi Santoso',
    role: 'Freelancer',
    text: 'Sebagai freelancer, APPSYNC membantu saya mengelola banyak klien tanpa kewalahan. Harga sangat worth it.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
]

const platforms = [
  { name: 'Windows', icon: '🪟' },
  { name: 'macOS', icon: '🍎' },
  { name: 'Linux', icon: '🐧' },
]
</script>

<template>
  <div>
    <!-- HERO SECTION -->
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-darkest via-darker to-primary/20"></div>
        <!-- Decorative grid -->
        <div
          class="absolute inset-0 opacity-5"
          style="
            background-image: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.15) 1px,
              transparent 1px
            );
            background-size: 40px 40px;
          "
        ></div>
      </div>

      <!-- Floating shapes -->
      <div class="absolute top-32 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-32 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <!-- Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-primary/20"
            >
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Versi 3.0 — Baru Dirilis!
            </div>
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Satu Aplikasi
              <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
                >Semua Solusi</span
              >
            </h1>
            <p class="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              APPSYNC — aplikasi desktop all-in-one untuk manajemen proyek, kolaborasi tim, dan
              analytics. Tingkatkan produktivitas hingga 10x lipat.
            </p>
            <div class="flex flex-wrap gap-4 mb-8">
              <RouterLink
                to="/info"
                class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                Lihat Harga
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </RouterLink>
              <a
                href="#screenshots"
                class="inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:bg-white/5"
              >
                Lihat Demo
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </a>
            </div>
            <!-- Platforms -->
            <div class="flex items-center gap-4">
              <span class="text-gray-500 text-sm">Tersedia untuk:</span>
              <div class="flex gap-3">
                <span
                  v-for="p in platforms"
                  :key="p.name"
                  class="flex items-center gap-1 text-gray-300 text-sm bg-white/5 px-3 py-1.5 rounded-lg"
                >
                  {{ p.icon }} {{ p.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- App Screenshot -->
          <div class="relative hidden lg:block">
            <div
              class="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                alt="APPSYNC Dashboard"
                class="w-full h-auto"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-darkest/50 to-transparent"></div>
            </div>
            <!-- Floating badge -->
            <div
              class="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-lg font-bold text-sm rotate-3 shadow-lg"
            >
              ⚡ Super Cepat
            </div>
            <div
              class="absolute -bottom-4 -left-4 bg-gold text-black px-4 py-2 rounded-lg font-bold text-sm -rotate-3 shadow-lg"
            >
              ⭐ 4.9 Rating
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <section class="bg-gradient-to-r from-primary to-primary-dark relative z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          <div v-for="stat in stats" :key="stat.label" class="py-5 px-4 text-center">
            <div class="text-white font-extrabold text-sm sm:text-base">{{ stat.value }}</div>
            <div class="text-white/60 text-xs sm:text-sm mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section id="features" class="py-20 bg-darkest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div
            class="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary/20"
          >
            FITUR UNGGULAN
          </div>
          <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Semua yang Kamu Butuhkan</h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Didesain untuk meningkatkan produktivitas tim kamu dengan fitur-fitur canggih dalam satu
            platform.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-dark/50 border border-white/10 rounded-2xl p-6 hover:border-primary/40 hover:bg-dark/80 transition-all duration-300 group"
          >
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {{ feature.icon }}
            </div>
            <h3 class="text-white font-bold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SCREENSHOTS SECTION -->
    <section id="screenshots" class="py-20 bg-darker">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">
            Intip Tampilan Aplikasinya
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Interface modern dan intuitif yang membuat pekerjaan terasa lebih mudah.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(img, idx) in screenshots"
            :key="idx"
            class="group rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300"
          >
            <div class="aspect-video overflow-hidden">
              <img
                :src="img"
                :alt="'Screenshot ' + (idx + 1)"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section id="testimonials" class="py-20 bg-darkest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Apa Kata Pengguna Kami</h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Ribuan profesional sudah merasakan manfaat APPSYNC untuk pekerjaan mereka.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="bg-dark/50 border border-white/10 rounded-2xl p-6"
          >
            <div class="flex items-center gap-1 text-gold mb-4">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <p class="text-gray-300 text-sm leading-relaxed mb-6 italic">
              "{{ testimonial.text }}"
            </p>
            <div class="flex items-center gap-3">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div class="text-white font-semibold text-sm">{{ testimonial.name }}</div>
                <div class="text-gray-500 text-xs">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA SECTION -->
    <section class="py-20 bg-darker relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-4xl sm:text-5xl font-black text-white mb-6">
          Siap Meningkatkan Produktivitas?
        </h2>
        <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Gabung dengan 50.000+ profesional yang sudah menggunakan APPSYNC. Pilih paket yang sesuai
          kebutuhanmu.
        </p>
        <RouterLink
          to="/info"
          class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
        >
          LIHAT PAKET & HARGA
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
