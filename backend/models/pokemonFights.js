const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonFightsSchema = new Schema({
    game_id: { type: Number },
    date: { type: Date, default: Date.now },
    chosen_pokemon: { type: String },
    random_pokemon: { type: String },
    winner: { type: String }
});

module.exports = mongoose.model("pokemonFights", pokemonFightsSchema);
