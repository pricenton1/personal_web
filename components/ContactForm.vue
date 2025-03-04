<template>
    <div class="w-full md:w-1/2 p-4 mt-10">
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" v-model="form.nama"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    :class="{'border-red-500 border-2': errors.nama, 'border-gray-300': !errors.nama}" @input="validateName" />
                <p v-if="errors.nama" class="text-red-500 text-sm">{{ errors.nama }}</p>
            </div>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" v-model="form.email"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    :class="{'border-red-500 border-2': errors.email, 'border-gray-300': !errors.email}" @blur="validateEmail" />
                <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>
            <div class="mb-4">
                <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" v-model="form.message"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                    :class="{'border-red-500 border-2': errors.message, 'border-gray-300': !errors.message}"@input="validateMessage" rows="4"></textarea>
                    <p v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</p>
            </div>
            <button type="submit"
                class="w-1/2 md:w-1/4 bg-pink-400 text-white font-bold py-2 rounded-lg hover:bg-pink-600">
                Contact Me
            </button>
        </form>
        <!-- Social Media -->
        <div class="-ml-8">
            <LiniearSocialComponent />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import LiniearSocialComponent from './LiniearSocialComponent.vue';

const form = ref({
    nama: '',
    email: '',
    message: '',
})

const handleSubmit = () => {
    // validate input form
    validateName();
    validateEmail();
    validateMessage();

    if(form.value.nama == ""){
        errors.value.nama = "Field Name Empty!"
    }
    if(form.value.email == ""){
        errors.value.email = "Field Email Empty!"
    }

    if (!errors.value.name && !errors.value.email && !errors.value.message) {
        const phoneNumber = "628987876401"; // Ganti dengan nomor WhatsApp tujuan (tanpa "+" dan "0")
        const text = `Halo, saya ${form.value.nama}%0AEmail: ${form.value.email}%0APesan: ${form.value.message}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    
        form.value.nama = ""
        form.value.email = ""
        form.value.message = ""
    
        window.open(whatsappUrl, "_blank"); // Membuka WhatsApp di tab baru
    }

};

// initiate errors
const errors = ref({
    nama: "",
    email: "",
    message: ""
});
// Validasi Nama (Maksimal 30 karakter)
const validateName = () => {
    if (form.value.nama.length > 30) {
        errors.value.nama = "Maximum name 30 characters!";
    }else {
        errors.value.nama = "";
    }
};
// Validasi Email (Format email yang benar)
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.value.email)) {
    errors.value.email = "Invalid email format!";
  }else {
    errors.value.email = "";
  }
};
// Validasi Message 
const validateMessage = () => {
  if (form.value.message == "") {
    errors.value.message = "Field Message Empty!";
  }else {
    errors.value.message = "";
  }
};

</script>