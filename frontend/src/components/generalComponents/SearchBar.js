import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function SearchBar() {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      toast("Please enter Pokémon name to search");
    } else {
      const name = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      axios
        .get(`http://localhost:3010/pokemons/${name}`)
        .then((response) => {
          if (response.data) {
            navigate(`/pokemons/${response.data.name.english}`);
          } else {
            toast(
              "There is no Pokémon of this name. Please search for different name."
            );
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
        placeholder="Search by name"
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
