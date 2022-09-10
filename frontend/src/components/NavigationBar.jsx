import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";

const NavigationBar = () => {
  const { etherProvider, setSigner, setUser } = useContext(ApplicationContext);

  const connect = async () => {
    const accounts = await etherProvider.send("eth_requestAccounts", []);
    setSigner(etherProvider.getSigner());
    let balance = await etherProvider.getBalance(accounts[0]);
    balance = ethers.utils.formatEther(balance);
    setUser({
      publicKey: accounts[0],
      balance: balance.toString(),
    });
  };

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
              Connect
            </Button>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
