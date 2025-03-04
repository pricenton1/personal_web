<template>
    <div class="h-screen bg-gradient-to-t from-pink-200 to-white">
        <NavbarComponent />
        <div class="flex justify-center">
            <p class="text-2xl font-bold text-justify tracking-widest mt-3">Gallery</p>
        </div>
        <!-- CARDS -->
        <div class="flex flex-row justify-center px-4">
            <div id="wrapper-gallery" class="w-full border-b-8 rounded-b-3xl border-pink-300 border-opacity-20">
                <CardGallery :data="data" :isLoading="isLoading" />
            </div>
        </div>
        <div class="mt-6">
            <!-- <CardParallaxComponent :data="data" :isLoading="isLoading" /> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const config = useRuntimeConfig();
const data = config.public.apiConfig;
const isLoading = ref(true)

onMounted(() =>{
    setTimeout(()=>{
        isLoading.value = false
    },2000)
})

// const cards = [
//     { title: 'Kartu 1', description: 'Ini adalah deskripsi untuk kartu 1.', image: 'https://swiperjs.com/demos/images/nature-1.jpg' },
//     { title: 'Kartu 1', description: 'Ini adalah deskripsi untuk kartu 2.', image: 'https://swiperjs.com/demos/images/nature-2.jpg' },
//     { title: 'Kartu 1', description: 'Ini adalah deskripsi untuk kartu 3.', image: 'https://swiperjs.com/demos/images/nature-3.jpg' },
    
//     { title: 'Kartu 1', description: 'Ini adalah deskripsi untuk kartu 4.', image: 'https://swiperjs.com/demos/images/nature-4.jpg' },
//     { title: 'Kartu 1', description: 'Ini adalah deskripsi untuk kartu 5.', image: 'https://swiperjs.com/demos/images/nature-5.jpg' },
//     { title: 'Kartu 1', description: 'Ini adalah deskripsi untuk kartu 6.', image: 'https://swiperjs.com/demos/images/nature-6.jpg' },
//     { title: 'Kartu 1', description: 'Ini adalah deskripsi untuk kartu 7.', image: 'https://swiperjs.com/demos/images/nature-7.jpg' },
    
// ];

</script>

<style>

</style>
