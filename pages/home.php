<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../styles/styleHome.css" />
  <script type="module" src="../backend/homeAuth.js"></script>
  <title>Home</title>
</head>

<body>
  <header>
    <h1>Artigos e tal</h1>
    <nav>
      <a href="https://x.com/jairbolsonaro" target="_blank">bolsonaro</a>
    </nav>
  </header>
  <section>
    <div class="criarArtigo">
      <h2>criar artigo</h2>
      <a href="../criarArtigo.html">criar artigo</a>
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