<script setup>
</script>
<template>
    <div class="flex flex-col p-4 md:px-10">
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group" open="">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">SUPPORT VECTOR MACHINE</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  This model finds the best line or boundary that separates different types of data, helping us classify whether a stream is likely to be successful or not.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">K-NEAREST NEIGHBORS</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  This model classifies data points based on the points that are most similar to it. It's useful for finding streams with similar characteristics.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">XGBOOST</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  A powerful and efficient model that builds decision trees sequentially, with each new tree correcting the errors of the previous one, leading to highly accurate predictions.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">RANDOM FOREST</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  This model creates a 'forest' of many decision trees and merges them together to get a more accurate and stable prediction.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">PROPHET</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  Developed by Facebook, this model is excellent at forecasting time-series data, like predicting future viewership based on past trends and seasonality.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">LINEAR REGRESSION</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  A fundamental statistical model that finds a linear relationship between input features and the output, useful for predicting continuous values like view count.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">NEURAL NETWORKS</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  Inspired by the human brain, these models learn complex patterns in the data through interconnected layers of nodes, allowing for more nuanced and accurate predictions.
                </p>
</details>
<details class="flex flex-col border-t border-b border-y-white/10 dark:border-y-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">DECISION TREE REGRESSION</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  This model uses a tree-like structure of decisions to predict a continuous value. It's easy to interpret and visualizes how a prediction is made.
                </p>
</details>
</div>
</template>