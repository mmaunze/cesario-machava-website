<template>

  <main class="article-detail-main">
    <div class="container article-container">
      <div v-if="loading" class="loading-message">
        <p>Carregando artigo...</p>
        <div class="spinner"></div>
      </div>

      <template v-else-if="!article || error">
        <div class="no-article-found">
          <div class="icon-placeholder">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>{{ error ? 'Erro ao Carregar Artigo' : 'Artigo Não Encontrado' }}</h2>
          <p>{{ error || 'O artigo que procura não pôde ser encontrado ou não existe.' }}</p>
          <button v-if="error" class="btn-retry" @click="fetchArticle">Tentar Novamente</button>
          <router-link class="btn-back-to-blog" to="/blog">
            <svg fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 6 6v2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Voltar para o Blog
          </router-link>
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
              <router-link :to="{ name: 'Blog', query: { category: article.category } }" class="article-category">
                {{ article.category }}
              </router-link>
            </div>
            <img :alt="article.title" :src="article.imageUrl || '/src/assets/placeholder.jpg'"
                 class="article-hero-image"/>
          </header>

          <div class="article-content" v-html="article.fullContent">
          </div>

          <div v-if="article.tags && article.tags.length > 0" class="article-tags">
            <strong>Tags:</strong>
            <router-link v-for="tag in article.tags" :key="tag"
                         :to="{ name: 'Blog', query: { tags: tag } }" class="tag-item">
              {{ tag }}
            </router-link>
          </div>
        </article>

        <section v-if="relatedArticles.length > 0" class="related-articles-section">
          <h3>Artigos Relacionados</h3>
          <div class="related-articles-grid">
            <router-link v-for="relatedArticle in relatedArticles" :key="relatedArticle.id"
                         :to="{ name: 'ArticleDetail', params: { slug: relatedArticle.slug } }"
                         class="related-article-card">
              <img :alt="relatedArticle.title" :src="relatedArticle.imageUrl || '/src/assets/placeholder.jpg'"
                   class="related-article-image">
              <div class="related-article-info">
                <h4>{{ relatedArticle.title }}</h4>
                <p>{{ formatDate(relatedArticle.publishDate) }}</p>
              </div>
            </router-link>
          </div>
        </section>

        <section class="comments-section">
          <h3>Comentários (0)</h3>
          <p class="no-comments">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        </section>
      </template>
    </div>
  </main>

</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';

import api from '@/services/api';

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
    article.value = await api.getPostBySlug(slug);

    // 2. Busca todos os posts para a seção de "Artigos Relacionados"
    // Isso pode ser otimizado se a API tiver um endpoint para artigos relacionados
    // ou filtros mais avançados, mas para começar, buscar todos é suficiente.
    allBlogPosts.value = await api.getAllPosts();

  } catch (err) {
    console.error(`Erro ao buscar artigo com slug ${slug}:`, err);
    error.value = 'Não foi possível carregar o artigo. Ele pode não existir ou houve um erro de rede.';
  } finally {
    loading.value = false;
    window.scrollTo({top: 0, behavior: 'smooth'}); // Rola para o topo ao carregar
  }
};

// Computed property for related articles
const relatedArticles = computed(() => {
  if (!article.value || allBlogPosts.value.length === 0) return [];

  // Filtra o artigo atual
  const otherArticles = allBlogPosts.value.filter(post => post.id !== article.value.id);

  // Lógica simples: tenta pegar 3 artigos da mesma categoria, se não houver, pega os mais recentes
  let suggestions = otherArticles.filter(post => post.category === article.value.category);

  // Se não encontrar 3 na mesma categoria, adiciona outros
  if (suggestions.length < 3) {
    // Filtra artigos que ainda não estão em 'suggestions'
    const remainingArticles = otherArticles.filter(
        post => !suggestions.some(sugg => sugg.id === post.id)
    );
    // Adiciona os mais recentes dos restantes
    suggestions = [...suggestions, ...remainingArticles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))];
  }

  // Remove duplicados (se houver) e limita a 3 artigos
  const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 3);

  // Ordena por data de publicação (mais recente primeiro) para garantir consistência
  return uniqueSuggestions.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
});

// Function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

// Fetch article on component mount and when route changes
onMounted(fetchArticleAndRelated);
watch(() => route.params.slug, fetchArticleAndRelated);
</script>

<style scoped>

.article-detail-main {
  background-color: var(--bg-body);
  padding: 3rem 0;
  min-height: calc(100vh - 75px - 200px); /* Ajustar com base no header/footer */
  margin-top: 75px; /* Offset for fixed header */
}

.article-container {
  max-width: 1280px; /* Conteúdo do artigo um pouco mais estreito para melhor leitura */
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Estilos do Artigo Principal */
.blog-article-detail {
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 10px 30px var(--shadow-color);
  border: 1px solid var(--border-color);
  padding: 3rem;
  margin-bottom: 3rem;
}

.dark-mode .blog-article-detail {
  border-color: var(--border-color-dark);
}

.article-header {
  text-align: center;
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2.8rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.2;
}

.article-meta {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.article-meta span {
  white-space: nowrap; /* Evita quebra de linha para "•" */
}

.article-category {
  color: var(--primary-green); /* Cor de destaque para a categoria */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.article-category:hover {
  color: var(--secondary-green);
  text-decoration: underline;
}

.article-hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-content {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Estilos para o HTML injetado (fullContent) */
.article-content h2,
.article-content h3 {
  color: var(--primary-blue);
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
}

.article-content h2 {
  font-size: 2.1rem;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.article-content h3 {
  font-size: 1.7rem;
  color: var(--primary-green);
}

.article-content p {
  margin-bottom: 1.2rem;
}

.article-content ul,
.article-content ol {
  margin-bottom: 1.5rem;
  padding-left: 25px;
}

.article-content ul li {
  list-style: disc;
  margin-bottom: 0.5rem;
}

.article-content ol li {
  list-style: decimal;
  margin-bottom: 0.5rem;
}

.article-content strong {
  color: var(--text-primary);
}

/* Tags do Artigo */
.article-tags {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
}

.article-tags strong {
  margin-right: 0.5rem;
}

.article-tags .tag-item {
  background-color: var(--bg-card);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.article-tags .tag-item:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

/* Seção de Artigos Relacionados */
.related-articles-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 8px 25px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.related-articles-section h3 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.8rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.8rem;
}

.related-articles-section h3::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 80px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.related-articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.related-article-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text-primary);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px var(--shadow-color);
}

.related-article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow-hover);
}

.related-article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-article-card:hover .related-article-image {
  transform: scale(1.05);
}

.related-article-info {
  padding: 1.2rem;
  flex-grow: 1;
}

.related-article-info h4 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.related-article-info p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Seção de Comentários (Simulada) */
.comments-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 8px 25px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.comments-section h3 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.8rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.8rem;
}

.comments-section h3::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 80px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.no-comments {
  text-align: center;
  color: var(--text-muted);
  font-size: 1rem;
  padding: 1rem 0;
}

/* No Article Found / Error Styles */
.no-article-found {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 10px 30px var(--shadow-color);
  border: 1px solid var(--border-color);
  margin-top: 2rem;
}

.no-article-found .icon-placeholder {
  color: var(--primary-orange);
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.no-article-found .icon-placeholder svg {
  width: 80px;
  height: 80px;
}

.no-article-found h2 {
  font-size: 2.2rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.no-article-found p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.btn-back-to-blog, .btn-retry {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-blue);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none; /* Add border: none for buttons */
  cursor: pointer;
}

.btn-back-to-blog:hover, .btn-retry:hover {
  background: var(--secondary-blue);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.btn-back-to-blog svg, .btn-retry svg {
  margin-right: 0.3rem;
}


/* New Loading Spinner Styles (shared with BlogView) */
.loading-message {
  text-align: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  color: var(--text-muted);
  grid-column: 1 / -1; /* Ocupa toda a largura do grid */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-blue);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsividade */
@media (max-width: 992px) {
  .blog-article-detail {
    padding: 2.5rem;
  }

  .article-title {
    font-size: 2.2rem;
  }

  .article-hero-image {
    height: 300px;
  }

  .article-content h2 {
    font-size: 1.8rem;
  }

  .article-content h3 {
    font-size: 1.4rem;
  }

  .related-articles-section h3, .comments-section h3 {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .article-detail-main {
    padding: 2rem 0;
  }

  .blog-article-detail {
    padding: 1.5rem;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-meta {
    flex-wrap: wrap;
    justify-content: center;
  }

  .article-hero-image {
    height: 250px;
  }

  .article-content {
    font-size: 1rem;
  }

  .article-content h2 {
    font-size: 1.6rem;
  }

  .article-content h3 {
    font-size: 1.3rem;
  }

  .related-articles-section {
    padding: 1.5rem;
  }

  .related-articles-grid {
    grid-template-columns: 1fr; /* Uma coluna em mobile */
  }

  .related-article-image {
    height: 150px;
  }

  .related-articles-section h3, .comments-section h3 {
    font-size: 1.6rem;
  }

  .no-article-found h2 {
    font-size: 1.8rem;
  }

  .no-article-found p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .article-container {
    padding: 0 1rem;
  }

  .blog-article-detail {
    padding: 1rem;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    font-size: 0.85rem;
  }

  .article-hero-image {
    height: 200px;
  }

  .article-tags .tag-item {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .related-articles-section h3, .comments-section h3 {
    font-size: 1.4rem;
  }

  .no-article-found .icon-placeholder svg {
    width: 60px;
    height: 60px;
  }

  .no-article-found h2 {
    font-size: 1.5rem;
  }
}

.article-detail-main {
  background-color: var(--bg-body);
  padding: 3rem 0;
  min-height: calc(100vh - 75px - 200px); /* Ajustar com base no header/footer */
  margin-top: 75px; /* Offset for fixed header */
}

.article-container {
  max-width: 1280px; /* Conteúdo do artigo um pouco mais estreito para melhor leitura */
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Estilos do Artigo Principal */
.blog-article-detail {
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 10px 30px var(--shadow-color);
  border: 1px solid var(--border-color);
  padding: 3rem;
  margin-bottom: 3rem;
}

.dark-mode .blog-article-detail {
  border-color: var(--border-color-dark);
}

.article-header {
  text-align: center;
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2.8rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.2;
}

.article-meta {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.article-meta span {
  white-space: nowrap; /* Evita quebra de linha para "•" */
}

.article-category {
  color: var(--primary-green); /* Cor de destaque para a categoria */
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.article-category:hover {
  color: var(--secondary-green);
  text-decoration: underline;
}

.article-hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-content {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Estilos para o HTML injetado (fullContent) */
.article-content h2,
.article-content h3 {
  color: var(--primary-blue);
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
}

.article-content h2 {
  font-size: 2.1rem;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.article-content h3 {
  font-size: 1.7rem;
  color: var(--primary-green);
}

.article-content p {
  margin-bottom: 1.2rem;
}

.article-content ul,
.article-content ol {
  margin-bottom: 1.5rem;
  padding-left: 25px;
}

.article-content ul li {
  list-style: disc;
  margin-bottom: 0.5rem;
}

.article-content ol li {
  list-style: decimal;
  margin-bottom: 0.5rem;
}

.article-content strong {
  color: var(--text-primary);
}

/* Tags do Artigo */
.article-tags {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
}

.article-tags strong {
  margin-right: 0.5rem;
}

.article-tags .tag-item {
  background-color: var(--bg-card);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.article-tags .tag-item:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

/* Seção de Artigos Relacionados */
.related-articles-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 8px 25px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.related-articles-section h3 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.8rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.8rem;
}

.related-articles-section h3::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 80px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.related-articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.related-article-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text-primary);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px var(--shadow-color);
}

.related-article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow-hover);
}

.related-article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-article-card:hover .related-article-image {
  transform: scale(1.05);
}

.related-article-info {
  padding: 1.2rem;
  flex-grow: 1;
}

.related-article-info h4 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.related-article-info p {
  font-size: 0.85rem;
  color: var(--text-muted);
}


/* Seção de Comentários (Simulada) */
.comments-section {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 8px 25px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.comments-section h3 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.8rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.8rem;
}

.comments-section h3::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 80px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.no-comments {
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  padding: 1.5rem;
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  margin-top: 2rem;
}


/* Mensagem de Artigo Não Encontrado */
.no-article-found {
  text-align: center;
  padding: 50px;
  background: var(--bg-section);
  border-radius: 15px;
  box-shadow: 0 10px 30px var(--shadow-color);
  border: 1px solid var(--border-color);
  margin: 5rem auto; /* Centraliza a mensagem */
  max-width: 700px;
}

.no-article-found .icon-placeholder {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  color: var(--primary-orange);
}

.no-article-found .icon-placeholder svg {
  width: 100%;
  height: 100%;
}

.no-article-found h2 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.no-article-found p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.btn-back-to-blog {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gradient-primary);
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-back-to-blog:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* RESPONSIVIDADE */
@media (max-width: 992px) {
  .article-title {
    font-size: 2.2rem;
  }

  .article-hero-image {
    height: 300px;
  }

  .article-content h2 {
    font-size: 1.8rem;
  }

  .article-content h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .article-detail-main {
    padding: 2rem 0;
  }

  .blog-article-detail {
    padding: 2rem;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-hero-image {
    height: 250px;
  }

  .article-content {
    font-size: 1rem;
  }

  .article-content h2 {
    font-size: 1.6rem;
  }

  .article-content h3 {
    font-size: 1.3rem;
  }

  .related-articles-section, .comments-section {
    padding: 1.5rem;
  }

  .related-articles-section h3, .comments-section h3 {
    font-size: 1.6rem;
  }

  .no-article-found {
    padding: 30px;
  }

  .no-article-found h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .article-detail-main {
    margin-top: 65px; /* Ajuste para header menor */
  }

  .blog-article-detail {
    padding: 1.5rem;
    border-radius: 10px;
  }

  .article-title {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  .article-meta {
    font-size: 0.85rem;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem;
  }

  .article-hero-image {
    height: 180px;
    border-radius: 8px;
  }

  .article-content {
    font-size: 0.95rem;
  }

  .article-content h2 {
    font-size: 1.4rem;
  }

  .article-content h3 {
    font-size: 1.1rem;
  }

  .article-tags {
    font-size: 0.9rem;
    gap: 0.6rem;
  }

  .article-tags .tag-item {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .related-articles-grid {
    grid-template-columns: 1fr;
  }

  .no-article-found h2 {
    font-size: 1.8rem;
  }

  .no-article-found p {
    font-size: 1rem;
  }

  .btn-back-to-blog {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
}
</style>
