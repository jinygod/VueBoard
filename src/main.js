import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap 스타일시트 추가

createApp(App).use(router).mount('#app');
