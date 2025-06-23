<template>
  <Header />
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Recursos para Download</h1>
        <p>Aceda a guias, relatórios e templates úteis sobre engenharia civil, gestão e inovação.</p>
      </div>
    </section>

    <section class="downloads-content-wrapper">
      <div class="container downloads-layout">
        <aside class="downloads-sidebar">
          <div class="sidebar-block search-block">
            <h3>Pesquisar</h3>
            <div class="search-input-wrapper">
              <input type="text" v-model="searchQuery" placeholder="Pesquisar ficheiros..." class="search-input">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0010.607 10.607Z" />
              </svg>
            </div>
          </div>

          <div class="sidebar-block category-block">
            <h3>Categorias</h3>
            <ul class="filter-list">
              <li :class="{ 'active': selectedCategory === null }" @click="filterByCategory(null)">
                Todas as Categorias <span class="count">({{ allFilesCount }})</span>
              </li>
              <li v-for="category in uniqueCategories" :key="category"
                  :class="{ 'active': selectedCategory === category }" @click="filterByCategory(category)">
                {{ category }} <span class="count">({{ getCategoryCount(category) }})</span>
              </li>
            </ul>
          </div>

          <div class="sidebar-block tags-block">
            <h3>Tags</h3>
            <div class="tag-cloud">
              <span v-for="tag in uniqueTags" :key="tag"
                    :class="{ 'active': selectedTags.includes(tag) }" @click="toggleTag(tag)" class="tag-item">
                {{ tag }}
              </span>
              <span v-if="selectedTags.length > 0" class="clear-filters" @click="selectedTags = []">Limpar Tags</span>
            </div>
          </div>
        </aside>

        <div class="downloads-main">
          <div v-if="paginatedFiles.length > 0" class="files-grid">
            <div v-for="file in paginatedFiles" :key="file.id" class="file-card animated">
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
                <a :href="file.downloadLink" class="btn-download" :download="file.name" target="_blank"
                   rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" style="width: 20px; height: 20px;">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25" />
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
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                    class="pagination-btn pagination-prev">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                    :class="{ 'active': currentPage === page }" class="pagination-btn">
              {{ page }}
            </button>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                    class="pagination-btn pagination-next">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// --- Estado Reativo ---
const allDownloadableFiles = ref([
  {
    id: 1,
    name: 'Relatório de Gestão de Ativos 2024.pdf',
    description: 'Relatório abrangente sobre as últimas tendências e melhores práticas em gestão de ativos.',
    category: 'Relatórios',
    tags: ['gestão', 'ativos', 'relatório'],
    size: '2.5 MB',
    uploadDate: '2025-06-15',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 2,
    name: 'Guia Prático de Lean Six Sigma.docx',
    description: 'Um guia passo-a-passar para implementar a metodologia Lean Six Sigma e otimizar processos.',
    category: 'Guias',
    tags: ['lean', 'six sigma', 'otimização', 'processos'],
    size: '1.2 MB',
    uploadDate: '2025-05-20',
    downloadLink: 'https://docs.google.com/document/d/1Xl20W6J8E3b_f0g-P9Q4H_zP5c8z6Q2o/export?format=docx'
  },
  {
    id: 3,
    name: 'Template de Cronograma de Projeto.xlsx',
    description: 'Um template personalizável para gerir cronogramas de projetos de engenharia civil.',
    category: 'Templates',
    tags: ['templates', 'projetos', 'cronograma', 'engenharia'],
    size: '500 KB',
    uploadDate: '2025-04-10',
    downloadLink: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLSX_10.xlsx'
  },
  {
    id: 4,
    name: 'Checklist de Avaliação de Risco Operacional.pdf',
    description: 'Um checklist detalhado para identificar e avaliar riscos operacionais em qualquer projeto.',
    category: 'Guias',
    tags: ['risco', 'segurança', 'checklist'],
    size: '1.8 MB',
    uploadDate: '2025-03-28',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 5,
    name: 'Artigo: Sustentabilidade na Construção.pdf',
    description: 'Um artigo aprofundado sobre práticas de construção sustentável e seus benefícios ambientais.',
    category: 'Artigos',
    tags: ['sustentabilidade', 'construção', 'ambiental'],
    size: '3.1 MB',
    uploadDate: '2025-03-01',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 6,
    name: 'Estudo de Caso: Otimização de Processos.pptx',
    description: 'Análise de um caso real de otimização de processos utilizando princípios de engenharia de produção.',
    category: 'Estudos de Caso',
    tags: ['otimização', 'processos', 'estudo de caso'],
    size: '4.7 MB',
    uploadDate: '2025-02-18',
    downloadLink: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx'
  },
  {
    id: 7,
    name: 'Guia de Boas Práticas em Saneamento.pdf',
    description: 'Um guia essencial para projetos de saneamento e infraestrutura hídrica.',
    category: 'Guias',
    tags: ['saneamento', 'infraestrutura', 'guia'],
    size: '2.1 MB',
    uploadDate: '2025-01-25',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 8,
    name: 'Relatório Anual de Inovação.pdf',
    description: 'Destaques e progressos em inovação e novas tecnologias na engenharia.',
    category: 'Relatórios',
    tags: ['inovação', 'tecnologia', 'relatório'],
    size: '3.5 MB',
    uploadDate: '2024-12-10',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 9,
    name: 'Template de Orçamento de Obra.xlsx',
    description: 'Modelo personalizável para elaboração de orçamentos detalhados de projetos de construção.',
    category: 'Templates',
    tags: ['orçamento', 'construção', 'template'],
    size: '700 KB',
    uploadDate: '2024-11-05',
    downloadLink: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLSX_10.xlsx'
  },
  {
    id: 10,
    name: 'Manual de Segurança em Canteiro.pdf',
    description: 'Diretrizes e procedimentos para garantir a segurança no local de trabalho em obras civis.',
    category: 'Guias',
    tags: ['segurança', 'canteiro', 'manual'],
    size: '1.9 MB',
    uploadDate: '2024-10-18',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
]);

const searchQuery = ref('');
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
    files = files.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query) ||
        file.category.toLowerCase().includes(query) ||
        file.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Filtrar por categoria
  if (selectedCategory.value) {
    files = files.filter(file => file.category === selectedCategory.value);
  }

  // Filtrar por tags (lógica AND: o ficheiro deve ter TODAS as tags selecionadas)
  if (selectedTags.value.length > 0) {
    files = files.filter(file =>
        selectedTags.value.every(tag => file.tags.includes(tag))
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
  allDownloadableFiles.value.forEach(file => categories.add(file.category));
  return Array.from(categories).sort();
});

const getCategoryCount = (category) => {
  return allDownloadableFiles.value.filter(file => file.category === category).length;
};

const allFilesCount = computed(() => allDownloadableFiles.value.length);


// Lista de tags dinamicamente gerada
const uniqueTags = computed(() => {
  const tags = new Set();
  allDownloadableFiles.value.forEach(file => file.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
});

// --- Funções ---

// Função para obter o ícone SVG com base na extensão do ficheiro (mais genérico/realista)
const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 22.5a.75.75 0 000-1.5H21v-6.75a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v6.75H12a.75.75 0 000 1.5h6.75zM12 2.25a.75.75 0 01.75-.75h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-6.75a.75.75 0 01-.75-.75V2.25zM12 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H12zM3.75 2.25A.75.75 0 014.5 1.5h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H4.5A.75.75 0 013.75 9V2.25zM3.75 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H3.75z" /></svg>'; // Exemplo de ícone de PDF
    case 'docx':
    case 'doc':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5 21a.75.75 0 00-.75.75V21h-2.25A.75.75 0 007.5 21v-.75H4.5a.75.75 0 00-.75.75v-6.75a.75.75 0 00.75-.75h.75V4.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75V18h-.75a.75.75 0 000 1.5H3v.75a.75.75 0 00.75.75H21v-.75a.75.75 0 00.75-.75H21v-6.75a.75.75 0 00-.75-.75H13.5a.75.75 0 00-.75.75v6.75h-.75a.75.75 0 000 1.5h-.75zM12 2.25a.75.75 0 01.75-.75h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-6.75a.75.75 0 01-.75-.75V2.25zM12 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H12zM3.75 2.25A.75.75 0 014.5 1.5h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H4.5A.75.75 0 013.75 9V2.25zM3.75 12.75a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H3.75z" /></svg>'; // Exemplo de ícone de documento
    case 'xlsx':
    case 'xls':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7.5a.75.75 0 00-.75-.75H3.75A.75.75 0 003 7.5v9a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V7.5zM18.75 8.25h-3.75v2.25h3.75V8.25zM15 11.25H11.25v2.25H15v-2.25zM11.25 8.25H7.5v2.25h3.75V8.25zM7.5 11.25H3.75v2.25h3.75v-2.25zM18.75 11.25h-3.75v2.25h3.75v-2.25zM15 14.25H11.25v2.25H15v-2.25zM11.25 14.25H7.5v2.25h3.75v-2.25zM7.5 14.25H3.75v2.25h3.75v-2.25z" /></svg>'; // Exemplo de ícone de planilha
    case 'pptx':
    case 'ppt':
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
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcional: rolar para o topo da página
  }
};

// Função para formatar a data
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

// Observa mudanças nos ficheiros filtrados para resetar a página se a lista ficar vazia ou mudar drasticamente
watch([filteredFiles, searchQuery, selectedCategory, selectedTags], () => {
  currentPage.value = 1; // Sempre resetar a página para 1 quando os filtros mudam
}, { immediate: true }); // Executar imediatamente para configurar a página inicial


// --- ANIMATIONS ---
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1 // Ativa quando 10% do elemento está visível
  });

  // Observa todos os cards de ficheiro para animação
  document.querySelectorAll('.file-card.animated').forEach(card => {
    observer.observe(card);
  });
});
</script>

<style scoped>
/*
  IMPORTANTE: As variáveis CSS (--primary-blue, --bg-body, etc.)
  já devem estar definidas no seu arquivo src/App.vue (estilos globais).
  Este arquivo DownloadView.vue apenas referenciará essas variáveis.

  A largura máxima de 2016px para o conteúdo principal deve ser gerenciada
  no `App.vue` ou em um layout wrapper, não diretamente aqui para o container,
  que deve ter max-width: 1200px para o conteúdo interno.
*/

/* Page Hero (comum para Downloads e Blog) */
.page-hero {
  background: var(--gradient-primary);
  /* Use o gradiente primário ou um gradiente específico para esta página */
  color: white;
  text-align: center;
  padding: 80px 0 40px;
  margin-top: 75px;
  /* Offset for fixed header */
  border-bottom: 5px solid var(--primary-green);
  /* Cor da borda inferior consistente */
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  /* Sombra suave */
}

.page-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: white;
  /* Garante que o texto do título seja branco */
  -webkit-text-fill-color: initial;
  /* Resetar para o branco padrão */
}

.page-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
}

/* Downloads Content Wrapper */
.downloads-content-wrapper {
  padding: 3rem 0;
  background-color: var(--bg-body);
}

/* Layout da Seção de Downloads (Grid principal) */
.downloads-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
  /* Sidebar para categorias e coluna principal para ficheiros */
  gap: 3rem;
  align-items: flex-start;
}

/* Sidebar */
.downloads-sidebar {
  background: var(--bg-section);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  position: sticky;
  /* Sticky sidebar */
  top: 95px;
  /* Offset da altura do header */
}

.sidebar-block {
  margin-bottom: 2.5rem;
}

.sidebar-block h3 {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.5rem;
}

.sidebar-block h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

/* Search Input */
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem;
  padding-right: 2.5rem;
  /* Espaço para o ícone */
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-body);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-input-wrapper svg {
  position: absolute;
  right: 15px;
  color: var(--text-muted);
  width: 20px;
  height: 20px;
}

/* Filter Lists (Categories) */
.filter-list {
  list-style: none;
  padding: 0;
}

.filter-list li {
  padding: 0.8rem 0;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.filter-list li:last-child {
  border-bottom: none;
}

.filter-list li:hover {
  color: var(--primary-blue);
}

.filter-list li.active {
  color: var(--primary-blue);
  font-weight: 600;
}

.filter-list .count {
  background-color: var(--bg-card);
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Tags Cloud */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tag-item {
  background-color: var(--bg-card);
  color: var(--text-secondary);
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.tag-item:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.tag-item.active {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.clear-filters {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--primary-orange);
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.clear-filters:hover {
  color: var(--secondary-orange);
}

/* Grid de Ficheiros */
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  min-height: 400px;
}

.file-card {
  background: var(--bg-section);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 20px var(--shadow-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.file-card.animated {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.file-card.animated.visible {
  opacity: 1;
  transform: translateY(0);
}

.file-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px var(--shadow-hover);
}

.file-icon-container {
  background: var(--primary-green);
  /* Cor de fundo do ícone consistente com a página */
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.file-icon {
  width: 60px;
  height: 60px;
  color: white;
}

.file-content {
  padding: 1.8rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.file-content h4 {
  font-size: 1.25rem;
  margin-bottom: 0.6rem;
  color: var(--text-primary);
  font-weight: 600;
}

.file-content p {
  margin-bottom: 1.2rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
}

.file-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.file-meta span:not(:last-child)::after {
  content: " • ";
}

.file-card .btn-download {
  background: var(--gradient-primary);
  /* Usando o gradiente principal */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  justify-content: center;
  /* Centraliza o conteúdo do botão */
}

.file-card .btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow-hover);
}

/* Placeholder para ficheiros não encontrados */
.no-files-message {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: var(--text-muted);
  background: var(--bg-card);
  border-radius: 15px;
  margin-top: 3rem;
  box-shadow: 0 5px 15px var(--shadow-color);
  grid-column: 1 / -1;
  /* Ocupa toda a largura do grid */
}

/* --- Estilos da Paginação --- */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 3rem;
  padding: 1rem;
  background: var(--bg-section);
  border-radius: 15px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px var(--shadow-color);
}

.pagination-btn {
  background: var(--bg-card);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 40px;
  text-align: center;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--bg-hover);
  color: var(--primary-green);
  border-color: var(--primary-green);
}

.pagination-btn.active {
  background: var(--primary-green);
  color: white;
  border-color: var(--primary-green);
  font-weight: 700;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Container comum */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* RESPONSIVIDADE */
@media (max-width: 992px) {
  .downloads-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .downloads-sidebar {
    position: static;
    /* Remove sticky positioning on smaller screens */
    margin-top: 0;
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .page-hero h1 {
    font-size: 2.5rem;
  }

  .files-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .pagination {
    flex-wrap: wrap;
    /* Permite que os botões quebrem a linha */
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding: 60px 0 30px;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .downloads-content-wrapper {
    padding: 2rem 0;
  }

  .files-grid {
    gap: 1.5rem;
  }

  .file-card h4 {
    font-size: 1.15rem;
  }

  .file-card p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .files-grid {
    grid-template-columns: 1fr;
  }

  .pagination-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .sidebar-block h3 {
    font-size: 1.2rem;
  }
  .tag-item {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
}
</style>