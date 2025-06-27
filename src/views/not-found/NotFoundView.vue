<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const content = document.querySelector(".not-found-content");
  if (content) {
    setTimeout(() => {
      content.classList.add("fade-in");
    }, 100);
  }
});
</script>

<template>
  <main class="not-found-main">
    <div class="container not-found-content">
      <div class="not-found-icon">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.94 3.35h14.72c1.766 0 2.806-1.85 1.94-3.35L13.153 1.291a1.125 1.125 0 00-2.306 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h1>404</h1>
      <h2>Página Não Encontrada</h2>
      <p>
        Lamentamos, mas a página que procura pode ter sido movida, excluída ou
        nunca existiu.
      </p>
      <router-link class="btn-retry" to="/">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          style="width: 20px; height: 20px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V13.5m-3.75 4.5H12M12 18.75v-7.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Voltar à Página Inicial
      </router-link>
    </div>
  </main>
</template>

<style scoped>
@import "not-found.css";
</style>
