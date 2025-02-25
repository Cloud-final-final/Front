<script setup>
import { ref } from 'vue';

const form = ref({
  username: '',
  password: '',
  showPassword: false,
});

const handleSubmit = () => {
  console.log('Logging in with:', form.value);
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-xl w-96">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">Iniciar Sesión</h2>

      <form @submit.prevent="handleSubmit">
    
        <div class="mb-5">
          <label class="block text-gray-600 font-medium mb-2">Usuario</label>
          <div class="relative">
            <input
              v-model="form.username"
              type="text"
              placeholder="Ingresa tu usuario"
              class="w-full p-3 pl-4 pr-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
            
          </div>
        </div>
        <div class="mb-5">
          <label class="block text-gray-600 font-medium mb-2">Contraseña</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="form.showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
            
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
          Iniciar Sesión
        </button>
      </form>

      <!-- Register Link -->
      <p class="text-sm text-gray-500 text-center mt-4">
        ¿No tienes cuenta? <a href="/register" class="text-blue-600 hover:underline">Regístrate</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}
</style>
