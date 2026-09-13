<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <!-- Main Card Container -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-pink-50/60 to-slate-50 border border-pink-200/80 shadow-xl shadow-pink-200/20 p-6 sm:p-8 md:p-10 lg:p-12">
            
            <!-- Ambient Decorative Glows -->
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-purple-300/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/30 rounded-full blur-2xl -z-10 pointer-events-none"></div>

            <div class="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                
                <!-- Left Column: Profile Avatar & Status Badge -->
                <!-- Left Column: Profile Avatar -->
                <div class="flex flex-col items-center flex-shrink-0">
                    <div class="relative group">
                        <!-- Gradient Outer Border Frame -->
                        <div class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-pink-300 via-purple-200 to-slate-200 p-1.5 shadow-lg shadow-pink-200/40 border border-white transition-transform duration-300 group-hover:scale-[1.02]">
                            <img
                                :src="profileImageSrc"
                                alt="Antony Mirasandy Profile"
                                class="w-full h-full object-cover rounded-[22px] bg-white transition-transform duration-500 group-hover:scale-105"
                                @error="handleImageError"
                            />
                        </div>
                    </div>

                    <!-- Available Badge -->
                    <div class="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-emerald-200 text-emerald-700 text-xs font-semibold">
                        <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span>Open to Work & Projects</span>
                    </div>
                </div>

                <!-- Right Column: Profile Content & Tech Stack -->
                <div class="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                    
                    <!-- Tag Header -->
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs md:text-sm font-semibold mb-3 border border-pink-200/60 shadow-xs">
                        <span>👋</span>
                        <span>ABOUT ME</span>
                    </div>

                    <!-- Main Heading -->
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-slate-800 tracking-tight leading-tight mb-4">
                        I'm a
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                            Software Developer
                        </span>
                    </h1>

                    <!-- Bio Paragraph -->
                    <p class="text-slate-600 text-base md:text-lg leading-relaxed mb-6 max-w-3xl font-normal text-justify lg:text-left">
                        I specialize in designing, developing, and maintaining high-quality web applications end-to-end — from intuitive, responsive user interfaces to robust server architectures and optimized database solutions.
                    </p>

                    <!-- Feature Highlights / Value Props -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-6">
                        <div class="flex items-center gap-2.5 p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-pink-100 shadow-xs">
                            <div class="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 text-sm">
                                <i class="fa-solid fa-layer-group"></i>
                            </div>
                            <div class="text-left">
                                <p class="text-xs font-bold text-slate-800">Fullstack Flow</p>
                                <p class="text-[11px] text-slate-500">Frontend to Database</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2.5 p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-pink-100 shadow-xs">
                            <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-sm">
                                <i class="fa-solid fa-bolt"></i>
                            </div>
                            <div class="text-left">
                                <p class="text-xs font-bold text-slate-800">Fast & Scalable</p>
                                <p class="text-[11px] text-slate-500">Clean Architecture</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2.5 p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-pink-100 shadow-xs">
                            <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-sm">
                                <i class="fa-solid fa-mobile-screen-button"></i>
                            </div>
                            <div class="text-left">
                                <p class="text-xs font-bold text-slate-800">Responsive UX</p>
                                <p class="text-[11px] text-slate-500">Modern Interactions</p>
                            </div>
                        </div>
                    </div>

                    <!-- Skills & Tech Stack -->
                    <div class="w-full mt-2">
                        <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-center lg:justify-start gap-2">
                            <i class="fa-solid fa-code text-pink-500"></i>
                            <span>Familiar with & Tech Stack :</span>
                        </p>

                        <div class="flex flex-wrap justify-center lg:justify-start gap-2.5">
                            <div
                                v-for="(skill, index) in skills"
                                :key="index"
                                class="group/skill relative flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-xs border border-pink-100 hover:border-pink-300 hover:shadow-md hover:shadow-pink-100 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                            >
                                <img
                                    :src="`/images/icon/${skill.icon}.png`"
                                    :alt="`Icon ${getSkillName(skill.icon)}`"
                                    class="w-5 h-5 object-contain transition-transform duration-200 group-hover/skill:scale-110"
                                    loading="lazy"
                                />
                                <span class="text-xs font-semibold text-slate-700 group-hover/skill:text-pink-600 transition-colors">
                                    {{ getSkillName(skill.icon) }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Action Buttons / CTA -->
                    <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8 pt-6 border-t border-pink-100/80 w-full">
                        <nuxt-link
                            to="/contact"
                            class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 hover:opacity-95 transition-all duration-200 flex items-center gap-2"
                        >
                            <i class="fa-solid fa-paper-plane text-xs"></i>
                            <span>Contact Me</span>
                        </nuxt-link>

                        <nuxt-link
                            to="/gallery"
                            class="px-5 py-2.5 rounded-xl bg-white text-pink-700 font-semibold text-sm border border-pink-300 hover:bg-pink-50 hover:border-pink-400 shadow-xs transition-all duration-200 flex items-center gap-2"
                        >
                            <i class="fa-solid fa-briefcase text-xs"></i>
                            <span>View Projects</span>
                        </nuxt-link>

                        <a
                            href="https://drive.google.com/file/d/1nMKqFcQHMbnN-L-pbqSiDlHBrXLOQb_l/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="px-4 py-2.5 rounded-xl text-slate-600 hover:text-pink-600 hover:bg-white/60 font-semibold text-sm transition-all duration-200 flex items-center gap-1.5"
                        >
                            <i class="fa-solid fa-file-arrow-down text-xs"></i>
                            <span>Resume / CV</span>
                        </a>
                    </div>

                </div>

            </div>

            <!-- Scroll Down Indicator -->
            <div class="mt-8 pt-4 flex flex-col items-center justify-center w-full border-t border-pink-100/50">
                <button
                    @click="scrollToExperience"
                    class="group inline-flex flex-col items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-pink-600 transition-colors focus:outline-none cursor-pointer"
                    title="Scroll to Experience & Education"
                >
                    <div class="w-5 h-8 rounded-full border-2 border-slate-300 group-hover:border-pink-500 flex items-start justify-center p-1 transition-colors">
                        <div class="w-1 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                    </div>
                    <i class="fa-solid fa-chevron-down text-xs text-pink-500 animate-bounce -mt-0.5"></i>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import defaultProfileImg from '~/assets/images/profileKarikatur.png'
import fallbackProfileImg from '~/assets/images/profile3.png'

defineProps({
    skills: {
        type: Array,
        default: () => []
    }
})

const profileImageSrc = ref(defaultProfileImg)

const handleImageError = () => {
    profileImageSrc.value = fallbackProfileImg
}

const getSkillName = (icon) => {
    const map = {
        vueJs: 'Vue.js',
        react: 'React',
        golang: 'Golang',
        docker: 'Docker',
        postgreSql: 'PostgreSQL',
        mySql: 'MySQL'
    }
    return map[icon] || icon
}

const scrollToExperience = () => {
    const el = document.getElementById('experience-section')
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    } else {
        window.scrollBy({ top: 400, behavior: 'smooth' })
    }
}
</script>

<style scoped>
/* Scoped styles */
</style>
