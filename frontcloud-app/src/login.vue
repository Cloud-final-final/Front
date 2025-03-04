<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = ref({
  username: '',
  password: '',
  showPassword: false,
});

const accessToken = ref(null);
const errorMessage = ref('');
const router = useRouter();

const handleSubmit = async () => {
  errorMessage.value = '';
  try {
    const response = await axios.post('http://localhost:8000/login', 
      new URLSearchParams({
        username: form.value.username,
        password: form.value.password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken.value = response.data.access_token;
    console.log('Access Token:', accessToken.value);
    router.push({ path: '/mainpage', query: { token: accessToken.value } });
  } catch (error) {
    errorMessage.value = error.response ? `Código de respuesta: ${error.response.status}` : 'Network Error';
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
    <div class="bg-white p-12 rounded-3xl shadow-2xl w-96 text-center">
      <h2 class="text-4xl font-extrabold text-blue-800 mb-8 tracking-wide">Iniciar Sesión</h2>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div>
          <label class="block text-gray-800 font-semibold mb-3">Usuario</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="Ingresa tu usuario"
            class="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 outline-none shadow-lg transition-transform transform focus:scale-105"
            required
          />
        </div>

        <div>
          <label class="block text-gray-800 font-semibold mb-3">Contraseña</label>
          <input
            v-model="form.password"
            :type="form.showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 outline-none shadow-lg transition-transform transform focus:scale-105"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition transform hover:scale-110 shadow-xl">
          Iniciar Sesión
        </button>
      </form>

      <p v-if="errorMessage" class="text-red-600 mt-6 text-lg">{{ errorMessage }}</p>
      <p v-if="accessToken" class="text-green-600 mt-6 text-lg">Inicio de sesión exitoso</p>

      <p class="text-md text-gray-500 mt-6">
        ¿No tienes cuenta? <a href="/register" class="text-blue-700 hover:underline">Regístrate</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 14px rgba(37, 99, 235, 0.6);
}
</style>
