import React from 'react';
import { withRouter } from "react-router-dom"
import NeoconnectLogo from "../assets/NeoconnectLogo.png"
import "../index.css"
import "./index.css"
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddIcon from '@material-ui/icons/Add';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PeopleIcon from '@material-ui/icons/People';
import PersonPinIcon from '@material-ui/icons/PersonPin';

class Aside extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            setting: this.props.data,
            visible: false,
            menuId: (localStorage.getItem("menuId") ? parseInt(localStorage.getItem("menuId")) : (localStorage.getItem("userType") !== "shop" ? 0 : 7)),
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

    handlePage = (page, profile) => {
        this.props.history.push({
          pathname: page,
          state: { profile: profile}
        });
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
                      <Button className="btnDelete" onClick={this.handleDeconexion}>
                        Oui
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                {
                    this.props.isShop ?
                        <div className="aside">
                          <Nav className="col-md-12 d-block sidebar h-100" justify={true}>
                            <div className="sidebar-sticky"></div>
                            <Nav.Item>
                                <img className="aside-logo" src={NeoconnectLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                                <p style={{color:'white', marginBottom:'70px', fontWeight: '300'}}>{localStorage.getItem("pseudo")}</p>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 7 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 7});this.handlePage("/shop-dashboard/actuality")}}>
                                <HomeIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 7 ? "sideBarTxt-active" : "sideBarTxt"}>Actualité</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 8 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 8});this.handlePage("/shop-dashboard/post-ad")}}>
                                <AddIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 8 ? "sideBarTxt-active" : "sideBarTxt"}>Publier</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 9 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 9});this.handlePage("/shop-dashboard/ads")}}>
                                <AssignmentIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 9 ? "sideBarTxt-active" : "sideBarTxt"}>Offres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 10 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 10});this.handlePage("/shop-dashboard/status")}}>
                                <AccountCircleIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 10 ? "sideBarTxt-active" : "sideBarTxt"}>Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 11 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 11});this.handlePage("/shop-dashboard/influencers")}}>
                                <PeopleIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 11 ? "sideBarTxt-active" : "sideBarTxt"}>Influenceurs</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 5 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 5});this.handlePage("/shop-dashboard/message")}}>
                                <QuestionAnswerIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 5 ? "sideBarTxt-active" : "sideBarTxt"}>Messagerie</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 6 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 6});this.handlePage("/shop-dashboard/chat")}}>
                                <QuestionAnswerIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 6 ? "sideBarTxt-active" : "sideBarTxt"}>Contact</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 14 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 14});this.handlePage("/shop-dashboard/contact")}}>
                                <PersonPinIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 14 ? "sideBarTxt-active" : "sideBarTxt"}>Support</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="nav-item-sidebar" onClick={this.handleModal} style={{position: "absolute", bottom: "20px", width: '100%'}}>
                                  <ExitToAppIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                 <Nav.Link className="sideBarTxt">Déconnexion</Nav.Link>
                            </Nav.Item>
                            </Nav>

                        </div>
                        :
                        <div className="aside">
                          <Nav className="col-md-12 d-block sidebar h-100" justify={true}>
                            <div className="sidebar-sticky"></div>
                            <Nav.Item>
                                <img className="aside-logo" src={NeoconnectLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                                <p style={{color:'white', marginBottom:'70px', fontWeight: '300'}}>{localStorage.getItem("pseudo")}</p>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 0 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 0});this.handlePage("/dashboard/actuality")}}>
                                <HomeIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 0 ? "sideBarTxt-active" : "sideBarTxt"}>Actualité</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 1 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 1});this.handlePage("/dashboard/status")}}>
                                <AccountCircleIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 1 ? "sideBarTxt-active" : "sideBarTxt"}>Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 2 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 2});this.handlePage("/dashboard/ads")}}>
                                <AssignmentIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 2 ? "sideBarTxt-active" : "sideBarTxt"}>Mes offres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 3 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 3});this.handlePage("/dashboard/advertisements")}}>
                                <LocalOfferIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 3 ? "sideBarTxt-active" : "sideBarTxt"}>Offres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 4 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 4});this.handlePage("/dashboard/shops")}}>
                                <StorefrontIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 4 ? "sideBarTxt-active" : "sideBarTxt"}>Marques</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 5 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 5});this.handlePage("/dashboard/message")}}>
                                <QuestionAnswerIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 5 ? "sideBarTxt-active" : "sideBarTxt"}>Messagerie</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 6 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 6});this.handlePage("/dashboard/chat")}}>
                                <QuestionAnswerIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 6 ? "sideBarTxt-active" : "sideBarTxt"}>Contact</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={this.state.menuId === 14 ? "nav-item-sidebar-active" : "nav-item-sidebar"} onClick={() => {this.setState({menuId: 14});this.handlePage("/dashboard/contact")}}>
                                <PersonPinIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                <Nav.Link className={this.state.menuId === 14 ? "sideBarTxt-active" : "sideBarTxt"}>Support</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="nav-item-sidebar" onClick={this.handleModal} style={{position: "absolute", bottom: "20px", width: '100%'}}>
                                  <ExitToAppIcon className="mt-2 mr-3" style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                 <Nav.Link className="sideBarTxt">Déconnexion</Nav.Link>
                            </Nav.Item>
                            </Nav>

                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Aside)
