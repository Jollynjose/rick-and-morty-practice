require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  FIREBASE: {
    API_KEY: process.env.FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGINGSENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  API_URL: process.env.API_URL,
};

module.exports = {
  config,
};
