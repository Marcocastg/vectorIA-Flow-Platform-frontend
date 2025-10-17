<script setup>
import ComponentAbout from '@/components/about/componentAbout.vue';
import LineAbout from '@/components/about/lineAbout.vue';
import MeetTheTeamAbout from '@/components/about/meetTheTeamAbout.vue';
import MissionAbout from '@/components/about/missionAbout.vue';
import WhatWeDoAbout from '@/components/about/whatWeDoAbout.vue';

</script>
<template>
<div class="relative flex h-auto w-full flex-col">
    <div class="layout-container flex h-full grow flex-col">
      <div class="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
          <ComponentAbout />
          <MissionAbout />
          <LineAbout />
          <WhatWeDoAbout/>
          <LineAbout/>
          <MeetTheTeamAbout/>
        </div>
      </div>
    </div>
  </div>
</template>