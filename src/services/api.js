import axios from "axios";

// Acessa a variável de ambiente definida no .env do frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Cria uma instância do Axios para configurar a URL base e outros padrões
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  },
  timeout: 10000, // Timeout de 10 segundos
});

// Opcional: Interceptor para lidar com erros globais
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Exemplo de tratamento de erro para 401 (Não Autorizado)
    if (error.response && error.response.status === 401) {
      console.error(
        "Sessão expirada ou não autorizado. Redirecionando para login...",
      );
      // Ex: window.location.href = '/login';
    }
    // Exemplo de tratamento de erro para 404 (Não Encontrado)
    if (error.response && error.response.status === 404) {
      console.warn("Recurso não encontrado:", error.response.config.url);
    }
    return Promise.reject(error); // Rejeita a promessa para que o erro seja tratado no componente
  },
);

// Métodos específicos para os recursos da sua API
const api = {
  // Posts
  getAllPosts: async () => {
    try {
      const response = await apiClient.get("/posts");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os posts:", error);
      throw error; // Re-lança o erro para o componente lidar
    }
  },

  getPostBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/posts/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar post com slug ${slug}:`, error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const response = await apiClient.post("/posts", postData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar post:", error);
      throw error;
    }
  },

  updatePost: async (slug, postData) => {
    try {
      const response = await apiClient.put(`/posts/${slug}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar post com slug ${slug}:`, error);
      throw error;
    }
  },

  deletePost: async (slug) => {
    try {
      await apiClient.delete(`/posts/${slug}`);
      return true; // Indica sucesso na deleção
    } catch (error) {
      console.error(`Erro ao deletar post com slug ${slug}:`, error);
      throw error;
    }
  },
};

export default api;
