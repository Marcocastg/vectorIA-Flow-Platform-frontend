<script setup>
import PaginationStreamers from '@/components/paginationStreamers.vue';
import StreamersFilterStreamers from '@/components/streamersFilterStreamers.vue';
import StreamersTableStreamers from '@/components/streamersTableStreamers.vue';

</script>
<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div class="max-w-7xl mx-auto">
<div class="mb-8">
<h1 class="text-4xl font-bold text-gray-900 dark:text-white">Streamers</h1>
<p class="mt-2 text-gray-600 dark:text-gray-400">Discover and track your favorite streamers.</p>
</div>
<div class="space-y-6">
    <StreamersFilterStreamers />
    <StreamersTableStreamers />
    <PaginationStreamers />
</div>
</div>
</main>

</template>