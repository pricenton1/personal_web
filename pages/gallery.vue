<template>
    <div class="min-h-screen flex flex-col justify-between bg-gradient-to-t from-pink-200 via-pink-50 to-white">
        <div>
            <NavbarComponent />

            <div class="max-w-7xl mx-auto px-4 pt-6 pb-2">
                <!-- Page Title -->
                <div class="text-center mb-6">
                    <h1 class="text-3xl md:text-4xl font-bold font-serif text-slate-800 tracking-wide">
                        Portofolio & Gallery
                    </h1>
                    <p class="text-slate-600 text-sm md:text-base mt-1">
                        Showcase of software engineering projects, activities, and moments
                    </p>
                </div>

                <!-- Tab Navigation Buttons -->
                <div class="flex justify-center mb-8">
                    <div class="inline-flex p-1.5 bg-pink-100/80 backdrop-blur-sm rounded-2xl shadow-inner border border-pink-200 gap-2">
                        <button
                            @click="activeTab = 'projects'"
                            :class="[
                                'px-5 py-2.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 flex items-center gap-2',
                                activeTab === 'projects'
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                                    : 'text-slate-700 hover:text-pink-600 hover:bg-white/60'
                            ]"
                        >
                            <i class="fa-solid fa-code"></i>
                            <span>Software Projects</span>
                        </button>

                        <button
                            @click="activeTab = 'activities'"
                            :class="[
                                'px-5 py-2.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 flex items-center gap-2',
                                activeTab === 'activities'
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                                    : 'text-slate-700 hover:text-pink-600 hover:bg-white/60'
                            ]"
                        >
                            <i class="fa-solid fa-camera-retro"></i>
                            <span>Activities & Events</span>
                        </button>
                    </div>
                </div>

                <!-- TAB CONTENT: Software Projects -->
                <transition name="fade" mode="out-in">
                    <div v-if="activeTab === 'projects'" key="projects">
                        <ProjectGallery :data="data" :isLoading="isLoading" />
                    </div>

                    <!-- TAB CONTENT: Activities -->
                    <div v-else key="activities" class="flex flex-col justify-center px-2 md:px-4">
                        <div id="wrapper-gallery" class="w-full border-b-8 rounded-b-3xl border-pink-300 border-opacity-20 pb-6">
                            <CardGallery :data="data" :isLoading="isLoading" />
                        </div>
                        <div v-if="data?.certificates && data.certificates.length" class="mt-8">
                            <h2 class="text-xl font-bold text-center text-slate-700 mb-4">
                                <i class="fa-solid fa-certificate text-pink-500 mr-2"></i>Certificates & Awards
                            </h2>
                            <CardParallaxComponent :data="data" :isLoading="isLoading" />
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <FooterComponent class="mt-12" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectGallery from '~/components/ProjectGallery.vue'
import CardGallery from '~/components/CardGallery.vue'
import CardParallaxComponent from '~/components/CardParallaxComponent.vue'
import NavbarComponent from '~/components/NavbarComponent.vue'
import FooterComponent from '~/components/FooterComponent.vue'

const config = useRuntimeConfig()
const data = config.public.apiConfig || {}
const isLoading = ref(true)
const activeTab = ref('projects')

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1200)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
