<script setup>
import { computed, onMounted, ref, watch } from "vue";
import api from "@/services/api";

const allPortfolioProjects = ref([]);
const loading = ref(true);
const error = ref(null);

const searchQuery = ref("");
const selectedCategory = ref(null);
const selectedTags = ref([]);

const currentPage = ref(1);
const projectsPerPage = ref(6);

const fetchProjects = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await api.getAllProjects();

    allPortfolioProjects.value = response.projects.map((project) => ({
      ...project,

      name: project.title,
      description: project.description.replace(/<\/?[^>]+(>|$)/g, ""),
      completionDate: project.endDate || project.createdAt,

      tags:
        project.technologies && Array.isArray(project.technologies)
          ? project.technologies.map((tech) => tech.name || tech)
          : [],
    }));
  } catch (err) {
    console.error("Erro ao buscar projetos:", err);
    error.value =
      "Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProjects();

  watch(
    paginatedProjects,
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

        document.querySelectorAll(".project-card.animated").forEach((card) => {
          if (!card.classList.contains("visible")) {
            observer.observe(card);
          }
        });
      });
    },
    { immediate: true },
  );
});

const filteredProjects = computed(() => {
  let projects = allPortfolioProjects.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    projects = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        (project.tags &&
          Array.isArray(project.tags) &&
          project.tags.some((tag) => tag.toLowerCase().includes(query))),
    );
  }

  if (selectedCategory.value) {
    projects = projects.filter(
      (project) => project.category === selectedCategory.value,
    );
  }

  if (selectedTags.value.length > 0) {
    projects = projects.filter(
      (project) =>
        project.tags &&
        Array.isArray(project.tags) &&
        selectedTags.value.every((tag) => project.tags.includes(tag)),
    );
  }

  return projects;
});

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage.value;
  const end = start + projectsPerPage.value;
  return filteredProjects.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / projectsPerPage.value);
});

const uniqueCategories = computed(() => {
  const categories = new Set();
  allPortfolioProjects.value.forEach((project) => {
    if (project.category) categories.add(project.category);
  });
  return Array.from(categories).sort();
});

const getCategoryCount = (category) => {
  return allPortfolioProjects.value.filter(
    (project) => project.category === category,
  ).length;
};

const allProjectsCount = computed(() => allPortfolioProjects.value.length);

const uniqueTags = computed(() => {
  const tags = new Set();
  allPortfolioProjects.value.forEach((project) => {
    if (project.tags && Array.isArray(project.tags)) {
      project.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
});

const filterByCategory = (categoryName) => {
  selectedCategory.value = categoryName;
  currentPage.value = 1;
};

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-PT", options);
};

watch(
  [filteredProjects, searchQuery, selectedCategory, selectedTags],
  () => {
    currentPage.value = 1;
  },
  { immediate: true },
);
</script>

<template>
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Meu Portfólio</h1>
        <p>
          Explore meus projetos concluídos e veja a qualidade do meu trabalho em
          engenharia civil, gestão e inovação.
        </p>
      </div>
    </section>

    <section class="portfolio-content-wrapper">
      <div class="container portfolio-layout">
        <aside class="portfolio-sidebar">
          <div class="sidebar-block search-block">
            <h3>Pesquisar</h3>
            <div class="search-input-wrapper">
              <input
                v-model="searchQuery"
                class="search-input"
                placeholder="Pesquisar projetos..."
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5.7.5 0 0010.607 10.607Z"
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
                @click="filterByCategory(null)"
              >
                Todas as Categorias
                <span class="count">({{ allProjectsCount }})</span>
              </li>
              <li
                v-for="category in uniqueCategories"
                :key="category"
                :class="{ active: selectedCategory === category }"
                @click="filterByCategory(category)"
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

        <div class="portfolio-main">
          <div v-if="loading" class="loading-message">
            <p>Carregando projetos...</p>
            <div class="spinner"></div>
          </div>
          <div v-else-if="error" class="error-message">
            <p>{{ error }}</p>
            <button class="btn-retry" @click="fetchProjects">
              Tentar Novamente
            </button>
          </div>
          <div v-else-if="paginatedProjects.length > 0" class="projects-grid">
            <div
              v-for="project in paginatedProjects"
              :key="project.id"
              class="project-card animated"
            >
              <div class="project-image-container">
                <img
                  src="https://picsum.photos/200/300"
                  :alt="project.title"
                  class="project-image"
                />
              </div>
              <div class="project-content">
                <h4>{{ project.title }}</h4>
                <div class="project-meta">
                  <span>{{ project.category }}</span>
                  <span
                    >Concluído em:
                    {{ formatDate(project.completionDate) }}</span
                  >
                </div>
                <router-link
                  :to="{
                    name: 'PortfolioDetail',
                    params: { slug: project.slug },
                  }"
                  class="btn-view-project"
                >
                  Ver Projeto
                </router-link>
              </div>
            </div>
          </div>
          <div v-else class="no-projects-message">
            Nenhum projeto encontrado com os critérios de filtro.
          </div>

          <div v-if="totalPages > 1" class="pagination">
            <button
              :disabled="currentPage === 1"
              class="pagination-btn pagination-prev"
              @click="changePage(currentPage - 1)"
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
              @click="changePage(page)"
            >
              {{ page }}
            </button>
            <button
              :disabled="currentPage === totalPages"
              class="pagination-btn pagination-next"
              @click="changePage(currentPage + 1)"
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
      </div>
    </section>
  </main>
</template>

<style scoped>
@import "portfolio.css";
</style>
