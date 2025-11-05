<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Postagens</title>
  <link rel="stylesheet" href="../styles/style.css" />
</head>

<body>
  <div class="container">
    <h2>Criar Postagem</h2>

    <form id="postForm">
      <input type="text" id="titulo" placeholder="Título" required />
      <textarea id="conteudo" placeholder="Escreva sua postagem..." required></textarea>
      <button type="submit">Publicar</button>
    </form>

    <h3>Postagens Recentes</h3>
    <div id="postsContainer"></div>

    <button id="logoutBtn">Sair</button>
  </div>

  <script type="module" src="./backend/postagem.js"></script>
</body>
</html>
