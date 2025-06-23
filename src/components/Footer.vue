<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-section about">
          <h4>Sobre Cesário Machava</h4>
          <p>Engenheiro Civil e especialista em gestão de ativos e otimização de processos. Compromisso com a
            excelência e inovação.</p>
          <div class="social-links">
            <a href="https://linkedin.com/in/cesariomachava" target="_blank" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:info@cesariomachava.com" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="#" target="_blank" aria-label="Twitter (exemplo)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-19 11.6 11.3 2.7 15.1-6.1 15.1-6.1z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div class="footer-section links">
          <h4>Links Rápidos</h4>
          <ul>
            <li><router-link to="/">Início</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/downloads">Downloads</router-link></li>
            <li><router-link to="/upload">Upload Ficheiros</router-link></li>
          </ul>
        </div>
        <div class="footer-section contact-footer">
          <h4>Contacte-me</h4>
          <p>Maputo, Moçambique</p>
          <p>Email: info@cesariomachava.com</p>
          <p>Telefone: +258 84 123 4567</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Cesário Machava. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Não há lógica específica no script para o footer neste caso.
</script>

<style scoped>
/* Footer */
footer {
  background: var(--text-primary);
  color: var(--bg-section);
  padding: 3rem 0 2rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-section p,
.footer-section a {
  color: var(--text-muted);
  text-decoration: none;
  line-height: 1.6;
}

.footer-section a:hover {
  color: var(--primary-blue);
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-links a {
  width: 40px;
  height: 40px;
  background: var(--gradient-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.3s ease;
}

.social-links a:hover {
  transform: translateY(-2px);
}

.social-links a svg {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.dark-mode .footer-bottom {
  border-color: #334155;
}

/* Container comum */
.container {
  max-width: 2160px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-section ul {
    padding-left: 0;
    list-style: none;
  }
}
</style>