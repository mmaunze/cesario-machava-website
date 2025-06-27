<script setup>
import { computed, onMounted, ref, watch } from "vue";

import api from "@/services/api";

const allBlogPosts = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPosts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await api.getAllPosts();

    allBlogPosts.value = response.posts;
  } catch (err) {
    console.error("Erro ao buscar posts:", err);
    error.value =
      "Não foi possível carregar os posts. Por favor, tente novamente mais tarde.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPosts();

  watch(
    paginatedPosts,
    () => {
      requestAnimationFrame(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              } else {
                entry.target.classList.remove("visible");
              }
            });
          },
          {
            threshold: 0.1,
          },
        );

        document.querySelectorAll(".blog-card.animated").forEach((card) => {
          if (!card.classList.contains("visible")) {
            observer.observe(card);
          }
        });
      });
    },
    { immediate: true },
  );
});

const searchQuery = ref("");
const selectedCategory = ref(null);
const selectedTags = ref([]);

const filteredPosts = computed(() => {
  let posts = allBlogPosts.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags &&
          Array.isArray(post.tags) &&
          post.tags.some((tag) => tag.toLowerCase().includes(query))),
    );
  }

  if (selectedCategory.value) {
    posts = posts.filter((post) => post.category === selectedCategory.value);
  }

  if (selectedTags.value.length > 0) {
    posts = posts.filter(
      (post) =>
        post.tags &&
        Array.isArray(post.tags) &&
        selectedTags.value.every((tag) => post.tags.includes(tag)),
    );
  }

  return posts;
});

const uniqueCategories = computed(() => {
  const categories = new Set();
  allBlogPosts.value.forEach((post) => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories).sort();
});

const getCategoryCount = (category) => {
  return allBlogPosts.value.filter((post) => post.category === category).length;
};

const allCategoriesCount = computed(() => allBlogPosts.value.length);

const uniqueTags = computed(() => {
  const tags = new Set();
  allBlogPosts.value.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
});

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

const postsPerPage = 4;
const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage);
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

watch([searchQuery, selectedCategory, selectedTags], () => {
  currentPage.value = 1;
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-PT", options);
};

const calculateReadTime = (content) => {
  if (!content) return 0;

  const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, "");
  const wordsPerMinute = 200;
  const wordCount = cleanContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const getCategoryColor = (category) => {
  const colors = {
    "Gestão de Ativos": "var(--primary-blue)",
    "Otimização de Processos": "var(--primary-orange)",
    "Risco Operacional": "var(--primary-green)",
    Sustentabilidade: "var(--accent-teal)",
    Tecnologia: "var(--secondary-blue)",
    Planeamento: "var(--secondary-orange)",
    "Gestão de Projetos": "var(--primary-blue)",
  };
  return colors[category] || "var(--text-muted)";
};
</script>

<template>
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Meu Blog</h1>
        <p>
          Reflexões, artigos e insights sobre engenharia, gestão e inovação.
        </p>
      </div>
    </section>

    <section class="blog-content-wrapper">
      <div class="container blog-layout">
        <div class="blog-main">
          <div v-if="loading" class="loading-message">
            <p>Carregando posts...</p>
            <div class="spinner"></div>
          </div>
          <div v-else-if="error" class="error-message">
            <p>{{ error }}</p>
            <button class="btn-retry" @click="fetchPosts">
              Tentar Novamente
            </button>
          </div>
          <div v-else-if="paginatedPosts.length > 0" class="blog-grid">
            <div
              v-for="post in paginatedPosts"
              :key="post.id"
              class="blog-card animated"
            >
              <img
                :alt="post.title"
                :src="post.imageUrl || 'https://picsum.photos/200/300'"
                class="blog-card-image"
              />
              <div class="blog-card-content">
                <span
                  :style="{ backgroundColor: getCategoryColor(post.category) }"
                  class="blog-category"
                  >{{ post.category }}</span
                >
                <h3>{{ post.title }}</h3>
                <p class="blog-excerpt">{{ post.excerpt }}</p>
                <div class="blog-meta">
                  <span>{{ post.author }}</span>
                  <span>•</span>
                  <span>{{ formatDate(post.publishDate) }}</span>
                  <span>•</span>
                  <span
                    >{{ calculateReadTime(post.fullContent) }} min de
                    leitura</span
                  >
                </div>
                <router-link :to="`/blog/${post.slug}`" class="read-more-link">
                  Ler Mais
                  <svg
                    fill="currentColor"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
          <div v-else class="no-results">
            <p>Nenhum post encontrado com os critérios de filtro.</p>
          </div>

          <div v-if="totalPages > 1" class="pagination">
            <button
              :disabled="currentPage === 1"
              class="pagination-btn"
              @click="currentPage--"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                style="width: 20px; height: 20px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
              class="pagination-btn"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button
              :disabled="currentPage === totalPages"
              class="pagination-btn"
              @click="currentPage++"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                style="width: 20px; height: 20px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <aside class="blog-sidebar">
          <div class="sidebar-block search-block">
            <h3>Pesquisar</h3>
            <div class="search-input-wrapper">
              <input
                v-model="searchQuery"
                class="search-input"
                placeholder="Pesquisar posts..."
                type="text"
              />
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div class="sidebar-block category-block">
            <h3>Categorias</h3>
            <ul class="filter-list">
              <li
                :class="{ active: selectedCategory === null }"
                @click="selectedCategory = null"
              >
                Todas as Categorias
                <span class="count">({{ allCategoriesCount }})</span>
              </li>
              <li
                v-for="category in uniqueCategories"
                :key="category"
                :class="{ active: selectedCategory === category }"
                @click="selectedCategory = category"
              >
                {{ category }}
                <span class="count">({{ getCategoryCount(category) }})</span>
              </li>
            </ul>
          </div>

          <div class="sidebar-block tags-block">
            <h3>Tags</h3>
            <div class="tag-cloud">
              <span
                v-for="tag in uniqueTags"
                :key="tag"
                :class="{ active: selectedTags.includes(tag) }"
                class="tag-item"
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </span>
              <span
                v-if="selectedTags.length > 0"
                class="clear-filters"
                @click="selectedTags = []"
                >Limpar Tags</span
              >
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import "blog.css";
</style>
