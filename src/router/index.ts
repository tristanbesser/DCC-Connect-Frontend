// src/router/index.ts (for TypeScript) or index.js (for JavaScript)
import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../views/Auth.vue';  // Import the Auth page component
import AccountRecovery from '../views/AccountRecovery.vue';  // Import the AccountRecovery page component

const routes = [
  {
    path: '/', // Root path
    name: 'Auth',
    component: Auth, // Load the Auth page when the user visits "/"
  },
  {
    path: '/account-recovery', // Path for Account Recovery page
    name: 'AccountRecovery',
    component: AccountRecovery, // Load the AccountRecovery page when the user visits "/account-recovery"
  }
];

const router = createRouter({
  history: createWebHistory(),  // Use HTML5 history mode
  routes,  // Register the routes
});

export default router;