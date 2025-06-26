<template>
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Recursos para Download</h1>
        <p>
          Aceda a guias, relatórios e templates úteis sobre engenharia civil,
          gestão e inovação.
        </p>
      </div>
    </section>

    <section class="downloads-content-wrapper">
      <div class="container downloads-layout">
        <aside class="downloads-sidebar">
          <div class="sidebar-block search-block">
            <h3>Pesquisar</h3>
            <div class="search-input-wrapper">
              <input
                v-model="searchQuery"
                class="search-input"
                placeholder="Pesquisar ficheiros..."
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0010.607 10.607Z"
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
                <span class="count">({{ allFilesCount }})</span>
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

        <div class="downloads-main">
          <div v-if="paginatedFiles.length > 0" class="files-grid">
            <div
              v-for="file in paginatedFiles"
              :key="file.id"
              class="file-card animated"
            >
              <div class="file-icon-container">
                <div class="file-icon" v-html="getFileIcon(file.name)"></div>
              </div>
              <div class="file-content">
                <h4>{{ file.name }}</h4>
                <p>{{ file.description }}</p>
                <div class="file-meta">
                  <span>{{ file.category }}</span>
                  <span>{{ file.size }}</span>
                  <span>{{ formatDate(file.uploadDate) }}</span>
                </div>
                <a
                  :download="file.name"
                  :href="file.downloadLink"
                  class="btn-download"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    style="width: 20px; height: 20px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Baixar
                </a>
              </div>
            </div>
          </div>
          <div v-else class="no-files-message">
            Nenhum ficheiro encontrado com os critérios de filtro.
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
const allDownloadableFiles = ref([
  {
    id: 1,
    name: "Relatório de Gestão de Ativos 2024.pdf",
    description:
      "Relatório abrangente sobre as últimas tendências e melhores práticas em gestão de ativos.",
    category: "Relatórios",
    tags: ["gestão", "ativos", "relatório"],
    size: "2.5 MB",
    uploadDate: "2025-06-15",
    downloadLink: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 2,
    name: "Guia Prático de Lean Six Sigma.docx",
    description:
      "Um guia passo-a-passar para implementar a metodologia Lean Six Sigma e otimizar processos.",
    category: "Guias",
    tags: ["lean", "six sigma", "otimização", "processos"],
    size: "1.2 MB",
    uploadDate: "2025-05-20",
    downloadLink:
      "https://docs.google.com/document/d/1Xl20W6J8E3b_f0g-P9Q4H_zP5c8z6Q2o/export?format=docx",
  },
  {
    id: 3,
    name: "Template de Cronograma de Projeto.xlsx",
    description:
      "Um template personalizável para gerir cronogramas de projetos de engenharia civil.",
    category: "Templates",
    tags: ["templates", "projetos", "cronograma", "engenharia"],
    size: "500 KB",
    uploadDate: "2025-04-10",
    downloadLink:
      "https://file-examples.com/wp-content/uploads/2017/02/file_example_XLSX_10.xlsx",
  },
  {
    id: 4,
    name: "Checklist de Avaliação de Risco Operacional.pdf",
    description:
      "Um checklist detalhado para identificar e avaliar riscos operacionais em qualquer projeto.",
    category: "Guias",
    tags: ["risco", "segurança", "checklist"],
    size: "1.8 MB",
    uploadDate: "2025-03-28",
    downloadLink: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 5,
    name: "Artigo: Sustentabilidade na Construção.pdf",
    description:
      "Um artigo aprofundado sobre práticas de construção sustentável e seus benefícios ambientais.",
    category: "Artigos",
    tags: ["sustentabilidade", "construção", "ambiental"],
    size: "3.1 MB",
    uploadDate: "2025-03-01",
    downloadLink: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 6,
    name: "Estudo de Caso: Otimização de Processos.pptx",
    description:
      "Análise de um caso real de otimização de processos utilizando princípios de engenharia de produção.",
    category: "Estudos de Caso",
    tags: ["otimização", "processos", "estudo de caso"],
    size: "4.7 MB",
    uploadDate: "2025-02-18",
    downloadLink:
      "https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx",
  },
  {
    id: 7,
    name: "Guia de Boas Práticas em Saneamento.pdf",
    description:
      "Um guia essencial para projetos de saneamento e infraestrutura hídrica.",
    category: "Guias",
    tags: ["saneamento", "infraestrutura", "guia"],
    size: "2.1 MB",
    uploadDate: "2025-01-25",
    downloadLink: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 8,
    name: "Relatório Anual de Inovação.pdf",
    description:
      "Destaques e progressos em inovação e novas tecnologias na engenharia.",
    category: "Relatórios",
    tags: ["inovação", "tecnologia", "relatório"],
    size: "3.5 MB",
    uploadDate: "2024-12-10",
    downloadLink: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 9,
    name: "Template de Orçamento de Obra.xlsx",
    description:
      "Modelo personalizável para elaboração de orçamentos detalhados de projetos de construção.",
    category: "Templates",
    tags: ["orçamento", "construção", "template"],
    size: "700 KB",
    uploadDate: "2024-11-05",
    downloadLink:
      "https://file-examples.com/wp-content/uploads/2017/02/file_example_XLSX_10.xlsx",
  },
  {
    id: 10,
    name: "Manual de Segurança em Canteiro.pdf",
    description:
      "Diretrizes e procedimentos para garantir a segurança no local de trabalho em obras civis.",
    category: "Guias",
    tags: ["segurança", "canteiro", "manual"],
    size: "1.9 MB",
    uploadDate: "2024-10-18",
    downloadLink: "https://www.africau.edu/images/default/sample.pdf",
  },
]);

const searchQuery = ref("");
const selectedCategory = ref(null); // null means "All Categories"
const selectedTags = ref([]); // Array para tags selecionadas

const currentPage = ref(1);
const filesPerPage = ref(6); // Mantido em 6, como estava no código original para Downloads

// --- Computed Properties ---

// Ficheiros filtrados por pesquisa, categoria e tags
const filteredFiles = computed(() => {
  let files = allDownloadableFiles.value;

  // Filtrar por pesquisa
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    files = files.filter(
      (file) =>
        file.name.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query) ||
        file.category.toLowerCase().includes(query) ||
        file.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  // Filtrar por categoria
  if (selectedCategory.value) {
    files = files.filter((file) => file.category === selectedCategory.value);
  }

  // Filtrar por tags (lógica AND: o ficheiro deve ter TODAS as tags selecionadas)
  if (selectedTags.value.length > 0) {
    files = files.filter((file) =>
      selectedTags.value.every((tag) => file.tags.includes(tag)),
    );
  }

  return files;
});

// Ficheiros para a página atual (após filtragem)
const paginatedFiles = computed(() => {
  const start = (currentPage.value - 1) * filesPerPage.value;
  const end = start + filesPerPage.value;
  return filteredFiles.value.slice(start, end);
});

// Total de páginas necessário para os ficheiros filtrados
const totalPages = computed(() => {
  return Math.ceil(filteredFiles.value.length / filesPerPage.value);
});

// Lista de categorias dinamicamente gerada com contagens
const uniqueCategories = computed(() => {
  const categories = new Set();
  allDownloadableFiles.value.forEach((file) => categories.add(file.category));
  return Array.from(categories).sort();
});

const getCategoryCount = (category) => {
  return allDownloadableFiles.value.filter((file) => file.category === category)
    .length;
};

const allFilesCount = computed(() => allDownloadableFiles.value.length);

// Lista de tags dinamicamente gerada
const uniqueTags = computed(() => {
  const tags = new Set();
  allDownloadableFiles.value.forEach((file) =>
    file.tags.forEach((tag) => tags.add(tag)),
  );
  return Array.from(tags).sort();
});

// --- Funções ---

// Função para obter o ícone SVG com base na extensão do ficheiro (mais genérico/realista)
const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "pdf":
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 22.5a.75.75 0 000-1.5H21v-6.75a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v6.75H12a.75.75 0 000 1.5h6.75zM12 2.25a.75.75 0 01.75-.75h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-6.75a.75.75 0 01-.75-.75V2.25zM12 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H12zM3.75 2.25A.75.75 0 014.5 1.5h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H4.5A.75.75 0 013.75 9V2.25zM3.75 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H3.75z" /></svg>'; // Exemplo de ícone de PDF
    case "docx":
    case "doc":
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5 21a.75.75 0 00-.75.75V21h-2.25A.75.75 0 007.5 21v-.75H4.5a.75.75 0 00-.75.75v-6.75a.75.75 0 00.75-.75h.75V4.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75V18h-.75a.75.75 0 000 1.5H3v.75a.75.75 0 00.75.75H21v-.75a.75.75 0 00.75-.75H21v-6.75a.75.75 0 00-.75-.75H13.5a.75.75 0 00-.75.75v6.75h-.75a.75.75 0 000 1.5h-.75zM12 2.25a.75.75 0 01.75-.75h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-6.75a.75.75 0 01-.75-.75V2.25zM12 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H12zM3.75 2.25A.75.75 0 014.5 1.5h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H4.5A.75.75 0 013.75 9V2.25zM3.75 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H3.75z" /></svg>'; // Exemplo de ícone de documento
    case "xlsx":
    case "xls":
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7.5a.75.75 0 00-.75-.75H3.75A.75.75 0 003 7.5v9a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V7.5zM18.75 8.25h-3.75v2.25h3.75V8.25zM15 11.25H11.25v2.25H15v-2.25zM11.25 8.25H7.5v2.25h3.75V8.25zM7.5 11.25H3.75v2.25h3.75v-2.25zM18.75 11.25h-3.75v2.25h3.75v-2.25zM15 14.25H11.25v2.25H15v-2.25zM11.25 14.25H7.5v2.25h3.75v-2.25zM7.5 14.25H3.75v2.25h3.75v-2.25z" /></svg>'; // Exemplo de ícone de planilha
    case "pptx":
    case "ppt":
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 8.25V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V8.25m18 0H3.75l8.25-6 8.25 6zm-1.5 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-.75-3h.008v.008h-.008V11.25zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15.75z" /></svg>'; // Exemplo de ícone de apresentação
    default:
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 22.5a.75.75 0 000-1.5H21v-6.75a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v6.75H12a.75.75 0 000 1.5h6.75zM12 2.25a.75.75 0 01.75-.75h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-6.75a.75.75 0 01-.75-.75V2.25zM12 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H12zM3.75 2.25A.75.75 0 014.5 1.5h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H4.5A.75.75 0 013.75 9V2.25zM3.75 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H3.75z" /></svg>'; // Ícone genérico de ficheiro
  }
};

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

// Função para formatar a userInfo
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-PT", options);
};

// Observa mudanças nos ficheiros filtrados para resetar a página se a lista ficar vazia ou mudar drasticamente
watch(
  [filteredFiles, searchQuery, selectedCategory, selectedTags],
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

  // Observa todos os cards de ficheiro para animação
  document.querySelectorAll(".file-card.animated").forEach((card) => {
    observer.observe(card);
  });
});
</script>

<style scoped>
@import "download.css";
</style>
