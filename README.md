# Website Pessoal - Cesário Machava

![Banner do Projeto](public/banner-cesario-machava.png) Este é o website pessoal e profissional de Cesário Machava,
Engenheiro Civil e especialista em Gestão de Ativos, Risco Operacional e Lean Six Sigma. O objetivo deste projeto é
criar uma presença online moderna, profissional e responsiva, destacando a sua experiência, projetos e conhecimentos.

O projeto foi desenvolvido com Vue.js 3 (Composition API com `<script setup>`) e Vue Router para uma experiência de
utilizador fluída e eficiente.

## 🌟 Funcionalidades Principais

* **Design Responsivo e Moderno:** Layout adaptável para desktop, tablet e mobile, com foco em uma experiência de
  utilizador intuitiva e agradável.
* **Modo Claro/Escuro:** Alternância de tema para conforto visual em diferentes condições de iluminação, com
  persistência da preferência do utilizador via `localStorage`.
* **Navegação Fluída:** Utilização do Vue Router para navegação entre secções e páginas sem recarregamento completo da
  página.
* **Secções Chave:**
    * **Início (Hero):** Apresentação inicial e chamada para ação.
    * **Sobre Mim:** Detalhes sobre a trajetória profissional, especializações e habilidades.
    * **Portfólio:** Destaque de projetos relevantes com opção de ver detalhes (exemplo de layout de cards).
    * **Blog:** Artigos e insights sobre tópicos de interesse (exemplo de layout de cards).
    * **Downloads:** Recursos e materiais úteis para download (exemplo de layout de cards).
    * **Contacto:** Formulário de contacto e informações de contacto direto.
* **Animações Suaves:** Transições e animações de scroll para uma experiência mais dinâmica e polida.
* **Botão "Voltar ao Topo":** Facilita a navegação em páginas longas.
* **Componentização Vue.js:** Estrutura modular e reutilizável para fácil manutenção e escalabilidade.

## 🚀 Tecnologias Utilizadas

* **Vue.js 3:** Framework progressivo para construção de interfaces de utilizador.
    * **Composition API (`<script setup>`):** Para um código mais organizado e reutilizável.
* **Vue Router:** Biblioteca oficial para roteamento declarativo em Vue.js.
* **CSS Puro (Variáveis CSS):** Utilização de variáveis CSS para um sistema de tema robusto (Light/Dark Mode) e fácil
  gestão de estilos.
* **HTML5 & CSS3:** Estrutura semântica e estilos modernos.
* **Vite:** Ferramenta de construção rápida e otimizada para desenvolvimento front-end.
* **Git:** Sistema de controlo de versão.

## 📂 Estrutura do Projeto

```

.
├── public/                     \# Ficheiros estáticos (favicon, imagens, etc.)
│   └── favicon.ico
│   └── banner-cesario-machava.png
├── src/
│   ├── assets/                 \# Ativos como imagens, ícones, fontes
│   │   └── styles/             \# (Opcional) Estilos globais adicionais, se separados
│   ├── components/             \# Componentes reutilizáveis em toda a aplicação
│   │   ├── Header.vue          \# Componente do cabeçalho de navegação e toggle de tema
│   │   ├── Footer.vue          \# Componente do rodapé
│   │   ├── Card.vue            \# (Exemplo) Componente genérico de card
│   │   └── ...                 \# Outros componentes (SkillTag, StatItem, etc.)
│   ├── router/                 \# Configuração do Vue Router
│   │   └── index.js            \# Definição das rotas
│   ├── views/                  \# Componentes de página (Views/Rotas)
│   │   ├── HomeView.vue        \# Página inicial (Hero, About, Portfolio preview)
│   │   ├── AboutView.vue       \# Página "Sobre Mim" detalhada
│   │   ├── PortfolioView.vue   \# Página "Portfólio" com todos os projetos
│   │   ├── BlogView.vue        \# Página do Blog com todos os artigos
│   │   ├── DownloadsView.vue   \# Página de Downloads
│   │   ├── ContactView.vue     \# Página de Contacto
│   │   └── NotFoundView.vue    \# Página 404 (para rotas não encontradas)
│   ├── App.vue                 \# Componente raiz da aplicação Vue
│   └── main.js                 \# Ponto de entrada da aplicação Vue (inicializa Vue e Router)
├── .gitignore                  \# Ficheiros/diretórios a ignorar pelo Git
├── index.html                  \# Ficheiro HTML principal (ponto de montagem da aplicação Vue)
├── package.json                \# Metadados do projeto e dependências
├── README.md                   \# Este ficheiro
└── vite.config.js              \# Configuração do Vite

````

## ⚙️ Configuração e Desenvolvimento

Este projeto utiliza o [Vite](https://vitejs.dev/) para um ambiente de desenvolvimento rápido.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão LTS recomendada) e [npm](https://www.npmjs.com/) (
gerenciador de pacotes do Node.js) instalados na sua máquina.

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/mmaunze/cesario-machava-website.git
   cd cesario-machava-website
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

### Executando em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot-reloading:

```bash
npm run dev
````

O site estará disponível em `http://localhost:5173/` (ou outra porta, se a 5173 estiver ocupada).

### Construindo para Produção

Para construir o projeto para produção (otimizado e minimizado):

```bash
npm run build
```

Os ficheiros de produção serão gerados na pasta `dist/`.

### Pré-visualizando a Construção (Opcional)

Após a construção, você pode pré-visualizar os ficheiros estáticos gerados:

```bash
npm run preview
```

Isso simula um servidor de produção local.

### Linting e Formatação

Para verificar e corrigir problemas de linting e formatação de código:

```bash
npm run lint
```

## 🤝 Contribuição

Contribuições são bem-vindas\! Se você tiver sugestões, melhorias ou encontrar algum bug, por favor:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/sua-feature` ou `bugfix/seu-bug`).
3. Faça suas alterações e commit-as (`git commit -m 'feat: Adiciona nova funcionalidade'`).
4. Envie para a branch (`git push origin feature/sua-feature`).
5. Abra um Pull Request, descrevendo suas alterações.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o ficheiro `LICENSE` para mais detalhes.

## 📞 Contacto

Para questões, sugestões ou oportunidades, pode contactar Cesário Machava através dos seus canais listados no website.

