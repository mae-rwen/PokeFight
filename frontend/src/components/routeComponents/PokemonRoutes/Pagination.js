import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function Pagination({
  pokemonsPerPage,
  totalPokemons,
  currentPage,
  setCurrentPage,
}) {
  const navigate = useNavigate();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    navigate(`?page=${currentPage + 1}`);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    navigate(`?page=${currentPage - 1}`);
  };
  return (
    <div className=" d-flex flex-direction-row justify-content-center mt-3 gap-3">
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
        disabled={currentPage === pageNumbers.length}
      >
        {">>"}
      </Button>
    </div>
  );
}
