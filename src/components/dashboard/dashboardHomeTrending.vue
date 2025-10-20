<script setup>

    import { ref, onMounted, computed, watchEffect } from 'vue';
    const props = defineProps({
        trendingName: {
            type: String, // Esperamos que sea un texto
            default: 'Kick' // Por defecto, no hay nombre de categoría
        }
    });
// 1. ESTADO REACTIVO
// Creamos variables para almacenar los datos, el estado de carga y posibles errores.
    const streamers = ref([]); // Almacenará la lista de streamers que llegue de la API
    const isLoading = ref(true); // Para mostrar un mensaje de "cargando"
    const error = ref(null); // Para mostrar un mensaje de error si la API falla
    const selectedStreamerUuid = ref(null);

    const sortedStreamers = computed(() => {
    if (!streamers.value) return []; // Add a guard for safety
    
    return [...streamers.value].sort((a, b) => {
        // If a or b's followers are null/undefined, treat them as 0
        const ViewersA = a.averageViewers || 0;
        const ViewersB = b.averageViewers || 0;
        return ViewersB - ViewersA;
    }).slice(0,6);
    });
    async function fetchStreamers() {
    try 
    {
        let apiUrl;

        if(props.trendingName === 'Kick'){
            apiUrl = '/api/data-set-kick'
        }else{
            apiUrl = '/api/data-set'
        }

        const response = await fetch(apiUrl); // Changed to your specific endpoint
        
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

    watchEffect(() => {
        fetchStreamers();
    });
</script>
<template>
    <section class="mb-12">
    <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Trending Channels on {{ props.trendingName }}</h2>
    
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
            :style="{ backgroundImage: `url` }"
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
</template>