import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import BlogView from "../views/blog/BlogView.vue";
import DownloadView from "../views/downoads/DownloadsView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ArticleDetailView from "../views/blog/detalhes/ArticleDetailView.vue";
import PortfolioView from "@/views/portfolio/PortfolioView.vue";
import PortfolioDetailView from "@/views/portfolio/detalhes/PortfolioDetailView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogView,
  },
  {
    path: "/blog/:slug",
    name: "ArticleDetail",
    component: ArticleDetailView,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: PortfolioView,
  },
  {
    path: "/portfolio/:id",
    name: "PortfolioDetail",
    component: PortfolioDetailView,
  },
  {
    path: "/downloads",
    name: "Downloads",
    component: DownloadView,
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Opcional: Garante que a página role para o topo ao navegar
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
