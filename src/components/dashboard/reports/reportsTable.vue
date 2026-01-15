<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const reports = ref([]);
const isLoading = ref(true);

// Usamos la URL absoluta para asegurar conexión
const API_URL = '/api';

const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    });
};

const fetchReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/report`, {
            withCredentials: true // IMPORTANTE: Para enviar la cookie de sesión
        });
        
        // Si el backend devuelve un objeto Result (con _value), lo desempaquetamos.
        const responseData = response.data; // Puede ser { status: 'success', data: { _value: [...] } }

        if (responseData.data) {
            if (Array.isArray(responseData.data)) {
                // Caso A: Devuelve array directo
                reports.value = responseData.data;
            } else if (responseData.data._value && Array.isArray(responseData.data._value)) {
                // Caso B: Devuelve objeto Result (Tu caso actual)
                reports.value = responseData.data._value;
            } else {
                console.warn("Formato de respuesta inesperado:", responseData);
                reports.value = [];
            }
        }
    } catch (e) {
        console.error("Error fetching reports", e);
    } finally {
        isLoading.value = false;
    }
};

const viewReport = (report) => {
    let mappedInput = {};
    let mappedPrediction = {};
    const input = report.inputData || {};
    const pred = report.predictionData || {};

    if (report.platformName === 'twitch') {
        mappedInput = {
            avgViewers_d1: input.avgViewers1,
            avgViewers_d14: input.avgViewers2,
            followers_d1: input.followers1,
            followers_d14: input.followers2,
            minutesStreamed_d1: input.minutesStreamed1 || input.time_streamed_1,
            minutesStreamed_d14: input.minutesStreamed2 || input.time_streamed_2,
            comments_most_viewed: input.comments_most_viewed,
            comments_least_viewed: input.comments_least_viewed
        };
        mappedPrediction = {
            followers_d30: pred.followers_predicted,
            avg_viewers_d30: pred.viewers_predicted,
            debug_crecimiento: pred.growth_net
        };
    } else {
        mappedInput = {
            FOLLOWERS_D14: input.followers1,
            FOLLOWERS_D21: input.followers2,
            
            AVG_VIEWERS_D1: input.avgViewers1,
            AVG_VIEWERS_D14: input.avgViewers2,
            
            HOURS_STREAMED_D1: input.minutesStreamed1 || input.time_streamed_1,
            HOURS_STREAMED_D14: input.minutesStreamed2 || input.time_streamed_2
        };
        mappedPrediction = {
            followers_d28: pred.followers_predicted,
            prediccion_viewers_30d: pred.viewers_predicted,
            crecimiento_neto: pred.growth_net
        };
    }
    const fullData = {
        channelName: report.channelName,
        platform: report.platformName,
        ...mappedInput,      // Datos D1, D14
        ...mappedPrediction, // Datos D30
        savedAnalysis: report.aiAnalysis // Pasamos el texto para no llamar a la IA de nuevo
    };

    router.push({
        name: 'reportsReport',
        query: {
            data: JSON.stringify(fullData),
            platform: report.platformName
        }
    });
};

onMounted(() => {
    fetchReports();
});
</script>

<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-stone-900 dark:text-white">Your Prediction History</h2>
            <button @click="fetchReports" class="text-primary hover:underline text-sm font-medium">
                Refresh list
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-10 text-stone-500">
            Loading history...
        </div>

        <!-- Empty State -->
        <div v-else-if="reports.length === 0" class="text-center py-10 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-white/5">
            <p class="text-stone-500 mb-4">No predictions found yet.</p>
            <button @click="$router.push('/dashboard/predictions')" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                New Prediction
            </button>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
            <table class="w-full text-left">
                <thead class="bg-stone-50 dark:bg-white/5">
                    <tr>
                        <th class="p-4 font-semibold text-stone-900 dark:text-white">Date</th>
                        <th class="p-4 font-semibold text-stone-900 dark:text-white">Channel</th>
                        <th class="p-4 font-semibold text-stone-900 dark:text-white">Platform</th>
                        <th class="p-4 font-semibold text-stone-900 dark:text-white text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-stone-200 dark:divide-stone-800">
                    <tr v-for="report in reports" :key="report.uuid" class="hover:bg-stone-50 dark:hover:bg-white/5 transition-colors">
                        <td class="p-4 text-stone-600 dark:text-stone-300 font-mono text-sm">
                            {{ formatDate(report.createdAt) }}
                        </td>
                        <td class="p-4 text-stone-900 dark:text-white font-medium">
                            {{ report.channelName }}
                        </td>
                        <td class="p-4">
                            <span class="px-2 py-1 rounded text-xs font-bold uppercase border"
                                :class="report.platformName === 'twitch' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-green-100 text-green-800 border-green-200'">
                                {{ report.platformName }}
                            </span>
                        </td>
                        <td class="p-4 text-right">
                            <button 
                                @click="viewReport(report)"
                                class="inline-flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all shadow-sm"
                                title="View full report"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>