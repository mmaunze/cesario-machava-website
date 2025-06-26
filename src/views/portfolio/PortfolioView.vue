<template>
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Nosso Portfólio</h1>
        <p>
          Explore nossos projetos concluídos e veja a qualidade do nosso
          trabalho em engenharia civil, gestão e inovação.
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
          <div v-if="paginatedProjects.length > 0" class="projects-grid">
            <div
              v-for="project in paginatedProjects"
              :key="project.id"
              class="project-card animated"
            >
              <div class="project-image-container">
                <img
                  :src="project.image"
                  :alt="project.name"
                  class="project-image"
                />
              </div>
              <div class="project-content">
                <h4>{{ project.name }}</h4>
                <p>{{ project.description }}</p>
                <div class="project-meta">
                  <span>{{ project.category }}</span>
                  <span
                    >Concluído em:
                    {{ formatDate(project.completionDate) }}</span
                  >
                </div>
                <router-link
                  :to="{ name: 'PortfolioDetail', params: { id: project.id } }"
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

<script setup>
import { computed, onMounted, ref, watch } from "vue";

// --- Estado Reativo ---
const allPortfolioProjects = ref([
  {
    id: 101,
    name: "Construção do Edifício Corporativo Blue Sky",
    description:
      "Projeto de construção de um moderno edifício de escritórios com foco em sustentabilidade e eficiência energética.",
    category: "Edificações",
    tags: [
      "corporativo",
      "sustentabilidade",
      "construção",
      "eficiência energética",
    ],
    image:
      "https://via.placeholder.com/400x250/4B84CB/FFFFFF?text=EdificioBlueSky", // Exemplo de imagem
    completionDate: "2024-11-20",
    projectLink: "https://example.com/project/bluesky", // Link para a página do projeto
  },
  {
    id: 102,
    name: "Otimização de Redes de Saneamento Urbano",
    description:
      "Estudo e implementação de soluções para aprimorar a infraestrutura de saneamento em áreas urbanas densas.",
    category: "Infraestrutura",
    tags: ["saneamento", "urbano", "infraestrutura", "engenharia hídrica"],
    image:
      "https://via.placeholder.com/400x250/33A02C/FFFFFF?text=SaneamentoUrbano",
    completionDate: "2023-08-15",
    projectLink: "https://example.com/project/saneamento",
  },
  {
    id: 103,
    name: "Reabilitação da Ponte Histórica Rio Claro",
    description:
      "Projeto de engenharia de recuperação estrutural e restauro estético de uma ponte centenária.",
    category: "Restauro",
    tags: ["pontes", "restauro", "engenharia estrutural", "histórico"],
    image:
      "https://via.placeholder.com/400x250/C1573A/FFFFFF?text=PonteRioClaro",
    completionDate: "2024-03-10",
    projectLink: "https://example.com/project/rioclaro",
  },
  {
    id: 104,
    name: "Plano Diretor de Desenvolvimento Urbano Sustentável",
    description:
      "Elaboração de um plano estratégico para o crescimento urbano com princípios de sustentabilidade e resiliência.",
    category: "Planejamento Urbano",
    tags: ["planejamento", "urbano", "sustentabilidade", "resiliência"],
    image:
      "https://via.placeholder.com/400x250/6A3D9A/FFFFFF?text=PlanoDiretor",
    completionDate: "2025-01-25",
    projectLink: "https://example.com/project/planodiretor",
  },
  {
    id: 105,
    name: "Gestão de Resíduos em Grande Escala Industrial",
    description:
      "Consultoria e implementação de sistemas de gestão de resíduos sólidos para complexos industriais.",
    category: "Gestão Ambiental",
    tags: ["resíduos", "industrial", "gestão ambiental", "sustentabilidade"],
    image:
      "https://via.placeholder.com/400x250/FF7F00/FFFFFF?text=ResiduosIndustriais",
    completionDate: "2024-07-01",
    projectLink: "https://example.com/project/residuos",
  },
  {
    id: 106,
    name: "Automação e Otimização de Canteiros de Obra",
    description:
      "Implementação de tecnologias de automação e IoT para aumentar a eficiência e segurança em canteiros de obra.",
    category: "Inovação",
    tags: ["automação", "IoT", "canteiro de obra", "inovação", "eficiência"],
    image:
      "https://via.placeholder.com/400x250/1F78B4/FFFFFF?text=AutomacaoCanteiro",
    completionDate: "2023-11-30",
    projectLink: "https://example.com/project/automacao",
  },
  {
    id: 107,
    name: "Projeto de Parque Urbano Verde Vivo",
    description:
      "Criação de um novo espaço público com foco em áreas verdes, lazer e infraestrutura sustentável.",
    category: "Paisagismo Urbano",
    tags: ["paisagismo", "parque", "urbano", "lazer", "espaços públicos"],
    image:
      "https://via.placeholder.com/400x250/B2DF8A/333333?text=ParqueVerdeVivo",
    completionDate: "2024-09-05",
    projectLink: "https://example.com/project/parquevivo",
  },
]);

const searchQuery = ref("");
const selectedCategory = ref(null); // null means "All Categories"
const selectedTags = ref([]); // Array para tags selecionadas

const currentPage = ref(1);
const projectsPerPage = ref(6); // Mantido em 6 itens por página

// --- Computed Properties ---

// Projetos filtrados por pesquisa, categoria e tags
const filteredProjects = computed(() => {
  let projects = allPortfolioProjects.value;

  // Filtrar por pesquisa
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    projects = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  // Filtrar por categoria
  if (selectedCategory.value) {
    projects = projects.filter(
      (project) => project.category === selectedCategory.value,
    );
  }

  // Filtrar por tags (lógica AND: o projeto deve ter TODAS as tags selecionadas)
  if (selectedTags.value.length > 0) {
    projects = projects.filter((project) =>
      selectedTags.value.every((tag) => project.tags.includes(tag)),
    );
  }

  return projects;
});

// Projetos para a página atual (após filtragem)
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage.value;
  const end = start + projectsPerPage.value;
  return filteredProjects.value.slice(start, end);
});

// Total de páginas necessário para os projetos filtrados
const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / projectsPerPage.value);
});

// Lista de categorias dinamicamente gerada com contagens
const uniqueCategories = computed(() => {
  const categories = new Set();
  allPortfolioProjects.value.forEach((project) =>
    categories.add(project.category),
  );
  return Array.from(categories).sort();
});

const getCategoryCount = (category) => {
  return allPortfolioProjects.value.filter(
    (project) => project.category === category,
  ).length;
};

const allProjectsCount = computed(() => allPortfolioProjects.value.length);

// Lista de tags dinamicamente gerada
const uniqueTags = computed(() => {
  const tags = new Set();
  allPortfolioProjects.value.forEach((project) =>
    project.tags.forEach((tag) => tags.add(tag)),
  );
  return Array.from(tags).sort();
});

// --- Funções ---

// Função para mudar o filtro de categoria e resetar a página
const filterByCategory = (categoryName) => {
  selectedCategory.value = categoryName;
  currentPage.value = 1; // Resetar para a primeira página ao mudar a categoria
};

// Função para adicionar/remover tags do array selectedTags
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

// Função para mudar a página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" }); // Opcional: rolar para o topo da página
  }
};

// Função para formatar a data
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-PT", options);
};

// Observa mudanças nos projetos filtrados para resetar a página se a lista ficar vazia ou mudar drasticamente
watch(
  [filteredProjects, searchQuery, selectedCategory, selectedTags],
  () => {
    currentPage.value = 1; // Sempre resetar a página para 1 quando os filtros mudam
  },
  { immediate: true },
); // Executar imediatamente para configurar a página inicial

// --- ANIMATIONS ---
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1, // Ativa quando 10% do elemento está visível
    },
  );

  // Observa todos os cards de projeto para animação
  document.querySelectorAll(".project-card.animated").forEach((card) => {
    observer.observe(card);
  });
});
</script>

<style scoped>
@import "portfolio.css";
</style>
