import React from 'react';
import { withRouter } from "react-router-dom"
import {Modal, Button, Slide, Grid} from '@material-ui/core';
import "../Containers/index.css"
import NeoconnectLogo from "../assets/NeoconnectLogo.png"

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
                <img className="logo" src={NeoconnectLogo} onClick={this.landing} alt="BACKGROUND NOT FOUND"/>
                <Button class="header-btn" onClick={() => this.props.history.push('/landing-page/login')} style={{backgroundColor: "transparent"}}>Se connecter</Button>
                <Button class="header-btn" onClick={this.showModal} style={{backgroundColor: "transparent", border: "none", borderLeft: "0.1rem solid white"}}>S'inscrire</Button>
                <Button class="header-btn" onClick={() => this.props.history.push('/landing-page/about')}>A propos</Button>
                <Button class="header-btn" onClick={() => this.props.history.push('/landing-page/contributors')}>Nos collaborateurs</Button>
                <Modal className="inscription-modal"
                         style={{width: "40rem", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto", backgroundColor: "transparent"}}
                         aria-labelledby="Êtes vous Influenceur ou commercant ?"
                         open={this.state.visible}
                         onClose={this.showModal}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        <Grid container style={{width: "40rem", height: "auto", backgroundColor: "white", borderRadius: "8px"}} justify="center">
                            <Grid item xs={12} style={{marginTop: "-2rem", marginLeft: "3rem", marginRight: "3rem", textAlign: "center", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)"}}>
                                <h1 style={{color: "white"}}>Connexion en tant que</h1>
                            </Grid>
                            <Grid item xs={6} style={{marginTop: "3rem", marginBottom: "3rem", paddingLeft: "4.5rem"}}>
                                <Button href="/landing-page/influencer-sign-up" style={{height: "3rem", width: "10rem", fontSize: "1.3rem", backgroundImage: "linear-gradient(65deg, #E5DF24, rgb(144, 189, 113))", borderRadius: "8px"}}>INFLUENCEUR</Button>
                            </Grid>
                            <Grid item xs={6} style={{marginTop: "3rem", marginBottom: "3rem", paddingLeft: "4.5rem"}}>
                                <Button href="/landing-page/Shop-sign-up" style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, rgb(144, 189, 113), #1C8FDC)"}}>BOUTIQUE</Button>
                            </Grid>
                        </Grid>
                    </Slide>
                </Modal>
            </div>
        );
    }
}
export default withRouter(Header)
