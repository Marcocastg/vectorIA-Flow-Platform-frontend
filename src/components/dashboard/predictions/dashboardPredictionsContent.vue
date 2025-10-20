<script setup></script>
<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div class="max-w-4xl mx-auto">
<h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark mb-8">Select Channel for Prediction</h1>
<div class="mb-8">
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark">search</span>
<input class="w-full pl-12 pr-4 py-3 rounded-lg border border-light dark:border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder-muted-light dark:placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Search for channels by name or topic" type="search"/>
</div>
</div>
<section class="mb-12">
<h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Popular Channels</h2>
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
<div class="group flex flex-col items-center text-center gap-3 cursor-pointer">
<div class="relative w-full aspect-square">
<div class="w-full h-full rounded-full bg-cover bg-center transition-all duration-300 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9yed4lG4btVayQaWjM7i6yfE-Ph9X7PLm5_wgPpaAvhypzA0rwrq0XAv90l6THRJReO2YpFoFcn8XQCfytCgU7CH0HiOizHZOsAHkxxscmZaEKDmDhh__UE09gpD9joitX4MrMr4rxy9FhyXm8rRxS_UR8Bj6h2nUgILqpGD-GzR9qURS_7wMPu1NXQvbJH3z3xCNDJg84gi2vnj27Kj87jZDD_hL9CRD_waKyEsbftMMacHqtxKuGgITFpdAXGq7pO4eFKjRns1L');"></div>
<div class="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</div>
<div>
<p class="font-bold text-text-light dark:text-text-dark">TechStream</p>
<p class="text-sm text-muted-light dark:text-muted-dark">Tech reviews</p>
</div>
</div>
<div class="group flex flex-col items-center text-center gap-3 cursor-pointer">
<div class="relative w-full aspect-square">
<div class="w-full h-full rounded-full bg-cover bg-center transition-all duration-300 group-hover:scale-105 ring-2 ring-primary" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVPnGGxOJIxwgdOgEtxIrNTMRTnVgxuBtF9KzXgb52OdcC-37B4w_FSod-03tmyCqxWc5gk6MpuuTc3PJlYBuzR3uDmPTl2spKKeUPCvWdsXCtyDQOQu3MLViTfXY653yxFDHGrX9plKckVFGTlLqLfiwleQrzF3qvulVmd_qFhki3dEDzTnJZQNKYVhACVCKqeYxjBEZ9k484Z3_-UUzzq7QerXZrBDTowwKzgQyx8CKnuf4sUj3BdbX1M5riJq2q9sjkjZSsqP7H');"></div>
<div class="absolute inset-0 rounded-full bg-primary/20 opacity-100 flex items-center justify-center">
<span class="material-symbols-outlined text-white text-4xl">check_circle</span>
</div>
</div>
<div>
<p class="font-bold text-primary">GameOn</p>
<p class="text-sm text-muted-light dark:text-muted-dark">Live gaming</p>
</div>
</div>
<div class="group flex flex-col items-center text-center gap-3 cursor-pointer">
<div class="relative w-full aspect-square">
<div class="w-full h-full rounded-full bg-cover bg-center transition-all duration-300 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6H6fkPGNEidpHtJkNeS__vHbDpW8e708MwZzbPt9CJQwOU2RTP-hc0YsY64O72wD98Uvmf0Gdjvg9shkoxpyLZNGhKkfqUu1xO9sEWyb2mLgffOVfRSyjYZgWsvu43lQVL-9mNhLE6V9sSTkgwZr42OrxRkmNiZvP0IrD6UQ4MtgPKOvbuvGuBou9u0iohjqOxmPBqncOfk5KMrCST0Ssn5Pk74CGmMS5vNKipuNDxPBbcOV-LE4InfH71PONTqzbD9ofkjr-0snV');"></div>
<div class="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</div>
<div>
<p class="font-bold text-text-light dark:text-text-dark">MusicLive</p>
<p class="text-sm text-muted-light dark:text-muted-dark">Concerts</p>
</div>
</div>
<div class="group flex flex-col items-center text-center gap-3 cursor-pointer">
<div class="relative w-full aspect-square">
<div class="w-full h-full rounded-full bg-cover bg-center transition-all duration-300 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWthAB6ZzFFaBccJfO3JpOmih-QUGp1IK7RVC2JPk69njQCGwM9hZlY2paOui-MI6lVtYfkQC7pTHby6gATgHFZeAazQuJkd_UQzAdiG5q4efTCuhJyP_j3SPRTXACEhXle1cXHCpbChGW_Q1IruYoQyLGodRGvBEqlH6LCfH0y7ED-nLSkQDDiKJCobo3Cpe7iq8QO_4GiDOIFv8kgkqb0CyEVEzqFmH2dNwBlOmKHsQoInEV5ffuVOdn_cIetlDXxeMpc4SJQlBC');"></div>
<div class="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</div>
<div>
<p class="font-bold text-text-light dark:text-text-dark">NewsNow</p>
<p class="text-sm text-muted-light dark:text-muted-dark">Breaking news</p>
</div>
</div>
<div class="group flex flex-col items-center text-center gap-3 cursor-pointer">
<div class="relative w-full aspect-square">
<div class="w-full h-full rounded-full bg-cover bg-center transition-all duration-300 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_Ji8YDxwwcR2PU7rBZuP4zj9I1iOzd85aQcMLEC3Dfg5alqBArB39hloEVk2OEZiI1jDxYWF3l_u-I3srJ5GRxCSZzo41WMtt8JShqC0EYGMi-iL5Z6bAbMK7LZJ8P4RVh77rtHzKfyuO36aA-ZGiLDZrNEZf7-WIgW2Kmvg8WS6wFH5zZrv9mFuNWziba40ptjQHsovE6tQH69hq8cHkg_2m9FY5-XWWshE3evfltpCsT66VtLCZC5G1ewl2UeCBxDGt2gbdyUjH');"></div>
<div class="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</div>
<div>
<p class="font-bold text-text-light dark:text-text-dark">SportsCentral</p>
<p class="text-sm text-muted-light dark:text-muted-dark">Live sports</p>
</div>
</div>
<div class="group flex flex-col items-center text-center gap-3 cursor-pointer">
<div class="relative w-full aspect-square">
<div class="w-full h-full rounded-full bg-cover bg-center transition-all duration-300 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxS3bW9UKJET4CF6bKmktK-zyGLQEGY_Y2QCvp9DwJchQqtzot_CYPXPzEoHzPhwdvFtGWMcmsYdUzua0Hb5e1D634RL0NT-kF02t0PTY5-Mhfmr3QjYGLcHl3Yp5Q94AwbadgnFaK15lvVSk7H9fNplse4Vd0byj_il-k2HS3rSy8j7OQklAIEFLK7a0SIMO95GT3xIl4zqXyVgY09HHJqu1SPU6R6J7Q9pdHBnXofvdTh-TKKL_iAM8H3BWljR5Ukty_1vUQK5lr');"></div>
<div class="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</div>
<div>
<p class="font-bold text-text-light dark:text-text-dark">EduWorld</p>
<p class="text-sm text-muted-light dark:text-muted-dark">Education</p>
</div>
</div>
</div>
</section>
<section>
<h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Prediction Parameters</h2>
<div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-light dark:border-dark">
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2" for="duration">Prediction Duration</label>
<select class="form-select w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none" id="duration">
<option>Next 7 days</option>
<option>Next 14 days</option>
<option>Next 30 days</option>
</select>
</div>
<div>
<label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2" for="metrics">Metrics to Predict</label>
<select class="form-select w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none" id="metrics">
<option>Viewer Count</option>
<option>Subscriber Growth</option>
<option>Chat Engagement</option>
</select>
</div>
</div>
<div class="mt-8 flex justify-end">
<button class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold tracking-wide shadow-lg shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 focus:ring-offset-surface-light dark:focus:ring-offset-surface-dark transition-all">
<span class="material-symbols-outlined">auto_awesome</span>
<span>Start Prediction</span>
</button>
</div>
</div>
</section>
</div>
</main>
</template>