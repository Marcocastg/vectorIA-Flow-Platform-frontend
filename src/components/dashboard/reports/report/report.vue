<script setup></script>
<template>
    <div class="flex min-h-screen w-full flex-col">
        <main class="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
<div class="w-full max-w-5xl">
<div class="mb-8">
<h1 class="text-4xl font-bold text-gray-900 dark:text-white">Prediction Report</h1>
<p class="text-gray-500 dark:text-gray-400 mt-2">Detailed analysis and predictions for the selected live stream.</p>
</div>
<div class="border-b border-gray-200/80 dark:border-gray-700/50">
<nav aria-label="Tabs" class="-mb-px flex space-x-8">
<a class="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#"> Prediction </a>
</nav>
</div>
<div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
<div class="lg:col-span-3 rounded-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/30 dark:bg-black/10 p-6">
<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
<div>
<p class="text-sm font-medium text-gray-500 dark:text-gray-400">Predicted Viewer Count Average</p>
<p class="text-4xl font-bold text-gray-900 dark:text-white mt-1">12,500</p>
<div class="flex items-center gap-2 mt-2">
<p class="text-sm text-gray-500 dark:text-gray-400">Next 14 days</p>
<p class="text-sm font-medium text-green-500">+15%</p>
</div>
</div>
</div>
<div class="h-64 mt-4">
<svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 472 150" width="100%" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient gradientUnits="userSpaceOnUse" id="chart-gradient" x1="236" x2="236" y1="0" y2="150">
<stop stop-color="#5b13ec" stop-opacity="0.3"></stop>
<stop offset="1" stop-color="#5b13ec" stop-opacity="0"></stop>
</linearGradient>
</defs>
<path class="chart-gradient" d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25 V 150 H 0 V 109 Z"></path>
<path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#5b13ec" stroke-linecap="round" stroke-width="2"></path>
</svg>
</div>
<div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
<span>12 AM</span>
<span>3 AM</span>
<span>6 AM</span>
<span>9 AM</span>
<span>12 PM</span>
<span>3 PM</span>
<span>6 PM</span>
</div>
</div>
<div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="rounded-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/30 dark:bg-black/10 p-6 space-y-4">
<h2 class="text-lg font-bold text-gray-900 dark:text-white">Key Insights</h2>
<p class="text-sm text-gray-600 dark:text-gray-300"></p>
</div>
<div class="rounded-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/30 dark:bg-black/10 p-6 space-y-4">
<h2 class="text-lg font-bold text-gray-900 dark:text-white">Model Confidence</h2>
<div>
<div class="flex justify-between mb-1">
<span class="text-base font-medium text-primary">Confidence Level</span>
<span class="text-sm font-medium text-primary">85%</span>
</div>
<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
<div class="bg-primary h-2.5 rounded-full" style="width: 85%"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
    </div>
</template>