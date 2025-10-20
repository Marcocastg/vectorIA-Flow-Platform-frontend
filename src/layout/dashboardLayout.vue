<script setup>
import SideBarUser from '@/components/dashboard/sideBarUser.vue';

</script>

<template>
  <div class="flex min-h-screen">
    <SideBarUser />
    <main class="flex-1 p-8 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>