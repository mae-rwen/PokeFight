import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchForScores() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      toast("Please enter Pokémon name that fought");
    } else {
      const name = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      console.log(name);
      axios
        .get(`http://localhost:3010/pokemons/pokemonfights/showfights/${name}`)
        .then((response) => {
          console.log(response.data);
          if (
            response?.data[0]?.chosen_pokemon === name ||
            response?.data[0]?.random_pokemon === name
          ) {
            navigate(`/fightscores/${name}`);
          } else if (response.data) {
            toast("This Pokémon did not fight yet");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setValue("");
    }
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search the scores by Pokémon's name"
        className="me-2"
        aria-label="Search"
        onChange={handleChange}
        value={value}
      />
      <Button variant="outline-dark" type="submit">
        Search
      </Button>
    </Form>
  );
}
