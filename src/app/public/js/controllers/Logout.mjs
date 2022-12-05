import { logoutHandler } from "../models/index.mjs";
import SignOutView from "../views/SignOutView.mjs";

const LogoutController = () => {
  const excludePaths = ["/register", "/login"];
  const path = window.location.pathname || "";
  if (!excludePaths.includes(path)) {
    SignOutView(logoutHandler);
  }
};

export default LogoutController;
