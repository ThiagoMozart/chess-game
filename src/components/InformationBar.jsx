import "./styles/InformationBar.css";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import { useState, useContext } from "react";
import { historyContext } from "../context/historyContext";

export default function InformationBar() {
  const [deathCount] = useState(0);
  const { history, setHistory } = useContext(historyContext);
  return (
    <Navbar
      variant="dark"
      className="informationContent"
      bg="dark"
      expand={false}
    >
      <Container fluid>
        <Navbar.Text>Peças eliminadas pelo jogador: {deathCount}</Navbar.Text>
        <Navbar.Toggle className="historyButton">
          Mostrar histórico
        </Navbar.Toggle>
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Histórico</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {history.map((x, index) => {
              const [initialPosVertical, initialPosHorizontal] = x.oldPosition
                .split("")
                .filter((x) => x != "x" && x != "y");
              const [finalPosVertical, finalPosHorizontal] = x.newPosition
                .split("")
                .filter((x) => x != "x" && x != "y");
              return (
                <div key={index}>
                  <div>
                    <p>
                      <strong>Horário da jogada: {x.date}</strong>
                    </p>
                    <p>
                      Posição antiga - (Vertical: {initialPosVertical},
                      Horizontal: {initialPosHorizontal})
                    </p>
                    <p>
                      Posição nova - (Vertical: {finalPosVertical},
                      Horizontal: {finalPosHorizontal})
                    </p>
                    <p>
                      Tipo de peça - {x.type} {x.color}
                    </p>
                  </div>
                  <hr />
                </div>
              );
            })}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
