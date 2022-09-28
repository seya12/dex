import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { ApplicationContext } from "../ApplicationContext";

const NavigationBar = () => {
  const { signer, connect } = useContext(ApplicationContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
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
        <Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-light" onClick={connect}>
              {!signer ? "Connect" : "Log out"}
            </Button>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
