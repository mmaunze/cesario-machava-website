<template>

  <main>
    <section id="home" class="hero-section">
      <div class="container hero-content">
        <div class="hero-text">
          <h1>Cesário Machava</h1>
          <h2>Engenheiro Civil | Gestão de Ativos | Otimização de Processos</h2>
          <p>Potenciando o seu negócio com soluções de engenharia inovadoras, gestão estratégica de ativos e
            melhoria contínua em Moçambique e além.</p>
          <div class="hero-buttons">
            <router-link class="btn-primary" to="/downloads">Aceder Downloads</router-link>
            <router-link class="btn-secondary" to="/blog">Explorar Blog</router-link>
          </div>
        </div>
        <div class="hero-image">
          <img alt="Placeholder de imagem para Cesário Machava" class="responsive-image" src="">
        </div>
      </div>
    </section>

    <section id="about" class="about-section">
      <div class="container">
        <h3>Quem Sou Eu</h3>
        <div class="about-grid">
          <div class="about-image">
            <img alt="Cesário Machava" class="responsive-image" src="">
          </div>
          <div class="about-text">
            <p>Com uma sólida formação em Engenharia Civil e uma paixão inabalável pela eficiência e inovação,
              dedico-me a ajudar organizações a otimizar as suas operações e a maximizar o valor dos seus ativos.
            </p>
            <p>A minha experiência abrange desde a <strong>gestão estratégica de ativos</strong>, garantindo o
              desempenho e a longevidade da infraestrutura, até a implementação de metodologias como
              <strong>Lean Six Sigma</strong> para a otimização de processos e redução de desperdícios.</p>
            <p>Acredito que a engenharia vai além da construção; é sobre construir soluções sustentáveis e
              eficientes que impulsionam o progresso e a resiliência. Explore o meu trabalho e veja como posso
              contribuir para o seu próximo desafio.</p>
            <router-link class="btn-primary-outline" to="/downloads">Ver Currículo</router-link>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="services-section">
      <div class="container">
        <h3>Minhas Especialidades</h3>
        <div class="services-grid">
          <div class="service-card">
            <div class="icon">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Gestão de Ativos</h4>
            <p>Otimização do ciclo de vida de ativos físicos para maximizar o seu valor e desempenho, minimizando
              custos e riscos.</p>
          </div>
          <div class="service-card">
            <div class="icon">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M10.125 2.25A1.125 1.125 0 0111.25 3.375V8.25m-1.125 8.625v-1.5m0 1.5c-1.425 0-2.85-.375-4.07-.674m-2.13-0.573a11.924 11.924 0 01-1.014-.543m12.227-.416a11.924 11.924 0 011.014.543m-2.13 0c1.425 0 2.85.375 4.07.674M9.25 15v1.5m0-4.625h-1.5m1.5 4.625h1.5m-1.5-4.625c1.425 0 2.85-.375 4.07-.674m-2.13-0.573a11.924 11.924 0 01-1.014-.543m12.227-.416a11.924 11.924 0 011.014.543m-2.13 0c1.425 0 2.85.375 4.07.674m-4.07.674c-1.425 0-2.85-.375-4.07-.674m-2.13-0.573a11.924 11.924 0 01-1.014-.543m12.227-.416a11.924 11.924 0 011.014.543m-2.13 0c1.425 0 2.85.375 4.07.674m-4.07.674c-1.425 0-2.85-.375-4.07-.674" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Risco Operacional</h4>
            <p>Identificação, avaliação e mitigação de riscos que podem afetar a continuidade e a eficiência das
              operações empresariais.</p>
          </div>
          <div class="service-card">
            <div class="icon">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-6.75zM10.875 5.25c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125h-2.25zM18.75 9.75c-.621 0-1.125.504-1.125 1.125v9c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125v-9c0-.621-.504-1.125-1.125-1.125h-2.25z" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Lean Six Sigma</h4>
            <p>Aplicação de metodologias para eliminar desperdícios, reduzir variabilidade e melhorar a qualidade
              e a eficiência.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="portfolio" class="portfolio-section">
      <div class="container">
        <h3>Meu Portfólio</h3>
        <p class="section-subtitle">Projetos e iniciativas que demonstram a aplicação prática das minhas
          habilidades.</p>
        <div class="portfolio-grid">
          <div class="portfolio-item">
            <img alt="Projeto 1: Otimização de Processos Industriais" src="">
            <div class="item-overlay">
              <h4>Otimização de Processos Industriais</h4>
              <p>Redução de 15% nos custos operacionais através da implementação de Lean Manufacturing.</p>
              <router-link class="btn-view-project" to="/blog">Ver Detalhes</router-link>
            </div>
          </div>
          <div class="portfolio-item">
            <img alt="Projeto 2: Gestão de Ativos em Infraestrutura" src="">
            <div class="item-overlay">
              <h4>Gestão de Ativos em Infraestrutura</h4>
              <p>Desenvolvimento e implementação de um sistema de gestão de ativos para uma rede de estradas.</p>
              <router-link class="btn-view-project" to="/blog">Ver Detalhes</router-link>
            </div>
          </div>
          <div class="portfolio-item">
            <img alt="Projeto 3: Análise de Risco em Construção" src="">
            <div class="item-overlay">
              <h4>Análise de Risco em Construção</h4>
              <p>Avaliação e mitigação de riscos em projetos de grande escala, garantindo segurança e conformidade.
              </p>
              <router-link class="btn-view-project" to="/blog">Ver Detalhes</router-link>
            </div>
          </div>
          <div class="portfolio-item">
            <img alt="Projeto 4: Desenvolvimento de Ferramentas de Sustentabilidade"
                 src="">
            <div class="item-overlay">
              <h4>Ferramentas de Sustentabilidade</h4>
              <p>Criação de modelos para avaliar o impacto ambiental e económico de novas tecnologias de construção.
              </p>
              <router-link class="btn-view-project" to="/blog">Ver Detalhes</router-link>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link class="btn-secondary-link" to="/blog">Ver Todos os Projetos</router-link>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Pronto para Otimizar Seus Processos?</h2>
        <p>Vamos conversar sobre como minhas habilidades em engenharia e gestão podem transformar sua operação.</p>
        <router-link class="btn-primary" to="/contact">Entrar em Contacto</router-link>
      </div>
    </section>

    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <h3>O Que Dizem Meus Clientes</h3>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <p>"A expertise do Cesário em gestão de ativos foi crucial para a longevidade e eficiência da nossa
              infraestrutura. Um profissional exemplar!"</p>
            <div class="client-info">
              <span>João Silva, CEO - Construtora Alfa</span>
            </div>
          </div>
          <div class="testimonial-card">
            <p>"A implementação das metodologias Lean Six Sigma propostas pelo Cesário resultou numa redução
              significativa dos nossos custos operacionais."</p>
            <div class="client-info">
              <span>Maria Costa, Diretora de Operações - Indústria Beta</span>
            </div>
          </div>
          <div class="testimonial-card">
            <p>"Sua abordagem meticulosa na análise de risco nos poupou de potenciais problemas em projetos
              complexos. Recomendo fortemente!"</p>
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
        <p class="section-subtitle">Tenho todo o gosto em discutir as suas necessidades e como posso ajudar.</p>
        <div class="contact-methods">
          <div class="contact-card">
            <div class="icon">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Email</h4>
            <p>info@cesariomachava.com</p>
            <a class="contact-link" href="mailto:info@cesariomachava.com">Enviar Email</a>
          </div>
          <div class="contact-card">
            <div class="icon">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.355c0-.18-.03-.357-.087-.53l-2.088-6.19a2.25 2.25 0 00-1.282-1.282l-6.19-2.088a2.25 2.25 0 00-.53-.087H7.5a2.25 2.25 0 00-2.25 2.25v2.25M17.25 15.75h-.008v-.008H17.25z" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Telefone</h4>
            <p>+258 84 123 4567</p>
            <a class="contact-link" href="tel:+258841234567">Ligar Agora</a>
          </div>
          <div class="contact-card">
            <div class="icon">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Localização</h4>
            <p>Maputo, Moçambique</p>
            <a class="contact-link" href="https://maps.app.goo.gl/XXXXX" target="_blank">Ver no Mapa</a>
          </div>
        </div>
      </div>
    </section>
  </main>

</template>

<script setup>


// Não há lógica específica de script para a HomeView além de importar os componentes
// Os dados das seções são estáticos no template.
</script>

<style scoped>
/* As variáveis globais devem estar em App.vue ou um arquivo CSS global */
/* Para consistência, este CSS é baseado nos styles que você já tinha no cesario.html */

/* Container centralizador */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Estilos de Seção Comuns */
section {
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden; /* Para garantir que sombras e elementos flutuantes não saiam */
}

section:nth-child(even) {
  background-color: var(--bg-section);
}

section:nth-child(odd) {
  background-color: var(--bg-body);
}

h1,
h2,
h3 {
  color: var(--text-primary);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

h1 {
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 2rem;
  margin-bottom: 2.5rem;
  position: relative;
  padding-bottom: 15px;
}

h3::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 5px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

/* Botões Globais */
.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 14px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-align: center;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 8px 25px var(--shadow-color);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px var(--shadow-hover);
  opacity: 0.9;
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
}

.btn-secondary:hover {
  background-color: var(--primary-blue);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px var(--shadow-color);
}

.btn-primary-outline {
  display: inline-block;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  border: 2px solid var(--primary-blue);
  color: var(--primary-blue);
  background-color: transparent;
}

.btn-primary-outline:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px var(--shadow-color);
}

.btn-secondary-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 600;
  position: relative;
  padding-bottom: 5px;
  transition: all 0.3s ease;
}

.btn-secondary-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-blue);
  transition: width 0.3s ease;
}

.btn-secondary-link:hover::after {
  width: 0;
}


/* Hero Section */
.hero-section {
  padding: 100px 0;
  background-color: var(--bg-body);
  margin-top: 75px;
  /* Espaço para o header fixo */
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  gap: 3rem;
}

.hero-text {
  flex: 1;
}

.hero-text h1 {
  font-size: 3.8rem;
  margin-bottom: 0.5rem;
}

.hero-text h2 {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.hero-text p {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 20px; /* Bordas arredondadas */
  box-shadow: 0 15px 40px var(--shadow-color); /* Sombra suave */
  animation: fadeIn 1s ease-out; /* Animação simples de fade-in */
}

/* About Section */
.about-section {
  padding: 80px 0;
  background-color: var(--bg-section);
}

.about-grid {
  display: flex;
  gap: 3rem;
  align-items: center;
  text-align: left;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px var(--shadow-color);
  animation: slideInLeft 1s ease-out;
}

.about-text {
  flex: 1.5;
}

.about-text p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}

/* Services Section */
.services-section {
  background-color: var(--bg-body);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.service-card {
  background-color: var(--bg-section);
  padding: 2.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px var(--shadow-color);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-align: center;
  border: 1px solid var(--border-color);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px var(--shadow-hover);
  border-color: var(--primary-blue);
}

.service-card .icon {
  background: var(--gradient-accent);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.service-card .icon svg {
  width: 35px;
  height: 35px;
  color: white;
}

.service-card h4 {
  font-size: 1.35rem;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.service-card p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Portfolio Section */
.portfolio-section {
  background-color: var(--bg-section);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 25px var(--shadow-color);
  transition: transform 0.3s ease;
}

.portfolio-item:hover {
  transform: translateY(-5px);
}

.portfolio-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.portfolio-item:hover img {
  transform: scale(1.05);
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--primary-blue-rgb, 37, 99, 235), 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.4s ease;
  padding: 1.5rem;
  text-align: center;
}

.dark-mode .item-overlay {
  background: rgba(var(--text-primary-rgb, 30, 41, 59), 0.85);
}

.portfolio-item:hover .item-overlay {
  opacity: 1;
}

.item-overlay h4 {
  color: white;
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
}

.item-overlay p {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn-view-project {
  background-color: white;
  color: var(--primary-blue);
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-view-project:hover {
  background-color: var(--primary-orange);
  color: white;
}

/* Call to Action (CTA) Section */
.cta-section {
  background: var(--gradient-secondary);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.cta-section h2 {
  color: white;
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
}

.cta-section p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-section .btn-primary {
  background: white;
  color: var(--primary-orange);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cta-section .btn-primary:hover {
  background: var(--primary-blue);
  color: white;
}

/* Testimonials Section */
.testimonials-section {
  background-color: var(--bg-body);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background-color: var(--bg-section);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px var(--shadow-color);
  text-align: left;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-card p {
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.client-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-blue);
}

.client-info span {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}


/* Contact Section */
.contact-section {
  background-color: var(--bg-section);
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.contact-card {
  background-color: var(--bg-card);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px var(--shadow-color);
  text-align: center;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.contact-card .icon {
  background: var(--gradient-primary);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.contact-card .icon svg {
  width: 30px;
  height: 30px;
  color: white;
}

.contact-card h4 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.contact-card p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.contact-link {
  display: inline-block;
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 600;
  position: relative;
  padding-bottom: 5px;
  transition: all 0.3s ease;
}

.contact-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-blue);
  transition: width 0.3s ease;
}

.contact-link:hover::after {
  width: 0;
}

/* Contact Form (se ativo) */

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 15px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--text-primary);
  background-color: var(--bg-body);
  transition: border-color 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--primary-blue);
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.contact-form textarea {
  min-height: 150px;
  resize: vertical;
}

.contact-form button {
  width: auto;
  margin-top: 1rem;
}

/* Animações (se você for usá-las, o Vite/Webpack precisa de configuração para CSS keyframes) */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsividade */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-text {
    flex: none;
    max-width: 100%;
  }

  .hero-image {
    max-width: 70%;
    margin-top: 2rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .about-grid {
    flex-direction: column;
    text-align: center;
  }

  .about-image {
    order: -1;
    /* Move a imagem para cima no mobile */
    margin-bottom: 2rem;
  }

  .about-image img {
    max-width: 70%;
  }

  .services-grid,
  .portfolio-grid,
  .testimonials-grid,
  .contact-methods {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  section {
    padding: 60px 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .hero-text p {
    font-size: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 12px 25px;
    font-size: 0.9rem;
  }

  .about-image img {
    max-width: 80%;
  }

  .service-card,
  .portfolio-item,
  .testimonial-card,
  .contact-card {
    padding: 2rem 1.5rem;
  }

  .cta-section h2 {
    font-size: 2rem;
  }

  .cta-section p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 2rem;
  }

  .hero-text h2 {
    font-size: 1.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .about-image img {
    max-width: 90%;
  }

  .contact-form button {
    width: 100%;
  }
}
</style>