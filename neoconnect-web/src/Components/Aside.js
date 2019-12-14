import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab, Grid, Modal, Slide } from '@material-ui/core/';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import "../index.css"
import "./index.css"
import whiteLogo from "../assets/logo_white.png";
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PeopleIcon from '@material-ui/icons/People';
import CancelIcon from '@material-ui/icons/Cancel';
import PersonIcon from '@material-ui/icons/Person';

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

    handleModal = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        return (
            <div>
                <div style={{position: "absolute", margin: "auto"}}>
                    <Modal className="inscription-modal"
                           style={{width: "600px", height: "100px", display: "block", marginLeft: "auto", marginRight: "auto", backgroundColor: "transparent"}}
                           open={this.state.visible}
                           onClose={this.handleModal}
                    >
                        <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                            <Grid container style={{height: "100%", width: "100%", textAlign: "center", marginLeft: 0}}>
                                <Grid item style={{backgroundColor: "white", marginLeft: "200px", borderRadius: "8px", marginTop: "25px"}} xs={12}>
                                    <h4 style={{textAlign: "center"}}>Voulez vous vous déconnecter ?</h4>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleModal}>Non</Button>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleDeconexion}>Oui</Button>
                                </Grid>
                            </Grid>
                        </Slide>
                    </Modal>
                </div>
                {
                    this.props.isShop ?
                        <div className="aside">
                            <img className="aside-logo" src={whiteLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/shop-dashboard/post-ad">
                                    <PostAddIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Post ad
                                </Fab>
                            </div>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/shop-dashboard/ads">
                                    <AssignmentIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Ads
                                </Fab>
                            </div>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/shop-dashboard/status">
                                    <AccountCircleIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Status
                                </Fab>
                            </div>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/shop-dashboard/influencers">
                                    <PeopleIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Find influencers
                                </Fab>
                            </div>
                            <div style={{marginBottom: "25px"}}>
                                <Button onClick={this.handleModal}>Se Déconnecter</Button>
                            </div>
                        </div>
                        :
                        <div className="aside">
                            <img className="aside-logo" src={whiteLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/dashboard/advertisements">
                                    <LocalActivityIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Advertisements
                                </Fab>
                            </div>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/dashboard/ads">
                                    <AssignmentIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Ads
                                </Fab>
                            </div>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/dashboard/status">
                                    <AccountCircleIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Profile
                                </Fab>
                            </div>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/dashboard/shops">
                                    <StorefrontIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Find shop
                                </Fab>
                            </div>
                            <div className="aside-button" onClick={() => this.handleModal()} style={{position: "absolute", bottom: "20px", borderBottom: "none"}}>
                                <Fab class="aside-button-fab">
                                    <PersonIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Deconnection
                                </Fab>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Aside)
