import './styles/InformationBar.css';
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';

function InformationBar() {
  const deathCount = useState(0);
  return (
    <Navbar variant='dark' className='informationContent' bg="dark" expand={false}>
      <Container fluid>
        <Navbar.Text>Peças eliminadas pelo jogador: {deathCount}</Navbar.Text>
        <Navbar.Toggle className='historyButton'>Mostrar histórico</Navbar.Toggle>
        <Navbar.Offcanvas
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Histórico</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex commodi quas dolor possimus delectus. Ad, dicta nemo sit iusto quia esse perspiciatis, assumenda, magnam molestiae harum ipsum fuga ex unde!
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default InformationBar;
