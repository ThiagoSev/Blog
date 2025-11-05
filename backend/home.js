// backend/home.js
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// elementos da página
const userInfo = document.getElementById("userInfo");
const logoutBtn = document.getElementById("logoutBtn");

// formata timestamp (caso use createdAt serverTimestamp)
function formatTimestamp(ts) {
  if (!ts) return "—";
  if (typeof ts.toDate === "function") {
    return ts.toDate().toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }
  const d = new Date(ts);
  return isNaN(d) ? "—" : d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// segura escape simples para evitar XSS
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// verifica auth
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.textContent = `Olá, ${user.email}`;
    loadPosts();
  } else {
    // ajuste o caminho para sua página de login
    window.location.href = "../pages/login.html";
  }
});

// logout
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "../index.php";
  } catch (err) {
    console.error("Erro no logout:", err);
  }
});

// carrega posts (mostra título, autor, data)
async function loadPosts() {
  try {
    const postsContainer = document.querySelector("#postsList") || document.querySelector("section:nth-of-type(2)");
    if (!postsContainer) {
      console.warn("Container de posts não encontrado.");
      return;
    }

    postsContainer.innerHTML = "<p>Carregando artigos...</p>";

    // busca ordenada por data (se for createdAt)
    const postsCol = collection(db, "posts");
    const q = query(postsCol, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      postsContainer.innerHTML = "<p>Nenhum artigo publicado ainda.</p>";
      return;
    }

    postsContainer.innerHTML = ""; // limpa
    snapshot.forEach((doc) => {
      const data = doc.data();

      // ajusta nomes de campos conforme seu banco: title/title, titulo, author/autor, createdAt/dataPublicacao
      const title = data.title ?? data.titulo ?? "Sem título";
      const author = data.author ?? data.autor ?? "Anônimo";
      const createdAt = data.createdAt ?? data.dataPublicacao ?? null;

      const article = document.createElement("article");
      article.className = "artigo";

      // usa template literal (backticks) corretamente — não use aspas “curly”
      article.innerHTML = `
        <h2 class="tituloArtigo"><a href="./post.php?id=${doc.id}">${escapeHtml(title)}</a></h2>
        <p class="descricaoArtigo">Autor: <strong>${escapeHtml(author)}</strong></p>
        <p class="dataArtigo">Publicado em: ${escapeHtml(formatTimestamp(createdAt))}</p>
      `;

      // clique abre a página de detalhe
      article.addEventListener("click", () => {
        window.location.href = `./post.php?id=${doc.id}`;
      });

      postsContainer.appendChild(article);
    });
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
    const postsContainer = document.querySelector("#postsList") || document.querySelector("section:nth-of-type(2)");
    if (postsContainer) postsContainer.innerHTML = "<p>Erro ao carregar artigos. Veja console.</p>";
  }
}
