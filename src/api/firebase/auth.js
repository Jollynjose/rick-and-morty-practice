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

class Auth {
  constructor(firebaseApp) {
    this.firebaseAuth = getAuth(firebaseApp);
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
      await signOut(this.auth);
    } catch (err) {
      alert(err);
    }
  }

  async logIn(email = "", password = "") {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (err) {
      alert(err);
    }
  }

  async monitorAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      const path = window.location.pathname || "";
      const publicPaths = ["/login.html", "/signup.html"];
      if (user) {
        if (publicPaths.includes(path)) window.location.href = "/home.html";
        this.user = user;
      } else if (!publicPaths.includes(path) && path !== "/404.html") {
        window.location.href = "/login.html";
      }
    });
  }
}

export const auth = new Auth(app);

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
