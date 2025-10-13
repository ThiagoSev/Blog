  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

  //Credenciais do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyC2NR1aTaLRHTz7IDHBW7QcLup9QYpYz1E",
    authDomain: "menteinquieta.firebaseapp.com",
    projectId: "menteinquieta",
    storageBucket: "menteinquieta.firebasestorage.app",
    messagingSenderId: "631173255075",
    appId: "1:631173255075:web:ae4d27c728e5ef0792d416"
  };

  //Inicialização do banco
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  //Exportação das funções
  export {auth};
