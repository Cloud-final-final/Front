<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  username: "",
  password: "",
});
const isSuccess = ref(false);
const errorMessage = ref("");
const responseStatus = ref(null);

const handleRegister = async () => {
  errorMessage.value = "";
  responseStatus.value = null;
  try {
    const response = await axios.post("http://localhost:8000/register/", {
      username: form.value.username,
      password: form.value.password,
    });

    responseStatus.value = response.status;
    if (response.status === 201) {
      isSuccess.value = true;
    }
  } catch (error) {
    responseStatus.value = error.response
      ? error.response.status
      : "Network Error";
    errorMessage.value = "Error al registrar usuario, intentalo de nuevo";
  }
};
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500"
  >
    <div class="bg-white p-10 rounded-2xl shadow-2xl w-96">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800"
        >Registro</h2
      >

      <form
        v-if="!isSuccess"
        @submit.prevent="handleRegister"
        class="space-y-6"
      >
        <div>
          <label class="block text-gray-700 font-medium mb-2">Usuario</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="Ingresa tu usuario"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 outline-none transition shadow-sm"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2">Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 outline-none transition shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >Registrar</button
        >
      </form>

      <div v-if="isSuccess" class="text-center mt-8">
        <h3 class="text-green-600 text-lg mb-4">¡Registro exitoso!</h3>
        <router-link
          to="/login"
          class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >Volver a Iniciar Sesión</router-link
        >
      </div>

      <p v-if="errorMessage" class="text-red-600 text-center mt-6">{{
        errorMessage
      }}</p>
      <p v-if="responseStatus" class="text-center mt-4 text-gray-700"
        >Código de respuesta: {{ responseStatus }}</p
      >
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
}
</style>
