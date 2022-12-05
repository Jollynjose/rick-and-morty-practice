const RegisterView = (registerHandler) => {
  const login = document.querySelector("#form");
  login.addEventListener("submit", async (ev) => {
    try {
      ev.preventDefault();
      const email = login.querySelector("#email").value.trim();
      const password = login.querySelector("#password").value.trim();
      await registerHandler(email, password);
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  });
};

export default RegisterView;
