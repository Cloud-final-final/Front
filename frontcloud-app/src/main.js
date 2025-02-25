import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import Prin1 from './Prin1.vue';
import Login from './login.vue'; // Ensure correct paths

const routes = [
  { path: '/', component: Prin1 },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
