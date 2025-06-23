<template>
  <footer class="minimal-footer">
    <div class="container footer-container">
      <div class="footer-left">
        <p class="copyright-text">&copy; {{ currentYear }} Cesário Machava. Todos os direitos reservados.</p>
        <p class="tagline">Inovação e Excelência em Engenharia.</p>
      </div>
      <div class="footer-right">
        <div class="social-links">
          <a aria-label="LinkedIn" href="https://linkedin.com/in/cesariomachava" target="_blank">
            <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                 stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect height="12" width="4" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a aria-label="Email" href="mailto:info@cesariomachava.com">
            <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                 stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {ref} from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
/* Footer Minimalista */
.minimal-footer {
  background: var(--bg-section);
  /* Fundo sutil, ou um cinza escuro para contraste */
  color: var(--text-secondary);
  padding: 2rem 0;
  /* Padding reduzido */
  border-top: 1px solid var(--border-color);
  /* Linha sutil no topo */
  font-size: 0.9rem;
}

/* Ajustes para Dark Mode */
.dark-mode .minimal-footer {
  background: var(--bg-card-dark);
  /* Fundo mais escuro para dark mode */
  border-top-color: var(--border-color-dark);
}

.footer-container {
  display: flex;
  justify-content: space-between;
  /* Alinha conteúdo à esquerda e direita */
  align-items: center;
  flex-wrap: wrap;
  /* Permite quebrar linha em telas pequenas */
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-left,
.footer-right {
  display: flex;
  flex-direction: column;
  /* Empilha os elementos verticalmente */
  align-items: flex-start;
  /* Alinha o texto à esquerda */
}

.footer-right {
  align-items: flex-end;
  /* Alinha os ícones sociais à direita */
}

.copyright-text {
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

.tagline {
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary-blue);
  /* Cor de destaque para a tagline */
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 38px;
  /* Tamanho um pouco menor para os ícones */
  height: 38px;
  border-radius: 50%;
  /* Formato circular */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--primary-blue);
  /* Cor sólida para o fundo do ícone */
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.social-links a:hover {
  background-color: var(--primary-orange);
  /* Mudança de cor no hover */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.social-links a svg {
  width: 18px;
  height: 18px;
}

/* Responsividade */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    /* Empilha os elementos em telas menores */
    text-align: center;
    align-items: center;
    /* Centraliza os itens */
  }

  .footer-left,
  .footer-right {
    align-items: center;
    /* Centraliza o conteúdo dentro de cada bloco */
  }

  .copyright-text,
  .tagline {
    margin-bottom: 0.5rem;
  }

  .social-links {
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .minimal-footer {
    padding: 1.5rem 0;
  }

  .copyright-text {
    font-size: 0.85rem;
  }

  .tagline {
    font-size: 0.9rem;
  }

  .social-links a {
    width: 35px;
    height: 35px;
  }

  .social-links a svg {
    width: 16px;
    height: 16px;
  }
}
</style>