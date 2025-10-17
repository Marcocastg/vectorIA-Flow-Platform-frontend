<script setup></script>

<template>
  <div class="flex flex-col md:flex-row items-center gap-4">

    <div class="relative flex-grow w-full">
      <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">search</span>
      <input class="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors" placeholder="Search for streamers..." type="text"/>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:overflow-visible md:pb-0 md:m-0 md:p-0">
      <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors whitespace-nowrap">
        <span class="text-sm font-medium">Platform</span>
        <span class="material-symbols-outlined text-sm">expand_more</span>
      </button>
      <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors whitespace-nowrap">
        <span class="text-sm font-medium">Popularity</span>
        <span class="material-symbols-outlined text-sm">expand_more</span>
      </button>
    </div>
    
  </div> </template>