<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// Guardar token de /login
const route = useRoute();
const token = route.query.token || '';

// Reactive state variables
const username = ref('');
const errorMessage = ref('');
const file = ref(null);
const uploadResponse = ref(null);
const question = ref('');
const chatMessages = ref([]);
const loading = ref(false);

const files = ref([]);
const selectedFile = ref('');

// leer la información de usuario GET /users/me
const getUserInfo = async () => {
  try {
    const response = await axios.get('http://localhost:8000/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    username.value = response.data.username;
  } catch (error) {
    errorMessage.value = 'Error al obtener la información de usuario';
  }
};

// hacer el GET /files
const getFiles = async () => {
  try {
    const response = await axios.get('http://localhost:8000/files', {
      headers: { Authorization: `Bearer ${token}` },
    });
    files.value = response.data;
    if (files.value.length > 0) {
      selectedFile.value = files.value[0].id;
    }
  } catch (error) {
    errorMessage.value = 'No hay archivos por recibir';
  }
};

onMounted(() => {
  getUserInfo();
  getFiles();
});

const handleFileChange = (e) => {
  file.value = e.target.files[0];
};

// Subir archivos POST /upload
const uploadFile = async () => {
  if (!file.value) return;
  try {
    const formData = new FormData();
    formData.append('file', file.value);
    const response = await axios.post('http://localhost:8000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    uploadResponse.value = response.data;
    getFiles();
  } catch (error) {
    errorMessage.value = 'File upload failed';
  }
};

// Mandar el POST ask/{id_texto}
const askQuestion = async () => {
  if (!question.value.trim()) return;
  if (!selectedFile.value) {
    errorMessage.value = 'Please select a file first.';
    return;
  }
  loading.value = true;
  try {
    const response = await axios.post(`http://localhost:8000/ask/${selectedFile.value}`, 
      { question: question.value }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    chatMessages.value.push({
      question: question.value,
      small_answer: response.data.small_answer || 'No short answer provided',
      answer: response.data.answer || 'No answer provided',
    });
    question.value = '';
  } catch (error) {
    errorMessage.value = 'Failed to get answer';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Proyecto 1 Cloud LLM</h1>
      <div class="text-gray-600">
        <span v-if="username">Bienvenido, {{ username }}</span>
        <span v-else>Obteniendo información de usuario...</span>
      </div>
    </header>

    <main class="flex flex-1 overflow-hidden">
      <aside class="w-1/3 bg-white p-6 border-r border-gray-200">
        <h2 class="text-xl font-semibold mb-4">Cargar Archivo</h2>
        <input type="file" @change="handleFileChange" class="mb-4" accept=".txt,.pdf" />
        <button @click="uploadFile" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Cargar
        </button>
        <div v-if="uploadResponse" class="mt-4 p-2 bg-green-100 text-green-700 rounded">
          <p>{{ uploadResponse.message }}</p>
          <p>Filename: {{ uploadResponse.filename }}</p>
        </div>
      </aside>

      <section class="flex-1 flex flex-col p-6">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Seleccionar archivo cargado:</label>
          <select v-model="selectedFile" class="w-full p-2 border border-gray-300 rounded-lg">
            <option v-for="file in files" :key="file.id" :value="file.id">{{ file.filename }}</option>
          </select>
        </div>

        <div class="flex-1 overflow-auto mb-4 p-4 bg-white rounded shadow">
          <div v-for="(msg, index) in chatMessages" :key="index" class="mb-4">
            <div class="mb-1"><strong>You:</strong> {{ msg.question }}</div>
            <div class="ml-4 text-gray-700"><strong>Short Answer:</strong> {{ msg.small_answer }}</div>
            <div class="ml-4 text-gray-500"><strong>Full Answer:</strong> {{ msg.answer }}</div>
          </div>
          <div v-if="chatMessages.length === 0" class="text-gray-500 text-center">
            Mandar una pregunta:
          </div>
        </div>

        <div v-if="loading" class="text-center text-blue-600 mb-4">Loading...</div>

        <div class="flex">
          <input v-model="question" type="text" placeholder="Pregunta..." class="flex-1 p-3 border border-gray-300 rounded-l focus:ring-2 focus:ring-blue-400 outline-none" />
          <button @click="askQuestion" class="bg-blue-600 text-white px-6 rounded-r hover:bg-blue-700 transition">
            Enviar Pregunta
          </button>
        </div>
      </section>
    </main>

    <footer v-if="errorMessage" class="bg-red-100 text-red-600 p-4 text-center">
      {{ errorMessage }}
    </footer>
  </div>
</template>
