<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../styles/styleHome.css" />
  <script type="module" src="../backend/home.js"></script>
  <title>Home</title>
</head>

<body>
  <header>
    <h1>Mente Inquieta</h1>
  </header>
  <section id="postsSection">
    <div id="postsList"></div>
  </section>
  <section>
    <div class="criarArtigo">
      <h2>criar artigo</h2>
      <a href="./criarArtigo.php">criar artigo</a>
    </div>
  </section>
  <section>
    <div class="artigo">
      <h2 class="tituloArtigo">titulo do artigo</h2>
      <p class="descricaoArtigo">descricao</p>
      <p class="dataArtigo">data de publicação</p>
    </div>
  </section>
  <section>
    <p id="userInfo"></p>
    <button id="logoutBtn">Sair</button>
  </section>
</body>

</html>