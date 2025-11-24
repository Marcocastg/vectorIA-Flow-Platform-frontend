<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const predictionData = ref(null);
const platform = ref('Platform');

onMounted(() => {
    if (route.query.data) {
        try {
            predictionData.value = JSON.parse(route.query.data);
            platform.value = route.query.platform || 'Platform';
        } catch (e) {
            console.error("Error parsing data", e);
        }
    }
});

// Computed para formatear los datos
const viewersForecast = computed(() => {
    if (!predictionData.value) return '---';
    // Ajusta las claves según tu JSON de respuesta final (avg_viewers_d30 o prediccion_viewers_30d)
    const val = predictionData.value.avg_viewers_d30 || predictionData.value.prediccion_viewers_30d || 0;
    return val.toLocaleString();
});

const followersForecast = computed(() => {
    if (!predictionData.value) return '---';
    const val = predictionData.value.followers_d30 || predictionData.value.followers_d28 || 0;
    return val.toLocaleString();
});

const growthValue = computed(() => {
    if (!predictionData.value) return 0;
    return predictionData.value.debug_crecimiento || predictionData.value.crecimiento_neto || 0;
});
</script>

<template>
    <div class="flex min-h-screen w-full flex-col">
        <main class="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-5xl">
                
                <div class="mb-8">
                    <div class="flex items-center gap-3 mb-2">
                        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Prediction Report</h1>
                        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-primary/10 text-primary border border-primary/20">
                            {{ platform }}
                        </span>
                    </div>
                    <p class="text-gray-500 dark:text-gray-400 mt-2">
                        Detailed AI analysis based on Voting Regressor ensemble models.
                    </p>
                </div>

                <div class="border-b border-gray-200/80 dark:border-gray-700/50">
                    <nav aria-label="Tabs" class="-mb-px flex space-x-8">
                        <a class="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#">
                            30-Day Forecast
                        </a>
                    </nav>
                </div>

                <!-- AQUÍ ESTABA EL ERROR: Se agregó v-if="predictionData" -->
                <div v-if="predictionData" class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <!-- MAIN CARD: VIEWERS -->
                    <div class="lg:col-span-3 rounded-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/30 dark:bg-black/10 p-6">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Predicted Viewer Count Average</p>
                                <p class="text-4xl font-bold text-gray-900 dark:text-white mt-1">
                                    {{ viewersForecast }}
                                </p>
                                <div class="flex items-center gap-2 mt-2">
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Target for next cycle</p>
                                    <!-- Indicador visual simple -->
                                    <span class="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- CHART VISUALIZATION (Static Placeholder for aesthetic) -->
                        <div class="h-64 mt-4 relative opacity-80">
                            <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 472 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="chart-gradient" x1="236" x2="236" y1="0" y2="150">
                                        <stop stop-color="#5b13ec" stop-opacity="0.3"></stop>
                                        <stop offset="1" stop-color="#5b13ec" stop-opacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path class="chart-gradient" d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25 V 150 H 0 V 109 Z" fill="url(#chart-gradient)"></path>
                                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#5b13ec" stroke-linecap="round" stroke-width="2"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- SECONDARY CARDS -->
                    <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <!-- GROWTH CARD -->
                        <div class="rounded-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/30 dark:bg-black/10 p-6 space-y-4">
                            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Projected Followers</h2>
                            <div class="flex items-end gap-3">
                                <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ followersForecast }}</p>
                                <p class="text-sm font-medium text-green-500 mb-1">
                                    (+{{ growthValue.toLocaleString() }})
                                </p>
                            </div>
                            <p class="text-sm text-gray-600 dark:text-gray-300">
                                Total estimated followers by the end of the prediction period based on current growth momentum.
                            </p>
                        </div>

                        <!-- CONFIDENCE CARD -->
                        <div class="rounded-lg border border-gray-200/80 dark:border-gray-700/50 bg-white/30 dark:bg-black/10 p-6 space-y-4">
                            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Model Confidence</h2>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-base font-medium text-primary">R² Score Reliability</span>
                                    <span class="text-sm font-medium text-primary">~85%</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div class="bg-primary h-2.5 rounded-full" style="width: 85%"></div>
                                </div>
                                <p class="text-xs text-gray-500 mt-3">
                                    Confidence metric derived from Training/Test validation splits during the modeling phase.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State (Si entran directo sin datos) -->
                <div v-else class="text-center py-20 opacity-50">
                    <p>No data found. Please run a prediction first.</p>
                </div>

            </div>
        </main>
    </div>
</template>