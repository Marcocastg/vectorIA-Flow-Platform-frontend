<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue-toastification';

// --- ESTADO ---
// Esta variable controlará qué formulario se muestra: 'login' o 'register'.
const activeTab = ref('login');

// --- DATOS DEL FORMULARIO DE LOGIN ---
const errorMsg = ref('');
const router = useRouter();
const authStore = useAuthStore();

// --- DATOS DEL FORMULARIO DE REGISTRO ---
const registerFirstName = ref('');
const registerLastName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerCompanyName = ref('');

const loginEmail = ref('');
const loginPassword = ref('');

// --- MÉTODOS ---
const handleLogin = async () => {
  const success = await authStore.login(loginEmail.value, loginPassword.value);
  if (success) {
    // Si el login es exitoso, redirige al dashboard
    toast.success('¡Bienvenido de nuevo!');
    router.push({ name: 'dashboard' });
  } else {
    // Si falla, muestra un mensaje de error
    toast.error('Email o contraseña incorrectos.');
  }
};

async function handleRegister() {
  // Aquí irá la lógica para enviar los datos de registro al backend
    const result = await authStore.register({
      firstName: registerFirstName.value,
      lastName: registerLastName.value,
      email: registerEmail.value,
      password: registerPassword.value,
      companyName: registerCompanyName.value,
    });

  if (result.success) {
    toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
    // Cambiamos a la pestaña de login para que el usuario pueda entrar
    activeTab.value = 'login';
  } else {
    // Mostramos el mensaje de error que viene del backend
    toast.error(`Error en el registro: ${result.message}`);
  }
}
</script>

<template>
  <main class="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="bg-background-light dark:bg-background-dark border border-gray-200/10 dark:border-white/10 rounded-xl shadow-2xl shadow-primary/10">
        
        <div class="flex border-b border-gray-200/10 dark:border-white/10">
          <button 
            @click="activeTab = 'login'"
            :class="[
              'flex-1 py-3 text-center font-semibold text-sm transition-all',
              activeTab === 'login' 
                ? 'border-b-2 border-primary text-primary' 
                : 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary/50'
            ]">
            Login
          </button>
          <button 
            @click="activeTab = 'register'"
            :class="[
              'flex-1 py-3 text-center font-semibold text-sm transition-all',
              activeTab === 'register' 
                ? 'border-b-2 border-primary text-primary' 
                : 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary/50'
            ]">
            Register
          </button>
        </div>

        <div v-if="activeTab === 'login'" class="p-6 space-y-4">
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-3">
              <div>
                <label class="sr-only" for="email">Email</label>
                <input v-model="loginEmail" id="email" type="email" autocomplete="email" required placeholder="Email" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200/10 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-background-light dark:bg-background-dark focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm" />
              </div>
              <div>
                <label class="sr-only" for="password">Password</label>
                <input v-model="loginPassword" id="password" type="password" autocomplete="current-password" required placeholder="Password" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-200/10 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-background-light dark:bg-background-dark focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm" />
              </div>
            </div>
            <div class="text-right">
              <a href="#" class="text-xs font-medium text-primary hover:text-primary/80">Forgot Password?</a>
            </div>
            <div>
              <button type="submit" class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-all">
                Login
              </button>
            </div>
          </form>
        </div>

        <div v-else class="p-8 space-y-6">
           <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="space-y-4">
                <div>
                  <label class="sr-only" for="username">First Name</label>
                  <input v-model="registerFirstName" id="firstName-register" type="text" autocomplete="firstName" required placeholder="First Name" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200/10 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-background-light dark:bg-background-dark focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm" />
                </div>
                <div>
                  <label class="sr-only" for="username">Last Name</label>
                  <input v-model="registerLastName" id="lastName-register" type="text" autocomplete="lastName" required placeholder="Last Name" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200/10 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-background-light dark:bg-background-dark focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm" />
                </div>
                <div>
                  <label class="sr-only" for="email-register">Email address</label>
                  <input v-model="registerEmail" id="email-register" type="email" autocomplete="email" required placeholder="Email address" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200/10 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-background-light dark:bg-background-dark focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm" />
                </div>
                <div>
                  <label class="sr-only" for="password-register">Password</label>
                  <input v-model="registerPassword" id="password-register" type="password" autocomplete="new-password" required placeholder="Password" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200/10 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-background-light dark:bg-background-dark focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm" />
                </div>
                <div>
                  <label class="sr-only" for="companyName-register">Company Name</label>
                  <input v-model="registerCompanyName" id="companyName-register" type="text" autocomplete="new-company" required placeholder="Company Name" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200/10 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-background-light dark:bg-background-dark focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-sm" />
                </div>
                </div>
            <div>
              <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-all">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>