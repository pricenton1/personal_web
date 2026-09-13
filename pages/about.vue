<template>
    <div>
        <NavbarComponent />
        <AboutProfileComponent :skills="data.skills" />
        <AboutExperienceComponent :experiences="data.experiences" />
        <AboutEducationComponent :educations="data.educations" />
        <FooterComponent />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import AboutProfileComponent from '~/components/AboutProfileComponent.vue';
import AboutExperienceComponent from '~/components/AboutExperienceComponent.vue';
import AboutEducationComponent from '~/components/AboutEducationComponent.vue';
import NavbarComponent from '~/components/NavbarComponent.vue';
import FooterComponent from '~/components/FooterComponent.vue';

const config = useRuntimeConfig();
const rawData = config.public.apiConfig || {};

const defaultSkills = [
    { icon: 'vueJs' },
    { icon: 'react' },
    { icon: 'golang' },
    { icon: 'docker' },
    { icon: 'postgreSql' },
    { icon: 'mySql' }
];

const defaultExperiences = [
    { date: '2023 - Present', place: 'Software Tech Inc.', position: 'Fullstack Software Developer' },
    { date: '2021 - 2023', place: 'Digital Solution Agency', position: 'Frontend Web Developer' }
];

const defaultEducations = [
    { date: '2017 - 2021', type: 'S1', name: 'Teknik Informatika', major: 'Software Engineering' }
];

const data = computed(() => ({
    skills: (rawData.skills && rawData.skills.length) ? rawData.skills : defaultSkills,
    experiences: (rawData.experiences && rawData.experiences.length) ? rawData.experiences : defaultExperiences,
    educations: (rawData.educations && rawData.educations.length) ? rawData.educations : defaultEducations
}));
</script>

<style></style>