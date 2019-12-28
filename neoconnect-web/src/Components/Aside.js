import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab, Grid, Modal, Slide } from '@material-ui/core/';
import NeoconnectLogo from "../assets/NeoconnectLogo.png"
import "../index.css"
import "./index.css"
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

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

    handlePage = (page) => {
        this.props.history.push(page)
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
                                    <div style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", width: "25rem", height: "auto", marginRight: "0.6rem", marginLeft: "0.6rem", borderRadius: "10px", marginTop: "-0.7rem"}}>
                                        <h4 style={{textAlign: "center", color: "white"}}>Voulez vous vous déconnecter ?</h4>
                                    </div>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleModal}>NON</Button>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleDeconexion}>OUI</Button>
                                </Grid>
                            </Grid>
                        </Slide>
                    </Modal>
                </div>
                {
                    this.props.isShop ?
                        <div className="aside">
                            <img className="aside-logo" src={NeoconnectLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/post-ad")} style={{color: "white"}}>
                                <PostAddIcon style={{float: "left", marginLeft: "20px"}}/>
                                Post ad
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/ads")} style={{color: "white"}}>
                                <AssignmentIcon style={{float: "left", marginLeft: "20px"}}/>
                                Ads
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/status")} style={{color: "white"}}>
                                <AccountCircleIcon style={{float: "left", marginLeft: "20px"}}/>
                                Status
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/shop-dashboard/influencers")} style={{color: "white"}}>
                                <PeopleIcon style={{float: "left", marginLeft: "20px"}}/>
                                Find influencers
                            </div>
                            <div className="aside-button" onClick={this.handleModal} style={{position: "absolute", bottom: "20px", borderBottom: "none", color: "white"}}>
                                <PersonIcon style={{float: "left", color: "white", marginLeft: "20px"}}/>
                                Déconnexion
                            </div>
                        </div>
                        :
                        <div className="aside">
                            <img className="aside-logo" src={NeoconnectLogo} onClick={this.landing} alt="LOGO NOT FOUND"/>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/advertisements")} style={{color: "white"}}>
                                <LocalActivityIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Advertisements
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/ads")} style={{color: "white"}}>
                                <AssignmentIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Ads
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/status")} style={{color: "white"}}>
                                <AccountCircleIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Profile
                            </div>
                            <div className="aside-button" onClick={() => this.handlePage("/dashboard/shops")} style={{color: "white"}}>
                                <StorefrontIcon style={{float: "left", color: "white", marginLeft: "10px"}}/>
                                Find shop
                            </div>
                            <div className="aside-button" onClick={this.handleModal} style={{position: "absolute", bottom: "20px", borderBottom: "none", color: "white"}}>
                                    <PersonIcon style={{float: "left", color: "white", marginLeft: "20px"}}/>
                                    Déconnexion
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Aside)
