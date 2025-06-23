import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogView from '../views/BlogView.vue';
import DownloadView from '../views/DownloadsView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import ArticleDetailView from '../views/ArticleDetailView.vue'; // Importe o novo componente

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/blog',
        name: 'Blog',
        component: BlogView
    },
    {
        path: '/blog/:slug', // Rota para detalhes do artigo com um parâmetro 'slug'
        name: 'ArticleDetail',
        component: ArticleDetailView
    },
    {
        path: '/downloads',
        name: 'Downloads',
        component: DownloadView
    },
    // Adicione a rota para UploadView se você tiver uma
    // {
    //   path: '/upload',
    //   name: 'Upload',
    //   component: UploadView
    // },
    {
        path: '/:catchAll(.*)', // Rota de fallback para 404
        name: 'NotFound',
        component: NotFoundView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Opcional: Garante que a página role para o topo ao navegar
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {top: 0, behavior: 'smooth'};
        }
    }
});

export default router;