<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 class="text-6xl font-bold text-red-500" v-if="error.statusCode === 404">404</h1>
      <h1 class="text-6xl font-bold text-red-500" v-else>Terjadi Kesalahan</h1>
  
      <p class="text-lg text-gray-700 mt-4">{{ error.message || "Halaman Tidak Ditemukan" }}</p>
      
      <NuxtLink to="/" class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </template>
  
  <script setup>
  defineProps(['error']);
  </script>
  