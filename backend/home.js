import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Buscando os elementos da página
const userInfo = document.getElementById("userInfo");
const logoutBtn = document.getElementById("logoutBtn");

// Formatação Timestamp
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

// Escape simples para segurança
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Verifica se usuário está logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.textContent = `Olá, ${user.email}`;
    loadPosts();
  } else {
    // Redireciona para a página de login
    window.location.href = "../index.php";
  }
});

// Logout
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "../index.php";
  } catch (err) {
    console.error("Erro no logout:", err);
  }
});

// Carregamento dos posts
async function loadPosts() {
  try {
    const postsContainer = document.querySelector("#postsList") || document.querySelector("section:nth-of-type(2)");
    if (!postsContainer) {
      console.warn("Container de posts não encontrado.");
      return;
    }

    postsContainer.innerHTML = "<p>Carregando artigos...</p>";

    // Faz a busca por data (mais recentes no topo)
    const postsCol = collection(db, "posts");
    const q = query(postsCol, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      postsContainer.innerHTML = "<p>Nenhum artigo publicado ainda.</p>";
      return;
    }

    postsContainer.innerHTML = ""; // Limpa o Container
    snapshot.forEach((doc) => {
      const data = doc.data();

      // Declara as constantes e busca as informações no banco
      const title = data.title ?? "Sem título";
      const author = data.author ?? "Anônimo";
      const createdAt = data.createdAt ?? null;

      const article = document.createElement("article");
      article.className = "artigo";

      //Estrutura HTML para vizualizar informações do post
      article.innerHTML = `
        <h2 class="tituloArtigo"><a href="./post.php?id=${doc.id}">${escapeHtml(title)}</a></h2>
        <p class="descricaoArtigo">Autor: <strong>${escapeHtml(author)}</strong></p>
        <p class="dataArtigo">Publicado em: ${escapeHtml(formatTimestamp(createdAt))}</p>
      `;

      // Direciona para a página com o post
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
