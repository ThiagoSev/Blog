import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Seleciona o formulário e elementos
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const authorInput = document.getElementById("author");
const submitBtn = document.getElementById("submitPost");
const msgBox = document.getElementById("postMessage");

// Função utilitária para mostrar mensagens rápidas
function showMessage(text, isError = false) {
  if (!msgBox) return;
  msgBox.textContent = text;
  msgBox.style.color = isError ? "crimson" : "green";
  setTimeout(() => { msgBox.textContent = ""; }, 5000);
}

postForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  let author = authorInput.value.trim();

  // Validação simples
  if (!title) return showMessage("Informe o título do post.", true);
  if (!content) return showMessage("Informe o conteúdo do post.", true);
  if (!author) {
  
    const user = auth.currentUser; // Tenta pegar o email de usuário se o campo "Autor" for vazio
    if (user && user.email) author = user.email;
    else author = "Anônimo";
  }

  // Desabilita botão para evitar múltiplos clicks
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  try {
    // Referência para coleção 'posts'
    const postsCol = collection(db, "posts");

    // Adiciona documento com data e hora atuais para a data
    const docRef = await addDoc(postsCol, {
      title,
      content,
      author,
      createdAt: serverTimestamp()
    });

    showMessage("Post publicado com sucesso!");
    console.log("Post criado com ID:", docRef.id);

    // limpa form
    postForm.reset();

    // Redireciona para Home
    window.location.href = "./pages/home.php";

  } catch (error) {
    console.error("Erro ao publicar post:", error);
    showMessage("Erro ao publicar post: " + error.message, true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Publicar";
  }
});
