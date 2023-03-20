const express = require("express");
const app = express();
const port = 3010;
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db.js");
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from group one");
});

const pokemon = require("./routes/pokemonRoutes");
app.use("/pokemons", pokemon);

const { pokemonFightsRouter } = require("./routes/pokemonFightsRoutes");
app.use("/pokemons/pokemonfights", pokemonFightsRouter);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
