<script setup>
import LineAbout from '../about/lineAbout.vue';
import DashboardHomePredictions from './dashboardHomePredictions.vue';
import DashboardHomeTrending from './dashboardHomeTrending.vue';

</script>

<template>
  <div> <header class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-stone-900 dark:text-white">Dashboard</h1>
      <button class="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
        Make New Prediction
      </button>
    </header>
    <section class="mb-12">
      <DashboardHomeTrending trendingName="Twitch"/>
      <LineAbout/>
      <DashboardHomeTrending trendingName="Kick"/></section>
    <section>
        <LineAbout/>
      <DashboardHomePredictions/></section>
  </div>
</template>