<template>
  <div class="w-full max-w-7xl mx-auto px-2 md:px-4 py-2">
    <!-- View Switcher & Counter Header -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
      <div class="flex items-center gap-2 text-slate-700">
        <span class="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
        <span class="text-sm font-semibold text-slate-600">
          Total <strong class="text-pink-600 font-bold">{{ activitiesList.length }}</strong> Activities & Events
        </span>
      </div>

      <!-- View Toggle Mode (Carousel vs Grid) -->
      <div class="inline-flex p-1 bg-white/90 backdrop-blur-md rounded-xl shadow-xs border border-pink-200">
        <button
          @click="viewMode = 'carousel'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5',
            viewMode === 'carousel'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-pink-600'
          ]"
          title="3D Coverflow Carousel"
        >
          <i class="fa-solid fa-film"></i>
          <span>3D Slider</span>
        </button>

        <button
          @click="viewMode = 'grid'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5',
            viewMode === 'grid'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-pink-600'
          ]"
          title="Grid View"
        >
          <i class="fa-solid fa-table-cells-large"></i>
          <span>Grid View</span>
        </button>
      </div>
    </div>

    <!-- SKELETON LOADING -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 3" :key="n" class="bg-white/80 rounded-2xl p-4 shadow-md animate-pulse border border-pink-100">
        <div class="w-full h-56 bg-slate-200 rounded-xl mb-4"></div>
        <div class="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-full mb-1"></div>
        <div class="h-4 bg-slate-200 rounded w-5/6 mb-4"></div>
        <div class="flex justify-end">
          <div class="h-8 w-24 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div v-else>
      <!-- MODE 1: 3D COVERFLOW CAROUSEL -->
      <div v-if="viewMode === 'carousel'" class="relative overflow-hidden py-4">
        <Swiper
          ref="swiperRef"
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slides-per-view="1.2"
          :loop="true"
          :autoplay="{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :pagination="{
            clickable: true,
            dynamicBullets: true
          }"
          :navigation="true"
          :coverflowEffect="{
            rotate: 35,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 30,
                depth: 100
              }
            },
            '1024': {
              slidesPerView: 3,
              coverflowEffect: {
                rotate: 25,
                depth: 100
              }
            }
          }"
          :modules="modules"
          class="w-full pb-14"
        >
          <SwiperSlide v-for="(item, index) in activitiesList" :key="index" class="p-2">
            <div
              class="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-pink-200/70 border border-pink-100 transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full"
            >
              <!-- Image Container with Date Badge -->
              <div class="relative w-full h-56 sm:h-64 bg-slate-100 overflow-hidden cursor-pointer" @click="openModal(item, index)">
                <img
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  :src="resolveImage(item.image)"
                  :alt="`Aktivitas: ${item.title}`"
                  loading="lazy"
                  @error="handleImageError($event)"
                />
                
                <!-- Date Badge -->
                <div v-if="item.date" class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1.5 border border-white/20">
                  <i class="fa-regular fa-calendar-days text-pink-400"></i>
                  <span>{{ item.date }}</span>
                </div>

                <!-- Hover Overlay Icon -->
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span class="w-11 h-11 rounded-full bg-white/90 text-pink-600 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <i class="fa-solid fa-magnifying-glass-plus text-base"></i>
                  </span>
                </div>
              </div>

              <!-- Card Content -->
              <div class="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 class="text-lg md:text-xl font-bold font-serif text-slate-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {{ item.title }}
                  </h3>
                  <p class="text-slate-600 text-sm line-clamp-3 text-justify leading-relaxed mb-4">
                    {{ item.desc }}
                  </p>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-pink-50 mt-auto">
                  <span class="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <i class="fa-solid fa-camera text-pink-400"></i> Activity
                  </span>
                  
                  <button
                    @click="openModal(item, index)"
                    class="px-3.5 py-1.5 text-xs md:text-sm font-semibold border border-pink-500 text-pink-600 rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-200 shadow-xs flex items-center gap-1.5"
                  >
                    <span>Read Details</span>
                    <i class="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- MODE 2: RESPONSIVE GRID VIEW -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2">
        <div
          v-for="(item, index) in activitiesList"
          :key="index"
          class="bg-white/95 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl hover:shadow-pink-200/60 border border-pink-100 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group"
        >
          <!-- Image with Date -->
          <div class="relative w-full h-52 bg-slate-100 overflow-hidden cursor-pointer" @click="openModal(item, index)">
            <img
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :src="resolveImage(item.image)"
              :alt="`Aktivitas: ${item.title}`"
              loading="lazy"
              @error="handleImageError($event)"
            />
            
            <div v-if="item.date" class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1.5 border border-white/20">
              <i class="fa-regular fa-calendar-days text-pink-400"></i>
              <span>{{ item.date }}</span>
            </div>

            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="w-10 h-10 rounded-full bg-white/90 text-pink-600 flex items-center justify-center shadow-lg">
                <i class="fa-solid fa-expand text-sm"></i>
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-5 flex flex-col justify-between flex-grow">
            <div>
              <h3 class="text-lg font-bold font-serif text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-slate-600 text-sm line-clamp-3 text-justify leading-relaxed mb-4">
                {{ item.desc }}
              </p>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-pink-50 mt-auto">
              <span class="text-xs text-slate-400 font-medium">Activity #{{ index + 1 }}</span>
              <button
                @click="openModal(item, index)"
                class="px-3.5 py-1.5 text-xs font-semibold border border-pink-500 text-pink-600 rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-200"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DETAIL MODAL WITH PREV/NEXT NAVIGATION -->
    <div v-if="showModal && selectedCard" class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" @click.self="showModal = false">
      <div class="relative bg-gradient-to-r from-pink-100 via-white to-pink-50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-pink-300 p-5 md:p-7">
        
        <!-- Header Controls -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span v-if="selectedCard.date" class="bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <i class="fa-regular fa-calendar-days text-xs"></i> {{ selectedCard.date }}
            </span>
            <span class="text-xs text-slate-500 font-medium">
              Item {{ selectedIndex + 1 }} of {{ activitiesList.length }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Navigation buttons inside modal -->
            <button
              @click="prevItem"
              class="w-8 h-8 rounded-full bg-white text-slate-700 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center transition border border-pink-200 shadow-xs"
              title="Previous item"
            >
              <i class="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button
              @click="nextItem"
              class="w-8 h-8 rounded-full bg-white text-slate-700 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center transition border border-pink-200 shadow-xs"
              title="Next item"
            >
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </button>
            
            <button
              @click="showModal = false"
              class="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow ml-1"
              title="Close modal"
            >
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        </div>

        <!-- Content Grid -->
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2 flex-shrink-0 h-64 sm:h-72 rounded-xl overflow-hidden shadow-md border border-pink-200 bg-black/5">
            <img
              class="w-full h-full object-cover"
              :src="resolveImage(selectedCard.image)"
              :alt="selectedCard.title"
            />
          </div>

          <div class="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 class="text-xl md:text-2xl font-bold font-serif text-slate-800 mb-3">
                {{ selectedCard.title }}
              </h2>
              <p class="text-slate-700 text-sm md:text-base leading-relaxed text-justify">
                {{ selectedCard.desc }}
              </p>
            </div>

            <div class="pt-4 mt-6 border-t border-pink-200/80 flex items-center justify-between text-xs text-slate-500">
              <span class="flex items-center gap-1.5 text-pink-600 font-semibold">
                <i class="fa-solid fa-sparkles"></i> Activity Documentation
              </span>
              <button
                @click="showModal = false"
                class="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/autoplay'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import SkeletonLoading from './SkeletonLoading.vue'

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

const viewMode = ref('carousel') // 'carousel' or 'grid'

const defaultImage = 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
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

const defaultActivities = [
  {
    title: 'Tech Meetup & Workshop',
    desc: 'Berbagi pengalaman dan mendiskusikan arsitektur web modern serta tren pengembangan software terkini bersama komunitas developer.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    date: '2024'
  },
  {
    title: 'Code Hackathon',
    desc: 'Kolaborasi intensif membangun solusi aplikasi inovatif dalam waktu 48 jam bersama tim lintas fungsi.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    date: '2023'
  },
  {
    title: 'Open Source Contribution',
    desc: 'Berkontribusi pada proyek open source dan pengembangan pustaka utilitas untuk ekosistem pengembang.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    date: '2022'
  }
]

const activitiesList = computed(() => {
  if (props.data?.activities && Array.isArray(props.data.activities) && props.data.activities.length > 0) {
    return props.data.activities
  }
  return defaultActivities
})

const showModal = ref(false)
const selectedCard = ref(null)
const selectedIndex = ref(0)

const openModal = (item, index) => {
  selectedCard.value = item
  selectedIndex.value = index
  showModal.value = true
}

const nextItem = () => {
  if (activitiesList.value.length === 0) return
  selectedIndex.value = (selectedIndex.value + 1) % activitiesList.value.length
  selectedCard.value = activitiesList.value[selectedIndex.value]
}

const prevItem = () => {
  if (activitiesList.value.length === 0) return
  selectedIndex.value = (selectedIndex.value - 1 + activitiesList.value.length) % activitiesList.value.length
  selectedCard.value = activitiesList.value[selectedIndex.value]
}

const handleImageError = (event) => {
  event.target.src = defaultImage
}

const modules = [EffectCoverflow, Pagination, Navigation, Autoplay]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.swiper-pagination-bullet) {
  background-color: #ec4899;
  opacity: 0.4;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #db2777;
  opacity: 1;
  width: 22px;
  border-radius: 6px;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(244, 114, 182, 0.4);
  color: #db2777;
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: #db2777;
  color: #ffffff;
  transform: scale(1.08);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 16px;
  font-weight: 800;
}

@media (max-width: 640px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}
</style>