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

  <!--Seção de renderização dos posts !-->
  <section id="postsSection">
    <div id="postsList"></div>
  </section>

  <!--Seção de redirecionamento para Criar Post !-->
  <section>
    <div class="criarArtigo">
      <h2>criar artigo</h2>
      <a href="./criarArtigo.php">criar artigo</a>
    </div>
  </section>

  <!--Seção de Logout !-->
  <section>
    <p id="userInfo"></p>
    <button id="logoutBtn">Sair</button>
  </section>
</body>

</html>