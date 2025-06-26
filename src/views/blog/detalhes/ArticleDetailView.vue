<template>
  <main class="article-detail-main">
    <div class="container article-container">
      <div v-if="loading" class="loading-message">
        <p>Carregando artigo...</p>
        <div class="spinner"></div>
      </div>

      <template v-else-if="!article || error">
        <div class="no-article-found">
          <router-link to="/blog">
            <button class="btn-retry btn-back-to-blog">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                style="width: 15px; height: 15px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 6 6v2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Voltar para o Blog
            </button>
          </router-link>
          <div class="icon-placeholder">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2>
            {{ error ? "Erro ao Carregar Artigo" : "Artigo Não Encontrado" }}
          </h2>
          <p>
            {{
              error ||
              "O artigo que procura não pôde ser encontrado ou não existe."
            }}
          </p>
          <button v-if="error" class="btn-retry" @click="fetchArticle">
            Tentar Novamente
          </button>
        </div>
      </template>

      <template v-else>
        <article class="blog-article-detail">
          <header class="article-header">
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-meta">
              <span>Por {{ article.author }}</span>
              <span>•</span>
              <span>{{ formatDate(article.publishDate) }}</span>
              <span>•</span>
              <router-link
                :to="{ name: 'Blog', query: { category: article.category } }"
                class="article-category"
              >
                {{ article.category }}
              </router-link>
            </div>
            <img
              :alt="article.title"
              :src="article.imageUrl || '/src/assets/placeholder.jpg'"
              class="article-hero-image"
            />
          </header>

          <div class="article-content" v-html="article.fullContent"></div>

          <div
            v-if="article.tags && article.tags.length > 0"
            class="article-tags"
          >
            <strong>Tags:</strong>
            <router-link
              v-for="tag in article.tags"
              :key="tag"
              :to="{ name: 'Blog', query: { tags: tag } }"
              class="tag-item"
            >
              {{ tag }}
            </router-link>
          </div>
        </article>

        <section
          v-if="relatedArticles.length > 0"
          class="related-articles-section"
        >
          <h3>Artigos Relacionados</h3>
          <div class="related-articles-grid">
            <router-link
              v-for="relatedArticle in relatedArticles"
              :key="relatedArticle.id"
              :to="{
                name: 'ArticleDetail',
                params: { slug: relatedArticle.slug },
              }"
              class="related-article-card"
            >
              <img
                :alt="relatedArticle.title"
                :src="relatedArticle.imageUrl || '/src/assets/placeholder.jpg'"
                class="related-article-image"
              />
              <div class="related-article-info">
                <h4>{{ relatedArticle.title }}</h4>
                <p>{{ formatDate(relatedArticle.publishDate) }}</p>
              </div>
            </router-link>
          </div>
        </section>

        <section class="comments-section">
          <h3>Comentários (0)</h3>
          <p class="no-comments">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import api from "@/services/api.js";

const route = useRoute();
const article = ref(null);
const allBlogPosts = ref([]);
const loading = ref(true);
const error = ref(null);

// Função para buscar o artigo específico e todos os posts
const fetchArticleAndRelated = async () => {
  loading.value = true;
  error.value = null;
  article.value = null; // Limpa o artigo anterior

  const slug = route.params.slug;

  try {
    // 1. Busca o artigo principal
    const articleResponse = await api.getPostBySlug(slug);
    // ACCESSE A PROPRIEDADE 'POST' AQUI!
    article.value = articleResponse.post;

    // 2. Busca todos os posts para a seção de "Artigos Relacionados"
    // getAllPosts retorna um objeto com uma propriedade 'posts'
    const allPostsResponse = await api.getAllPosts();
    allBlogPosts.value = allPostsResponse.posts; // acessar .posts aqui também
  } catch (err) {
    console.error(`Erro ao buscar artigo com slug ${slug}:`, err);
    error.value =
      "Não foi possível carregar o artigo. Ele pode não existir ou houve um erro de rede.";
  } finally {
    loading.value = false;
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rola para o topo ao carregar
  }
};

// Computed property for related articles
const relatedArticles = computed(() => {
  if (!article.value || allBlogPosts.value.length === 0) return [];

  // Filtra o artigo atual
  const otherArticles = allBlogPosts.value.filter(
    (post) => post.id !== article.value.id,
  );

  // Lógica simples: tenta pegar 3 artigos da mesma categoria, se não houver, pega os mais recentes
  let suggestions = otherArticles.filter(
    (post) => post.category === article.value.category,
  );

  // Se não encontrar 3 na mesma categoria, adiciona outros
  if (suggestions.length < 3) {
    // Filtra artigos que ainda não estão em 'suggestions'
    const remainingArticles = otherArticles.filter(
      (post) => !suggestions.some((sugg) => sugg.id === post.id),
    );
    // Adiciona os mais recentes dos restantes
    suggestions = [
      ...suggestions,
      ...remainingArticles.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
      ),
    ];
  }

  // Remove duplicados (se houver) e limita a 3 artigos
  const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 3);

  // Ordena por userInfo de publicação (mais recente primeiro) para garantir consistência
  return uniqueSuggestions.sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
  );
});

// Function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-PT", options);
};

// Fetch article on component mount and when route changes
onMounted(fetchArticleAndRelated);
watch(() => route.params.slug, fetchArticleAndRelated);
</script>

<style scoped>
@import "artigo.css";
</style>
