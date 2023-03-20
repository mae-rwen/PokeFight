import axios from "axios";
import { useState, useEffect } from "react";
import SearchForScores from "./SearchForScores";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";

export default function AllScores() {
  const [fightScores, setFightScores] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    navigate(`?page=${currentPage + 1}`);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    navigate(`?page=${currentPage - 1}`);
  };

  //setFightScores
  useEffect(() => {
    axios
      .get(
        `http://localhost:3010/pokemons/pokemonfights/showfights/?page=${currentPage}`
      )
      .then((response) => {
        setFightScores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  return (
    <div>
      <SearchForScores />
      <br />
      <br />
      <p className="text-center">
        {`Page ${currentPage}`} of{" "}
        {Math.ceil(fightScores.totalFights / fightScores.limit)}
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><b>Fight No.</b></th>
            <th><b>Pokémon 1</b></th>
            <th><b>Pokémon 2</b></th>
            <th><b>Winner</b></th>
            <th><b>Fought on</b></th>
          </tr>
        </thead>
        <tbody>
          {fightScores.currentFights?.map((scores) => {
            const formattedDate = new Date(scores.date).toDateString();
            return (
              <tr key={scores._id}>
                <td>{scores.game_id}</td>
                <td><NavLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/fightscores/${scores.chosen_pokemon}`}
                >
                  {scores.chosen_pokemon}
                </NavLink></td>
                <td><NavLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/fightscores/${scores.random_pokemon}`}
                >
                  {scores.random_pokemon}
                </NavLink></td>
                <td><NavLink
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/fightscores/${scores.winner}`}
                >
                  {scores.winner}
                </NavLink></td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex flex-direction-row justify-content-center mt-3 gap-3">
        <Button
          onClick={handlePrevious}
          className="btn-dark"
          disabled={currentPage === 1}
        >
          {"<<"}
        </Button>
        <Button
          onClick={handleNext}
          className="btn-dark"
          disabled={
            currentPage ===
            Math.ceil(fightScores.totalFights / fightScores.limit)
          }
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
}
