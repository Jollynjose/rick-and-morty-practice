import { getDatabase, ref, set } from "firebase/database";
import { app } from "./config";

const db = getDatabase(app);
