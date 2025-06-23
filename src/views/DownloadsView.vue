<template>
  <Header />
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Recursos para Download</h1>
        <p>Aceda a guias, relatórios e templates úteis.</p>
      </div>
    </section>

    <div class="container downloads-layout">
      <aside class="downloads-sidebar">
        <div class="sidebar-section">
          <h3>Categorias</h3>
          <ul id="categoriesList">
            <li v-for="category in categories" :key="category.name">
              <a href="#" :data-filter-category="category.name" @click.prevent="filterByCategory(category.name)"
                 :class="{ active: currentCategoryFilter === category.name }">
                {{ category.displayName }} ({{ category.count }})
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div class="downloads-main">
        <div v-if="filteredFiles.length > 0" class="files-grid">
          <div v-for="file in filteredFiles" :key="file.id" class="file-card">
            <div class="file-icon-container">
              <div class="file-icon" v-html="file.icon"></div>
            </div>
            <div class="file-content">
              <h4>{{ file.name }}</h4>
              <p>{{ file.description }}</p>
              <div class="file-meta">
                <span>{{ file.category }}</span>
                <span>{{ file.size }}</span>
                <span>{{ formatDate(file.uploadDate) }}</span>
              </div>
              <a :href="file.downloadLink" class="btn-download" :download="file.name" target="_blank">
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
          Nenhum ficheiro encontrado nesta categoria.
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// SIMULAÇÃO DE DADOS: Em um projeto real, isso viria de um backend (API)
const allDownloadableFiles = ref([
  {
    id: 1,
    name: 'Relatório de Gestão de Ativos 2024.pdf',
    description: 'Relatório abrangente sobre as últimas tendências e melhores práticas em gestão de ativos.',
    category: 'Relatórios',
    size: '2.5 MB',
    uploadDate: '2025-06-15',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25" /></svg>', // File icon
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf' // Exemplo de PDF público
  },
  {
    id: 2,
    name: 'Guia Prático de Lean Six Sigma.docx',
    description: 'Um guia passo-a-passar para implementar a metodologia Lean Six Sigma e otimizar processos.',
    category: 'Guias',
    size: '1.2 MB',
    uploadDate: '2025-05-20',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25" /></svg>',
    downloadLink: 'https://docs.google.com/document/d/1Xl20W6J8E3b_f0g-P9Q4H_zP5c8z6Q2o/export?format=docx' // Exemplo de DOCX público
  },
  {
    id: 3,
    name: 'Template de Cronograma de Projeto.xlsx',
    description: 'Um template personalizável para gerir cronogramas de projetos de engenharia civil.',
    category: 'Templates',
    size: '500 KB',
    uploadDate: '2025-04-10',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25" /></svg>',
    downloadLink: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLSX_10.xlsx' // Exemplo de XLSX público
  },
  {
    id: 4,
    name: 'Checklist de Avaliação de Risco Operacional.pdf',
    description: 'Um checklist detalhado para identificar e avaliar riscos operacionais em qualquer projeto.',
    category: 'Guias',
    size: '1.8 MB',
    uploadDate: '2025-03-28',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25" /></svg>',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 5,
    name: 'Artigo: Sustentabilidade na Construção.pdf',
    description: 'Um artigo aprofundado sobre práticas de construção sustentável e seus benefícios ambientais.',
    category: 'Artigos',
    size: '3.1 MB',
    uploadDate: '2025-03-01',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25" /></svg>',
    downloadLink: 'https://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 6,
    name: 'Estudo de Caso: Otimização de Processos.pptx',
    description: 'Análise de um caso real de otimização de processos utilizando princípios de engenharia de produção.',
    category: 'Estudos de Caso',
    size: '4.7 MB',
    uploadDate: '2025-02-18',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3V2.25" /></svg>',
    downloadLink: 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx' // Usando um docx de exemplo, idealmente seria pptx
  }
]);

const currentCategoryFilter = ref('all');

// Computed property para filtrar os ficheiros com base na categoria selecionada
const filteredFiles = computed(() => {
  if (currentCategoryFilter.value === 'all') {
    return allDownloadableFiles.value;
  }
  return allDownloadableFiles.value.filter(file => file.category === currentCategoryFilter.value);
});

// Computed property para gerar a lista de categorias dinamicamente
const categories = computed(() => {
  const uniqueCategories = ['all', ...new Set(allDownloadableFiles.value.map(file => file.category))].sort();
  return uniqueCategories.map(cat => ({
    name: cat,
    displayName: cat === 'all' ? 'Todas as Categorias' : cat,
    count: cat === 'all' ? allDownloadableFiles.value.length : allDownloadableFiles.value.filter(file => file.category === cat).length
  }));
});

// Função para mudar o filtro de categoria
const filterByCategory = (categoryName) => {
  currentCategoryFilter.value = categoryName;
};

// Função para formatar a data
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

// Em um ambiente real, você faria uma chamada de API para carregar os ficheiros aqui
// onMounted(async () => {
//   try {
//     const response = await fetch('https://sua-api-de-backend.com/api/downloads');
//     const data = await response.json();
//     allDownloadableFiles.value = data; // Atualiza os dados reativos
//   } catch (error) {
//     console.error('Erro ao buscar ficheiros para download:', error);
//   }
// });
</script>

<style scoped>
/* Page Hero (comum para Downloads e Blog) */
.page-hero {
  background: var(--gradient-accent);
  /* Usando um gradiente verde para downloads */
  color: white;
  text-align: center;
  padding: 80px 0 40px;
  margin-top: 75px;
  /* Offset for fixed header */
  border-bottom: 5px solid var(--primary-green);
}

.page-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: white; /* Corrigir para branco */
  -webkit-text-fill-color: initial; /* Resetar para o branco padrão */
}

.page-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
}


/* Layout da Seção de Downloads */
.downloads-layout {
  display: grid;
  grid-template-columns: 1fr 4fr;
  /* Sidebar para categorias e coluna principal para ficheiros */
  gap: 3rem;
  padding: 3rem 0;
  background-color: var(--bg-body);
}

.downloads-sidebar {
  padding-right: 1.5rem;
  border-right: 1px solid var(--border-color);
}

.dark-mode .downloads-sidebar {
  border-color: var(--border-color);
}

.sidebar-section {
  margin-bottom: 2.5rem;
}

.sidebar-section h3 {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--primary-green);
  padding-bottom: 0.5rem;
  text-align: left;
}

.sidebar-section ul {
  list-style: none;
  padding: 0;
}

.sidebar-section li {
  margin-bottom: 0.8rem;
}

.sidebar-section a {
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.3s ease;
  font-weight: 500;
  display: block;
  padding: 5px 0;
  text-align: left;
}

.sidebar-section a:hover {
  color: var(--primary-green);
}

.sidebar-section a.active {
  color: var(--primary-green);
  font-weight: 700;
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

.file-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px var(--shadow-hover);
}

.file-icon-container {
  background: var(--primary-green);
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  /* Altura fixa para o container do ícone */
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
  /* Usando o gradiente azul principal */
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
}

.file-card .btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow-color);
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
  /* Ocupa todas as colunas da grid */
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
    /* Stack columns on smaller screens */
    gap: 2rem;
  }

  .downloads-sidebar {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    /* Borda na parte inferior */
    padding-bottom: 2rem;
  }

  .dark-mode .downloads-sidebar {
    border-color: var(--border-color);
  }

  .page-hero h1 {
    font-size: 2.5rem;
  }

  .files-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding: 60px 0 30px;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .downloads-layout {
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
}
</style>