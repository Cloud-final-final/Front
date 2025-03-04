import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import Prin1 from './Prin1.vue';
import Login from './login.vue'; // Ensure correct paths
import createacc from './createacc.vue';
import ChatPage from './ChatPage.vue';

const routes = [
  { path: '/', component: Prin1 },
  { path: '/login', component: Login },
  {path: '/register', component: createacc},
  {path:'/mainpage', component: ChatPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
