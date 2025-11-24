<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// --- CONFIGURACIÓN ---
// Cambia esto si tu backend tiene otra URL base
const API_URL = 'http://localhost:3000/api';

// --- ESTADO ---
const platform = ref('twitch'); // 'twitch' | 'kick'
const isLoading = ref(false);
const error = ref(null);

// Datos del Formulario (Twitch)
const formTwitch = reactive({
    avgViewers_d1: '',
    minutesStreamed_d1: '',
    followers_d1: '',
    avgViewers_d14: '',
    minutesStreamed_d14: '',
    followers_d14: '',
    comments_most_viewed: '',
    comments_least_viewed: ''
});

// Datos del Formulario (Kick)
const formKick = reactive({
    AVG_VIEWERS_D1: '',
    HOURS_STREAMED_D1: '',
    AVG_VIEWERS_D14: '',
    HOURS_STREAMED_D14: '',
    FOLLOWERS_D14: '',
    FOLLOWERS_D21: ''
});

// --- ACCIÓN: PREDECIR ---
const handlePredict = async () => {
    isLoading.value = true;
    error.value = null;

    try {
        const payload = platform.value === 'twitch' ? { ...formTwitch } : { ...formKick };

        // Convertir a números
        for (const key in payload) {
            payload[key] = Number(payload[key]);
        }

        // Llamada al Backend NestJS -> Python
        const response = await axios.post(`${API_URL}/predictions`, payload, {
            params: { platform: platform.value }
        });

        if (response.data.status === 'success') {
            // Redirigir a la vista de reporte con los resultados
            // Pasamos los resultados como query params (o podrías usar Pinia/Store)
            router.push({
                name: 'reports', // Asegúrate de que tu ruta se llame 'report' en router/index.js
                query: {
                    data: JSON.stringify(response.data.prediccion),
                    platform: platform.value
                }
            });
        }
    } catch (err) {
        console.error(err);
        error.value = err.response?.data?.message || "Error al conectar con el servidor de predicción.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="max-w-4xl mx-auto">
            
            <!-- HEADER -->
            <div class="mb-8 text-center">
                <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark mb-2">
                    Predict Channel Popularity
                </h1>
                <p class="text-muted-light dark:text-muted-dark">
                    Powered by AI Ensemble Models (Voting Regressor)
                </p>
            </div>

            <!-- PLATFORM TABS -->
            <div class="flex justify-center gap-4 mb-8">
                <button 
                    @click="platform = 'twitch'"
                    class="px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2"
                    :class="platform === 'twitch' 
                        ? 'bg-[#9146FF] text-white shadow-lg shadow-purple-500/30 scale-105' 
                        : 'bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border border-light dark:border-dark hover:border-[#9146FF]'"
                >
                    <i class="fab fa-twitch"></i> Twitch
                </button>
                <button 
                    @click="platform = 'kick'"
                    class="px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2"
                    :class="platform === 'kick' 
                        ? 'bg-[#53FC18] text-black shadow-lg shadow-green-500/30 scale-105' 
                        : 'bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark border border-light dark:border-dark hover:border-[#53FC18]'"
                >
                    <div class="w-4 h-4 bg-current rounded-sm font-black text-xs flex items-center justify-center">K</div> Kick
                </button>
            </div>

            <!-- FORMULARIO -->
            <section class="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl border border-light dark:border-dark shadow-xl shadow-black/5">
                
                <h2 class="text-xl font-bold text-text-light dark:text-text-dark mb-6 border-b border-light dark:border-dark pb-4">
                    Input Data Points
                </h2>

                <form @submit.prevent="handlePredict">
                    
                    <!-- FORMULARIO TWITCH -->
                    <div v-if="platform === 'twitch'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <!-- Día 1 (Inicio) -->
                        <div class="space-y-4">
                            <h3 class="text-sm font-bold text-primary uppercase tracking-wider">Day 1 (Start)</h3>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Avg Viewers</label>
                                <input v-model="formTwitch.avgViewers_d1" required type="number" placeholder="e.g. 150" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Followers</label>
                                <input v-model="formTwitch.followers_d1" required type="number" placeholder="e.g. 5000" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Minutes Streamed</label>
                                <input v-model="formTwitch.minutesStreamed_d1" required type="number" placeholder="e.g. 2000" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                            </div>
                        </div>

                        <!-- Día 14 (Mitad) -->
                        <div class="space-y-4">
                            <h3 class="text-sm font-bold text-primary uppercase tracking-wider">Day 14 (Mid)</h3>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Avg Viewers</label>
                                <input v-model="formTwitch.avgViewers_d14" required type="number" placeholder="e.g. 180" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Followers</label>
                                <input v-model="formTwitch.followers_d14" required type="number" placeholder="e.g. 5200" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Minutes Streamed</label>
                                <input v-model="formTwitch.minutesStreamed_d14" required type="number" placeholder="e.g. 2500" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                            </div>
                        </div>

                        <!-- Interacciones -->
                        <div class="md:col-span-2 space-y-4 border-t border-light dark:border-dark pt-6 mt-2">
                            <h3 class="text-sm font-bold text-primary uppercase tracking-wider">Interactions (VOD Comments)</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Comments (Most Viewed VOD)</label>
                                    <input v-model="formTwitch.comments_most_viewed" required type="number" placeholder="e.g. 50" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Comments (Least Viewed VOD)</label>
                                    <input v-model="formTwitch.comments_least_viewed" required type="number" placeholder="e.g. 5" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- FORMULARIO KICK -->
                    <div v-if="platform === 'kick'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div class="space-y-4">
                            <h3 class="text-sm font-bold text-green-500 uppercase tracking-wider">Initial Metrics</h3>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Avg Viewers (D1)</label>
                                <input v-model="formKick.AVG_VIEWERS_D1" required type="number" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Hours Streamed (D1)</label>
                                <input v-model="formKick.HOURS_STREAMED_D1" required type="number" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-sm font-bold text-green-500 uppercase tracking-wider">Growth Metrics</h3>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Avg Viewers (D14)</label>
                                <input v-model="formKick.AVG_VIEWERS_D14" required type="number" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Followers (D14)</label>
                                <input v-model="formKick.FOLLOWERS_D14" required type="number" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Followers (D21)</label>
                                <input v-model="formKick.FOLLOWERS_D21" required type="number" class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-white dark:bg-black/20 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                        </div>
                    </div>

                    <!-- BOTÓN DE ACCIÓN -->
                    <div class="mt-10 flex flex-col items-center gap-4">
                        <p v-if="error" class="text-red-500 font-medium bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">{{ error }}</p>
                        
                        <button 
                            type="submit" 
                            :disabled="isLoading"
                            class="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg tracking-wide shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <span v-if="isLoading" class="material-symbols-outlined animate-spin">progress_activity</span>
                            <span v-else class="material-symbols-outlined">auto_awesome</span>
                            <span>{{ isLoading ? 'Analyzing...' : 'Generate Prediction' }}</span>
                        </button>
                    </div>
                </form>
            </section>

        </div>
    </main>
</template>