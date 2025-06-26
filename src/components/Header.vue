<template>
  <header>
    <nav class="container">
      <router-link class="logo" to="/">CM</router-link>
      <ul id="navMenu" :class="{ active: isMobileMenuOpen }" class="nav-menu">
        <li>
          <router-link to="/" @click="closeMobileMenu">Início</router-link>
        </li>
        <li>
          <router-link to="/portfolio" @click="closeMobileMenu"
            >Portfolio</router-link
          >
        </li>
        <li>
          <router-link to="/blog" @click="closeMobileMenu">Blog</router-link>
        </li>
        <li>
          <router-link to="/downloads" @click="closeMobileMenu"
            >Downloads</router-link
          >
        </li>
        <li>
          <div class="theme-switch-wrapper">
            <label class="theme-switch" for="checkbox">
              <input
                id="checkbox"
                :checked="isDarkMode"
                aria-label="Alternar tema para modo escuro"
                type="checkbox"
                @change="toggleTheme"
              />
              <span class="slider"></span>
            </label>
          </div>
        </li>
      </ul>
      <div
        id="mobileMenuToggle"
        :class="{ active: isMobileMenuOpen }"
        class="menu-toggle"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const isMobileMenuOpen = ref(false);
const isDarkMode = ref(false);
const router = useRouter();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleTheme = (event) => {
  isDarkMode.value = event.target.checked;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light-mode");
  }
};

onMounted(() => {
  // Lógica para carregar o tema salvo ou preferência do sistema
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark-mode") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
  } else if (savedTheme === "light-mode") {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.remove("dark-mode");
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
  }

  // Fechar menu mobile ao navegar (observa mudanças de rota)
  router.afterEach(() => {
    isMobileMenuOpen.value = false;
  });
});
</script>

<style scoped>
/* 1. VARIÁVEIS DE COR (se você não tiver no App.vue) - Recomendado ter no App.vue ou main.css */
/* Se este CSS for o único lugar para essas variáveis, remova `scoped` deste bloco e mova-o para um arquivo CSS global. */
:root {
  --primary-blue: #2563eb;
  --secondary-blue: #1e40af;
  --primary-orange: #f97316;
  --secondary-orange: #ea580c;
  --primary-green: #16a34a;
  --secondary-green: #15803d;
  --accent-teal: #0d9488;
  --gradient-primary: linear-gradient(
    135deg,
    var(--primary-blue) 0%,
    var(--accent-teal) 100%
  );
  --gradient-secondary: linear-gradient(
    135deg,
    var(--primary-orange) 0%,
    var(--secondary-orange) 100%
  );
  --gradient-accent: linear-gradient(
    135deg,
    var(--primary-green) 0%,
    var(--secondary-green) 100%
  );
  --gradient-text: linear-gradient(
    45deg,
    var(--primary-blue),
    var(--accent-teal)
  );

  /* Light Mode */
  --bg-body: #f8fafc;
  --bg-section: #ffffff;
  --bg-card: #f1f5f9;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --shadow-color: rgba(15, 23, 42, 0.08);
  --shadow-hover: rgba(15, 23, 42, 0.15);
}

/* Header */
header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--border-color);
}

.dark-mode header {
  background: rgba(30, 41, 59, 0.95);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1rem 0;*/
  height: 75px;
}

.logo {
  font-size: 1.8rem;
  font-weight: 800;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-menu a {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-menu a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
}

/* Mobile Menu Toggle */
.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: var(--text-primary);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Dark Mode Toggle */
.theme-switch-wrapper {
  display: flex;
  align-items: center;
}

.theme-switch {
  display: inline-block;
  height: 24px;
  position: relative;
  width: 50px;
  margin-left: 1rem;
}

.theme-switch input {
  display: none;
}

.slider {
  background-color: #cbd5e1;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  background-color: #fff;
  bottom: 3px;
  content: "";
  height: 18px;
  left: 3px;
  position: absolute;
  transition: 0.4s;
  width: 18px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
  background: var(--gradient-primary);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* RESPONSIVIDADE */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 75px;
    left: 0;
    width: 100%;
    background: var(--bg-section);
    box-shadow: 0 10px 20px var(--shadow-color);
    padding: 1rem 0;
    border-top: 1px solid var(--border-color);
  }

  .dark-mode .nav-menu {
    background: var(--bg-section);
  }

  .nav-menu.active {
    display: flex;
  }

  .nav-menu li {
    width: 100%;
    text-align: center;
  }

  .nav-menu a {
    padding: 1rem;
    display: block;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
