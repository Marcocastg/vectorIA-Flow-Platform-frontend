<script setup>
    const props = defineProps({
        trendingName: {
            type: String, // Esperamos que sea un texto
            default: null // Por defecto, no hay nombre de categoría
        }
    });
</script>
<template>
    <h2 class="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Trending Channels for {{ trendingName }}</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div class="space-y-3">
<div class="w-full aspect-video bg-cover bg-center rounded-xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRc1uuhTb2nW_O39CHan94shtIqSJctg4YDB8hDqDY38vddrgRL9CAfIvIX0F1qumMmaHodHNxq9AutH0t9lFaizS4pyAOJ2m7bbVs6Qfq7zWZJFBULRKK1FqLSuaEGqP3Sww8SK9buWhatSDSzRyrieu4Kijwz6Jc6KKSVjBy8ifKJ1REgvR_KnwafKSzzNdKhBBznbhQRJ_EuHceUUChskXqalFUSIU_r_1WbrGWTfy4wc8o6V8Tzcawzxt05Yjhc_Nz6KH3EJ6d");'></div>
<div>
<p class="font-semibold text-stone-900 dark:text-white">TechTalk Global</p>
<p class="text-sm text-stone-500 dark:text-stone-400">120K viewers</p>
</div>
</div>
<div class="space-y-3">
<div class="w-full aspect-video bg-cover bg-center rounded-xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDljLrRHgEjjzGSlB_Fv3ojQRPJXUI-vv_NilBCMt1FAu9qG2wtq7Y_Fah4L-LDgj69N2IUBO1NVx3DDZ5c4b-9GJ5T4B9Ox471m00Q-NkDjpM1m_yoOQ3-d4OpBiRSmBykWmsGYM4UR9fa7Zk7wmk4lxD8QcsDw0d6y85OCBzr5igNbcnRVhRENN_mper9Exz9KvHKT-prpMVdoYZ96FshuHpYi2sFWh4ToproJ_do3C0Oc6JBSXZC06nErEIl1CQuyzCus-8t8DU3");'></div>
<div>
<p class="font-semibold text-stone-900 dark:text-white">GameOn Championship</p>
<p class="text-sm text-stone-500 dark:text-stone-400">95K viewers</p>
</div>
</div>
<div class="space-y-3">
<div class="w-full aspect-video bg-cover bg-center rounded-xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuqfgjHn9w1CP492zj6hgV8trU-1g6O2s5riemLbCPiRECTiAf3LAmcQG71R8kEN64CAM7SJhU0osJxudP5nsdsI8F8MGXEjEKGFHzSaXGPUZHZZTDRoHPsikCR9S_U7AIrsnOO6uA1qhZ6XOIaVIE59UqAl0cYnSQIhNBtEdJNh2xb-3oQOeOcVBTtRZQL5es8yvpBSgrR9sr5FgPJ7yIS82R2JGeN2a_gYL3Ovm-zUOssqXG_ZEHBBpOjYl4qChfGoY-yaCCd5gC");'></div>
<div>
<p class="font-semibold text-stone-900 dark:text-white">LiveBeats Concert</p>
<p class="text-sm text-stone-500 dark:text-stone-400">80K viewers</p>
</div>
</div>
<div class="space-y-3">
<div class="w-full aspect-video bg-cover bg-center rounded-xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQwaLorZEhoDKAav2xv2IRAay-SkG5J3dF92gn2RAU3Tx_Cu8j-HRfuOhcVCl_mruVaZmSNM8WZlgKs9ydBbwYliRE51aD_lBIXtV8suVeOttRXHHFgUdkzsWQYGisJdsEYczXMZWri_GhOzfMLvVx8TLVWciEUKq7obOiaenAyNRjUgSBYt2P-73Q05OCJB55ItDY2oAOhy4UIOfZQXM7MzbTTjh9JocqMi25XVehqCzuM0S1nKDJwaiCmjo7_HqpKLzQJVH5Cwrp");'></div>
<div>
<p class="font-semibold text-stone-900 dark:text-white">Culinary Creations</p>
<p class="text-sm text-stone-500 dark:text-stone-400">65K viewers</p>
</div>
</div>
</div>
</template>