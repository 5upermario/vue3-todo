import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store } from './store';
import './style.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import './service';

const app = createApp(App);

app
  .use(store)
  .use(router)
  .mount('#app');
