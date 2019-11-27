import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import whiteLogo from "../assets/logo_white.png";
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PeopleIcon from '@material-ui/icons/People';

class Aside extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            setting: this.props.data
        };
    }

    render() {
        return (
            <div>
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
                                    Status
                                </Fab>
                            </div>
                            <div className="aside-button">
                                <Fab class="aside-button-fab" href="/dashboard/shops">
                                    <StorefrontIcon style={{float: "left", marginLeft: "20px"}}/>
                                    Find shop
                                </Fab>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Aside)
