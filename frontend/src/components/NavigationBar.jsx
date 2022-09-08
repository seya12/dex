import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Overview
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="send">
            Send
          </Nav.Link>
          <Nav.Link as={NavLink} to="token">
            Token
          </Nav.Link>
          <Nav.Link as={NavLink} to="exchange">
            Exchange
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
