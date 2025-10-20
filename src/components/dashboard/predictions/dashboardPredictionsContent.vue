<script setup>
    import { ref, onMounted, computed } from 'vue';

// 1. ESTADO REACTIVO
// Creamos variables para almacenar los datos, el estado de carga y posibles errores.
const streamersKick = ref([]); // Almacenará la lista de streamers que llegue de la API
const isLoading = ref(true); // Para mostrar un mensaje de "cargando"
const error = ref(null); // Para mostrar un mensaje de error si la API falla

const sortedStreamers = computed(() => {
  if (!streamersKick.value) return []; // Add a guard for safety
  
  return [...streamersKick.value].sort((a, b) => {
    // If a or b's followers are null/undefined, treat them as 0
    const ViewersA = a.averageViewers || 0;
    const ViewersB = b.averageViewers || 0;
    return ViewersB - ViewersA;
  }).slice(0,6);
});
async function fetchStreamers() {
  try {
    const response = await fetch('/api/data-set-kick'); // Changed to your specific endpoint
    
    if (!response.ok) {
      throw new Error('Failed to fetch streamer data.');
    }
    
    const responseData = await response.json();
    
    // CAMBIO 1: Accedemos al array dentro de `data._value`
    streamersKick.value = responseData.data._value; 

    
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchStreamers();
});
</script>
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
    
    <div v-if="isLoading" class="text-center text-muted-light dark:text-muted-dark">Cargando canales...</div>
    <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      
      <div 
        v-for="streamer in sortedStreamers" 
        :key="streamer.uuid" 
        class="group flex flex-col items-center text-center gap-3 cursor-pointer"
        @click="selectedStreamerUuid = streamer.uuid"
      >
        <div class="relative w-full aspect-square">
          <div 
            class="w-full h-full rounded-full bg-cover bg-center transition-all duration-300 group-hover:scale-105" 
            :class="{ 'ring-2 ring-primary': selectedStreamerUuid === streamer.uuid }"
            :style="{ backgroundImage: `url(${streamer.channelPfp})` }"
          ></div>
          
          <div v-if="selectedStreamerUuid === streamer.uuid" class="absolute inset-0 rounded-full bg-primary/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-white text-4xl">check_circle</span>
          </div>
          <div v-else class="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div>
          <p class="font-bold" :class="selectedStreamerUuid === streamer.uuid ? 'text-primary' : 'text-text-light dark:text-text-dark'">
            {{ streamer.channelName }}
          </p>
          <p class="text-sm text-muted-light dark:text-muted-dark">Avg. Viewers: 
            {{ streamer.averageViewers }}
          </p>
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