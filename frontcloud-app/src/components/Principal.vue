<script setup>
import { ref } from 'vue'
import login from '../login.vue';

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1 class="abajo">{{ msg }}</h1>

  <div class="card">
    <router-link :to="'/login'" @click="console.log('NO FUNCIONA')" class="button">
      Iniciar
    </router-link>

    <h3>Proyecto realizado por:</h3>
    <p>
      Marco Alejandro Ramírez Camacho <br>
      Daniel Fuentes Ensuncho <br>
      Santiago Cabra <br>
      Mateo Lopez
    </p>
  </div>

  <p class="abajo">
    ISIS-4426 Desarrollo de soluciones Cloud
  </p>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: rgb(43, 43, 69);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}
.button:hover {
  background-color: rgb(7, 74, 25);
}
.abajo{
  color:#E2A0FF
}
</style>
