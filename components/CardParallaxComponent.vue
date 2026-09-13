<template>
  <div class="relative overflow-hidden py-4">
    <!-- Certificates Carousel -->
    <Swiper
      ref="swiper"
      :spaceBetween="20"
      :autoplay="{
        delay: 2200,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :slides-per-view="1.5"
      :grabCursor="true"
      :loop="true"
      :breakpoints="{
        '480': {
          slidesPerView: 2.2,
          spaceBetween: 16
        },
        '768': {
          slidesPerView: 3.2,
          spaceBetween: 20
        },
        '1024': {
          slidesPerView: 4.2,
          spaceBetween: 24
        }
      }"
      :modules="modules"
      class="w-full py-2"
    >
      <SwiperSlide v-for="(card, index) in certificatesList" :key="index">
        <div v-if="isLoading">
          <SkeletonLoading />
        </div>
        <div
          v-else
          @click="openCertModal(card)"
          class="group relative h-48 md:h-52 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:shadow-pink-200/60 border border-pink-200/80 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
        >
          <!-- Certificate Image -->
          <img
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            :src="resolveImage(card.image)"
            :alt="card.title || `Certificate ${index + 1}`"
            loading="lazy"
            @error="handleImageError($event)"
          />

          <!-- Title Pill Tag (Always visible or subtle overlay) -->
          <div v-if="card.title" class="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-semibold flex items-center justify-between shadow-md group-hover:bg-pink-600/90 transition-colors">
            <span class="truncate">{{ card.title }}</span>
            <i class="fa-solid fa-expand text-[10px] opacity-80 group-hover:opacity-100"></i>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span class="w-10 h-10 rounded-full bg-white/90 text-pink-600 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
              <i class="fa-solid fa-magnifying-glass-plus text-sm"></i>
            </span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Certificate Preview Modal -->
    <div
      v-if="showModal && selectedCert"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      @click.self="showModal = false"
    >
      <div class="relative bg-gradient-to-r from-pink-100 via-white to-pink-50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-pink-300 p-5 md:p-6">
        
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-award text-pink-500 text-lg"></i>
            <h3 class="text-lg md:text-xl font-bold font-serif text-slate-800">
              {{ selectedCert.title || 'Certificate & Award' }}
            </h3>
          </div>
          <button
            @click="showModal = false"
            class="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow"
            title="Close"
          >
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <div class="w-full rounded-xl overflow-hidden shadow-lg border border-pink-200 bg-black/5 max-h-[60vh] flex items-center justify-center">
          <img
            class="w-full h-full object-contain max-h-[58vh]"
            :src="resolveImage(selectedCert.image)"
            :alt="selectedCert.title || 'Certificate'"
          />
        </div>

        <div class="pt-4 mt-4 border-t border-pink-200 flex justify-end">
          <button
            @click="showModal = false"
            class="px-5 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import SkeletonLoading from './SkeletonLoading.vue'

const modules = [Autoplay, Pagination, Navigation]

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

const defaultImage = 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80'
const assetImages = import.meta.glob('~/assets/images/**/*', { eager: true, import: 'default' })

const resolveImage = (imgSrc) => {
  if (!imgSrc) return defaultImage
  if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://') || imgSrc.startsWith('data:')) {
    return imgSrc
  }
  const filename = imgSrc.split('/').pop()
  for (const [path, url] of Object.entries(assetImages)) {
    if (path.endsWith(filename)) {
      return url
    }
  }
  return imgSrc
}

const defaultCertificates = [
  { title: 'Fullstack Development', image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80' },
  { title: 'Docker Containerization', image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80' },
  { title: 'System Analyst BNSP', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
  { title: 'Cisco Networking', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80' }
]

const certificatesList = computed(() => {
  if (props.data?.certificates && Array.isArray(props.data.certificates) && props.data.certificates.length > 0) {
    return props.data.certificates
  }
  return defaultCertificates
})

const showModal = ref(false)
const selectedCert = ref(null)

const openCertModal = (cert) => {
  selectedCert.value = cert
  showModal.value = true
}

const handleImageError = (event) => {
  event.target.src = defaultImage
}
</script>

<style scoped>
</style>