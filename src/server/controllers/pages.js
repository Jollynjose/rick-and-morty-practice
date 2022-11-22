const {
  getRandomCharacterImage,
  getListCharacters,
  getCountByCharacters,
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
      { title: "Favorites", url: "/" },
      { title: "About", url: "/about" },
    ];
    const characters = await getListCharacters();
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

module.exports = {
  homePageController,
  listPageController,
  aboutPageController,
};
