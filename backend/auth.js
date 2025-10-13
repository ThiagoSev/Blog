// backend/auth.js
import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Seleciona os formulários
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// 🔹 LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login realizado com sucesso!");
    console.log("Usuário logado:", userCredential.user);
  } catch (error) {
    alert("❌ Erro no login: " + error.message);
  }
});

// 🔹 CADASTRO
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Cadastro realizado com sucesso!");
    console.log("Usuário criado:", userCredential.user);
  } catch (error) {
    alert("❌ Erro no cadastro: " + error.message);
  }
});
