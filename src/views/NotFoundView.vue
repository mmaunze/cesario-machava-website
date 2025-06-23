<template>
  <Header />
  <main class="not-found-main">
    <div class="container not-found-content">
      <div class="not-found-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.94 3.35h14.72c1.766 0 2.806-1.85 1.94-3.35L13.153 1.291a1.125 1.125 0 00-2.306 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h1>404</h1>
      <h2>Página Não Encontrada</h2>
      <p>Lamentamos, mas a página que procura pode ter sido movida, excluída ou nunca existiu.</p>
      <router-link to="/" class="btn-home">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V13.5m-3.75 4.5H12M12 18.75v-7.5" />
        </svg>
        Voltar à Página Inicial
      </router-link>
    </div>
  </main>
  <Footer />
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { onMounted } from 'vue';

onMounted(() => {
  // Simple fade-in effect for the content
  const content = document.querySelector('.not-found-content');
  if (content) {
    setTimeout(() => {
      content.classList.add('fade-in');
    }, 100); // Small delay to ensure CSS applies
  }
});
</script>

<style scoped>
/*
  IMPORTANTE: As variáveis CSS (--primary-blue, --bg-body, etc.)
  já devem estar definidas no seu arquivo src/App.vue (estilos globais).
  Este arquivo NotFoundView.vue apenas referenciará essas variáveis.

  A largura máxima de 2016px para o conteúdo principal deve ser gerenciada
  no `App.vue` ou em um layout wrapper, não diretamente aqui para o container,
  que deve ter max-width: 1200px para o conteúdo interno.
*/

.not-found-main {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Garante que o conteúdo ocupe o espaço restante para centralizar */
  min-height: calc(100vh - 75px - 200px);
  /* Altura total da viewport - altura aproximada do header - altura aproximada do footer */
  text-align: center;
  padding: 4rem 0;
  background-color: var(--bg-body);
  flex-grow: 1;
}

.not-found-content {
  max-width: 650px;
  background: var(--bg-section);
  padding: 4rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px var(--shadow-color);
  border: 1px solid var(--border-color);
  transition: all 0.5s ease-out; /* Para a animação de fade-in */
  opacity: 0;
  transform: translateY(20px);
}

.not-found-content.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.not-found-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  color: var(--primary-orange);
  /* Cor principal para o ícone */
}

.not-found-icon svg {
  width: 100%;
  height: 100%;
}

.not-found-content h1 {
  font-size: 7rem;
  font-weight: 900;
  color: var(--primary-orange);
  /* Mantém o 404 em laranja */
  margin-bottom: 0.5rem;
  line-height: 1;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.15);
}

.not-found-content h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary-blue);
  /* Título secundário em azul */
  margin-bottom: 1.5rem;
}

.not-found-content p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.btn-home {
  display: inline-flex;
  /* Para alinhar o ícone e o texto */
  align-items: center;
  gap: 0.75rem;
  /* Espaçamento entre ícone e texto */
  background: var(--gradient-primary);
  color: white;
  padding: 14px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 5px 15px var(--shadow-color);
}

.btn-home:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow-hover);
}

.btn-home svg {
  width: 22px;
  height: 22px;
  color: white;
}

/* Container comum (se não for global) */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* RESPONSIVIDADE */
@media (max-width: 768px) {
  .not-found-content {
    padding: 3rem 1.5rem;
  }

  .not-found-icon {
    width: 80px;
    height: 80px;
  }

  .not-found-content h1 {
    font-size: 5rem;
  }

  .not-found-content h2 {
    font-size: 1.8rem;
  }

  .not-found-content p {
    font-size: 1.1rem;
  }

  .btn-home {
    padding: 10px 20px;
    font-size: 1rem;
    gap: 0.5rem;
  }

  .btn-home svg {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: 2rem 1rem;
  }

  .not-found-icon {
    width: 60px;
    height: 60px;
  }

  .not-found-content h1 {
    font-size: 4rem;
  }

  .not-found-content h2 {
    font-size: 1.5rem;
  }

  .not-found-content p {
    font-size: 0.95rem;
  }
}
</style>