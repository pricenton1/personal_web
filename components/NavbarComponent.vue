<template>
    <header
        :class="[
            'sticky top-0 z-50 transition-all duration-300 rounded-b-2xl',
            isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md shadow-pink-200/30 border-b border-pink-200/60'
                : 'bg-white/85 backdrop-blur-md shadow-xs border-b border-pink-100/80'
        ]"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 md:h-20">
                
                <!-- Left: Brand / Logo -->
                <NuxtLink to="/" class="flex items-center gap-2.5 group focus:outline-none">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-pink-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-pink-300/40 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                        <i class="fa-solid fa-code text-xs"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-extrabold text-lg md:text-xl tracking-tight text-slate-800 leading-tight group-hover:text-pink-600 transition-colors">
                            Antony<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">.dev</span>
                        </span>
                        <span class="text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-0.5">Software Developer</span>
                    </div>
                </NuxtLink>

                <!-- Center: Desktop Navigation Links (Pill Capsule) -->
                <nav class="hidden md:flex items-center gap-1.5 p-1.5 bg-pink-100/60 backdrop-blur-xs border border-pink-200/80 rounded-2xl shadow-inner">
                    <NuxtLink
                        v-for="item in navItems"
                        :key="item.path"
                        :to="item.path"
                        :class="[
                            'relative px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-2 group',
                            isActive(item.path)
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-200/60'
                                : 'text-slate-700 hover:text-pink-600 hover:bg-white/70'
                        ]"
                    >
                        <i
                            :class="[
                                item.icon,
                                'text-xs transition-transform duration-200',
                                isActive(item.path)
                                    ? 'text-white'
                                    : 'text-slate-400 group-hover:text-pink-500 group-hover:scale-110'
                            ]"
                        ></i>
                        <span>{{ item.name }}</span>
                        <span
                            v-if="isActive(item.path)"
                            class="w-1.5 h-1.5 rounded-full bg-white animate-pulse hidden lg:inline-block ml-0.5"
                        ></span>
                    </NuxtLink>
                </nav>

                <!-- Right: Desktop CTA & Social Quick Links -->
                <div class="hidden md:flex items-center gap-2.5">
                    <a
                        href="https://github.com/pricenton1"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-9 h-9 rounded-xl bg-white/90 border border-pink-200 text-slate-600 hover:text-pink-600 hover:border-pink-300 hover:shadow-xs flex items-center justify-center transition-all duration-200"
                        title="GitHub Profile"
                    >
                        <i class="fa-brands fa-github text-base"></i>
                    </a>
                    <NuxtLink
                        to="/contact"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold shadow-md shadow-pink-200/50 hover:shadow-lg hover:shadow-pink-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                        <i class="fa-solid fa-paper-plane text-[11px]"></i>
                        <span>Let's Talk</span>
                    </NuxtLink>
                </div>

                <!-- Mobile Menu Button -->
                <div class="md:hidden flex items-center gap-2">
                    <NuxtLink
                        to="/contact"
                        class="px-3 py-1.5 rounded-lg bg-pink-100 text-pink-700 text-xs font-semibold border border-pink-200 hover:bg-pink-200 transition-colors flex items-center gap-1.5"
                    >
                        <i class="fa-solid fa-paper-plane text-[10px]"></i>
                        <span>Contact</span>
                    </NuxtLink>

                    <button
                        @click="toggleMenu"
                        class="w-10 h-10 rounded-xl bg-pink-50/80 border border-pink-200 text-slate-700 hover:text-pink-600 hover:bg-pink-100/80 flex items-center justify-center transition-all duration-200 focus:outline-none"
                        :aria-expanded="isMenuOpen"
                        aria-label="Toggle navigation menu"
                    >
                        <i :class="isMenuOpen ? 'fa-solid fa-xmark text-lg text-pink-600' : 'fa-solid fa-bars text-base'"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Dropdown Menu -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-2 scale-95"
            >
                <div
                    v-if="isMenuOpen"
                    class="md:hidden pb-4 pt-1"
                >
                    <div class="flex flex-col space-y-1.5 p-2.5 bg-white/95 backdrop-blur-lg rounded-2xl border border-pink-200/80 shadow-xl shadow-pink-200/30">
                        <NuxtLink
                            v-for="item in navItems"
                            :key="item.path"
                            :to="item.path"
                            @click="isMenuOpen = false"
                            :class="[
                                'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                                isActive(item.path)
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-200/60'
                                    : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
                            ]"
                        >
                            <div class="flex items-center gap-3">
                                <i
                                    :class="[
                                        item.icon,
                                        'w-5 text-center text-sm',
                                        isActive(item.path) ? 'text-white' : 'text-pink-500'
                                    ]"
                                ></i>
                                <span>{{ item.name }}</span>
                            </div>
                            <i v-if="isActive(item.path)" class="fa-solid fa-check text-xs"></i>
                            <i v-else class="fa-solid fa-chevron-right text-xs text-slate-300"></i>
                        </NuxtLink>

                        <!-- Mobile Footer / Quick Socials -->
                        <div class="pt-3 mt-1.5 border-t border-pink-100 flex items-center justify-between px-2">
                            <span class="text-xs text-slate-500 font-medium">Connect:</span>
                            <div class="flex items-center gap-2">
                                <a
                                    href="https://github.com/pricenton1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-8 h-8 rounded-lg bg-pink-50 text-slate-700 hover:text-pink-600 hover:bg-pink-100 flex items-center justify-center text-sm transition-colors"
                                    title="GitHub"
                                >
                                    <i class="fa-brands fa-github"></i>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/antony-mirasandy-60939b172"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-8 h-8 rounded-lg bg-pink-50 text-slate-700 hover:text-pink-600 hover:bg-pink-100 flex items-center justify-center text-sm transition-colors"
                                    title="LinkedIn"
                                >
                                    <i class="fa-brands fa-linkedin"></i>
                                </a>
                                <a
                                    href="https://drive.google.com/file/d/1nMKqFcQHMbnN-L-pbqSiDlHBrXLOQb_l/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="px-2.5 py-1.5 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 text-xs font-semibold transition-colors flex items-center gap-1"
                                    title="Curriculum Vitae"
                                >
                                    <i class="fa-solid fa-file-arrow-down text-[11px]"></i>
                                    <span>CV</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
    { name: 'Home', path: '/', icon: 'fa-solid fa-house' },
    { name: 'Gallery', path: '/gallery', icon: 'fa-solid fa-images' },
    { name: 'About me', path: '/about', icon: 'fa-solid fa-user' },
    { name: 'Message', path: '/contact', icon: 'fa-solid fa-message' },
]

const isActive = (path) => {
    if (path === '/') {
        return route.path === '/'
    }
    return route.path.startsWith(path)
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

// Automatically close mobile menu when navigating to another route
watch(
    () => route.path,
    () => {
        isMenuOpen.value = false
    }
)

const handleScroll = () => {
    if (typeof window !== 'undefined') {
        isScrolled.value = window.scrollY > 15
    }
}

const handleKeydown = (e) => {
    if (e.key === 'Escape') {
        isMenuOpen.value = false
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Scoped styles */
</style>
