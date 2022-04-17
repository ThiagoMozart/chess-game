import { Navbar, Container, Nav } from 'react-bootstrap';

function Menu() {
  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">XadrezAI - Grupo 7</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#game">Sobre o jogo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Menu;
