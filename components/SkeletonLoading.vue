<template>
    <div class="animate-pulse">
        <div v-for="n in count" :key="n" class="bg-gray-300 rounded-lg h-64 mb-2"></div>
    </div>
</template>

<script setup>

defineProps({
    count: {
        type: Number,
        default: 1,
    },
})

</script>