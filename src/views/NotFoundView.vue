<template>
  <Header />
  <main class="not-found-main">
    <div class="container not-found-content">
      <h1>404</h1>
      <p>Oops! A página que procura não foi encontrada.</p>
      <router-link to="/" class="btn-home">Voltar à Página Inicial</router-link>
    </div>
  </main>
  <Footer />
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
.not-found-main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 75px - 200px); /* Ajuste com base na altura do header/footer */
  text-align: center;
  padding: 4rem 0;
  background-color: var(--bg-body);
  flex-grow: 1; /* Permite que o main ocupe espaço restante */
}

.not-found-content {
  max-width: 600px;
  background: var(--bg-section);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.not-found-content h1 {
  font-size: 6rem;
  font-weight: 900;
  color: var(--primary-orange);
  margin-bottom: 1rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.not-found-content p {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.btn-home {
  display: inline-block;
  background: var(--gradient-primary);
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-home:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* Container comum (se não for global) */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .not-found-content h1 {
    font-size: 4rem;
  }

  .not-found-content p {
    font-size: 1.2rem;
  }

  .not-found-content {
    padding: 2rem;
  }
}
</style>