import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FightScores from "./FightScores";
import SearchForScores from "./SearchForScores";

export default function Scores() {
  const [fightScores, setFightScores] = useState([]);
  const { name } = useParams();

  //setFightScores
  useEffect(() => {
    axios
      .get(`http://localhost:3010/pokemons/pokemonfights/showfights/${name}`)
      .then((response) => {
        setFightScores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  return (
    <div>
      <SearchForScores />
      <FightScores variant={fightScores} />
    </div>
  );
}
