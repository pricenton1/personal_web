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
            <SwiperSlide v-for="(data, index) in data.activities" :key="index" class="">
                <div v-if="isLoading">
                    <SkeletonLoading /> 
                </div>
                <div v-else class="flex flex-col p-2">
                    <div class="w-full rounded-md md:h-64">
                        <img class="w-full h-full rounded-md" :src="data.image" :alt="`gambar ${index + 1}`" loading="lazy" />
                    </div>
                    <div class="p-4">
                        <p class="md:text-xl font-serif font-semibold">{{ data.title }}</p>
                        <p class="text-justify truncate">{{ data.desc }}</p>
                    </div>
                    <div class="flex flex-row-reverse">
                        <button 
                            @click="openModal(data)"
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
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
// Import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import SkeletonLoading from './SkeletonLoading.vue';

const{ data } = defineProps({
    data: {
        type : Object,
        required: true
    },
    isLoading:{
        type : Boolean
    }
});

const showModal = ref(false)
const selectedCard = ref(null)

const openModal = (data) => {
  selectedCard.value = data
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