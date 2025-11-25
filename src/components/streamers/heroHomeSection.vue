<script setup>
</script>
<template>
    <section class="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20 md-py-32">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://ik.imagekit.io/mcgonza/background1.png')"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/50 to-transparent dark:from-background-dark dark:via-background-dark/50"></div>
    
    <div class="relative z-10 mx-auto max-w-4xl px-4 text-center">
      <h1 class="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl md:text-6xl">Predict the Future of Live Streams</h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">Harness the power of machine learning to forecast viewership trends and optimize your streaming strategy.</p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <RouterLink to="/login" class="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105" href="#">Get Started</RouterLink>
        <RouterLink to="/about" class="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-background-light px-8 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-background-dark dark:text-gray-300 dark:hover:bg-gray-800" href="#">Learn More</RouterLink>
      </div>
    </div>
  </section>
</template>
