<template>
  <Header/>
  <div id="app-wrapper">
    <router-view/>

    <button id="back-to-top" aria-label="Voltar ao topo">
      <svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 15.75l7.5-7.5 7.5 7.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
  <Footer/>
</template>

<script setup>

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import {onMounted, onUnmounted} from 'vue';

// Lógica do botão "Voltar ao topo" no JavaScript
const handleScroll = () => {
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', scrollToTop);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    backToTopButton.removeEventListener('click', scrollToTop);
  }
});

</script>

<style>
/* ESTILOS GLOBAIS PARA APLICAÇÃO VUE.JS
   Este bloco de estilo NÃO TEM o atributo 'scoped', o que significa que
   os estilos definidos aqui se aplicarão globalmente a todos os componentes.
   É aqui que as variáveis de tema (Light/Dark Mode) e resets de CSS devem residir.
*/

/* 1. VARIÁVEIS DE COR (Light Mode - Padrão) */
:root {
  --primary-blue: #2563eb; /* Azul Vibrante (indigo-600) */
  --secondary-blue: #1e40af; /* Azul Escuro (indigo-800) */
  --primary-orange: #f97316; /* Laranja Vibrante (orange-500) */
  --secondary-orange: #ea580c; /* Laranja Escuro (orange-600) */
  --primary-green: #16a34a; /* Verde Vibrante (green-600) */
  --secondary-green: #15803d; /* Verde Escuro (green-800) */
  --accent-teal: #0d9488; /* Ciano/Verde Água (teal-600) */

  /* Cores para gradientes de texto/elementos */
  --gradient-primary: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-teal) 100%);
  --gradient-secondary: linear-gradient(135deg, var(--primary-orange) 0%, var(--secondary-orange) 100%);
  --gradient-accent: linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%);
  --gradient-text: linear-gradient(45deg, var(--primary-blue), var(--accent-teal));

  /* Cores de Fundo (Light Mode) */
  --bg-body: #f8fafc; /* Azul Claro Muito Suave (Slate-50) */
  --bg-section: #ffffff; /* Branco Puro */
  --bg-card: #f1f5f9; /* Cinza Azulado Claro (Slate-100) */
  --bg-hero: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-teal) 50%, var(--primary-green) 100%);

  /* Cores de Texto (Light Mode) */
  --text-primary: #1e293b; /* Cinza Escuro (Slate-800) */
  --text-secondary: #475569; /* Cinza Médio (Slate-600) */
  --text-muted: #64748b; /* Cinza Suave (Slate-500) */

  /* Cores de Borda e Sombra (Light Mode) */
  --border-color: #e2e8f0; /* Cinza Borda (Slate-200) */
  --shadow-color: rgba(15, 23, 42, 0.08); /* Sombra suave para light mode */
  --shadow-hover: rgba(15, 23, 42, 0.15); /* Sombra mais intensa no hover */
}

/* 2. VARIÁVEIS DE COR (Dark Mode) */
/* A classe 'dark-mode' será adicionada ao <html> ou <body> pelo JavaScript do componente Header */
.dark-mode {
  --bg-body: #0f172a; /* Azul Escuro Muito Profundo (Slate-900) */
  --bg-section: #1e293b; /* Azul Escuro (Slate-800) */
  --bg-card: #334155; /* Azul Médio Escuro (Slate-700) */
  --bg-hero: linear-gradient(135deg, var(--secondary-blue) 0%, var(--accent-teal) 50%, var(--secondary-green) 100%);

  --text-primary: #f1f5f9; /* Branco Quase Puro (Slate-50) */
  --text-secondary: #cbd5e1; /* Cinza Azulado Claro (Slate-300) */
  --text-muted: #94a3b8; /* Cinza Azulado Médio (Slate-400) */

  --border-color: #475569; /* Cinza Azulado Forte (Slate-600) */
  --shadow-color: rgba(0, 0, 0, 0.25); /* Sombra mais escura para dark mode */
  --shadow-hover: rgba(0, 0, 0, 0.4); /* Sombra mais intensa no hover */
}

/* 3. RESET BÁSICO E ESTILOS GLOBAIS DO BODY/HTML */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth; /* Ativa o scroll suave */
  font-size: 16px; /* Base font size */
}

body {
  font-family: 'Inter', sans-serif; /* Uma fonte moderna e legível */
  line-height: 1.6;
  color: var(--text-secondary);
  background-color: var(--bg-body);
  transition: background-color 0.4s ease, color 0.4s ease; /* Transição suave para tema */
  min-height: 100vh; /* Garante que o body ocupe a altura total da viewport */
  /*display: flex; Para flexbox do #app-wrapper */
  flex-direction: column; /* Para empilhar conteúdo e footer no final */
}

/* Garante que o div principal da aplicação ocupa o espaço restante */
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Link padrão sem sublinhado, mas com transição */
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: none;
}

/* Estilos para o container centralizador, usado em muitas seções */
.container {
  max-width: 2160px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Estilos gerais para secções */
section {
  padding: 80px 0;
  background: var(--bg-section);
  transition: background-color 0.3s ease;
  flex-grow: 1; /* Garante que as seções (as views) ocupem o espaço disponível */
}

section:nth-child(even) { /* Para alternar o background das secções */
  background: var(--bg-body);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Estilos para o botão Voltar ao Topo */
#back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 50%;
  display: none; /* Escondido por padrão */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(20px);
  box-shadow: 0 5px 15px var(--shadow-color);
}

#back-to-top.show {
  display: flex; /* Mostra quando a classe 'show' é adicionada */
  opacity: 1;
  transform: translateY(0);
}

#back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px var(--shadow-hover);
}

#back-to-top svg {
  width: 24px;
  height: 24px;
}

/* RESPONSIVIDADE GERAL PARA O CONTAINER E FONTES */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
}

/* Animações de entrada (genéricas, para usar nas Views) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animated.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>