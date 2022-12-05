const firebaseAdmin = require("./admin");

const auth = firebaseAdmin.auth();

const loginByCookie = async (idToken = "", expiresIn = 0) => {
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    return sessionCookie;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByEmail = async (email = "") => {
  try {
    const user = await auth.getUserByEmail(email);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (email = "", password = "") => {
  try {
    const user = await auth.createUser({ email, password });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const verifySessionCookie = async (sessionCookie) => {
  try {
    const user = await auth.verifySessionCookie(sessionCookie, true);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const logoutByCookie = async (sessionCookie) => {
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie);
    await auth.revokeRefreshTokens(decodedClaims.sub);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  loginByCookie,
  verifySessionCookie,
  logoutByCookie,
};
