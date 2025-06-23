<template>
  <Header />
  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Meu Blog</h1>
        <p>Reflexões, artigos e insights sobre engenharia, gestão e inovação.</p>
      </div>
    </section>

    <section class="blog-list-section">
      <div class="container">
        <div class="blog-grid">
          <div v-for="post in blogPosts" :key="post.id" class="blog-card">
            <img :src="post.image" :alt="post.title" class="blog-card-image">
            <div class="blog-card-content">
              <span class="blog-category">{{ post.category }}</span>
              <h3>{{ post.title }}</h3>
              <p class="blog-excerpt">{{ post.excerpt }}</p>
              <div class="blog-meta">
                <span>{{ post.author }}</span>
                <span>•</span>
                <span>{{ formatDate(post.date) }}</span>
                <span>•</span>
                <span>{{ post.readTime }} min de leitura</span>
              </div>
              <router-link :to="`/blog/${post.slug}`" class="read-more-link">Ler Mais
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// SIMULAÇÃO DE DADOS: Em um projeto real, isso viria de um backend (API)
const blogPosts = ref([
  {
    id: 1,
    title: 'A Importância da Gestão de Ativos na Engenharia Civil',
    excerpt: 'Descubra como a gestão eficiente de ativos pode prolongar a vida útil de infraestruturas e otimizar investimentos...',
    category: 'Gestão de Ativos',
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
    author: 'Cesário Machava',
    date: '2025-04-05',
    readTime: 10,
    image: '/src/assets/blog-placeholder-6.jpg',
    slug: 'planeamento-infraestruturas'
  },
]);

// Função para formatar a data
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-PT', options);
};

// Em um ambiente real, você faria uma chamada de API aqui
// onMounted(async () => {
//   try {
//     const response = await fetch('https://sua-api-de-backend.com/api/blogposts');
//     const data = await response.json();
//     blogPosts.value = data;
//   } catch (error) {
//     console.error('Erro ao buscar posts do blog:', error);
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
  color: white; /* Corrigir para branco, já que o gradiente de texto não se aplica bem aqui */
  -webkit-text-fill-color: initial; /* Resetar para o branco padrão */
}

.page-hero p {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Blog List Section */
.blog-list-section {
  padding: 3rem 0;
  background-color: var(--bg-body);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px var(--shadow-hover);
}

.blog-card-image {
  width: 100%;
  height: 200px;
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

/* Container comum */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Responsividade */
@media (max-width: 992px) {
  .page-hero h1 {
    font-size: 2.5rem;
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
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

  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>