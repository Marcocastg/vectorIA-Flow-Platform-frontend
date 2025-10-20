<script setup>
    import { RouterLink } from 'vue-router';
</script>
<template>
    <h2 class="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Your Prediction History</h2>
<div class="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
<table class="w-full text-left">
<thead class="bg-stone-50 dark:bg-white/5">
<tr>
<th class="p-4 font-semibold text-stone-900 dark:text-white">Date</th>
<th class="p-4 font-semibold text-stone-900 dark:text-white">Channel</th>
<th class="p-4 font-semibold text-stone-900 dark:text-white">Reports</th>
</tr>
</thead>
<tbody class="divide-y divide-stone-200 dark:divide-stone-800">
<tr>
<td class="p-4 text-stone-600 dark:text-stone-300">2024-07-20</td>
<td class="p-4 text-stone-600 dark:text-stone-300">Example</td>
<td class="p-4 text-stone-600 dark:text-stone-300"><RouterLink to="/dashboard/reports/uuidejemplo"><button class="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</button></RouterLink></td>
</tr>
</tbody>
</table>
</div>
</template>