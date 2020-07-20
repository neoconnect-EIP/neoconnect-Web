import React from 'react';
import { withRouter } from "react-router-dom"
import NeoconnectLogo from "../assets/NeoconnectLogo.png"
import "../index.css"
import "./index.css"
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SearchIcon from '@material-ui/icons/Search';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Aside extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            setting: this.props.data,
            visible: false,
        };
    }

    handleDeconexion = () => {
        localStorage.clear();
        this.props.history.push('/landing-page')
    }

    handleClose = () => {
        this.setState({visible: false})
    }

    handleModal = () => {
        this.setState({visible: true})
    }

    handlePage = (page) => {
        this.props.history.push(page)
    }

    render() {
        return (
            <div>
                <div style={{position: "absolute", margin: "auto"}}>
                  <Modal centered show={this.state.visible} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Déconnexion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Êtes-vous sur de vouloir vous déconnecter ?</Modal.Body>
                    <Modal.Footer>
                      <Button className="btnCancel" onClick={this.handleClose}>
                        Non
                      </Button>
                      <Button className="btnInfDelete" onClick={this.handleDeconexion}>
                        Oui
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                {
                    this.props.isShop ?
                        <div className="aside">
                            <img className="aside-logo" src={NeoconnectLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/post-ad")} style={{color: "white"}}>
                                <PostAddIcon style={{float: "left", marginLeft: "20px"}}/>
                                Publier
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/ads")} style={{color: "white"}}>
                                <AssignmentIcon style={{float: "left", marginLeft: "20px"}}/>
                                Annonces
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/status")} style={{color: "white"}}>
                                <AccountCircleIcon style={{float: "left", marginLeft: "20px"}}/>
                                Statut
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/influencers")} style={{color: "white"}}>
                                <SearchIcon style={{float: "left", marginLeft: "20px"}}/>
                                Influenceurs
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/chat")} style={{color: "white"}}>
                                <QuestionAnswerIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Contact
                            </div>
                            <div className="aside-button" onClick={this.handleModal} style={{position: "absolute", bottom: "20px", borderBottom: "none", color: "white"}}>
                                <ExitToAppIcon style={{float: "left", color: "white", marginLeft: "20px"}}/>
                                Déconnexion
                            </div>
                        </div>
                        :
                        <div className="aside">
                            <img className="aside-logo" src={NeoconnectLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/advertisements")} style={{color: "white"}}>
                                <LocalActivityIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Annonces
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/ads")} style={{color: "white"}}>
                                <AssignmentIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Mes annonces
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/status")} style={{color: "white"}}>
                                <AccountCircleIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Profile
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/shops")} style={{color: "white"}}>
                                <StorefrontIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Boutiques
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/chat")} style={{color: "white"}}>
                                <QuestionAnswerIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Contact
                            </div>
                            <div className="aside-button" onClick={this.handleModal} style={{position: "absolute", bottom: "20px", borderBottom: "none", color: "white"}}>
                                <ExitToAppIcon style={{float: "left", color: "white", marginLeft: "20px"}}/>
                                Déconnexion
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Aside)
