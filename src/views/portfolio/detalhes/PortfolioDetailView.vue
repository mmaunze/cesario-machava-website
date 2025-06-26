<template>
  <main v-if="project">
    <section class="page-hero project-hero">
      <div class="container">
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
      </div>
    </section>

    <section class="project-details-content-wrapper">
      <div class="container project-details-layout">
        <div class="project-main-content">
          <div class="project-image-gallery">
            <img
              :src="project.image"
              :alt="project.name"
              class="main-project-image"
            />
          </div>

          <div class="project-section">
            <h2>Visão Geral do Projeto</h2>
            <p>{{ project.longDescription || project.description }}</p>
            <p v-if="project.challenges">
              **Desafios:** {{ project.challenges }}
            </p>
            <p v-if="project.solutions">
              **Soluções Implementadas:** {{ project.solutions }}
            </p>
          </div>

          <div class="project-section" v-if="project.outcomes">
            <h2>Resultados e Impacto</h2>
            <ul>
              <li v-for="(outcome, index) in project.outcomes" :key="index">
                {{ outcome }}
              </li>
            </ul>
          </div>

          <div class="project-section" v-if="project.client">
            <h2>Cliente</h2>
            <p>{{ project.client }}</p>
          </div>

          <div class="project-section" v-if="project.projectLink">
            <h2>Ver o Projeto Online</h2>
            <a
              :href="project.projectLink"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-view-project"
            >
              Aceder ao Projeto
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                style="width: 20px; height: 20px; margin-left: 8px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>

          <div class="back-link">
            <router-link to="/portfolio" class="btn-back">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 20px; height: 20px; margin-right: 8px"
              >
                <path
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Voltar ao Portfólio
            </router-link>
          </div>
        </div>

        <aside class="project-sidebar-info">
          <div class="sidebar-block project-info-block">
            <h3>Detalhes do Projeto</h3>
            <ul>
              <li><strong>Categoria:</strong> {{ project.category }}</li>
              <li>
                <strong>Conclusão:</strong>
                {{ formatDate(project.completionDate) }}
              </li>
              <li v-if="project.duration">
                <strong>Duração:</strong> {{ project.duration }}
              </li>
              <li v-if="project.location">
                <strong>Localização:</strong> {{ project.location }}
              </li>
            </ul>
          </div>

          <div
            class="sidebar-block project-tags-block"
            v-if="project.tags && project.tags.length > 0"
          >
            <h3>Tags</h3>
            <div class="tag-cloud">
              <span v-for="tag in project.tags" :key="tag" class="tag-item">
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
  <div v-else class="loading-or-error-message container">
    <p v-if="loading">Carregando detalhes do projeto...</p>
    <p v-else>Projeto não encontrado.</p>
    <router-link to="/portfolio" class="btn-back">
      Voltar ao Portfólio
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const project = ref(null);
const loading = ref(true);

// Simulação de dados de portfólio (coloque isso em um arquivo de dados real, se for maior)
// Adicionei mais detalhes aqui para a página de detalhes
const allPortfolioProjectsData = [
  {
    id: 101,
    name: "Construção do Edifício Corporativo Blue Sky",
    description:
      "Projeto de construção de um moderno edifício de escritórios com foco em sustentabilidade e eficiência energética.",
    longDescription:
      "Este projeto ambicioso envolveu a construção de um edifício corporativo de 15 andares, integrando as mais recentes tecnologias de construção verde. Fomos responsáveis desde a fase de conceito e design, passando pela gestão da construção, até a entrega final. A sustentabilidade foi um pilar, com sistemas de captação de água da chuva, painéis solares e otimização do uso da luz natural.",
    category: "Edificações",
    tags: [
      "corporativo",
      "sustentabilidade",
      "construção",
      "eficiência energética",
      "LEED",
    ],
    image:
      "https://via.placeholder.com/800x500/4B84CB/FFFFFF?text=EdificioBlueSky", // Imagem principal
    // gallery: ["https://via.placeholder.com/400x250/4B84CB/DDDDDD?text=Galeria1", "https://via.placeholder.com/400x250/4B84CB/CCCCCC?text=Galeria2"], // Exemplo de galeria
    completionDate: "2024-11-20",
    projectLink: "https://example.com/project/bluesky-full-details",
    client: "Blue Sky Holdings S.A.",
    duration: "24 meses",
    location: "Maputo, Moçambique",
    challenges:
      "Integração de múltiplos sistemas de energia renovável em um cronograma apertado e coordenação de equipes multidisciplinares.",
    solutions:
      "Implementação de metodologia BIM para otimização do design e coordenação, e adoção de um rigoroso plano de gestão de projetos.",
    outcomes: [
      "Certificação LEED Platinum",
      "Redução de 40% no consumo de energia",
      "Aumento da satisfação dos ocupantes",
    ],
  },
  {
    id: 102,
    name: "Otimização de Redes de Saneamento Urbano",
    description:
      "Estudo e implementação de soluções para aprimorar a infraestrutura de saneamento em áreas urbanas densas.",
    longDescription:
      "Análise profunda das redes de saneamento existentes, identificando pontos críticos e propondo soluções inovadoras para otimizar o fluxo, reduzir perdas e melhorar a qualidade da água. O projeto incluiu a instalação de sensores inteligentes e um sistema de monitoramento em tempo real.",
    category: "Infraestrutura",
    tags: [
      "saneamento",
      "urbano",
      "infraestrutura",
      "engenharia hídrica",
      "cidades inteligentes",
    ],
    image:
      "https://via.placeholder.com/800x500/33A02C/FFFFFF?text=SaneamentoUrbano",
    completionDate: "2023-08-15",
    projectLink: "https://example.com/project/saneamento-detail",
    client: "Município de Xai-Xai",
    duration: "18 meses",
    location: "Xai-Xai, Moçambique",
    challenges:
      "Mapeamento preciso de redes antigas e minimização do impacto nas atividades urbanas durante a instalação.",
    solutions:
      "Uso de drones para mapeamento e técnicas de perfuração direcional para evitar grandes interrupções.",
    outcomes: [
      "Melhoria de 25% na eficiência da rede",
      "Redução de 15% nas perdas de água",
      "Implementação de sistema de alerta precoce",
    ],
  },
  {
    id: 103,
    name: "Reabilitação da Ponte Histórica Rio Claro",
    description:
      "Projeto de engenharia de recuperação estrutural e restauro estético de uma ponte centenária.",
    longDescription:
      "Uma obra delicada de restauro de uma ponte de mais de 100 anos. Nosso trabalho focou na consolidação estrutural, utilizando técnicas modernas que respeitassem a arquitetura original, além de um cuidadoso restauro dos elementos decorativos.",
    category: "Restauro",
    tags: [
      "pontes",
      "restauro",
      "engenharia estrutural",
      "histórico",
      "património",
    ],
    image:
      "https://via.placeholder.com/800x500/C1573A/FFFFFF?text=PonteRioClaro",
    completionDate: "2024-03-10",
    projectLink: "https://example.com/project/rioclaro-detail",
    client: "Ministério das Obras Públicas",
    duration: "10 meses",
    location: "Quelimane, Moçambique",
    challenges:
      "Manter a integridade histórica da estrutura enquanto se modernizam seus aspectos funcionais e de segurança.",
    solutions:
      "Estudos históricos aprofundados, uso de materiais compatíveis com a época e técnicas de reforço discretas.",
    outcomes: [
      "Ponte reaberta ao tráfego com segurança",
      "Preservação da estética original",
      "Reconhecimento como projeto de património",
    ],
  },
  {
    id: 104,
    name: "Plano Diretor de Desenvolvimento Urbano Sustentável",
    description:
      "Elaboração de um plano estratégico para o crescimento urbano com princípios de sustentabilidade e resiliência.",
    longDescription:
      "Desenvolvimento de um plano abrangente que define as diretrizes para o crescimento futuro de uma cidade, priorizando a sustentabilidade ambiental, a inclusão social e a resiliência a desastres naturais. O plano envolveu extensiva participação comunitária e análise de dados geoespaciais.",
    category: "Planejamento Urbano",
    tags: [
      "planejamento",
      "urbano",
      "sustentabilidade",
      "resiliência",
      "cidades",
      "participação comunitária",
    ],
    image:
      "https://via.placeholder.com/800x500/6A3D9A/FFFFFF?text=PlanoDiretor",
    completionDate: "2025-01-25",
    projectLink: "https://example.com/project/planodiretor-detail",
    client: "Conselho Municipal da Cidade de Nampula",
    duration: "15 meses",
    location: "Nampula, Moçambique",
    challenges:
      "Equilibrar as necessidades de crescimento econômico com a proteção ambiental e a equidade social.",
    solutions:
      "Modelagem de cenários de crescimento, workshops com stakeholders e uso de plataformas de SIG para visualização.",
    outcomes: [
      "Plano aprovado e em implementação",
      "Criação de novas áreas verdes protegidas",
      "Diretrizes para transporte público sustentável",
    ],
  },
  {
    id: 105,
    name: "Gestão de Resíduos em Grande Escala Industrial",
    description:
      "Consultoria e implementação de sistemas de gestão de resíduos sólidos para complexos industriais.",
    longDescription:
      "Desenvolvimento e implementação de um sistema integrado de gestão de resíduos para uma grande planta industrial, focando na redução, reutilização, reciclagem e descarte adequado de materiais, em conformidade com as normas ambientais mais rigorosas.",
    category: "Gestão Ambiental",
    tags: [
      "resíduos",
      "industrial",
      "gestão ambiental",
      "sustentabilidade",
      "reciclagem",
    ],
    image:
      "https://via.placeholder.com/800x500/FF7F00/FFFFFF?text=ResiduosIndustriais",
    completionDate: "2024-07-01",
    projectLink: "https://example.com/project/residuos-detail",
    client: "Fábrica MozMetal",
    duration: "12 meses",
    location: "Beira, Moçambique",
    challenges:
      "Diversidade de tipos de resíduos e a necessidade de implementar soluções com alto retorno sobre o investimento.",
    solutions:
      "Auditoria de resíduos detalhada, mapeamento de processos e introdução de tecnologias de triagem automatizada.",
    outcomes: [
      "Redução de 30% de resíduos para aterro",
      "Aumento da taxa de reciclagem em 50%",
      "Economia operacional significativa",
    ],
  },
  {
    id: 106,
    name: "Automação e Otimização de Canteiros de Obra",
    description:
      "Implementação de tecnologias de automação e IoT para aumentar a eficiência e segurança em canteiros de obra.",
    longDescription:
      "Este projeto pioneiro envolveu a integração de sensores IoT, drones para monitoramento de progresso e robótica para tarefas repetitivas em um grande canteiro de obras. O objetivo foi otimizar o fluxo de trabalho, reduzir erros e melhorar as condições de segurança para os trabalhadores.",
    category: "Inovação",
    tags: [
      "automação",
      "IoT",
      "canteiro de obra",
      "inovação",
      "eficiência",
      "segurança",
      "construção 4.0",
    ],
    image:
      "https://via.placeholder.com/800x500/1F78B4/FFFFFF?text=AutomacaoCanteiro",
    completionDate: "2023-11-30",
    projectLink: "https://example.com/project/automacao-detail",
    client: "Construtora Alfa",
    duration: "9 meses",
    location: "Cidade da Beira, Moçambique",
    challenges:
      "Resistência inicial à mudança por parte da equipe e a complexidade de integrar diferentes sistemas tecnológicos.",
    solutions:
      "Sessões de treinamento intensivas, implementação faseada e uso de plataformas de gerenciamento unificadas.",
    outcomes: [
      "Redução de 20% no tempo de execução",
      "Diminuição de 15% nos custos operacionais",
      "Melhoria de 30% nos índices de segurança",
    ],
  },
  {
    id: 107,
    name: "Projeto de Parque Urbano Verde Vivo",
    description:
      "Criação de um novo espaço público com foco em áreas verdes, lazer e infraestrutura sustentável.",
    longDescription:
      "Um projeto de revitalização urbana que transformou um terreno abandonado em um vibrante parque urbano. Incluímos paisagismo nativo, sistemas de drenagem sustentáveis, áreas de lazer e espaços para eventos comunitários, tudo projetado para promover a biodiversidade e o bem-estar dos cidadãos.",
    category: "Paisagismo Urbano",
    tags: [
      "paisagismo",
      "parque",
      "urbano",
      "lazer",
      "espaços públicos",
      "biodiversidade",
      "sustentabilidade",
    ],
    image:
      "https://via.placeholder.com/800x500/B2DF8A/333333?text=ParqueVerdeVivo",
    completionDate: "2024-09-05",
    projectLink: "https://example.com/project/parquevivo-detail",
    client: "Departamento de Parques e Jardins de Pemba",
    duration: "14 meses",
    location: "Pemba, Moçambique",
    challenges:
      "Engajamento da comunidade para garantir que o parque atendesse às suas necessidades e gestão de recursos hídricos.",
    solutions:
      "Múltiplos workshops comunitários, design participativo e implementação de biovaletas e jardins de chuva.",
    outcomes: [
      "Aumento de 50% na área verde per capita",
      "Melhoria da qualidade do ar local",
      "Espaço de lazer muito utilizado pela comunidade",
    ],
  },
];

onMounted(() => {
  const projectId = parseInt(route.params.id); // Converte o ID da rota para número
  if (projectId) {
    project.value = allPortfolioProjectsData.find((p) => p.id === projectId);
  }
  loading.value = false;
});

// Função para formatar a data
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-PT", options);
};
</script>

<style scoped>
@import "projecto.css";
</style>
