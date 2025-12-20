<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
// URL de tu backend NestJS
const API_URL = 'https://supporting-prue-marcocastg-4919b58b.koyeb.app/api';

// Estado
const platform = ref('twitch');
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

const handlePredict = async () => {
    isLoading.value = true;
    error.value = null;

    try {
        const payload = platform.value === 'twitch' ? { ...formTwitch } : { ...formKick };
        
        // Convertir a números
        for (const key in payload) {
            payload[key] = Number(payload[key]);
        }

        const response = await axios.post(`${API_URL}/predictions`, payload, {
            params: { platform: platform.value }
        });

        if (response.data.status === 'success') {
            // --- CAMBIO CLAVE: Fusionamos input + predicción ---
            const fullData = {
                ...response.data.input_received, // Datos históricos (D1, D14)
                ...response.data.prediccion,     // Datos futuros (D30)
                platform: platform.value
            };

            router.push({
                name: 'reportsReport', 
                query: {
                    data: JSON.stringify(fullData),
                    platform: platform.value
                }
            });
        }
    } catch (err) {
        console.error(err);
        error.value = err.response?.data?.message || "Error connecting to prediction engine.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark mb-8">
                AI Growth Predictor
            </h1>

            <!-- SELECCIÓN DE PLATAFORMA -->
            <div class="flex gap-4 mb-8">
                <button 
                    @click="platform = 'twitch'"
                    class="flex-1 py-4 rounded-xl border-2 font-bold transition-all duration-200 flex items-center justify-center gap-2"
                    :class="platform === 'twitch' 
                        ? 'border-[#9146FF] bg-[#9146FF]/10 text-[#9146FF]' 
                        : 'border-light dark:border-dark bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark hover:border-[#9146FF]/50'"
                >
                    Twitch
                </button>
                <button 
                    @click="platform = 'kick'"
                    class="flex-1 py-4 rounded-xl border-2 font-bold transition-all duration-200 flex items-center justify-center gap-2"
                    :class="platform === 'kick' 
                        ? 'border-[#53FC18] bg-[#53FC18]/10 text-[#53FC18]' 
                        : 'border-light dark:border-dark bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark hover:border-[#53FC18]/50'"
                >
                    Kick
                </button>
            </div>

            <section>
                <h2 class="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
                    Channel Metrics (Input)
                </h2>
                
                <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg border border-light dark:border-dark shadow-sm">
                    <form @submit.prevent="handlePredict">
                        
                        <!-- CAMPOS TWITCH -->
                        <div v-if="platform === 'twitch'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Día 1 -->
                            <div class="md:col-span-2">
                                <h3 class="text-sm font-bold text-primary uppercase mb-4">Day 1 (Baseline)</h3>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Avg. Viewers</label>
                                <input v-model="formTwitch.avgViewers_d1" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 150">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Followers</label>
                                <input v-model="formTwitch.followers_d1" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 5000">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Minutes Streamed</label>
                                <input v-model="formTwitch.minutesStreamed_d1" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2000">
                            </div>

                            <!-- Día 14 -->
                            <div class="md:col-span-2 mt-4">
                                <h3 class="text-sm font-bold text-primary uppercase mb-4">Day 14 (Mid-term)</h3>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Avg. Viewers</label>
                                <input v-model="formTwitch.avgViewers_d14" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 180">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Followers</label>
                                <input v-model="formTwitch.followers_d14" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 5200">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Minutes Streamed</label>
                                <input v-model="formTwitch.minutesStreamed_d14" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2500">
                            </div>

                            <!-- Interacción -->
                             <div class="md:col-span-2 mt-4">
                                <h3 class="text-sm font-bold text-primary uppercase mb-4">Engagement</h3>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Comments (Best VOD)</label>
                                <input v-model="formTwitch.comments_most_viewed" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 50">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Comments (Worst VOD)</label>
                                <input v-model="formTwitch.comments_least_viewed" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. 5">
                            </div>
                        </div>

                        <!-- CAMPOS KICK -->
                        <div v-if="platform === 'kick'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2">
                                <h3 class="text-sm font-bold text-green-500 uppercase mb-4">Initial Metrics (D1)</h3>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Avg Viewers</label>
                                <input v-model="formKick.AVG_VIEWERS_D1" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Hours Streamed</label>
                                <input v-model="formKick.HOURS_STREAMED_D1" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>

                            <div class="md:col-span-2 mt-4">
                                <h3 class="text-sm font-bold text-green-500 uppercase mb-4">Growth Metrics (D14-D21)</h3>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Avg Viewers (D14)</label>
                                <input v-model="formKick.AVG_VIEWERS_D14" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                             <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Hours Streamed (D14)</label>
                                <input v-model="formKick.HOURS_STREAMED_D14" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Followers (D14)</label>
                                <input v-model="formKick.FOLLOWERS_D14" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-light dark:text-text-dark mb-2">Followers (D21)</label>
                                <input v-model="formKick.FOLLOWERS_D21" type="number" required class="w-full px-4 py-3 rounded-lg border border-light dark:border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all">
                            </div>
                        </div>

                        <!-- ERROR Y BOTÓN -->
                        <div class="mt-8 pt-6 border-t border-light dark:border-dark">
                            <p v-if="error" class="text-red-500 text-center mb-4 bg-red-100 dark:bg-red-900/20 py-2 rounded">{{ error }}</p>
                            
                            <div class="flex justify-end">
                                <button 
                                    :disabled="isLoading"
                                    class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-bold tracking-wide shadow-lg shadow-primary/30 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto"
                                >
                                    <span v-if="isLoading" class="material-symbols-outlined animate-spin">progress_activity</span>
                                    <span v-else class="material-symbols-outlined">auto_awesome</span>
                                    <span>{{ isLoading ? 'Processing...' : 'Run Prediction Model' }}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </main>
</template>