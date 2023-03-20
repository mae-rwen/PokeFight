const express = require("express");

const {
    createFight,
    getFightsPerPage,
    getFightsByName,
    getFights,
} = require("../controllers/pokemonFightsControllers");

const pokemonFightsRouter = express.Router();

pokemonFightsRouter.get('/showfights', getFightsPerPage);
pokemonFightsRouter.get('/showfights/all', getFights);
pokemonFightsRouter.post('/savefight',createFight);
pokemonFightsRouter.get('/showfights/:name',getFightsByName);

module.exports = {
    pokemonFightsRouter,
  };