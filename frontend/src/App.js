import Container from "react-bootstrap/esm/Container";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PokeFooter from "./components/generalComponents/PokeFooter";
import PokeHeader from "./components/generalComponents/PokeHeader";
import AllPokemons from "./components/routeComponents/PokemonRoutes/AllPokemons";
import Pokemons from "./components/routeComponents/PokemonRoutes/Pokemons";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./components/generalComponents/HomePage";
import { useNavigate } from "react-router-dom";
import Scores from "./components/routeComponents/ScoresRoutes/Scores";
import AllScores from "./components/routeComponents/ScoresRoutes/AllScores";
import { ToastContainer } from "react-toastify";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  //setPokemons
  useEffect(() => {
    axios
      .get(`http://localhost:3010/pokemons/?page=${currentPage}`)
      .then((response) => {
        setPokemons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  return (
    <div className="App">
      <PokeHeader />
      <Container className="appContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/pokemons"
            element={
              <AllPokemons
                pokemons={pokemons}
                paginate={paginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route path="pokemons/:name" element={<Pokemons />} />
          <Route path="/fightscores" element={<AllScores />} />
          <Route path="/fightscores/:name" element={<Scores />} />
        </Routes>
      </Container>
      <PokeFooter />
      <ToastContainer />
    </div>
  );
}

export default App;
