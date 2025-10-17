<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/navbarLanding.vue'
import FooterPage from './components/footerPage.vue';
import LineAbout from '@/components/about/lineAbout.vue';
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <navbar/>
        <RouterView/>
        <LineAbout/>
        <FooterPage/>
    </div>
</template>
