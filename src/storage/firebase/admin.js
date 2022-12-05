const admin = require("firebase-admin");
const { config } = require("../../config");
const serviceAccount = require("./serviceAccount.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FIREBASE.DATABASE_URL,
});

module.exports = firebaseAdmin;
