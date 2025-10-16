<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/navbarLanding.vue'
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <navbar/>
        <RouterView/>
    </div>
</template>
