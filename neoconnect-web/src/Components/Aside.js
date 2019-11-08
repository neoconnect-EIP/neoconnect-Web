import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import whiteLogo from "../assets/logo_white.png";
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';

class Aside extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            setting: this.props.data
        };
    }

    render() {
        return (
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
        );
    }
}

export default withRouter(Aside)
