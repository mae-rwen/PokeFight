const express = require("express");
const app = express.Router();

const {
  getAllPokemons,
  getPokemonByName,
  getRandomPokemon,
} = require("../controllers/pokemonControllers");

app.route("/").get(getAllPokemons);
app.route("/random/").get(getRandomPokemon);
app.route("/:name").get(getPokemonByName);

module.exports = app;
