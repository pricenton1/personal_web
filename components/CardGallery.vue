<template>
    <div class="w-full md:p-2">
        <Swiper ref="swiper" :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slides-per-view="3"
            :loop="true" :pagination="true" :navigation="true" :coverflowEffect="{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            }" :breakpoints="{
                '300':{
                    slidesPerView : 1,
                },
                '700':{
                    slidesPerView : 2,
                }
            }" :modules="modules" class="w-4/5 md:w-3/4 p-2">
            <SwiperSlide v-for="(item, index) in activitiesList" :key="index" class="">
                <div v-if="isLoading">
                    <SkeletonLoading /> 
                </div>
                <div v-else class="flex flex-col p-2">
                    <div class="w-full rounded-md md:h-64">
                        <img class="w-full h-full rounded-md object-cover" :src="item.image" :alt="`gambar ${index + 1}`" loading="lazy" />
                    </div>
                    <div class="p-4">
                        <p class="md:text-xl font-serif font-semibold">{{ item.title }}</p>
                        <p class="text-justify truncate">{{ item.desc }}</p>
                    </div>
                    <div class="flex flex-row-reverse">
                        <button 
                            @click="openModal(item)"
                            class="p-1 md:p-2 border outline outline-pink-500 rounded-xl hover:bg-pink-300">
                            Read More
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        
        <!-- Modal Detail -->
        <ModalComponent :show="showModal" :card="selectedCard" @close="showModal = false" class="z-10"/>
    </div>
</template>

<script setup>
// Import Swiper Vue.js components
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
// Import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import SkeletonLoading from './SkeletonLoading.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const defaultActivities = [
    {
        title: 'Tech Meetup & Workshop',
        desc: 'Berbagi pengalaman dan mendiskusikan arsitektur web modern serta tren pengembangan software terkini bersama komunitas developer.',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Code Hackathon',
        desc: 'Kolaborasi intensif membangun solusi aplikasi inovatif dalam waktu 48 jam bersama tim lintas fungsi.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Open Source Contribution',
        desc: 'Berkontribusi pada proyek open source dan pengembangan pustaka utilitas untuk ekosistem pengembang.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    }
];

const activitiesList = computed(() => {
    if (props.data?.activities && Array.isArray(props.data.activities) && props.data.activities.length > 0) {
        return props.data.activities;
    }
    return defaultActivities;
});

const showModal = ref(false)
const selectedCard = ref(null)

const openModal = (item) => {
  selectedCard.value = item
  showModal.value = true
}

// Define the modules to be used
const modules = [EffectCoverflow, Pagination, Navigation];
</script>

<style lang="css">
/* Tambahkan gaya CSS tambahan jika diperlukan */
.swiper-button-next,
.swiper-button-prev {
    font-size: 30px;
    font-weight: 700;
    color: white ;
    width: 100px;
    margin: 0px -40px;
}

@media(max-width:600px) {
    .swiper-button-next,
    .swiper-button-prev {
        font-size: 10px;
        font-weight: 300;
        color: black ;
        margin: 0px -35px;
    }
}

.swiper {
  padding: 30px; /* Add padding around the Swiper */
}
</style>