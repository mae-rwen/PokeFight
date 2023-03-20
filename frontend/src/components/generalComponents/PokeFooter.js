import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function PokeFooter() {
  return (
    <Navbar className="fixed-bottom" bg="light">
      <Container>
        <Nav className="me-auto">
          <Nav.Link>
            Provided to you by Agata, Monika, Simran and Artur ✌
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
