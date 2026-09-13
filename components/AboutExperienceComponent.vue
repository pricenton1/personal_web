<template>
    <div id="experience-section" class="flex flex-col md:flex-row md:p-10 md:mt-8 scroll-mt-6">
        <div class="flex flex-col md:w-1/2 p-4">
            <div class="p-4">
                <p class="text-3xl md:text-4xl font-bold text-center text-slate-600">
                    <i class="fa-solid fa-briefcase px-2"></i>Experience
                </p>
            </div>
            <div class="rounded-xl bg-gradient-to-l from-slate-100 to-pink-300">
                <!-- item -->
                <div v-for="(exp, index) in experiences" :key="index"
                    class="flex flex-row justify-start rounded-b-xl">
                    <div class="flex flex-col w-1/2 md:w-1/2 p-4">
                        <p class="text-lg md:text-xl text-center mb-2 font-semibold">{{ exp.date }}</p>
                    </div>
                    <div class="w-1/2 md:w-3/4 p-4">
                        <p class="text-lg md:text-xl font-semibold ">{{ exp.place }}</p>
                        <p class="text-md md:text-lg">{{ exp.position }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-0 md:w-1/2">
            <div class="w-3/4 mx-auto">
                <img src="~/assets/images/workIcon.svg" alt="imagesExp" class="w-full">
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    experiences: {
        type: Array,
        default: () => []
    }
})
</script>

