import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { app } from "./config";

const form = document.getElementById("form");
const logout = document.getElementById("logout");
const firebaseAuth = getAuth(app);
class Auth {
  constructor(firebaseAuth) {
    this.firebaseAuth = firebaseAuth;
    this.monitorAuthState();
    if (logout)
      logout.addEventListener("click", this.logOut.bind(this), { once: true });
  }

  async signUp(email = "", password = "") {
    try {
      await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    } catch (err) {
      alert(err);
    }
  }

  async logOut() {
    try {
      await signOut(this.firebaseAuth);
    } catch (err) {
      alert(err);
    }
  }

  async logIn(email = "", password = "") {
    try {
      await signInWithEmailAndPassword(this.firebaseAuth, email, password);
    } catch (err) {
      alert(err);
    }
  }

  monitorAuthState() {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      const path = window.location.pathname || "";
      const publicPaths = ["/login.html", "/signup.html"];
      if (user) {
        if (publicPaths.includes(path)) window.location.href = "/home.html";
        sessionStorage.setItem("userId", user.email);
      } else if (!publicPaths.includes(path) && path !== "/404.html") {
        window.location.href = "/login.html";
      }
    });
  }
}

export const auth = new Auth(firebaseAuth);

export const register = () => {
  if (form)
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      await auth.signUp(email, password);
    });
};

export const login = () => {
  if (form)
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      await auth.logIn(email, password);
    });
};
