<template>
    <div class="flex gap-2">
        <div class="border-2 border-black rounded-sm min-w-6 text-center"
            :class="{ 'bg-slate-600': i + 1 === currentPage, 'bg-fuchsia-400': i + 1 === currentPage }"
            v-for="(item, i) in totalPage" :key="i">{{ i + 1 }}
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPage: {
        type: Number,
        required: true,
    }
});

onMounted(() => {
    console.log('Current Page:', props.currentPage);
});

</script>
