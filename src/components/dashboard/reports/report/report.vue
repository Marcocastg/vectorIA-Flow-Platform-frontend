<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios'; 

const route = useRoute();
const predictionData = ref(null);
const platform = ref('Platform');

// Estado para Gemini
const aiAnalysis = ref('');
const loadingAI = ref(false);

// URL de tu Backend NestJS
const API_URL = "https://supporting-prue-marcocastg-4919b58b.koyeb.app/api";

onMounted(async () => {
    if (route.query.data) {
        try {
            predictionData.value = JSON.parse(route.query.data);
            platform.value = route.query.platform || 'Platform';
            
            // --- LLAMADA A GEMINI ---
            await fetchAIAnalysis();

        } catch (e) {
            console.error("Error parsing data", e);
        }
    }
});

// Función para pedirle el texto a NestJS
const fetchAIAnalysis = async () => {
    if (!predictionData.value) return;
    
    loadingAI.value = true;
    
    // Preparamos los datos limpios para el prompt
    const metrics = {
        currentFollowers: (predictionData.value.followers_d30 || predictionData.value.followers_d28) - (predictionData.value.debug_crecimiento || predictionData.value.crecimiento_neto || 0),
        growthPrediction: predictionData.value.debug_crecimiento || predictionData.value.crecimiento_neto || 0,
        viewersPrediction: predictionData.value.avg_viewers_d30 || predictionData.value.prediccion_viewers_30d || 0
    };

    try {
        const res = await axios.post(`${API_URL}/predictions/analyze`, {
            platform: platform.value,
            metrics: metrics
        });
        aiAnalysis.value = res.data.analysis;
    } catch (error) {
        console.error("Error fetching AI analysis", error);
        aiAnalysis.value = "No se pudo generar el análisis detallado.";
    } finally {
        loadingAI.value = false;
    }
};

// Computed para formatear los datos
const followersForecast = computed(() => {
    if (!predictionData.value) return '---';
    const val = predictionData.value.followers_d30 || predictionData.value.followers_d28 || 0;
    return val.toLocaleString();
});

const viewersForecast = computed(() => {
    if (!predictionData.value) return '---';
    const val = predictionData.value.avg_viewers_d30 || predictionData.value.prediccion_viewers_30d || 0;
    return val.toLocaleString();
});

const growthValue = computed(() => {
    if (!predictionData.value) return 0;
    return predictionData.value.debug_crecimiento || predictionData.value.crecimiento_neto || 0;
});

// Lógica del gráfico
const chartType = ref('followers');
const chartPoints = computed(() => {
    if (!predictionData.value) return [];
    const d = predictionData.value;
    const isTwitch = platform.value === 'twitch';

    if (chartType.value === 'followers') {
        if (isTwitch) {
            return [
                { label: 'Day 1', val: d.followers_d1 || 0 },
                { label: 'Day 14', val: d.followers_d14 || 0 },
                { label: 'Day 30 (Pred)', val: d.followers_d30 || 0 }
            ];
        } else {
            return [
                { label: 'Day 14', val: d.FOLLOWERS_D14 || 0 },
                { label: 'Day 21', val: d.FOLLOWERS_D21 || 0 },
                { label: 'Day 28 (Pred)', val: d.followers_d28 || 0 }
            ];
        }
    } else {
        if (isTwitch) {
            return [
                { label: 'Day 1', val: d.avgViewers_d1 || 0 },
                { label: 'Day 14', val: d.avgViewers_d14 || 0 },
                { label: 'Day 30 (Pred)', val: d.avg_viewers_d30 || 0 }
            ];
        } else {
            return [
                { label: 'Day 1', val: d.AVG_VIEWERS_D1 || 0 },
                { label: 'Day 14', val: d.AVG_VIEWERS_D14 || 0 },
                { label: 'Day 30 (Pred)', val: d.prediccion_viewers_30d || 0 }
            ];
        }
    }
});

const svgPath = computed(() => {
    const points = chartPoints.value;
    if (points.length === 0) return '';
    const width = 472;
    const height = 150;
    const padding = 20;
    const values = points.map(p => p.val);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;
    const getY = (val) => height - padding - ((val - minVal) / range) * (height - 2 * padding);
    
    const p1 = { x: 0, y: getY(values[0]) };
    const p2 = { x: width / 2, y: getY(values[1]) };
    const p3 = { x: width, y: getY(values[2]) };
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`;
});

const growthPercentage = computed(() => {
    const points = chartPoints.value;
    if (!points.length) return 0;
    const start = points[0].val;
    const end = points[2].val;
    if (start === 0) return 0;
    return Math.round(((end - start) / start) * 100);
});
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <main class="flex flex-1 justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-5xl">
                
                <!-- BLOQUE DE RESULTADOS (v-if) -->
                <div v-if="predictionData">
                    <!-- Header -->
                    <div class="mb-10 text-center sm:text-left">
                        <div class="inline-flex items-center gap-3 mb-2">
                            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Prediction Report</h1>
                            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase border"
                                :class="platform === 'twitch' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-green-100 text-green-800 border-green-200'">
                                {{ platform }}
                            </span>
                        </div>
                        <p class="text-gray-500 dark:text-gray-400 text-lg">
                            AI-driven forecast based on historical trends.
                        </p>
                    </div>

                    <!-- Pestañas del Gráfico -->
                    <div class="border-b border-gray-200/80 dark:border-gray-700/50 mb-6">
                        <nav class="-mb-px flex space-x-8">
                            <button 
                                @click="chartType = 'followers'"
                                :class="chartType === 'followers' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
                                class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                            >
                                Followers Trend
                            </button>
                            <button 
                                @click="chartType = 'viewers'"
                                :class="chartType === 'viewers' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
                                class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                            >
                                Viewers Trend
                            </button>
                        </nav>
                    </div>

                    <!-- Gráficos y Cards -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <!-- Gráfico Principal -->
                        <div class="lg:col-span-3 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-[#1a1a1a] p-6 shadow-lg">
                            <div class="flex justify-between items-start mb-6">
                                <div>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        {{ chartType === 'followers' ? 'Total Followers' : 'Average Viewers' }}
                                    </p>
                                    <p class="text-4xl font-black text-gray-900 dark:text-white mt-1">
                                        {{ chartPoints[2]?.val.toLocaleString() }}
                                    </p>
                                    <div class="flex items-center gap-2 mt-2">
                                        <span :class="growthPercentage >= 0 ? 'text-green-500' : 'text-red-500'" class="font-bold text-sm">
                                            {{ growthPercentage > 0 ? '+' : '' }}{{ growthPercentage }}%
                                        </span>
                                        <span class="text-sm text-gray-400">growth in this period</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- SVG -->
                            <div class="h-64 w-full relative bg-gray-50 dark:bg-black/20 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
                                <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 472 150">
                                    <defs>
                                        <linearGradient id="line-gradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" :stop-color="platform==='twitch' ? '#9146FF' : '#53FC18'" stop-opacity="0.2"/>
                                            <stop offset="100%" :stop-color="platform==='twitch' ? '#9146FF' : '#53FC18'" stop-opacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    <path 
                                        :d="svgPath" 
                                        fill="none" 
                                        :stroke="platform==='twitch' ? '#9146FF' : '#53FC18'" 
                                        stroke-width="3" 
                                        vector-effect="non-scaling-stroke"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <circle v-for="(p, i) in chartPoints" :key="i"
                                        :cx="i * 236" 
                                        :cy="150 - 20 - ((p.val - Math.min(...chartPoints.map(x=>x.val))) / (Math.max(...chartPoints.map(x=>x.val)) - Math.min(...chartPoints.map(x=>x.val)) || 1)) * (150 - 40)"
                                        r="6" 
                                        :fill="platform==='twitch' ? '#9146FF' : '#53FC18'" 
                                        stroke="white" stroke-width="2"
                                        class="transition-all duration-500"
                                    />
                                </svg>
                                <!-- Eje X -->
                                <div class="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 px-2 transform translate-y-6">
                                    <div class="text-center" v-for="(p, i) in chartPoints" :key="i" :class="{'text-left': i===0, 'text-right': i===2}">
                                        <div class="font-bold">{{ p.label }}</div>
                                        <div class="font-mono">{{ p.val.toLocaleString() }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-6"></div>
                        </div>

                        <!-- Gemini Summary -->
                        <div class="lg:col-span-2 rounded-2xl border border-purple-200/50 dark:border-purple-900/30 bg-gradient-to-br from-white to-purple-50/50 dark:from-[#1a1a1a] dark:to-[#25103f] p-8 shadow-lg relative overflow-hidden">
                            <div class="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10">
                                <span class="material-symbols-outlined text-8xl">psychology</span>
                            </div>
                            <div class="relative z-10">
                                <div class="flex items-center gap-2 mb-6">
                                    <span class="material-symbols-outlined text-purple-600 text-2xl animate-pulse">auto_awesome</span>
                                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">AI Strategic Analysis</h2>
                                </div>
                                <!-- Skeleton -->
                                <div v-if="loadingAI" class="space-y-3 animate-pulse">
                                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                    <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
                                </div>
                                <!-- Contenido -->
                                <div v-else class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                                    {{ aiAnalysis }}
                                </div>
                            </div>
                        </div>

                        <!-- Confidence -->
                        <div class="rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-[#1a1a1a] p-6 shadow-lg flex flex-col justify-center">
                            <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Model Confidence</h2>
                            <p class="text-sm text-gray-500 mb-4">Based on Voting Regressor validation</p>
                            <div class="flex justify-between mb-1">
                                <span class="text-sm font-medium text-primary">Reliability</span>
                                <span class="text-sm font-bold text-primary">~85%</span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div class="bg-primary h-2.5 rounded-full" style="width: 85%"></div>
                            </div>
                        </div>

                    </div>
                </div>
                
                <!-- BLOQUE EMPTY STATE (v-else) -->
                <div v-else class="text-center py-20 opacity-50">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">analytics</span>
                    <p class="text-xl font-bold text-gray-400">No prediction data found</p>
                    <button @click="$router.push({ name: 'dashboardPredictions' })" class="mt-4 text-primary hover:underline font-medium">
                        Go back to calculator
                    </button>
                </div>

            </div>
        </main>
    </div>
</template>