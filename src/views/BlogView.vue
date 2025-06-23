<template>
  <Header />
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Meu Blog</h1>
        <p>Reflexões, artigos e insights sobre engenharia, gestão e inovação.</p>
      </div>
    </section>

    <section class="blog-content-wrapper">
      <div class="container blog-layout">
        <div class="blog-main">
          <div v-if="paginatedPosts.length > 0" class="blog-grid">
            <div v-for="post in paginatedPosts" :key="post.id" class="blog-card animated">
              <img :src="post.image" :alt="post.title" class="blog-card-image">
              <div class="blog-card-content">
                <span class="blog-category" :style="{ backgroundColor: getCategoryColor(post.category) }">{{ post.category }}</span>
                <h3>{{ post.title }}</h3>
                <p class="blog-excerpt">{{ post.excerpt }}</p>
                <div class="blog-meta">
                  <span>{{ post.author }}</span>
                  <span>•</span>
                  <span>{{ formatDate(post.date) }}</span>
                  <span>•</span>
                  <span>{{ post.readTime }} min de leitura</span>
                </div>
                <router-link :to="`/blog/${post.slug}`" class="read-more-link">
                  Ler Mais
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
          <div v-else class="no-results">
            <p>Nenhum post encontrado com os critérios de filtro.</p>
          </div>

          <div v-if="totalPages > 1" class="pagination">
            <button @click="currentPage--" :disabled="currentPage === 1" class="pagination-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                    :class="{ 'active': currentPage === page }" class="pagination-btn">
              {{ page }}
            </button>
            <button @click="currentPage++" :disabled="currentPage === totalPages" class="pagination-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>

        <aside class="blog-sidebar">
          <div class="sidebar-block search-block">
            <h3>Pesquisar</h3>
            <div class="search-input-wrapper">
              <input type="text" v-model="searchQuery" placeholder="Pesquisar posts..." class="search-input">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>

          <div class="sidebar-block category-block">
            <h3>Categorias</h3>
            <ul class="filter-list">
              <li :class="{ 'active': selectedCategory === null }" @click="selectedCategory = null">
                Todas as Categorias <span class="count">({{ allCategoriesCount }})</span>
              </li>
              <li v-for="category in uniqueCategories" :key="category"
                  :class="{ 'active': selectedCategory === category }" @click="selectedCategory = category">
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
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// --- DATA SIMULATION ---
const allBlogPosts = ref([
  {
    id: 1,
    title: 'A Importância da Gestão de Ativos na Engenharia Civil',
    excerpt: 'Descubra como a gestão eficiente de ativos pode prolongar a vida útil de infraestruturas e otimizar investimentos...',
    category: 'Gestão de Ativos',
    tags: ['engenharia', 'infraestrutura', 'otimização'],
    author: 'Cesário Machava',
    date: '2025-06-10',
    readTime: 7,
    image: '/src/assets/blog-placeholder-1.jpg',
    slug: 'importancia-gestao-ativos'
  },
  {
    id: 2,
    title: 'Lean Six Sigma: Otimizando Processos na Construção',
    excerpt: 'Explore os princípios do Lean Six Sigma e como aplicá-los para reduzir desperdícios e aumentar a produtividade em projetos de construção...',
    category: 'Otimização de Processos',
    tags: ['lean', 'six sigma', 'produtividade', 'construção'],
    author: 'Cesário Machava',
    date: '2025-05-28',
    readTime: 9,
    image: '/src/assets/blog-placeholder-2.jpg',
    slug: 'lean-six-sigma-construcao'
  },
  {
    id: 3,
    title: 'Mitigação de Risco Operacional em Grandes Empreendimentos',
    excerpt: 'Um guia prático sobre estratégias para identificar, avaliar e mitigar riscos operacionais em projetos de engenharia civil de alta complexidade...',
    category: 'Risco Operacional',
    tags: ['risco', 'segurança', 'gestão'],
    author: 'Cesário Machava',
    date: '2025-05-15',
    readTime: 8,
    image: '/src/assets/blog-placeholder-3.jpg',
    slug: 'mitigacao-risco-operacional'
  },
  {
    id: 4,
    title: 'Sustentabilidade e Inovação em Materiais de Construção',
    excerpt: 'Análise das últimas inovações em materiais de construção sustentáveis e seu impacto no futuro da engenharia civil...',
    category: 'Sustentabilidade',
    tags: ['verde', 'inovação', 'materiais'],
    author: 'Cesário Machava',
    date: '2025-04-30',
    readTime: 6,
    image: '/src/assets/blog-placeholder-4.jpg',
    slug: 'sustentabilidade-materiais'
  },
  {
    id: 5,
    title: 'O Papel da Tecnologia na Gestão de Projetos de Engenharia',
    excerpt: 'Como as novas tecnologias, como BIM e IoT, estão revolucionando a forma como os projetos de engenharia civil são gerenciados e executados...',
    category: 'Tecnologia',
    tags: ['digital', 'inovação', 'BIM', 'IoT'],
    author: 'Cesário Machava',
    date: '2025-04-18',
    readTime: 7,
    image: '/src/assets/blog-placeholder-5.jpg',
    slug: 'tecnologia-gestao-projetos'
  },
  {
    id: 6,
    title: 'Planeamento Estratégico para Infraestruturas Resilientes',
    excerpt: 'Discussão sobre a importância do planeamento estratégico a longo prazo para construir infraestruturas capazes de resistir a desafios futuros...',
    category: 'Planeamento',
    tags: ['estratégia', 'resiliência', 'futuro'],
    author: 'Cesário Machava',
    date: '2025-04-05',
    readTime: 10,
    image: '/src/assets/blog-placeholder-6.jpg',
    slug: 'planeamento-infraestruturas'
  },
  {
    id: 7,
    title: 'A Economia Circular na Construção Civil',
    excerpt: 'Como a economia circular pode transformar o setor da construção, promovendo a reutilização e a redução de resíduos.',
    category: 'Sustentabilidade',
    tags: ['sustentabilidade', 'reciclagem', 'economia'],
    author: 'Cesário Machava',
    date: '2025-03-20',
    readTime: 8,
    image: '/src/assets/blog-placeholder-7.jpg',
    slug: 'economia-circular-construcao'
  },
  {
    id: 8,
    title: 'Desafios e Oportunidades na Gestão de Projetos de Grande Escala',
    excerpt: 'Análise dos principais desafios na gestão de grandes projetos e como superá-los para garantir o sucesso.',
    category: 'Gestão de Projetos',
    tags: ['projetos', 'desafios', 'liderança'],
    author: 'Cesário Machava',
    date: '2025-03-01',
    readTime: 12,
    image: '/src/assets/blog-placeholder-8.jpg',
    slug: 'desafios-grandes-projetos'
  },
  {
    id: 9,
    title: 'Aplicação de Big Data na Manutenção Preditiva de Ativos',
    excerpt: 'Descubra como a análise de Big Data pode otimizar a manutenção de ativos, prevendo falhas antes que ocorram.',
    category: 'Tecnologia',
    tags: ['dados', 'manutenção', 'preditiva'],
    author: 'Cesário Machava',
    date: '2025-02-15',
    readTime: 9,
    image: '/src/assets/blog-placeholder-9.jpg',
    slug: 'big-data-manutencao-preditiva'
  },
]);

// --- FILTERS AND SEARCH ---
const searchQuery = ref('');
const selectedCategory = ref(null); // null means "All Categories"
const selectedTags = ref([]);

const filteredPosts = computed(() => {
  let posts = allBlogPosts.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value);
  }

  // Filter by tags (AND logic: post must have ALL selected tags)
  if (selectedTags.value.length > 0) {
    posts = posts.filter(post =>
        selectedTags.value.every(tag => post.tags.includes(tag))
    );
  }

  return posts;
});

// --- CATEGORY AND TAGS COMPUTED PROPERTIES ---
const uniqueCategories = computed(() => {
  const categories = new Set();
  allBlogPosts.value.forEach(post => categories.add(post.category));
  return Array.from(categories).sort();
});

const getCategoryCount = (category) => {
  return allBlogPosts.value.filter(post => post.category === category).length;
};

const allCategoriesCount = computed(() => allBlogPosts.value.length);

const uniqueTags = computed(() => {
  const tags = new Set();
  allBlogPosts.value.forEach(post => post.tags.forEach(tag => tags.add(tag)));
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

// --- PAGINATION ---
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

// Reset page to 1 whenever filters change
watch([searchQuery, selectedCategory, selectedTags], () => {
  currentPage.value = 1;
});

// --- UTILITY FUNCTIONS ---
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

const getCategoryColor = (category) => {
  // Mapeia categorias para cores para visualização
  const colors = {
    'Gestão de Ativos': 'var(--primary-blue)',
    'Otimização de Processos': 'var(--primary-orange)',
    'Risco Operacional': 'var(--primary-green)',
    'Sustentabilidade': 'var(--accent-teal)',
    'Tecnologia': 'var(--secondary-blue)',
    'Planeamento': 'var(--secondary-orange)',
    'Gestão de Projetos': 'var(--primary-blue)', // Reutilizar cores
    // Adicione mais mapeamentos conforme necessário para outras categorias
  };
  return colors[category] || 'var(--text-muted)'; // Cor padrão se não mapeada
};

// --- ANIMATIONS ---
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // observer.unobserve(entry.target); // Deixa de observar depois de visível
        // Descomente a linha acima se quiser que a animação ocorra apenas uma vez.
        // Mantenho comentada para que, se o utilizador rolar para cima e para baixo, a animação possa reativar (opcional).
      } else {
        entry.target.classList.remove('visible'); // Remove a classe quando não está visível
      }
    });
  }, {
    threshold: 0.1 // Ativa quando 10% do elemento está visível
  });

  // Observa todos os cards do blog (ou outros elementos .animated que queira animar)
  // Certifique-se de que 'animated' esteja na classe do elemento no template
  document.querySelectorAll('.blog-card.animated').forEach(card => {
    observer.observe(card);
  });
});
</script>

<style scoped>
/*
  IMPORTANTE: As variáveis CSS (--primary-blue, --bg-body, etc.)
  já devem estar definidas no seu arquivo src/App.vue (estilos globais).
  Este arquivo BlogView.vue.css apenas referenciará essas variáveis.

  A largura máxima de 2016px para o conteúdo principal deve ser gerenciada
  no `App.vue` ou em um layout wrapper, não diretamente aqui para o container,
  que deve ter max-width: 1200px para o conteúdo interno.
*/

/* Page Hero (comum para Downloads e Blog) */
.page-hero {
  background: var(--gradient-accent); /* Usando um gradiente verde para downloads */
  color: white;
  text-align: center;
  padding: 80px 0 40px;
  margin-top: 75px; /* Offset for fixed header */
  border-bottom: 5px solid var(--primary-green);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2); /* Sombra suave */
}

.page-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: white;
  /* Corrigir para branco, já que o gradiente de texto não se aplica bem aqui */
  -webkit-text-fill-color: initial;
  /* Resetar para o branco padrão */
}

.page-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
}

/* Blog List Section - Nova Estrutura */
.blog-content-wrapper {
  padding: 3rem 0;
  background-color: var(--bg-body);
}

.blog-layout {
  display: grid;
  grid-template-columns: 3fr 1fr; /* Main content (3 partes) e Sidebar (1 parte) */
  gap: 3rem;
  align-items: flex-start; /* Alinha o conteúdo ao topo */
}

.blog-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Min de 320px para melhor visualização */
  gap: 2rem;
}

.blog-card {
  background: var(--bg-section);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 20px var(--shadow-color);
  display: flex;
  flex-direction: column;
}

.blog-card.animated {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.blog-card.animated.visible {
  opacity: 1;
  transform: translateY(0);
}


.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px var(--shadow-hover);
}

.blog-card-image {
  width: 100%;
  height: 220px;
  /* Aumentei a altura da imagem para melhor impacto visual */
  object-fit: cover;
  display: block;
}

.blog-card-content {
  padding: 1.8rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.blog-category {
  display: inline-block;
  background-color: var(--primary-orange);
  /* Cor padrão, será sobrescrita por JS */
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.blog-card-content h3 {
  font-size: 1.35rem;
  margin-bottom: 0.6rem;
  color: var(--text-primary);
  font-weight: 700;
  line-height: 1.4;
  text-align: left;
}

.blog-excerpt {
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
}

.blog-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  text-align: left;
}

.blog-meta span:not(:last-child)::after {
  content: " • ";
  margin: 0 0.2em;
}

.read-more-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
}

.read-more-link:hover {
  color: var(--secondary-blue);
  transform: translateX(5px);
}

.read-more-link svg {
  transition: transform 0.3s ease;
}

.read-more-link:hover svg {
  transform: translateX(3px);
}

.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-muted);
  padding: 3rem 0;
  grid-column: 1 / -1; /* Ocupa toda a largura do grid */
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.pagination-btn {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pagination-btn.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sidebar Styles */
.blog-sidebar {
  background: var(--bg-section);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 20px var(--shadow-color);
  border: 1px solid var(--border-color);
  position: sticky; /* Sticky sidebar */
  top: 95px; /* Offset da altura do header */
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

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem;
  padding-right: 2.5rem; /* Espaço para o ícone */
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


/* Dark Mode Overrides for specific elements (if needed, but App.vue handles most) */
.dark-mode .blog-card-image[src*="placeholder"] {
  /* Ajustar imagens placeholder para dark mode, se elas tiverem fundo claro */
  filter: brightness(0.8) contrast(1.2); /* Exemplo de filtro */
}

/* Responsividade */
@media (max-width: 992px) {
  .page-hero h1 {
    font-size: 2.5rem;
  }

  .blog-layout {
    grid-template-columns: 1fr; /* Coluna única em tablets */
  }

  .blog-sidebar {
    position: static; /* Remove sticky positioning on smaller screens */
    margin-top: 2rem;
  }

  .blog-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding: 60px 0 30px;
  }

  .page-hero h1 {
    font-size: 2rem;
  }

  .blog-list-section {
    padding: 2rem 0;
  }

  .blog-grid {
    grid-template-columns: 1fr; /* Uma coluna em mobile */
  }

  .blog-card-content h3 {
    font-size: 1.2rem;
  }

  .blog-excerpt {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  .blog-card-content {
    padding: 1.2rem;
  }
  .blog-card-content h3 {
    font-size: 1.1rem;
  }
  .blog-category {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
  .blog-meta {
    font-size: 0.75rem;
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