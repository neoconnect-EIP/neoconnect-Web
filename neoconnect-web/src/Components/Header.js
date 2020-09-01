import React from 'react';
import { withRouter } from "react-router-dom"
import "../Containers/index.css"
import NeoconnectLogo from "../assets/NeoconnectLogo.png"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    showModal = () => {
        if (this.state.visible)
            this.setState({ visible: false });
        else
            this.setState({ visible: true });
    };

    landing = () => {
        this.props.history.push('/landing-page')
    }

    handleClose = () => {
        this.setState({visible: false})
    }

    render() {
        return (
          <div className="header">
            <Navbar className="neoNav" bg="dark" variant="dark">
              <Navbar.Brand onClick={this.landing} className="neoLogo">
                <img
                  alt=""
                  src={NeoconnectLogo}
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className="ml-auto">
                <Nav.Link className="text-light h5" onClick={() => this.props.history.push('/landing-page/about')}>À propos</Nav.Link>
                <Nav.Link className="text-light h5" onClick={this.showModal}>S'inscrire</Nav.Link>
                <Nav.Link className="text-light h5" onClick={() => this.props.history.push('/landing-page/login')}>Se connecter</Nav.Link>
              </Nav>
            </Navbar>
            <Modal centered show={this.state.visible} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Inscription</Modal.Title>
              </Modal.Header>
              <Modal.Body className="mx-auto">
                <Button className="btnShop mr-4" style={{color: "white"}} href="/landing-page/Shop-sign-up" >
                  Boutique
                </Button>
                <Button className="btnInf ml-4" style={{color: "white"}}  href="/landing-page/influencer-sign-up">
                  Influenceur
                </Button>
              </Modal.Body>
            </Modal>
          </div>
        );
    }
}
export default withRouter(Header)
