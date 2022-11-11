const { getRandomCharacterImage } = require("../services/axios");

const homePageController = async (req, res) => {
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
};

const listPageController = async (req, res) => {
  const links = [
    { title: "Home", url: "/" },
    { title: "Favorites", url: "/" },
    { title: "About", url: "/about" },
  ];
  const params = {
    links,
    title: "List",
  };
  res.render("list", params);
};

const aboutPageController = async (req, res) => {
  const links = [
    { title: "Home", url: "/home" },
    { title: "About", url: "/about" },
  ];
  const randomImageUrl = await getRandomCharacterImage();

  const params = {
    links,
    randomImageUrl,
    title: "About",
  };
  res.render("about", params);
};

module.exports = {
  homePageController,
  listPageController,
  aboutPageController,
};
