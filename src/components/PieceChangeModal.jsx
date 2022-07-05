import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { peonToEvolveContext } from "../context/peonToEvolveContext";
import Piece from "../schemas/Piece";
import React from 'react'

export default function PieceChangeModal(props) {
  const [selected, setSelected] = useState(null);
  const { peonToEvolve, setPeonToEvolve } = useContext(peonToEvolveContext);

  useEffect(() => {
    if (peonToEvolve) {
      let oldPeon = peonToEvolve;
      let newPeon = new Piece(
        oldPeon.id,
        oldPeon.fromPlayer,
        oldPeon.position,
        selected
      );
      setPeonToEvolve(newPeon);
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

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
          Selecione a nova peça
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div key={`inline-radio`} className="mb-3" data-testid='pieceChangeModalId'>
          <Form.Check
            data_testeid='bispoIdTest'
            inline
            label="bispo"
            name="group1"
            type="radio"
            id={`bispo`}
            onChange={(event) => setSelected(event.target.id)}
          />
          <Form.Check
            data_testeid='torreIdTest'
            inline
            label="torre"
            name="group1"
            type="radio"
            id={`torre`}
            onChange={(event) => setSelected(event.target.id)}
          />
          <Form.Check
            data_testeid='rainhaIdTest'
            inline
            label="rainha"
            name="group1"
            type="radio"
            id={`rainha`}
            onChange={(event) => setSelected(event.target.id)}
          />
          <Form.Check
            data_testeid='cavaloIdTest'
            inline
            label="cavalo"
            name="group1"
            type="radio"
            id={`cavalo`}
            onChange={(event) => setSelected(event.target.id)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!selected}
          onClick={() => {
            setSelected(null);
            props.onHide();
          }}
        >
          Selecionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
