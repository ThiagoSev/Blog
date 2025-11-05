<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="stylesheet" href="../styles/styleCriarPost.css" />
  <title>Publicar Post</title>
</head>
<body>

  <h1>Criar novo post</h1>

  <form id="postForm">
    <label for="title">Título</label>
    <input id="title" name="title" type="text" placeholder="Título do post" required />

    <label for="content">Conteúdo</label>
    <textarea id="content" name="content" placeholder="Escreva o conteúdo..." required></textarea>

    <label for="author">Autor (opcional)</label>
    <input id="author" name="author" type="text" placeholder="Nome do autor — se vazio usará seu email ou 'Anônimo'" />

    <button id="submitPost" type="submit">Publicar</button>
  </form>

  <div id="postMessage"></div>

  <script type="module" src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"></script>
  <script type="module" src="../backend/firebaseConfig.js"></script>
  <script type="module" src="../backend/post.js"></script>

</body>
</html>
