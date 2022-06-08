import { Button, Modal } from "react-bootstrap";
import React from "react";

export default function GameOver(props) {
  const refreshGame = () => {
    window.location.reload();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.winner}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>
          {props.winner == 'GANHOU'
            ? "Parabéns, você venceu!"
            : "Não foi dessa vez, tente novamente!"}
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <Button variante ="primary" onClick={() => refreshGame()}>Reiniciar o jogo</Button>
      </Modal.Footer>
    </Modal>
  );
}


