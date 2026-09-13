<template>
    <div class="flex flex-col md:flex-row md:p-10 md:mt-2">
        <div class="w-0 md:w-1/2">
            <div class="w-3/4 mx-auto">
                <img src="~/assets/images/educationIcon.svg" alt="imagesEdu" class="w-full">
            </div>
        </div>

        <div class="flex flex-col md:w-1/2 p-4">
            <div class="p-4">
                <p class="text-3xl md:text-4xl font-bold text-center text-slate-600">
                    <i class="fa-solid fa-graduation-cap mr-2"></i>Education
                </p>
            </div>
            <div class="rounded-xl bg-gradient-to-r from-slate-100 to-pink-300">
                <!-- item -->
                <div v-for="(edu, index) in educations" :key="index"
                    class="flex flex-row justify-start rounded-b-xl">
                    <div class="flex flex-col w-1/2 md:w-1/4 p-4">
                        <p class="text-lg md:text-xl text-center mb-2 font-semibold">{{ edu.date }}</p>
                    </div>
                    <div class="w-1/2 md:w-3/4 p-4">
                        <p class="text-lg md:text-xl font-semibold ">{{ `${edu.type} ${edu.name}` }}</p>
                        <p class="text-md md:text-lg">{{ edu.major }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    educations: {
        type: Array,
        default: () => []
    }
})
</script>

