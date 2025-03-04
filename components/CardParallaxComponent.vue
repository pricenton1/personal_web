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
                <SwiperSlide v-for="(card,index) in data.certificates" :key="index" class="">
                    <div v-if="isLoading">
                        <SkeletonLoading />
                    </div>
                    <div v-else class="h-48 md:h-48">
                        <img class="w-full h-full rounded-md" :src="card.image" :alt="`gambar ${index + 1}`" />
                    </div>
                </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const modules = [Autoplay, Pagination, Navigation];

const {data} = defineProps({
    data : Object,
    isLoading : Boolean
})

</script>

<style></style>