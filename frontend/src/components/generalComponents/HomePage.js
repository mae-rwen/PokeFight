import { NavLink } from "react-router-dom";

export default function HomePage() {
  const pokeball =
    "https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_960_720.png";

  return (
    <div className="homepageDiv">
      <h1>Pokémon</h1>
      <p>Choose them, fight them, catch them all!</p>
      <img src={pokeball} alt="Pokéball" style={{ width: "35% " }} />
      <h3>How this works</h3>
      <p>
        Go the <NavLink to="/pokemons">Pokémon</NavLink> list or search for your
        favorite one using the searchbar.
      </p>
      <p>
        After getting to the page of your selected Pokémon, you can find another
        one to fight with.
      </p>
    </div>
  );
}
