<script setup>
import Navbar from '@/components/Navbar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-darkest">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>

<style scoped></style>
