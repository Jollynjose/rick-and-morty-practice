import { registerHandler } from "../models/index.mjs";
import RegisterView from "../views/RegisterView.mjs";

const RegisterController = () => {
  RegisterView(registerHandler);
};

export default RegisterController;
