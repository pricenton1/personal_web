<template>
  <div class="md:h-screen flex flex-col justify-between">
    <NavbarComponent class="z-10" />
    <Wave class="h-full flex flex-col justify-center">
      <div class="mb-12 flex flex-col items-start justify-between px-8 md:flex-row md:px-10 md:mb-0">
        <ProfileCard :data="data"/>
        <ProfileImage />
      </div>
    </Wave>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const data = config.public.apiConfig;

</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>