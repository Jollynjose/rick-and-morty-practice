import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export const signUp = async (email = "", password = "") => {
  const createdUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logOut = async () => {
  const userLogOut = await signOut(auth);
};

export const logIn = async (email = "", password = "") => {
  const user = await signInWithEmailAndPassword(auth, email, password).catch(
    (e) => {
      console.error(e);
    }
  );
  return user;
};

export const getData = () => {};
