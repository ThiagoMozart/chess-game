import { Card, Button } from "react-bootstrap";
import React from 'react';

export default function (Winner) {
  return( 
    <>
    {[
      'Primary',
      'Secondary',
      'Success',
      'Danger',
      'Warning',
      'Info',
      'Light',
      'Dark',
    ].map((variant) => (
      <Card
        bg={variant.toLowerCase()}
        key={variant}
        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: '18rem' }}
        className="mb-2"
        msg = {Winner? "Parabéns, você venceu!": "Não foi dessa vez, tente novamente!"}
        titulo = {Winner? "Vitória!": "Derrota!"}
        >
        <Card.Body>
          <Card.Title>{variant} {titulo} </Card.Title>
          <Card.Text>
            {msg}
            <div className="mb-2">
            <Button variant="primary" size="lg">
              Jogar novamente
            </Button>{' '}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
  </>
    );}
  