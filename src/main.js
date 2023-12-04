import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';
import VueCookies from 'vue3-cookies'
import router from './router';
import '../node_modules/nprogress/nprogress.css'
createApp(App).use(router).use(VueCookies).mount('#app')
