import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import './main.css';
import { useAuthStore } from '@/stores/auth/auth';
import i18n from './i18n/index.js';
import Icon from '@/components/ui/Icon.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);

const authStore = useAuthStore();
authStore.init();

app.use(router);

app.component('Icon', Icon);

app.mount('#app');
