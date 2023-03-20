const pokemonFights = require("../models/pokemonFights");

const createFight = async (req, res) => {
  const { game_id, chosen_pokemon, random_pokemon, winner } = req.body;

  try {
    const fight = await pokemonFights.create({
      game_id,
      chosen_pokemon,
      random_pokemon,
      winner,
    });
    res.status(201).json(fight);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const getFights = async (req, res) => {
  try {
    const fights = await pokemonFights.find({});
    res.json(fights);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const getFightsPerPage = async (req, res) => {
  const { page } = req.query;
  try {
    const fights = await pokemonFights.find({});
    const fightsPerPage = 8;
    const indexOfLastFight = page * fightsPerPage; //1*15
    const indexOfFirstFight = indexOfLastFight - fightsPerPage; //0
    const currentFights = fights.slice(indexOfFirstFight, indexOfLastFight); //(0,15) ... 15 is not included
    // res.json(fights);
    res.json({
      currentFights: currentFights,
      limit: fightsPerPage,
      totalFights: fights.length,
    });
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const getFightsByName = async (req, res) => {
  const { name } = req.params;
  try {
    const fight = await pokemonFights.find({
      $or: [{ chosen_pokemon: name }, { random_pokemon: name }],
    });
    res.status(200).json(fight);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

module.exports = {
  createFight,
  getFights,
  getFightsByName,
  getFightsPerPage,
};
