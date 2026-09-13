<script setup>
defineProps({
    show: Boolean,
    card: Object
})

const emit = defineEmits(['close'])

const defaultImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
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
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" @click.self="emit('close')">
        <div class="bg-gradient-to-r from-pink-200 via-pink-100 to-white py-5 px-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-pink-300">
            <div class="flex justify-between items-center mb-3">
                <span v-if="card?.category" class="bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {{ card.category }}
                </span>
                <span v-else></span>
                <button @click="emit('close')"
                    class="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>
            <div class="flex flex-col md:flex-row gap-4 mb-3">
                <div class="md:h-64 h-48 md:w-1/2 flex-shrink-0">
                    <img class="w-full h-full object-cover rounded-xl shadow-md border border-pink-200" :src="resolveImage(card?.image)" :alt="`gambar ${card?.title}`" />
                </div>
                <div class="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 class="text-xl md:text-2xl font-bold font-serif text-slate-800">{{ card?.title }}</h2>
                        <p class="mt-2 text-slate-700 text-sm md:text-base text-justify leading-relaxed">{{ card?.desc }}</p>
                    </div>

                    <!-- Tech Stack Badges jika ada -->
                    <div v-if="card?.tech && card.tech.length" class="mt-3">
                        <p class="text-xs font-bold text-slate-600 mb-1">Tech Stack:</p>
                        <div class="flex flex-wrap gap-1">
                            <span v-for="(tech, idx) in card.tech" :key="idx"
                                class="bg-white/90 text-pink-700 border border-pink-300 text-xs px-2 py-0.5 rounded-full font-medium shadow-xs">
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Links jika ada -->
            <div v-if="card?.demo || card?.github" class="flex flex-wrap justify-end gap-3 pt-3 border-t border-pink-200 mt-3">
                <a v-if="card.github" :href="card.github" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs md:text-sm font-semibold hover:bg-slate-900 transition shadow">
                    <i class="fa-brands fa-github text-base"></i> View Repository
                </a>
                <a v-if="card.demo" :href="card.demo" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-500 text-white text-xs md:text-sm font-semibold hover:bg-pink-600 transition shadow">
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i> Live Demo
                </a>
            </div>
        </div>
    </div>
</template>
