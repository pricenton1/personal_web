<template>
    <div class="overflow-hidden">
        <Swiper ref="swiper" 
            :spaceBetween="20" 
            :autoplay="{
                delay: 1500,
            }" 
            :slides-per-view="4" 
            :grabCursor="true" 
            :loop="true" 
            :breakpoints="{
                '300':{
                    slidesPerView : 1,
                },
                '700':{
                    slidesPerView : 2,
                },
                '1024':{
                    slidesPerView : 4,
                }
            }"
            :modules="modules" class="flex flex-row justify-start -mt-6">
                <SwiperSlide v-for="(card,index) in certificatesList" :key="index" class="">
                    <div v-if="isLoading">
                        <SkeletonLoading />
                    </div>
                    <div v-else class="h-48 md:h-48">
                        <img class="w-full h-full rounded-md object-cover" :src="card.image" :alt="`gambar ${index + 1}`" />
                    </div>
                </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SkeletonLoading from './SkeletonLoading.vue';

const modules = [Autoplay, Pagination, Navigation];

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

const defaultCertificates = [
    { image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80' },
    { image: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80' },
    { image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
    { image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80' }
];

const certificatesList = computed(() => {
    if (props.data?.certificates && Array.isArray(props.data.certificates) && props.data.certificates.length > 0) {
        return props.data.certificates;
    }
    return defaultCertificates;
});
</script>

<style></style>