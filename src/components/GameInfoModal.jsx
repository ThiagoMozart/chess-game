import { Modal, Button } from "react-bootstrap";
export default function GameInfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sobre o jogo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Regras do jogo</h4>
        <p>
            <strong>Peão:</strong>
            <br/>
          O peão avança para uma casa vazia, imediatamente à sua frente na mesma
          coluna ou em seu primeiro lance o peão pode avançar duas casas na
          mesma coluna, desde que ambas estejam vazias.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}
