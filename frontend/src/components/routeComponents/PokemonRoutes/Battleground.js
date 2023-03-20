import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";

export default function Battleground({ pokemon, random }) {
  const [isResult, setIsResult] = useState(true);
  const [fightSaved, setFightSaved] = useState(false);
  const [winner, setWinner] = useState();

  const navigate = useNavigate();

  let pokeState;
  switch (Math.floor(Math.random() * 3) + 1) {
    case 1:
      pokeState = "is very angry and ready to fight!";
      break;
    case 2:
      pokeState = "is in a fighting mood today and he's attacking right away!";
      break;
    default:
      pokeState =
        "behaves inconspicuously, but only to lull the vigilance of the opponent. It attacks unexpectedly!";
      break;
  }

  let firstPokemon;
  let secondPokemon;
  const getFirstAttacker = () => {
    if (pokemon?.base?.Speed > random?.base?.Speed) {
      firstPokemon = pokemon;
      secondPokemon = random;
    } else if (pokemon?.base?.Speed < random?.base?.Speed) {
      firstPokemon = random;
      secondPokemon = pokemon;
    }
  };
  getFirstAttacker();

  let lifeOfFirst = firstPokemon.base?.HP;
  let lifeOfSecond = secondPokemon.base?.HP;
  const [stateLifeOfFirst, setStateLifeOfFirst] = useState([lifeOfFirst]);
  const [stateLifeOfSecond, setStateLifeOfSecond] = useState([lifeOfSecond]);

  let attackOfFirst =
    firstPokemon.base?.Attack - Math.ceil(secondPokemon.base?.Defense / 2);
  let attackOfSecond =
    secondPokemon.base?.Attack - Math.ceil(firstPokemon.base?.Defense / 2);

  const showResult = () => {
    setIsResult(false);
  };

  const fight = () => {
    let isFighting = true;
    while (isFighting) {
      attackOfFirst > 0 ? (lifeOfSecond -= attackOfFirst) : (lifeOfSecond -= 0);
      console.log(
        `Attack of ${firstPokemon.name?.english} is ${attackOfFirst}`
      );
      console.log(
        `Life of ${secondPokemon.name?.english} is now ${lifeOfSecond}`
      );
      setStateLifeOfSecond([...stateLifeOfSecond, lifeOfSecond]);
      if (lifeOfSecond <= 0) {
        isFighting = false;
        setWinner(firstPokemon.name?.english);
        break;
      }
      attackOfSecond > 0 ? (lifeOfFirst -= attackOfSecond) : (lifeOfFirst -= 0);
      console.log(
        `Attack of ${secondPokemon.name?.english} is ${attackOfSecond}`
      );
      console.log(
        `Life of ${firstPokemon.name?.english} is now ${lifeOfFirst}`
      );
      setStateLifeOfFirst([...stateLifeOfFirst, lifeOfFirst]);
      if (lifeOfFirst <= 0) {
        isFighting = false;
        setWinner(secondPokemon.name?.english);
        break;
      }
    }
  };

  let gameId;
  const saveFight = () => {
    axios
      .get("http://localhost:3010/pokemons/pokemonfights/showfights/all")
      .then((response) => {
        gameId = response.data[response.data.length - 1].game_id;
      })
      .then(() => {
        axios
          .post("http://localhost:3010/pokemons/pokemonfights/savefight", {
            game_id: gameId + 1,
            chosen_pokemon: pokemon.name?.english,
            random_pokemon: random.name?.english,
            winner: winner,
          })
          .then((res) => setFightSaved(true));
      })
      .catch((err) => console.log(err));
  };

  const goToScores = () => {
    navigate("/fightscores");
  };

  return (
    <Container className="battleContainer">
      {isResult ? (
      <p>
        <b>{firstPokemon.name?.english}</b> {pokeState}
      </p>
      ) : (
        ""
      )}

      {isResult ? (
        <div></div>
      ) : (
        <div>
          <span>
            <p>
              <b>{firstPokemon.name?.english}'s</b> final attack power is{" "}
              <b>{attackOfFirst}</b>.
            </p>

            {/* 1st phase || First attacks Second */}

            <p>
              The damage it deals to <b>{secondPokemon.name?.english}</b>{" "}
              {stateLifeOfSecond[1] > 0
                ? `leaves it's opponent on ${stateLifeOfSecond[1]} HP`
                : `is more than enough to win this fight`}
              !
            </p>
          </span>

          {/* 1st phase part 2 || Check whether second still alive - if no, show nothing */}

          {stateLifeOfSecond[1] > 0 ? (
            <>
              <span>
                <p>
                  Now it's <b>{secondPokemon.name?.english}</b> time to attack!
                </p>
                <p>
                  It's final attack power is <b>{attackOfSecond}</b>. After
                  dealing damage to <b>{firstPokemon.name?.english}</b>{" "}
                  {stateLifeOfFirst[1] > 0
                    ? `it's opponent remains with ${stateLifeOfFirst[1]} HP`
                    : `it wins the fight`}
                  !
                </p>
              </span>

              {/* 2nd phase || Check whether first still alive - if no, show nothing */}

              {stateLifeOfFirst[1] > 0 ? (
                <>
                  <span>
                    <p>
                      Again, it's time for <b>{firstPokemon.name?.english}</b>{" "}
                      to attack!
                    </p>
                    <p>
                      It deals <b>{attackOfFirst}</b> to{" "}
                      <b>{secondPokemon.name?.english}</b>{" "}
                      {stateLifeOfSecond[2] > 0
                        ? `, leaving it on ${stateLifeOfSecond[2]} HP`
                        : `and wins this fight`}
                      !{" "}
                    </p>
                  </span>

                  {/* 2nd phase part 2 || Check whether second still alive - if no, show nothing */}

                  {stateLifeOfSecond[2] > 0 ? (
                    <span>
                      <p>
                        This is the final attack of this fight, and it's
                        performed by <b>{secondPokemon.name?.english}</b>!
                      </p>
                      <p>
                        It deals <b>{attackOfSecond}</b> to{" "}
                        <b>{firstPokemon.name?.english}</b>{" "}
                        {stateLifeOfFirst[2] > 0
                          ? `, leaving it on ${stateLifeOfSecond[2]} HP`
                          : `and wins this fight`}
                        !{" "}
                      </p>
                    </span>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          <span>
            After a spectacular and exhausting fight, <b>{winner}</b> is the
            winner of this skirmish!
          </span>
        </div>
      )}
      <br />
      {isResult ? (
        <Button
          className="btn-warning"
          onClick={() => {
            fight();
            showResult();
          }}
        >
          Let's fight!
        </Button>
      ) : (
        <>
          <p>Congratulations!</p>
          <div className="afterFightBtns">
            {fightSaved ? (
              <Button
                id="fightSaved"
                className="btn-light"
                onClick={goToScores}
              >
                See the scores
              </Button>
            ) : (
              <Button
                id="saveTheFight"
                onClick={saveFight}
                className="btn-warning"
              >
                Save the fight
              </Button>
            )}

            <Button
              id="navigateBack"
              onClick={() => navigate("/pokemons")}
              className="btn-dark"
            >
              Back to the list of all Pokemons
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
