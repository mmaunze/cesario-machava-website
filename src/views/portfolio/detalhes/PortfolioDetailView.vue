<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const project = ref(null);
const loading = ref(true);
const error = ref(null);
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://personal-portfolio-website-api.onrender.com/api";

const fetchProjectDetails = async (slug) => {
  loading.value = true;
  error.value = null;
  project.value = null;
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${slug}`);
    if (response.data && response.data.project) {
      project.value = response.data.project;
    } else {
      error.value = "Dados do projeto inválidos.";
    }
  } catch (err) {
    console.error("Erro ao buscar detalhes do projeto:", err);
    error.value =
      "Não foi possível carregar os detalhes do projeto. Tente novamente mais tarde.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProjectDetails(route.params.slug);
});

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      fetchProjectDetails(newSlug);
    }
  },
);

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-PT", options);
  } catch (e) {
    console.error("Erro ao formatar data:", e);
    return dateString;
  }
};

const formatStatus = (status) => {
  switch (status) {
    case "planning":
      return "Em Planeamento";
    case "in_progress":
      return "Em Progresso";
    case "completed":
      return "Concluído";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "N/A";
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "MZN",
  }).format(value);
};
</script>

<template>
  <main v-if="project">
    <section class="page-hero project-hero">
      <div class="container">
        <h1>{{ project.title }}</h1>
      </div>
    </section>

    <section class="project-details-content-wrapper">
      <div class="container project-details-layout">
        <div class="project-main-content">
          <div class="project-image-gallery">
            <img
              v-if="project.imageUrl"
              :src="project.imageUrl"
              :alt="project.title"
              class="main-project-image"
            />
            <div v-else class="no-image-placeholder">
              <img
                src="https://picsum.photos/200/300"
                :alt="project.title"
                class="main-project-image"
              />
            </div>
          </div>

          <div class="project-section">
            <h2>Visão Geral do Projeto</h2>
            <div v-html="project.fullDescription || project.description"></div>

            <p v-if="project.challenges">
              <strong>Desafios:</strong> {{ project.challenges }}
            </p>
            <p v-if="project.solutions">
              <strong>Soluções Implementadas:</strong> {{ project.solutions }}
            </p>
          </div>

          <div class="project-section" v-if="project.outcomes">
            <h2>Resultados e Impacto</h2>
            <ul>
              <li v-for="(outcome, index) in project.outcomes" :key="index">
                {{ outcome }}
              </li>
            </ul>
          </div>

          <div class="project-section" v-if="project.client">
            <h2>Cliente</h2>
            <p>{{ project.client }}</p>
          </div>

          <div class="project-section" v-if="project.projectUrl">
            <h2>Ver o Projeto Online</h2>
            <a
              :href="project.projectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-view-project"
            >
              Aceder ao Projeto
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                style="width: 20px; height: 20px; margin-left: 8px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>

          <div class="back-link">
            <router-link to="/portfolio" class="btn-back">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 20px; height: 20px; margin-right: 8px"
              >
                <path
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Voltar ao Portfólio
            </router-link>
          </div>
        </div>

        <aside class="project-sidebar-info">
          <div class="sidebar-block project-info-block">
            <h3>Detalhes do Projeto</h3>
            <ul>
              <li v-if="project.category">
                <strong>Categoria:</strong> {{ project.category }}
              </li>
              <li v-if="project.startDate">
                <strong>Início:</strong> {{ formatDate(project.startDate) }}
              </li>
              <li v-if="project.endDate">
                <strong>Conclusão:</strong> {{ formatDate(project.endDate) }}
              </li>
              <li v-if="project.status">
                <strong>Status:</strong> {{ formatStatus(project.status) }}
              </li>
              <li v-if="project.location">
                <strong>Localização:</strong> {{ project.location }}
              </li>
              <li v-if="project.budget">
                <strong>Orçamento:</strong> {{ formatCurrency(project.budget) }}
              </li>
            </ul>
          </div>

          <div
            class="sidebar-block project-tags-block"
            v-if="project.technologies && project.technologies.length > 0"
          >
            <h3>Tecnologias/Tags</h3>
            <div class="tag-cloud">
              <span
                v-for="tag in project.technologies"
                :key="tag"
                class="tag-item"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
  <div v-else class="loading-or-error-message container">
    <div v-if="loading" class="loading-message">
      <p>Carregando Projeto...</p>
      <div class="spinner"></div>
    </div>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>Projeto não encontrado.</p>
    <router-link to="/portfolio" class="btn-back">
      Voltar ao Portfólio
    </router-link>
  </div>
</template>

<style scoped>
@import "projecto.css";

.no-image-placeholder {
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
  border-radius: 8px;
}
</style>
