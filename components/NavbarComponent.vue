<template>
    <nav class="bg-white shadow rounded-b-2xl bg-gradient-to-r from-pink-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-end items-center h-16">
                <div class="invisible md:visible md:flex space-x-14">
                    <nuxt-link to="/" class="text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-house"></i>
                        Home
                    </nuxt-link>
                    <nuxt-link to="/gallery" class="text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-image"></i>
                        Gallery
                    </nuxt-link>
                    <nuxt-link to="/contact" class="text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-message"></i>
                        Message
                    </nuxt-link>
                    <nuxt-link to="/about" class="text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-user"></i>
                        About me
                    </nuxt-link>
                </div>
                <!-- Mobile Menu Button -->
                <div class="md:hidden">
                    <button @click="toggleMenu" class="text-gray-700 hover:text-fuchsia-500">
                        <i v-if="isMenuOpen" class="fa-solid fa-xmark"></i>
                        <i v-else class="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="isMenuOpen" class="p-2 mx-3 md:hidden -mt-8">
                <div class="flex flex-col space-y-4">
                    <nuxt-link to="/" class=" text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-house"></i>
                        Home
                    </nuxt-link>
                    <nuxt-link to="/gallery" class="text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-image"></i>
                        Gallery
                    </nuxt-link>
                    <nuxt-link to="/contact" class="text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-message"></i>
                        Message
                    </nuxt-link>
                    <nuxt-link to="/about" class="text-gray-700 hover:text-fuchsia-500">
                        <i class="fas fa-user"></i>
                        About me
                    </nuxt-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            isMenuOpen: false
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
}  
</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>