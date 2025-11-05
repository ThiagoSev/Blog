import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const postContainer = document.getElementById("postContainer");

//Formatação do Timestamp
function formatTimestamp(ts) {
  try {
    if (!ts) return "—";
    if (typeof ts.toDate === "function") {
      const d = ts.toDate();
      return d.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    const d = new Date(ts);
    if (isNaN(d)) return "—";
    return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch (err) {
    return "—";
  }
}

//Escape para segurança básica
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Lê o parâmetro ID do objeto na URL
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function loadPost() {
  const id = getParam("id");
  if (!id) {
    postContainer.innerHTML = "<p>ID do artigo não informado.</p>";
    return;
  }

  try {
    const ref = doc(db, "posts", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      postContainer.innerHTML = "<p>Artigo não encontrado.</p>";
      return;
    }

    const data = snap.data();

    const title = data.title ?? "Sem título";
    const content = data.content ?? "Sem conteúdo.";
    const author = data.author ?? "Anônimo";
    const createdAt = data.createdAt ?? null;

    postContainer.innerHTML = `
      <article class="artigo-detalhe">
        <h1 class="titulo">${escapeHtml(title)}</h1>
        <p class="meta">por <strong>${escapeHtml(author)}</strong> — <span>${escapeHtml(formatTimestamp(createdAt))}</span></p>
        <div class="conteudo">${nl2br(escapeHtml(content))}</div>
      </article>
      <p><a href="./home.php">← Voltar</a></p>
    `;
  } catch (error) {
    console.error("Erro ao carregar artigo:", error);
    postContainer.innerHTML = "<p>Erro ao carregar artigo. Veja console para detalhes.</p>";
  }
}

// Troca quebra de linha pela tag <br>
function nl2br(str) {
  return str.replace(/\n/g, "<br>");
}

loadPost();
