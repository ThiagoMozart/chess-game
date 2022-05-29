import { Navbar, Container, Nav } from "react-bootstrap";
import GameInfoModal from "./GameInfoModal.jsx";
import React, { useState } from "react";

function Menu() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">XadrezAI - Grupo 6</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link >Home</Nav.Link>
          <Nav.Link onClick={() => setModalShow(true)} >Sobre o jogo</Nav.Link>
        </Nav>
      </Container>
      <GameInfoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Navbar>
  );
}

export default Menu;
