<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Publicar Post</title>
  <style>
    /* estilo simples para facilitar testes */
    body { font-family: Arial, sans-serif; padding: 20px; max-width: 720px; margin: auto; }
    label { display:block; margin-top:12px; font-weight:600; }
    input[type="text"], textarea { width:100%; padding:8px; margin-top:6px; box-sizing:border-box; }
    textarea { min-height:160px; resize:vertical; }
    button { margin-top:12px; padding:10px 16px; cursor:pointer; }
    #postMessage { margin-top:12px; min-height:20px; }
  </style>
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

  <!-- Firebase libs (mesma versão que você usa) -->
  <script type="module" src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"></script>

  <!-- Seu arquivo firebaseConfig (já criado) -->
  <script type="module" src="../backend/firebaseConfig.js"></script>

  <!-- Script que envia o post (o caminho aqui depende de onde você colocou) -->
  <script type="module" src="../backend/post.js"></script>

</body>
</html>
