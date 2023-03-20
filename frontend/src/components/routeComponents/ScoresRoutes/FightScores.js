import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function FightScores({ variant }) {
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <br />
      {variant.map((scores) => {
        const formattedDate = new Date(scores.date).toDateString();
        return (
          <div key={scores._id}>
            <h5>Fight No. {scores.game_id}</h5>
            <h6>Fought on {formattedDate} between:</h6>
            <ul>
              <li>{scores.chosen_pokemon}</li>
              <li>{scores.random_pokemon}</li>
            </ul>
            <h6>
              The winner of this fight was <b>{scores.winner}</b>
            </h6>
            <br />
          </div>
        );
      })}
      <Button
        id="navigateBack"
        onClick={() => navigate("/fightscores")}
        className="btn-dark"
      >
        Back to the scores
      </Button>
    </div>
  );
}
