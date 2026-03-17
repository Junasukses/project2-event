<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/store'

const router = useRouter()

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 299000,
    period: 'Lisensi Selamanya',
    description: 'Cocok untuk personal dan freelancer yang butuh fitur dasar.',
    features: [
      'Dashboard Analytics dasar',
      'Manajemen hingga 5 proyek',
      '1 GB cloud storage',
      'Email support',
      'Update gratis 1 tahun',
    ],
    notIncluded: ['Kolaborasi tim', 'Custom branding', 'API access', 'Priority support'],
    color: 'border-gray-500',
    badge: null,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 799000,
    period: 'Lisensi Selamanya',
    description: 'Untuk tim kecil yang butuh kolaborasi dan fitur lanjutan.',
    features: [
      'Dashboard Analytics lengkap',
      'Proyek unlimited',
      '25 GB cloud storage',
      'Kolaborasi hingga 10 orang',
      'Video call built-in',
      'Priority email & chat support',
      'Update gratis 2 tahun',
      'Custom branding',
    ],
    notIncluded: ['API access', 'Dedicated account manager'],
    color: 'border-primary',
    badge: 'TERLARIS',
  },
  {
    id: 'vvip',
    name: 'VVIP',
    price: 2499000,
    period: 'Lisensi Selamanya',
    description: 'Solusi enterprise dengan fitur lengkap tanpa batas.',
    features: [
      'Semua fitur Premium',
      'Unlimited cloud storage',
      'Unlimited anggota tim',
      'API access penuh',
      'SSO & advanced security',
      'Dedicated account manager',
      'Update gratis selamanya',
      'Custom integration',
      'On-premise deployment',
      'SLA 99.99% uptime',
    ],
    notIncluded: [],
    color: 'border-gold',
    badge: 'EKSKLUSIF',
  },
]

const faqs = [
  {
    q: 'Apakah ini pembayaran berlangganan?',
    a: 'Tidak. Semua paket menggunakan sistem lisensi sekali bayar (one-time payment). Kamu mendapatkan akses selamanya tanpa biaya bulanan.',
  },
  {
    q: 'Bagaimana cara mendapatkan update?',
    a: 'Paket Basic mendapat update gratis 1 tahun, Premium 2 tahun, dan VVIP selamanya. Setelah periode update habis, kamu tetap bisa menggunakan versi terakhir.',
  },
  {
    q: 'Apakah bisa upgrade paket?',
    a: 'Tentu! Kamu bisa upgrade kapan saja dan hanya membayar selisih harga dari paket saat ini.',
  },
  {
    q: 'Platform apa saja yang didukung?',
    a: 'APPSYNC tersedia untuk Windows 10/11, macOS 12+, dan Linux (Ubuntu, Fedora, Debian). Satu lisensi berlaku untuk 2 perangkat.',
  },
  {
    q: 'Apakah ada kebijakan refund?',
    a: 'Ya, kami menyediakan garansi uang kembali 30 hari tanpa syarat jika kamu merasa tidak cocok.',
  },
  {
    q: 'Bagaimana dengan keamanan data?',
    a: 'Semua data dienkripsi end-to-end. Untuk paket VVIP, tersedia opsi on-premise deployment sehingga data sepenuhnya di server kamu.',
  },
]

const comparisonFeatures = [
  { name: 'Dashboard Analytics', basic: 'Dasar', premium: 'Lengkap', vvip: 'Lengkap + Custom' },
  { name: 'Jumlah Proyek', basic: '5', premium: 'Unlimited', vvip: 'Unlimited' },
  { name: 'Cloud Storage', basic: '1 GB', premium: '25 GB', vvip: 'Unlimited' },
  { name: 'Anggota Tim', basic: '1', premium: '10', vvip: 'Unlimited' },
  { name: 'Video Call', basic: false, premium: true, vvip: true },
  { name: 'Custom Branding', basic: false, premium: true, vvip: true },
  { name: 'API Access', basic: false, premium: false, vvip: true },
  { name: 'SSO & Security', basic: false, premium: false, vvip: true },
  { name: 'Dedicated Manager', basic: false, premium: false, vvip: true },
  { name: 'Update Gratis', basic: '1 Tahun', premium: '2 Tahun', vvip: 'Selamanya' },
  { name: 'Support', basic: 'Email', premium: 'Email & Chat', vvip: '24/7 Prioritas' },
]

const activeTab = ref('pricing')
const openFaq = ref(null)

function toggleFaq(idx) {
  openFaq.value = openFaq.value === idx ? null : idx
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

function buyPlan(plan) {
  store.addTicket({
    id: plan.id,
    name: plan.name + ' License',
    price: plan.price,
  })
  router.push('/payment')
}
</script>

<template>
  <div class="pt-16">
    <!-- Hero Banner -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-darkest via-darker to-primary/20"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          class="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary/30"
        >
          💎 PILIH PAKETMU
        </div>
        <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">Harga & Paket Lisensi</h1>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          Sekali bayar, pakai selamanya. Pilih paket yang paling sesuai dengan kebutuhanmu.
        </p>
      </div>
    </section>

    <!-- Tab Navigation -->
    <section class="bg-darker border-b border-white/10 sticky top-16 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-8">
          <button
            @click="activeTab = 'pricing'"
            :class="[
              'py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer',
              activeTab === 'pricing'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-white',
            ]"
          >
            💰 Harga
          </button>
          <button
            @click="activeTab = 'comparison'"
            :class="[
              'py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer',
              activeTab === 'comparison'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-white',
            ]"
          >
            📊 Perbandingan
          </button>
          <button
            @click="activeTab = 'faq'"
            :class="[
              'py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer',
              activeTab === 'faq'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-white',
            ]"
          >
            ❓ FAQ
          </button>
        </div>
      </div>
    </section>

    <!-- PRICING TAB -->
    <section v-if="activeTab === 'pricing'" class="py-16 bg-darkest">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-white mb-3">Pilih Paket Lisensi</h2>
          <p class="text-gray-400 text-lg">Sekali bayar — tanpa biaya langganan bulanan</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="plan in plans"
            :key="plan.id"
            :class="[
              'relative bg-dark rounded-2xl p-6 lg:p-8 border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
              plan.color,
              plan.badge === 'TERLARIS' ? 'ring-2 ring-primary/50' : '',
              plan.badge === 'EKSKLUSIF' ? 'ring-2 ring-gold/50' : '',
            ]"
          >
            <!-- Badge -->
            <div
              v-if="plan.badge"
              :class="[
                'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold',
                plan.badge === 'TERLARIS' ? 'bg-primary text-white' : 'bg-gold text-black',
              ]"
            >
              {{ plan.badge }}
            </div>

            <h3 class="text-xl font-bold text-white mb-1">{{ plan.name }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ plan.description }}</p>

            <div class="mb-1">
              <span class="text-3xl font-black text-white">{{ formatPrice(plan.price) }}</span>
            </div>
            <p class="text-gray-500 text-xs mb-6">{{ plan.period }}</p>

            <ul class="space-y-3 mb-4">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-center gap-3 text-sm text-gray-300"
              >
                <svg
                  class="w-4 h-4 text-green-400 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ feature }}
              </li>
            </ul>
            <ul v-if="plan.notIncluded.length" class="space-y-3 mb-8">
              <li
                v-for="item in plan.notIncluded"
                :key="item"
                class="flex items-center gap-3 text-sm text-gray-600"
              >
                <svg class="w-4 h-4 text-gray-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ item }}
              </li>
            </ul>
            <div v-else class="mb-8"></div>

            <button
              @click="buyPlan(plan)"
              :class="[
                'w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer',
                plan.badge === 'TERLARIS'
                  ? 'bg-primary hover:bg-primary-dark text-white'
                  : plan.badge === 'EKSKLUSIF'
                    ? 'bg-gold hover:bg-yellow-600 text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
              ]"
            >
              Beli {{ plan.name }}
            </button>
          </div>
        </div>

        <!-- Guarantee -->
        <div class="mt-12 text-center">
          <div
            class="inline-flex items-center gap-3 bg-dark/50 border border-white/10 rounded-full px-6 py-3"
          >
            <span class="text-2xl">🛡️</span>
            <span class="text-gray-300 text-sm"
              >Garansi uang kembali <strong class="text-white">30 hari</strong> tanpa syarat</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- COMPARISON TAB -->
    <section v-if="activeTab === 'comparison'" class="py-16 bg-darkest">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-white mb-3">Perbandingan Fitur</h2>
          <p class="text-gray-400 text-lg">Lihat detail perbedaan setiap paket</p>
        </div>

        <div class="bg-dark rounded-2xl border border-white/10 overflow-hidden overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead>
              <tr class="border-b border-white/10">
                <th class="text-left text-gray-400 text-sm font-semibold p-4 w-1/4">Fitur</th>
                <th class="text-center text-white font-bold p-4 w-1/4">Basic</th>
                <th class="text-center p-4 w-1/4">
                  <span class="text-primary font-bold">Premium</span>
                  <span class="block text-xs text-primary/60">Terlaris</span>
                </th>
                <th class="text-center p-4 w-1/4">
                  <span class="text-gold font-bold">VVIP</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, idx) in comparisonFeatures"
                :key="idx"
                class="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td class="p-4 text-gray-300 text-sm">{{ row.name }}</td>
                <td class="p-4 text-center text-sm">
                  <span v-if="typeof row.basic === 'boolean'">
                    <svg
                      v-if="row.basic"
                      class="w-5 h-5 text-green-400 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5 text-gray-600 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span v-else class="text-gray-300">{{ row.basic }}</span>
                </td>
                <td class="p-4 text-center text-sm">
                  <span v-if="typeof row.premium === 'boolean'">
                    <svg
                      v-if="row.premium"
                      class="w-5 h-5 text-green-400 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5 text-gray-600 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span v-else class="text-white font-medium">{{ row.premium }}</span>
                </td>
                <td class="p-4 text-center text-sm">
                  <span v-if="typeof row.vvip === 'boolean'">
                    <svg
                      v-if="row.vvip"
                      class="w-5 h-5 text-green-400 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5 text-gray-600 mx-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span v-else class="text-gold font-medium">{{ row.vvip }}</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t border-white/10">
                <td class="p-4 text-white font-bold text-sm">Harga</td>
                <td class="p-4 text-center text-white font-bold">Rp299.000</td>
                <td class="p-4 text-center text-primary font-bold">Rp799.000</td>
                <td class="p-4 text-center text-gold font-bold">Rp2.499.000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>

    <!-- FAQ TAB -->
    <section v-if="activeTab === 'faq'" class="py-16 bg-darkest">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-white mb-3">Pertanyaan Umum</h2>
          <p class="text-gray-400 text-lg">Jawaban untuk pertanyaan yang sering diajukan</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="bg-dark rounded-xl border border-white/5 hover:border-white/20 transition-colors overflow-hidden"
          >
            <button
              @click="toggleFaq(idx)"
              class="w-full flex items-center justify-between p-5 text-left cursor-pointer"
            >
              <span class="text-white font-medium text-sm pr-4">{{ faq.q }}</span>
              <svg
                :class="[
                  'w-5 h-5 text-gray-400 shrink-0 transition-transform',
                  openFaq === idx ? 'rotate-180' : '',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === idx" class="px-5 pb-5">
                <p class="text-gray-400 text-sm leading-relaxed">{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
