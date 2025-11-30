<script setup>
</script>
<template>
    <div class="flex flex-col p-4 md:px-10">
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group" open="">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">RIDGE REGRESSION</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  A linear regression variant that adds regularization to prevent overfitting. It performs well with correlated features and provides stable predictions for continuous values.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">K-NEAREST NEIGHBORS</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  This model classifies data points based on the points that are most similar to it. It's useful for finding streams with similar characteristics and making predictions based on nearest neighbors.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">ELASTIC NET</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  Combines Ridge and Lasso regression, providing both L1 and L2 regularization. Excellent for handling high-dimensional data and preventing overfitting while maintaining interpretability.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">DECISION TREE</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  Uses a tree-like structure of decisions to make predictions. Easy to interpret and visualize how decisions are made, useful for both classification and regression tasks.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">GRADIENT BOOSTING</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  Builds an ensemble of weak decision trees sequentially, with each tree correcting the errors of the previous ones. Provides high accuracy and is robust against overfitting.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">XGBOOST</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  An optimized and scalable implementation of gradient boosting. Highly efficient, handles missing data well, and delivers superior predictive performance on complex datasets.
                </p>
</details>
<details class="flex flex-col border-t border-t-white/10 dark:border-t-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">RANDOM FOREST</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  Creates a 'forest' of many decision trees and merges their predictions together. Provides robust and accurate predictions while reducing overfitting through ensemble methods.
                </p>
</details>
<details class="flex flex-col border-t border-b border-y-white/10 dark:border-y-[#433b54] py-2 group">
<summary class="flex cursor-pointer items-center justify-between gap-6 py-4 list-none">
<p class="text-black dark:text-white text-sm font-medium leading-normal">LIGHTGBM</p>
<span class="material-symbols-outlined text-black dark:text-white group-open:rotate-180 transition-transform">expand_more</span>
</summary>
<p class="text-gray-600 dark:text-[#a69db9] text-sm font-normal leading-normal pb-2">
                  A fast, distributed, and efficient gradient boosting framework. Handles large datasets quickly with lower memory usage while maintaining excellent prediction accuracy.
                </p>
</details>
</div>
</template>