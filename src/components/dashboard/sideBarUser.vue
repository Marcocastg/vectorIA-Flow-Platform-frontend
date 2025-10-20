<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <aside class="w-64 bg-background-light dark:bg-background-dark border-r border-stone-200 dark:border-stone-800 flex flex-col">
    <div class="p-6 flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-cover bg-center" style='background-image: url("https://ik.imagekit.io/mcgonza/logocolor.png");'></div>
      <h1 class="text-xl font-bold text-stone-900 dark:text-white">VectoriaFlow</h1>
    </div>
    <nav class="flex-1 px-4 py-2 space-y-2">
      <RouterLink to="/dashboard" class="flex items-center gap-3 px-4 py-2 rounded-lg" active-class="bg-primary/10 dark:bg-primary/20 text-primary">
        <span class="font-medium">Home</span>
      </RouterLink>
      <RouterLink to="/dashboard/streamers" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-stone-200/50 dark:hover:bg-white/10" active-class="bg-primary/10 dark:bg-primary/20 text-primary">
        <span class="font-medium">Streamers</span>
      </RouterLink>
      <RouterLink to="/dashboard/predictions" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-stone-200/50 dark:hover:bg-white/10" active-class="bg-primary/10 dark:bg-primary/20 text-primary">
        <span class="font-medium">Predictions</span>
      </RouterLink>
      </nav>
    <div class="p-4 mt-auto">
      </div>
  </aside>
</template>