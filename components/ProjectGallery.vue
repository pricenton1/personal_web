<template>
  <div class="w-full max-w-7xl mx-auto px-4 py-4">
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white/80 rounded-2xl p-4 shadow-md animate-pulse border border-pink-100">
        <div class="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
        <div class="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-full mb-1"></div>
        <div class="h-4 bg-slate-200 rounded w-5/6 mb-4"></div>
        <div class="flex gap-2 mb-4">
          <div class="h-5 w-14 bg-slate-200 rounded-full"></div>
          <div class="h-5 w-16 bg-slate-200 rounded-full"></div>
          <div class="h-5 w-12 bg-slate-200 rounded-full"></div>
        </div>
        <div class="flex justify-between items-center pt-2 border-t border-slate-100">
          <div class="h-8 w-20 bg-slate-200 rounded-lg"></div>
          <div class="h-8 w-20 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-else>
      <div v-if="projectList.length === 0" class="text-center py-12 text-gray-500">
        <i class="fa-solid fa-folder-open text-4xl mb-3 text-pink-400"></i>
        <p class="text-lg">Belum ada data proyek yang tersedia.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(project, index) in projectList"
          :key="index"
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 hover:-translate-y-1.5 border border-pink-100 flex flex-col justify-between overflow-hidden group"
        >
          <!-- Image Thumbnail -->
          <div>
            <div class="relative w-full h-48 bg-slate-100 overflow-hidden">
              <img
                :src="project.image || defaultImage"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                @error="handleImageError($event)"
              />
              <div v-if="project.category" class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-pink-700 shadow-sm">
                {{ project.category }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-5">
              <h3 class="text-xl font-bold font-serif text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-slate-600 text-sm line-clamp-3 mb-4 text-justify leading-relaxed">
                {{ project.desc }}
              </p>

              <!-- Tech Stack Badges -->
              <div class="flex flex-wrap gap-1.5 mb-2">
                <span
                  v-for="(tech, tIndex) in project.tech"
                  :key="tIndex"
                  class="bg-pink-50 text-pink-700 border border-pink-200 text-xs px-2.5 py-0.5 rounded-full font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <!-- Card Footer Actions -->
          <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-pink-50 mt-auto">
            <div class="flex items-center space-x-2">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-600 transition-colors text-sm"
                title="GitHub Repository"
              >
                <i class="fa-brands fa-github"></i>
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-600 transition-colors text-sm"
                title="Live Demo"
              >
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>

            <button
              @click="openModal(project)"
              class="px-3.5 py-1.5 text-xs md:text-sm font-semibold border border-pink-500 text-pink-600 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-sm hover:shadow"
            >
              Detail <i class="fa-solid fa-chevron-right text-xs ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detail Project -->
    <ModalComponent :show="showModal" :card="selectedProject" @close="showModal = false" class="z-50" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ModalComponent from './ModalComponent.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const defaultImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'

// Default fallback projects when data.projects is not yet configured in runtimeConfig
const defaultProjects = [
  {
    title: 'Personal Web & Portfolio',
    desc: 'Website portofolio interaktif dan modern yang dibangun dengan Nuxt 3, Vue 3, dan Tailwind CSS. Menampilkan profil developer, karya, galeri interaktif, dan integrasi formulir kontak WhatsApp.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    category: 'Frontend Web',
    tech: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'Typed.js', 'Swiper'],
    demo: 'https://pricenton1.github.io',
    github: 'https://github.com/pricenton1/personal_web'
  },
  {
    title: 'RESTful API Microservices',
    desc: 'Layanan backend berkinerja tinggi yang dikembangkan dengan Golang dan PostgreSQL. Mengimplementasikan autentikasi JWT, Docker containerization, caching Redis, dan arsitektur Clean Code.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
    category: 'Backend & API',
    tech: ['Golang', 'PostgreSQL', 'Docker', 'Redis', 'JWT'],
    demo: '',
    github: 'https://github.com/pricenton1'
  },
  {
    title: 'Enterprise ERP & Dashboard System',
    desc: 'Sistem manajemen operasional dan analitik data berbasis web untuk monitoring transaksi, manajemen inventaris, dan pelaporan keuangan real-time.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'Fullstack App',
    tech: ['Vue.js', 'Node.js', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    demo: '',
    github: 'https://github.com/pricenton1'
  },
  {
    title: 'Mobile POS & Inventory Manager',
    desc: 'Aplikasi Point of Sale (POS) dan pengelolaan stok multi-cabang dengan fitur offline-first, pencetakan struk bluetooth, dan sinkronisasi database cloud otomatis.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=800&q=80',
    category: 'Mobile & Web',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'Docker'],
    demo: '',
    github: 'https://github.com/pricenton1'
  }
]

const projectList = computed(() => {
  if (props.data?.projects && Array.isArray(props.data.projects) && props.data.projects.length > 0) {
    return props.data.projects
  }
  return defaultProjects
})

const showModal = ref(false)
const selectedProject = ref(null)

const openModal = (project) => {
  selectedProject.value = project
  showModal.value = true
}

const handleImageError = (event) => {
  event.target.src = defaultImage
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

