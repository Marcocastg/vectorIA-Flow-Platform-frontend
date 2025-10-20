import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css';
import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';
import { useAuthStore } from './stores/auth';

async function initializeApp() {
  const app = createApp(App)

  // 2. Registra Pinia ANTES de usar cualquier store
  app.use(createPinia())
  app.use(Toast)

  // 3. Obtén el store y espera a que la verificación de sesión termine
  const authStore = useAuthStore()
  await authStore.checkAuthStatus()

  // 4. SOLO DESPUÉS de saber el estado del usuario, registra el router y monta la app
  app.use(router)
  app.mount('#app')
}

// 5. Inicia la aplicación
initializeApp()
