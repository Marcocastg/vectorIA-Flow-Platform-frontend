<script setup></script>
<template>
    <h2 class="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Your Prediction History</h2>
<div class="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
<table class="w-full text-left">
<thead class="bg-stone-50 dark:bg-white/5">
<tr>
<th class="p-4 font-semibold text-stone-900 dark:text-white">Date</th>
<th class="p-4 font-semibold text-stone-900 dark:text-white">Channel</th>
<th class="p-4 font-semibold text-stone-900 dark:text-white">Prediction</th>
<th class="p-4 font-semibold text-stone-900 dark:text-white">Outcome</th>
</tr>
</thead>
<tbody class="divide-y divide-stone-200 dark:divide-stone-800">
<tr>
<td class="p-4 text-stone-600 dark:text-stone-300">2024-07-20</td>
<td class="p-4 text-stone-600 dark:text-stone-300">TechTalk Global</td>
<td class="p-4 text-stone-600 dark:text-stone-300">150K viewers</td>
<td class="p-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                        Correct
                      </span>
</td>
</tr>
<tr>
<td class="p-4 text-stone-600 dark:text-stone-300">2024-07-15</td>
<td class="p-4 text-stone-600 dark:text-stone-300">GameOn Championship</td>
<td class="p-4 text-stone-600 dark:text-stone-300">100K viewers</td>
<td class="p-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300">
                        Incorrect
                      </span>
</td>
</tr>
<tr>
<td class="p-4 text-stone-600 dark:text-stone-300">2024-07-10</td>
<td class="p-4 text-stone-600 dark:text-stone-300">LiveBeats Concert</td>
<td class="p-4 text-stone-600 dark:text-stone-300">75K viewers</td>
<td class="p-4">
<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                        Correct
                      </span>
</td>
</tr>
</tbody>
</table>
</div>
</template>