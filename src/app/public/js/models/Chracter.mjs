export class Character {
  constructor(
    id = 1,
    name = "",
    status = "",
    species = "",
    image = "",
    type = "",
    gender = "",
    origin = {},
    location = {},
    episode = [],
    url = "",
    created = "",
    isFavorite = false
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.species = species;
    this.type = type;
    this.gender = gender;
    this.origin = origin;
    this.location = location;
    this.image = image;
    this.episode = episode;
    this.url = url;
    this.created = created;
    this.isFavorite = isFavorite;
  }

  getInfo(key) {
    switch (key) {
      case "origin":
      case "location":
        return this[key].name;
      case "type":
        return this.type || "unknown";
      default:
        return this[key];
    }
  }
}
