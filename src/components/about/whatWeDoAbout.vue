<script setup></script>
<template>
    <div class="flex flex-col gap-10 px-4 py-10 @container">
    <div class="flex flex-col gap-4">
      <h1 class="text-black dark:text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
        What We Do
      </h1>
      <p class="text-gray-700 dark:text-[#E0E0E0] text-base font-normal leading-normal max-w-[720px]">
        We provide livestream statistics and machine learning-powered predictions to help you get a insight about the future and make informed decisions.
      </p>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
      <div class="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] p-4 flex-col">
        <span class="material-symbols-outlined text-primary" style="font-size: 28px;">analytics</span>
        <div class="flex flex-col gap-1">
          <h2 class="text-black dark:text-white text-base font-bold leading-tight">Streaming Analytics</h2>
          <p class="text-gray-600 dark:text-[#A0A0A0] text-sm font-normal leading-normal">Track your favorite's streams performance with up-to-the-day data on viewership, engagement, and more.</p>
        </div>
      </div>
      <div class="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] p-4 flex-col">
        <span class="material-symbols-outlined text-primary" style="font-size: 28px;">model_training</span>
        <div class="flex flex-col gap-1">
          <h2 class="text-black dark:text-white text-base font-bold leading-tight">Predictive Insights</h2>
          <p class="text-gray-600 dark:text-[#A0A0A0] text-sm font-normal leading-normal">Leverage our machine learning models to forecast trends and optimize your content strategy.</p>
        </div>
      </div>
      <div class="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] p-4 flex-col">
        <span class="material-symbols-outlined text-primary" style="font-size: 28px;">groups</span>
        <div class="flex flex-col gap-1">
          <h2 class="text-black dark:text-white text-base font-bold leading-tight">Community Focused</h2>
          <p class="text-gray-600 dark:text-[#A0A0A0] text-sm font-normal leading-normal">
            We are committed to building a supportive community and providing tools that benefit everyone in the streaming ecosystem.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>