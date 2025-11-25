<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const predictionData = ref(null);
const platform = ref('Platform');

// Estado del gráfico
const chartType = ref('followers'); // 'followers' | 'viewers'

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

// --- PROCESAMIENTO DE DATOS PARA EL GRÁFICO ---
const chartPoints = computed(() => {
    if (!predictionData.value) return [];
    const d = predictionData.value;
    const isTwitch = platform.value === 'twitch';

    if (chartType.value === 'followers') {
        // TWITCH: D1 -> D14 -> D30
        if (isTwitch) {
            return [
                { label: 'Day 1', val: d.followers_d1 || 0 },
                { label: 'Day 14', val: d.followers_d14 || 0 },
                { label: 'Day 30 (Pred)', val: d.followers_d30 || 0 }
            ];
        } 
        // KICK: D14 -> D21 -> D28
        else {
            return [
                { label: 'Day 14', val: d.FOLLOWERS_D14 || 0 },
                { label: 'Day 21', val: d.FOLLOWERS_D21 || 0 },
                { label: 'Day 28 (Pred)', val: d.followers_d28 || 0 }
            ];
        }
    } else {
        // VIEWERS (Similar logic)
        if (isTwitch) {
            return [
                { label: 'Day 1', val: d.avgViewers_d1 || 0 },
                { label: 'Day 14', val: d.avgViewers_d14 || 0 },
                { label: 'Day 30 (Pred)', val: d.avg_viewers_d30 || 0 }
            ];
        } else {
            // KICK Viewers: D1 -> D14 -> D30 (Pred)
            // Nota: En Kick también predecimos D30 para viewers
            return [
                { label: 'Day 1', val: d.AVG_VIEWERS_D1 || 0 },
                { label: 'Day 14', val: d.AVG_VIEWERS_D14 || 0 },
                { label: 'Day 30 (Pred)', val: d.prediccion_viewers_30d || 0 }
            ];
        }
    }
});

// --- LÓGICA DE DIBUJO SVG ---
const svgPath = computed(() => {
    const points = chartPoints.value;
    if (points.length === 0) return '';

    const width = 472;
    const height = 150;
    const padding = 20;
    
    const values = points.map(p => p.val);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1; // Evitar división por 0

    // Convertir valores a coordenadas Y (invertido porque SVG 0 está arriba)
    // Escalamos para que quepa entre padding
    const getY = (val) => height - padding - ((val - minVal) / range) * (height - 2 * padding);
    
    // Coordenadas X fijas (0%, 50%, 100%)
    const p1 = { x: 0, y: getY(values[0]) };
    const p2 = { x: width / 2, y: getY(values[1]) };
    const p3 = { x: width, y: getY(values[2]) };

    // Curva de Bézier simple o línea recta
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

// --- COMPUTEDS PARA TARJETAS ---
const followersForecast = computed(() => {
    if (!predictionData.value) return '---';
    const val = predictionData.value.followers_d30 || predictionData.value.followers_d28 || 0;
    return Math.round(val).toLocaleString();
});

const viewersForecast = computed(() => {
    if (!predictionData.value) return '---';
    const val = predictionData.value.avg_viewers_d30 || predictionData.value.prediccion_viewers_30d || 0;
    return Math.round(val).toLocaleString();
});

const growthValue = computed(() => {
    if (!predictionData.value) return 0;
    return predictionData.value.debug_crecimiento || predictionData.value.crecimiento_neto || 0;
});
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        <main class="flex flex-1 justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-5xl">
                
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
                            AI-driven forecast for {{ chartPoints[2]?.label }} based on historical trends.
                        </p>
                    </div>

                    <!-- PESTAÑAS DEL GRÁFICO -->
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

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <!-- GRÁFICO PRINCIPAL -->
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
                            
                            <!-- SVG CHART DINÁMICO -->
                            <div class="h-64 w-full relative bg-gray-50 dark:bg-black/20 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
                                <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 472 150">
                                    <!-- Gradient Definition -->
                                    <defs>
                                        <linearGradient id="line-gradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" :stop-color="platform==='twitch' ? '#9146FF' : '#53FC18'" stop-opacity="0.2"/>
                                            <stop offset="100%" :stop-color="platform==='twitch' ? '#9146FF' : '#53FC18'" stop-opacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    
                                    <!-- Line Path -->
                                    <path 
                                        :d="svgPath" 
                                        fill="none" 
                                        :stroke="platform==='twitch' ? '#9146FF' : '#53FC18'" 
                                        stroke-width="3" 
                                        vector-effect="non-scaling-stroke"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    
                                    <!-- Data Points -->
                                    <circle v-for="(p, i) in chartPoints" :key="i"
                                        :cx="i * 236" 
                                        :cy="150 - 20 - ((p.val - Math.min(...chartPoints.map(x=>x.val))) / (Math.max(...chartPoints.map(x=>x.val)) - Math.min(...chartPoints.map(x=>x.val)) || 1)) * (150 - 40)"
                                        r="6" 
                                        :fill="platform==='twitch' ? '#9146FF' : '#53FC18'" 
                                        stroke="white" stroke-width="2"
                                        class="transition-all duration-500"
                                    />
                                </svg>

                                <!-- Eje X Labels (Manual positioning based on viewBox width 472) -->
                                <div class="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 px-2 transform translate-y-6">
                                    <div class="text-center" v-for="(p, i) in chartPoints" :key="i" :class="{'text-left': i===0, 'text-right': i===2}">
                                        <div class="font-bold">{{ p.label }}</div>
                                        <div class="font-mono">{{ p.val.toLocaleString() }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-6"></div> <!-- Spacer for labels -->
                        </div>

                        <!-- STAT CARDS -->
                        <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-[#1a1a1a] p-6 shadow-lg">
                                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Summary</h2>
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span class="text-gray-500">Predicted Followers</span>
                                        <span class="font-bold text-gray-900 dark:text-white">{{ followersForecast }}</span>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span class="text-gray-500">Predicted Avg Viewers</span>
                                        <span class="font-bold text-gray-900 dark:text-white">{{ viewersForecast }}</span>
                                    </div>
                                    <div class="flex justify-between items-center pt-1">
                                        <span class="text-gray-500">Net Growth</span>
                                        <span class="font-bold text-green-500">+{{ parseInt(growthValue).toLocaleString() }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-[#1a1a1a] p-6 shadow-lg">
                                <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">AI Confidence</h2>
                                <p class="text-sm text-gray-500 mb-4">Based on R² validation score (Voting Regressor)</p>
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
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-20">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">analytics</span>
                    <h3 class="text-xl font-bold text-gray-400">No prediction data found</h3>
                    <button @click="$router.push('/dashboard/predictions')" class="mt-4 text-primary hover:underline">
                        Go back to calculator
                    </button>
                </div>

            </div>
        </main>
    </div>
</template>