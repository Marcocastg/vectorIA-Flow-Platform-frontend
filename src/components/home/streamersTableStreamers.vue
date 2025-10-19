<script setup>
import { ref, onMounted, computed } from 'vue';

// 1. ESTADO REACTIVO
// Creamos variables para almacenar los datos, el estado de carga y posibles errores.
const streamers = ref([]); // Almacenará la lista de streamers que llegue de la API
const isLoading = ref(true); // Para mostrar un mensaje de "cargando"
const error = ref(null); // Para mostrar un mensaje de error si la API falla

const sortedStreamers = computed(() => {
  if (!streamers.value) return []; // Add a guard for safety
  
  return [...streamers.value].sort((a, b) => {
    // If a or b's followers are null/undefined, treat them as 0
    const followersA = a.followers || 0;
    const followersB = b.followers || 0;
    return followersB - followersA;
  });
});
async function fetchStreamers() {
  try {
    const response = await fetch('/api/channel'); // Changed to your specific endpoint
    
    if (!response.ok) {
      throw new Error('Failed to fetch streamer data.');
    }
    
    const responseData = await response.json();
    
    // CAMBIO 1: Accedemos al array dentro de `data._value`
    streamers.value = responseData.data._value; 
    
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
    <div class="flex flex-col md:flex-row items-center gap-4">
</div>
<div class="overflow-x-auto bg-white dark:bg-background-dark/50 rounded-lg border border-gray-200/80 dark:border-gray-50/10">
<table class="w-full text-sm text-left">
<thead class="bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wider">
<tr>
<th class="px-6 py-3" scope="col">Streamer</th>
<th class="px-6 py-3" scope="col">Platform</th>
<th class="px-6 py-3 text-right" scope="col">Followers</th>
</tr>
</thead>
<tbody class="divide-y divide-gray-200/80 dark:divide-gray-50/10">
    <tr v-if="isLoading">
          <td colspan="3" class="text-center px-6 py-4 text-gray-500 dark:text-gray-400">
            Loading streamers...
          </td>
        </tr>
    <tr v-else-if="error">
          <td colspan="3" class="text-center px-6 py-4 text-red-500">
            Error: {{ error }}
          </td>
    </tr>
<tr v-else v-for="streamer in sortedStreamers" :key="streamer.uuid" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
<td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{{ streamer.name }}</td>
<td class="flex items-center gap-1 px-6 py-4 text-gray-500 dark:text-gray-400"><img :src="streamer.platform.logoUrl" class="h-[1em]"/>{{streamer.platform.name}}</td>
<td class="px-6 py-4 text-right text-gray-500 dark:text-gray-400">{{ streamer.followers }}</td>
</tr>
<tr v-if="!isLoading && !error && streamers.length === 0">
           <td colspan="3" class="text-center px-6 py-4 text-gray-500 dark:text-gray-400">
            No streamers found.
          </td>
</tr>
</tbody>
</table>
</div>
</template>