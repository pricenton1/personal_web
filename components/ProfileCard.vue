<template>
    <div class="mt-6 md:w-1/2 md:p-6">
        <h1 class="text-3xl font-bold">Hi there, I’m Antony Mirasandy</h1>
        <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            <span ref="job"></span>
            <!-- {{ person.data.job }} -->
        </h2>
        <p class="mt-4 text-justify font-serif italic text-gray-800">
            <span ref="bio"></span>
            <!-- {{ person.data.bio }} -->
        </p>
        <div class="flex flex-row space-x-4 mt-6">
            <nuxt-link to="/contact">
                <button class="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-700">Contact Me</button>
            </nuxt-link>
            <nuxt-link to="/about">
                <button class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">Know More</button>
            </nuxt-link>
            <div class="w-[120px] h-[120px]">
                <video autoplay loop muted class="md:ml-8">
                    <source src="assets/images/dev2.webm" type="video/webm">
                </video>
            </div>
        </div>
        <div class="-ml-8 md:-mt-10">
            <LiniearSocialComponent />
        </div>
        <img src="assets/images/tony2.png" alt="Profile Image" class="visible opacity-15 md:opacity-5 md:w-[700px] absolute top-0 md:-top-20 md:-left-20 -z-10" />
    </div>
</template>

<script setup>
import Typed from 'typed.js';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const person = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})

const job = ref(null);
const bio = ref(null);
let typedJobInstance = null;
let typedBioInstance = null;

onMounted(() => {
  const jobText = person.data?.job || '';
  const bioText = person.data?.bio || "";

  if (job.value) {
    typedJobInstance = new Typed(job.value, {
      strings: [jobText],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 500,
      loop: true,
    });
  }

  if (bio.value) {
    typedBioInstance = new Typed(bio.value, {
      strings: [bioText],
      typeSpeed: 50,
      backSpeed: 20,
      backDelay: 100,
      loop: false,
    });
  }
});

onBeforeUnmount(() => {
  if (typedJobInstance) typedJobInstance.destroy();
  if (typedBioInstance) typedBioInstance.destroy();
});
</script>

<style scoped>
/* Anda bisa menambahkan gaya tambahan di sini jika diperlukan */
</style>