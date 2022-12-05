import LoginView from "../views/LoginView.mjs";
import { loginHandler } from "../models/index.mjs";

const LoginController = () => {
  LoginView(loginHandler);
};

export default LoginController;
