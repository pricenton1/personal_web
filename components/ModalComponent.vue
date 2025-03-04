<script setup>
defineProps({
    show: Boolean,
    card:Object
})

const emit = defineEmits(['close'])
</script>

<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div class="bg-gradient-to-r from-pink-300 to-white py-4 px-6 rounded-lg shadow-lg md:w-1/2">
            <div class="flex justify-end mb-2">
                <button @click="emit('close')"
                    class="px-2 md:px-4 md:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="flex flex-col md:flex-row mb-4">
                <div class="md:h-64 h-48 md:w-1/2 md:mr-2">
                    <img class="w-full h-full rounded-md" :src="card?.image" :alt="`gambar ${card.title}`" />
                </div>
                <div class="md:w-1/2">
                    <h2 class="text-lg md:text-xl font-bold font-serif">{{ card?.title }}</h2>
                    <p class="mt-2 text-slate-900 text-justify">{{ card?.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
