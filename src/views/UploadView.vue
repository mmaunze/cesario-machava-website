<template>


  <main>

    <section class="page-hero upload-hero">

      <div class="container">

        <h1>Carregar Ficheiros</h1>

        <p>Faça upload de documentos, relatórios e outros recursos.</p>

      </div>

    </section>


    <section class="upload-section">

      <div class="container upload-card">

        <h2>Selecione um Ficheiro para Carregar</h2>

        <p class="upload-description">

          Apenas ficheiros PDF, DOCX, XLSX e PPTX são permitidos. Tamanho máximo: 10MB.

        </p>


        <form class="upload-form" @submit.prevent="handleUpload">

          <div class="file-input-wrapper">

            <input

                id="fileInput"

                ref="fileInput"

                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"

                class="file-input"

                type="file"

                @change="onFileSelected"

            />

            <label class="custom-file-button" for="fileInput">

              {{ selectedFileName || 'Escolher Ficheiro' }}

              <svg fill="none" stroke="currentColor" stroke-width="1.5" style="width: 20px; height: 20px;"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"/>

              </svg>

            </label>

          </div>


          <div v-if="selectedFile" class="file-details">

            <p><strong>Ficheiro Selecionado:</strong> {{ selectedFile.name }}</p>

            <p><strong>Tipo:</strong> {{ selectedFile.type || 'Desconhecido' }}</p>

            <p><strong>Tamanho:</strong> {{ formatBytes(selectedFile.size) }}</p>

          </div>


          <button

              :disabled="!selectedFile || isUploading"

              class="btn-upload"

              type="submit"

          >

            <span v-if="!isUploading">

              Carregar Ficheiro

              <svg fill="none" stroke="currentColor" stroke-width="1.5" style="width: 20px; height: 20px;"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-16.5-9L12 3m0 0l-7.5 7.5M12 3v13.5" stroke-linecap="round"
                      stroke-linejoin="round"/>

              </svg>

            </span>

            <span v-else>

              A Carregar...

              <div class="spinner"></div>

            </span>

          </button>


          <div v-if="isUploading" class="progress-bar-container">

            <div :style="{ width: uploadProgress + '%' }" class="progress-bar">

              {{ uploadProgress.toFixed(0) }}%

            </div>

          </div>


          <p v-if="statusMessage" :class="['status-message', statusType]">

            {{ statusMessage }}

          </p>

        </form>

      </div>

    </section>

  </main>

</template>


<script setup>

import {ref} from 'vue';


const selectedFile = ref(null);

const selectedFileName = ref('');

const uploadProgress = ref(0);

const isUploading = ref(false);

const statusMessage = ref('');

const statusType = ref(''); // 'success', 'error', 'info'


const fileInput = ref(null); // Ref para o elemento input file


const onFileSelected = (event) => {

  const file = event.target.files[0];

  if (file) {

    // Validar tipo de ficheiro

    const allowedTypes = [

      'application/pdf',

      'application/msword',

      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

      'application/vnd.ms-excel',

      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

      'application/vnd.ms-powerpoint',

      'application/vnd.openxmlformats-officedocument.presentationml.presentation'

    ];

    const maxFileSize = 10 * 1024 * 1024; // 10MB


    if (!allowedTypes.includes(file.type)) {

      statusMessage.value = 'Tipo de ficheiro não permitido. Apenas PDF, DOCX, XLSX, PPTX.';

      statusType.value = 'error';

      selectedFile.value = null;

      selectedFileName.value = '';

      if (fileInput.value) fileInput.value.value = ''; // Limpar input

      return;

    }


    if (file.size > maxFileSize) {

      statusMessage.value = `Ficheiro muito grande. Tamanho máximo é ${formatBytes(maxFileSize)}.`;

      statusType.value = 'error';

      selectedFile.value = null;

      selectedFileName.value = '';

      if (fileInput.value) fileInput.value.value = ''; // Limpar input

      return;

    }


    selectedFile.value = file;

    selectedFileName.value = file.name;

    statusMessage.value = '';

    statusType.value = '';

    uploadProgress.value = 0;

  } else {

    selectedFile.value = null;

    selectedFileName.value = '';

    statusMessage.value = '';

    statusType.value = '';

  }

};


const handleUpload = async () => {

  if (!selectedFile.value) {

    statusMessage.value = 'Por favor, selecione um ficheiro primeiro.';

    statusType.value = 'info';

    return;

  }


  isUploading.value = true;

  statusMessage.value = 'A carregar ficheiro...';

  statusType.value = 'info';

  uploadProgress.value = 0;


  // --- SIMULAÇÃO DE UPLOAD ---

  // Em um ambiente real, você faria uma requisição HTTP para o seu backend aqui.

  // Exemplo usando FormData para enviar o ficheiro:

  // const formData = new FormData();

  // formData.append('file', selectedFile.value);

  // formData.append('description', 'Alguma descrição do ficheiro'); // Campos adicionais, se houver


  try {

    // Simulação de progresso de upload

    let progress = 0;

    const interval = setInterval(() => {

      progress += 10;

      if (progress <= 100) {

        uploadProgress.value = progress;

      } else {

        clearInterval(interval);

      }

    }, 200); // Aumenta o progresso a cada 200ms


    // Simular atraso da rede/processamento no backend

    await new Promise(resolve => setTimeout(resolve, 2500)); // Espera 2.5 segundos


    // SIMULAÇÃO DE RESPOSTA DO BACKEND

    const success = Math.random() > 0.2; // 80% de chance de sucesso, 20% de falha


    if (success) {

      statusMessage.value = `"${selectedFile.value.name}" carregado com sucesso!`;

      statusType.value = 'success';

      // Limpar o formulário após sucesso

      selectedFile.value = null;

      selectedFileName.value = '';

      if (fileInput.value) fileInput.value.value = ''; // Limpar input do DOM

    } else {

      throw new Error('Erro simulado no servidor ou na rede.');

    }


  } catch (error) {

    console.error('Erro durante o upload:', error);

    statusMessage.value = `Falha ao carregar ficheiro: ${error.message || 'Erro desconhecido.'}`;

    statusType.value = 'error';

  } finally {

    isUploading.value = false;

    // Garante que a barra de progresso atinge 100% mesmo em caso de erro rápido

    if (uploadProgress.value < 100) {

      uploadProgress.value = 100;

    }

  }

};


const formatBytes = (bytes, decimals = 2) => {

  if (bytes === 0) return '0 Bytes';

  const k = 1024;

  const dm = decimals < 0 ? 0 : decimals;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

};

</script>


<style scoped>

/* Page Hero (comum para Downloads e Blog) */

.page-hero {

  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-orange) 100%);

  color: white;

  text-align: center;

  padding: 80px 0 40px;

  margin-top: 75px;

  /* Offset for fixed header */

  border-bottom: 5px solid var(--primary-orange);

}


.page-hero h1 {

  font-size: 3rem;

  margin-bottom: 1rem;

  font-weight: 800;

  letter-spacing: -0.02em;

  color: white;

  -webkit-text-fill-color: initial;

}


.page-hero p {

  font-size: 1.1rem;

  opacity: 0.9;

}


/* Upload Section */

.upload-section {

  padding: 3rem 0;

  background-color: var(--bg-body);

  display: flex;

  justify-content: center;

  align-items: center;

  min-height: calc(100vh - 75px - 200px - 80px); /* Ajusta para ocupar espaço mínimo */

}


.upload-card {

  background: var(--bg-section);

  padding: 3rem;

  border-radius: 15px;

  box-shadow: 0 12px 40px var(--shadow-color);

  text-align: center;

  max-width: 700px;

  width: 100%;

  border: 1px solid var(--border-color);

}


.upload-card h2 {

  font-size: 2rem;

  color: var(--text-primary);

  margin-bottom: 1.5rem;

}


.upload-description {

  font-size: 1rem;

  color: var(--text-secondary);

  margin-bottom: 2.5rem;

  line-height: 1.6;

}


.upload-form {

  display: flex;

  flex-direction: column;

  gap: 1.5rem;

  align-items: center;

}


.file-input-wrapper {

  width: 100%;

  position: relative;

}


.file-input {

  display: none; /* Esconde o input file nativo */

}


.custom-file-button {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  background: var(--bg-card);

  color: var(--text-primary);

  padding: 15px 25px;

  border-radius: 10px;

  cursor: pointer;

  border: 2px dashed var(--border-color);

  font-weight: 500;

  transition: all 0.3s ease;

  width: 100%;

  text-align: center;

}


.custom-file-button:hover {

  border-color: var(--primary-blue);

  background-color: var(--bg-body);

  box-shadow: 0 5px 15px var(--shadow-color);

}


.file-details {

  background: var(--bg-card);

  border: 1px solid var(--border-color);

  padding: 1rem 1.5rem;

  border-radius: 10px;

  width: 100%;

  text-align: left;

  font-size: 0.95rem;

  color: var(--text-secondary);

}


.file-details p {

  margin-bottom: 0.5rem;

}


.file-details p:last-child {

  margin-bottom: 0;

}


.btn-upload {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  background: var(--gradient-primary);

  color: white;

  padding: 15px 30px;

  border-radius: 30px;

  border: none;

  cursor: pointer;

  font-weight: 600;

  font-size: 1rem;

  transition: all 0.3s ease;

  box-shadow: 0 8px 25px var(--shadow-color);

  width: auto;

  min-width: 200px;

}


.btn-upload:disabled {

  opacity: 0.6;

  cursor: not-allowed;

  box-shadow: none;

}


.btn-upload:hover:not(:disabled) {

  transform: translateY(-3px);

  box-shadow: 0 12px 30px var(--shadow-hover);

}


/* Spinner de carregamento */

.spinner {

  border: 4px solid rgba(255, 255, 255, 0.3);

  border-top: 4px solid #fff;

  border-radius: 50%;

  width: 20px;

  height: 20px;

  animation: spin 1s linear infinite;

  margin-left: 10px;

}


@keyframes spin {

  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }

}


/* Barra de Progresso */

.progress-bar-container {

  width: 100%;

  background-color: var(--bg-card);

  border-radius: 10px;

  overflow: hidden;

  height: 25px;

  margin-top: 1rem;

  border: 1px solid var(--border-color);

}


.progress-bar {

  height: 100%;

  background: var(--gradient-primary);

  width: 0%;

  transition: width 0.4s ease-out;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  font-weight: 600;

  font-size: 0.9rem;

}


/* Mensagens de Status */

.status-message {

  margin-top: 1.5rem;

  padding: 1rem 1.5rem;

  border-radius: 8px;

  font-weight: 500;

  text-align: center;

  width: 100%;

}


.status-message.success {

  background-color: #d1fae5; /* green-100 */

  color: #065f46; /* green-800 */

  border: 1px solid #34d399; /* green-400 */

}


.dark-mode .status-message.success {

  background-color: #064e3b;

  color: #a7f3d0;

  border-color: #34d399;

}


.status-message.error {

  background-color: #fee2e2; /* red-100 */

  color: #991b1b; /* red-800 */

  border: 1px solid #ef4444; /* red-400 */

}


.dark-mode .status-message.error {

  background-color: #7f1d1d;

  color: #fca5a5;

  border-color: #ef4444;

}


.status-message.info {

  background-color: #e0f2fe; /* blue-100 */

  color: #1e40af; /* blue-800 */

  border: 1px solid #60a5fa; /* blue-400 */

}


.dark-mode .status-message.info {

  background-color: #1e3a8a;

  color: #bfdbfe;

  border-color: #60a5fa;

}


/* Container comum */

.container {

  max-width: 1200px;

  margin: 0 auto;

  padding: 0 1.5rem;

}


/* Responsividade */

@media (max-width: 768px) {

  .upload-card {

    padding: 2rem;

  }


  .upload-card h2 {

    font-size: 1.8rem;

  }


  .upload-description {

    font-size: 0.95rem;

    margin-bottom: 2rem;

  }


  .btn-upload,
  .custom-file-button {

    padding: 12px 20px;

    font-size: 0.95rem;

  }

}


@media (max-width: 480px) {

  .upload-card {

    padding: 1.5rem;

    margin: 0 1rem;

  }


  .upload-card h2 {

    font-size: 1.5rem;

  }


  .custom-file-button {

    flex-direction: column;

    gap: 5px;

    height: auto;

  }

}

</style>