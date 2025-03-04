<template>
    <div>
        <NavbarComponent />
        <div
            class="w-full overflow-visible flex flex-col md:flex-row items-start justify-end md:mx-10 md:border-2 md:rounded-bl-[50%] md:rounded-br-lg md:overflow-hidden bg-gradient-to-t from-slate-100 to-slate-500 shadow-pink-300 shadow-xl">
            <div
                class="w-3/4 md:w-1/4 overflow-hidden mt-12 mx-auto md:mr-4 rounded-2xl px-10 bg-gradient-to-r from-slate-300 to-blue-300">
                <img src="assets/images/profile3.png" alt="profileImage" class="w-full">
            </div>
            <div class="w-full p-2 md:w-1/2 md:pt-12 md:-ml-6">
                <p class="text-2xl md:text-6xl md:-ml-24 text-pink-950 font-bold">I'm Software Developer</p>
                <div class="md:w-3/4 text-wrap md:my-4 md:mx-2">
                    <p class="break-all text-justify font-sans text-lg md:text-2xl">
                        I specialize in designing, developing, and maintaining web applications end-to-end, from user
                        interface to server and database logic.
                    </p>
                </div>
                <div class="md:w-3/4 md:mt-4">
                    <p class="font-bold md:text-2xl">Familiar with : </p>
                    <div class="grid grid-cols-4 gap-4 items-center md:grid-cols-6 md:gap-4">
                        <div v-for="(skill, index) in data.skills" :key="index" class="w-16">
                            <img :src="`/images/icon/${skill.icon}.png`" :alt="`gambar ${skill.icon}`" class="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- experience -->
        <div class="flex flex-col md:flex-row md:p-10 md:mt-8">
            <div class="flex flex-col md:w-1/2 p-4">
                <div class="p-4">
                    <p class="text-3xl md:text-4xl font-bold text-center text-slate-600"><i
                            class="fa-solid fa-briefcase px-2"></i>Experience</p>
                </div>
                <div class="rounded-xl bg-gradient-to-l from-slate-100 to-pink-300">
                    <!-- item -->
                    <div v-for="(exp, index) in data.experiences" :key="index"
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
                    <img src="assets/images/workIcon.svg" alt="imagesExp" class="w-full">
                </div>
            </div>
        </div>

        <!-- education -->
        <div class="flex flex-col md:flex-row md:p-10 md:mt-2">
            <div class="w-0 md:w-1/2">
                <div class="w-3/4 mx-auto">
                    <img src="assets/images/educationIcon.svg" alt="imagesEdu" class="w-full">
                </div>
            </div>

            <div class="flex flex-col md:w-1/2 p-4">
                <div class="p-4">
                    <p class="text-3xl md:text-4xl font-bold text-center text-slate-600"><i
                            class="fa-solid fa-graduation-cap"></i>Education</p>
                </div>
                <div class="rounded-xl bg-gradient-to-r from-slate-100 to-pink-300">
                    <!-- item -->
                    <div v-for="(edu, index) in data.educations" :key="index"
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
        <FooterComponent />
    </div>

</template>

<script setup>

const config = useRuntimeConfig();
const data = config.public.apiConfig;

</script>

<style></style>