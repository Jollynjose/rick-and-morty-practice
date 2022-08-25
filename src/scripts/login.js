import { logIn, signUp } from "../api/firebase/auth";

export const login = () => {
  const loginForm = document.getElementById("login");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = await logIn(email, password);
  });
};

export const register = () => {
  const signupForm = document.getElementById("signup");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email--signup").value;
    const password = document.getElementById("password--signup").value;
    await signUp(email, password);
  });
};

const toggleSignUp = () => {
  const sign = document.querySelector(".sign");
  if (sign) {
    sign.addEventListener("click", (e) => {
      document.body.classList.add("blurry");
    });
  }
};

toggleSignUp();
