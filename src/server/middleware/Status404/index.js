const Status404 = (req, res) => {
  res.status(404).render("404", { title: "Not Found", links: undefined });
};

module.exports = {
  Status404,
};
