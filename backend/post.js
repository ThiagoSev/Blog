import { auth, db } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const logoutBtn = document.getElementById("logoutBtn");
const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");

let currentUser = null;

// Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    carregarPostagens();
  } else {
    window.location.href = "../index.php";
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../index.php";
});

//  Enviar nova postagem
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const conteudo = document.getElementById("conteudo").value.trim();

  if (!titulo || !conteudo) return alert("Preencha todos os campos!");

  try {
    await addDoc(collection(db, "posts"), {
      titulo,
      conteudo,
      autor: currentUser.email,
      data: serverTimestamp()
    });

    postForm.reset();
    alert("Postagem publicada com sucesso!");
  } catch (error) {
    console.error("Erro ao publicar:", error);
    alert("Erro ao publicar o post.");
  }
});

// Carregar postagens em tempo real
function carregarPostagens() {
  const q = query(collection(db, "posts"), orderBy("data", "desc"));

  onSnapshot(q, (snapshot) => {
    postsContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const post = doc.data();
      const data = post.data?.toDate
        ? post.data.toDate().toLocaleString("pt-BR")
        : "";

      const div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `
        <h4>${post.titulo}</h4>
        <p>${post.conteudo}</p>
        <small>Autor: ${post.autor} | ${data}</small>
        <hr>
      `;
      postsContainer.appendChild(div);
    });
  });
}
