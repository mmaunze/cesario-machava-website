<template>
  <Header />
  <div id="app-wrapper">
    <router-view />

    <button id="back-to-top" aria-label="Voltar ao topo">
      <svg
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
  <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { onMounted, onUnmounted } from "vue";

const handleScroll = () => {
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", scrollToTop);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    backToTopButton.removeEventListener("click", scrollToTop);
  }
});
</script>
