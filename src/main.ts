// src/main.ts (for TypeScript) or main.js (for JavaScript)
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Import the router

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const app = createApp(App);

app.use(router);  // Use the router in the Vue app
app.mount('#app');