<script setup>
    import { RouterLink, useRoute } from 'vue-router'

    const isActiveLink = (routePath) => {
      const route = useRoute();
      return route.path === routePath;
    }
</script>
<template>
    <header class="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
<div class="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
<div class="flex items-center gap-3">
<svg class="h-8 w-8 text-primary" fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
<h2 class="text-xl font-bold text-gray-900 dark:text-white">VectoriaFlow</h2>
</div>
<nav class="hidden items-center gap-8 md:flex">
<a class="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="#">Features</a>
<a class="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="#">Streamers</a>
<a class="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary" href="#">Support</a>
</nav>
<div class="flex items-center gap-2">
<a class="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/10 dark:text-gray-300 dark:hover:bg-primary/20" href="#">Login</a>
<a class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105" href="#">Register</a>
</div>
</div>
</header>
</template>