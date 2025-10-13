// backend/auth.js
import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Seleciona os formulários
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado:", userCredential.user);
    window.location.href = "../home.html";
  } catch (error) {
    alert(" Erro no login: " + error.message);
    console.log("Erro ao autenticar usuario:" + error.message);
  }
});

// Cadastro
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Cadastro realizado com sucesso!");
    console.log("Usuário criado:", userCredential.user);
  } catch (error) {
    alert("Erro no cadastro: " + error.message);
    console.log("Erro ao cadastrar usuario:" + error.message);
  }
});
