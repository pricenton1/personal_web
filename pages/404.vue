<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
         <div class="w-3/4 md:h-80">
             <img src="/assets/images/image404.svg" alt="image404" class="w-full h-full">
         </div>
        <p class="text-xl text-gray-700 mt-2">Oops! Halaman yang Anda cari tidak ditemukan.</p>

        <NuxtLink to="/"
            class="mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-800 transition">
            Kembali ke Beranda
        </NuxtLink>
    </div>
</template>