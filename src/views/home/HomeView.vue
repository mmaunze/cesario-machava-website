<script setup>
import userInfo from "@/data/info";
</script>
<template>
  <main>
    <section id="home" class="hero-section">
      <div class="container hero-content">
        <div class="hero-text">
          <h1>{{ userInfo.nomeCompleto }}</h1>
          <h2>{{ userInfo.cargo }}</h2>
          <p>{{ userInfo.objectivo }}</p>
          <div class="hero-buttons">
            <router-link class="btn-primary" to="/portfolio"
              >Ver Portfolio</router-link
            >
            <router-link class="btn-secondary" to="/blog"
              >Explorar Blog</router-link
            >
          </div>
        </div>
        <div class="hero-image">
          <img
            alt="Placeholder de imagem para Cesário Machava"
            class="responsive-image"
            src="@/assets/imagens/img.png"
          />
        </div>
      </div>
    </section>

    <section id="about" class="about-section">
      <div class="container">
        <h3>Quem Sou Eu</h3>
        <div class="about-grid">
          <div class="about-image">
            <img
              alt="Cesário Machava"
              class="responsive-image"
              src="@/assets/imagens/img.png"
            />
          </div>
          <div class="about-text">
            <p>{{ userInfo.resumo.sobre }}</p>
            <p>{{ userInfo.resumo.experincias }}</p>
            <p>{{ userInfo.resumo.crencas }}</p>
            <a class="btn-primary-outline" href="http://cv.pdf"
              >Ver Currículo</a
            >
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="services-section">
      <div class="container">
        <h3>Minhas Especialidades</h3>
        <div class="services-grid">
          <div
            v-for="servico in userInfo.servicos"
            :key="servico"
            class="service-card"
          >
            <div class="icon">
              <img :src="servico.icone" :alt="servico.nome" />
            </div>
            <h4>{{ servico.nome }}</h4>
            <p>
              {{ servico.descricao }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Pronto para Otimizar Seus Processos?</h2>
        <p>
          Vamos conversar sobre como minhas habilidades em engenharia e gestão
          podem transformar sua operação.
        </p>
        <router-link class="btn-primary" to="/contact"
          >Entrar em Contacto</router-link
        >
      </div>
    </section>

    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <h3>O Que Dizem Meus Clientes</h3>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <p>
              "A expertise do Cesário em gestão de ativos foi crucial para a
              longevidade e eficiência da nossa infraestrutura. Um profissional
              exemplar!"
            </p>
            <div class="client-info">
              <span>João Silva, CEO - Construtora Alfa</span>
            </div>
          </div>
          <div class="testimonial-card">
            <p>
              "A implementação das metodologias Lean Six Sigma propostas pelo
              Cesário resultou numa redução significativa dos nossos custos
              operacionais."
            </p>
            <div class="client-info">
              <span>Maria Costa, Diretora de Operações - Indústria Beta</span>
            </div>
          </div>
          <div class="testimonial-card">
            <p>
              "Sua abordagem meticulosa na análise de risco nos poupou de
              potenciais problemas em projetos complexos. Recomendo fortemente!"
            </p>
            <div class="client-info">
              <span>Pedro Fernandes, Gestor de Projetos - Grupo Gama</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section">
      <div class="container">
        <h3>Contacte-me</h3>
        <p class="section-subtitle">
          Tenho todo o gosto em discutir as suas necessidades e como posso
          ajudar.
        </p>
        <div class="contact-methods">
          <div class="contact-card">
            <div class="icon">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h4>Email</h4>
            <p>{{ userInfo.email }}</p>
            <a class="contact-link" :href="'mailto:' + userInfo.email"
              >Enviar Email</a
            >
          </div>
          <div class="contact-card">
            <div class="icon">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.355c0-.18-.03-.357-.087-.53l-2.088-6.19a2.25 2.25 0 00-1.282-1.282l-6.19-2.088a2.25 2.25 0 00-.53-.087H7.5a2.25 2.25 0 00-2.25 2.25v2.25M17.25 15.75h-.008v-.008H17.25z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h4>Telefone</h4>
            <p>{{ userInfo.telefone }}</p>
            <a class="contact-link" :href="'tel:' + userInfo.telefone"
              >Ligar Agora</a
            >
          </div>
          <div class="contact-card">
            <div class="icon">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h4>{{ userInfo.endereco }}</h4>
            <p>{{ userInfo.provincia }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
@import "home.css";
</style>
