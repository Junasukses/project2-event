<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Fitur', to: '/#features' },
  { name: 'Harga', to: '/info' },
  { name: 'Testimoni', to: '/#testimonials' },
  { name: 'FAQ', to: '/info' },
]
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-darkest/90 backdrop-blur-md border-b border-white/10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div
            class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span class="text-white font-extrabold text-lg tracking-wider">APPSYNC</span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-4">
          <RouterLink
            to="/info"
            class="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
          >
            BELI SEKARANG →
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white p-2">
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-darker border-t border-white/10">
        <div class="px-4 py-4 space-y-3">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            @click="isMenuOpen = false"
            class="block text-gray-300 hover:text-white text-sm font-medium py-2"
          >
            {{ link.name }}
          </RouterLink>
          <RouterLink
            to="/info"
            @click="isMenuOpen = false"
            class="block bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-lg text-sm font-bold text-center mt-4"
          >
            BELI SEKARANG →
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>
