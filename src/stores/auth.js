import { defineStore } from 'pinia';
import apiClient from '@/services/api'; // Importamos nuestro cliente Axios

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Aquí guardaremos los datos del usuario si está logueado
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async login(email, password) {
      try {
        const response = await apiClient.post('/auth/login', { email, password });
        this.user = response.data; // Guardamos el usuario en el state
        return true;
      } catch (error) {
        this.user = null;
        console.error('Error en el login:', error);
        return false;
      }
    },

    async logout() {
      try {
        await apiClient.get('/auth/logout');
        this.user = null; // Limpiamos el usuario del state
      } catch (error) {
        console.error('Error en el logout:', error);
      }
    },

    // Esta acción es para verificar si ya existe una sesión al cargar la app
    async checkAuthStatus() {
      try {
        const response = await apiClient.get('/auth/status');
        this.user = response.data;
      } catch (error) {
        // Si hay un error (ej. 403), significa que no hay sesión, lo cual es normal.
        this.user = null;
      }
    },

    async register(userData) {
        try {
        // Usamos el endpoint de creación de usuario que ya tienes en NestJS
            await apiClient.post('/user', userData);
            return { success: true };
        } catch (error) {
            console.error('Error en el registro:', error);
            // Devolvemos el mensaje de error del backend si existe
            return { success: false, message: error.response?.data?.message || 'Ocurrió un error.' };
        }
    },
  },
});