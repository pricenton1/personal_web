   // plugins/fontawesome.js
   import { library } from '@fortawesome/fontawesome-svg-core';
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
   import { fas } from '@fortawesome/free-solid-svg-icons'; // Mengimpor semua ikon solid
   import { defineNuxtPlugin } from '#app';

   export default defineNuxtPlugin((nuxtApp) => {
     library.add(fas); // Menambahkan ikon ke library
     nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon); // Mendaftarkan komponen
   });
