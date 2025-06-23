import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogView from '../views/BlogView.vue';
import DownloadsView from '../views/DownloadsView.vue';
import UploadView from '../views/UploadView.vue';
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: DownloadsView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView,
      meta: { requiresAuth: true }
    },
    // Adicione uma rota 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
});

// Implementação básica de guarda de rota para autenticação
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('userToken')) {
    // Se a rota requer autenticação e não há token (usuário não logado)
    // Redirecione para uma página de login ou para a home
    alert('Acesso negado. Por favor, faça login para aceder a esta página.');
    next('/'); // Redireciona para a home
  } else {
    next(); // Procede para a rota
  }
});


export default router;