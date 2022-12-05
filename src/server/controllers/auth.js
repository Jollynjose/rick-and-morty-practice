const {
  loginByCookie,
  logoutByCookie,
} = require("../../storage/firebase/auth");
const { getFavorites } = require("../../storage/firebase/firestore");

const loginUser = async (req, res) => {
  try {
    const idToken = req.body?.idToken.toString();
    const csrfToken = req.body?.csrfToken.toString();
    if (!idToken) throw new Error("You must send valid id Token");
    if (csrfToken !== req.cookies["XSRF-TOKEN"])
      throw new Error("UNAUTHORIZED REQUEST!");

    const expiresIn = 60 * 60 * 24 * 1000;
    const sessionCookie = await loginByCookie(idToken, expiresIn);

    res.cookie("session", sessionCookie, { maxAge: expiresIn, httpOnly: true });
    res.end(JSON.stringify({ message: "success", status: 200 }));
  } catch (error) {
    res.status(401).json(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const sessionCookie = req.cookies.session || "";
    res.clearCookie("session");
    await logoutByCookie(sessionCookie);
    res.end(JSON.stringify({ message: "success", status: 200 }));
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
