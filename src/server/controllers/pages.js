const { config } = require("../../config");
const { getUserByToken } = require("../../storage/firebase/auth");
const { getFavorites } = require("../../storage/firebase/firestore");
const {
  getRandomCharacterImage,
  getListCharacters,
  getCountByCharacters,
  getFavoriteChracters,
} = require("../services/axios");

const homePageController = async (req, res) => {
  try {
    const links = [
      { title: "List", url: "/list" },
      { title: "About", url: "/about" },
    ];
    const randomImageUrl = await getRandomCharacterImage();
    const params = {
      links,
      randomImageUrl,
      title: "Home",
    };
    res.render("home", params);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
    });
    console.error(error);
  }
};

const listPageController = async (req, res) => {
  try {
    const links = [
      { title: "Home", url: "/" },
      { title: "Favorites", url: "/favorites" },
    ];

    const userEmail = res.locals.email;
    const favorites = await getFavorites(userEmail);
    const characters = await getListCharacters(1, favorites);
    const charactersCount = await getCountByCharacters();
    const params = {
      links,
      title: "List",
      characters,
    };
    res.cookie("charactersCount", JSON.stringify(charactersCount));
    res.render("list", params);
  } catch (error) {
    res.status(500).json({
      message: error,
      status: 500,
    });
    console.log(error);
  }
};

const aboutPageController = async (req, res) => {
  try {
    const links = [{ title: "Home", url: "/home" }];
    const randomImageUrl = await getRandomCharacterImage();

    const params = {
      links,
      randomImageUrl,
      title: "About",
    };
    res.render("about", params);
  } catch (error) {
    res.status(500).json({
      message: error,
      status: 500,
    });
    console.log(error);
  }
};

const favoritesPageController = async (req, res) => {
  try {
    const email = res.locals.email;
    const favorites = await getFavorites(email);
    const favoriteChracters = await getFavoriteChracters(favorites);
    const params = {
      title: "Favorites",
      characters: favoriteChracters,
      links: [{ title: "Back", url: "/list" }],
    };

    res.render("favorites", params);
  } catch (error) {}
};

const registerPageController = (req, res) => {
  const { API_KEY, AUTH_DOMAIN } = config.FIREBASE;
  const params = {
    links: [{ title: "Register", url: "#" }],
    title: "Register",
    buttonText: "Sign Up",
    redirect: {
      link: "/login",
      text: "Back to login",
    },
    FIREBASE: {
      API_KEY,
      AUTH_DOMAIN,
    },
  };

  res.render("register", params);
};

const loginPageController = (req, res) => {
  const { API_KEY, AUTH_DOMAIN } = config.FIREBASE;
  const params = {
    links: [{ title: "Login", url: "#" }],
    title: "Login",
    buttonText: "Sign In",
    redirect: {
      link: "/register",
      text: "Go to sign up",
    },
    FIREBASE: {
      API_KEY,
      AUTH_DOMAIN,
    },
  };
  res.render("login", params);
};

module.exports = {
  homePageController,
  listPageController,
  aboutPageController,
  loginPageController,
  registerPageController,
  favoritesPageController,
};
