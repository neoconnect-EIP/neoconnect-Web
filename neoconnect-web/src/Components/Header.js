import React from 'react';
import { withRouter } from "react-router-dom"
import {Modal, Button, Slide, Grid} from '@material-ui/core';
import "../Containers/index.css"

import whiteLogo from "../assets/logo_white.png"

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

    render() {
        return (
            <div className="header">
                <img className="logo" src={whiteLogo} onClick={this.landing} alt="BACKGROUND NOT FOUND"/>
                <Button class="header-btn" onClick={() => this.props.history.push('/landing-page/login')} style={{backgroundColor: "transparent"}}>Se connecter</Button>
                <Button class="header-btn" onClick={this.showModal} style={{backgroundColor: "transparent", border: "none", borderLeft: "0.1rem solid white"}}>S'inscrire</Button>
                <Button class="header-btn" onClick={() => this.props.history.push('/landing-page/about')}>A propos</Button>
                <Button class="header-btn" onClick={() => this.props.history.push('/landing-page/contributors')}>Nos collaborateurs</Button>
                <Modal className="inscription-modal"
                         style={{width: "400px", height: "100px", display: "block", marginLeft: "auto", marginRight: "auto", backgroundColor: "transparent"}}
                         aria-labelledby="Êtes vous Influenceur ou commercant ?"
                         open={this.state.visible}
                         onClose={this.showModal}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        <Grid container style={{height: "100%", width: "100%", textAlign: "center", marginLeft: 0}}>
                            <Grid item style={{backgroundImage: "linear-gradient(45deg, #712121, #982d2d, #ff4343)", color: "white"}} xs={6}>
                                <Button href="/landing-page/influencer-sign-up" style={{marginTop: "30px"}}>Influcencer</Button>
                            </Grid>
                            <Grid item style={{backgroundImage: "linear-gradient(135deg, #ff4343, #982d2d, #712121)", color: "white"}} xs={6}>
                                <Button href="/landing-page/Shop-sign-up" style={{marginTop: "30px"}}>Shop</Button>
                            </Grid>
                        </Grid>
                    </Slide>
                </Modal>
            </div>
        );
    }
}
export default withRouter(Header)
