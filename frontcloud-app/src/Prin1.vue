<script setup>
import HelloWorld from './components/Principal.vue'
</script>

<template>
  <div>
    <img src="./assets/doghappy.jpg" class="logo" alt="ayuda" sizes="200px" />
  </div>
  <HelloWorld msg="This is a cry for help (proyecto 1 cloud)" />
</template>

<style scoped>
.logo {
  height: 15em;
  padding: 2em;
  will-change: filter;
  transition: filter 500ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1em #7df47faa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
