import React from 'react';
import {Switch, Route } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Aside from "../Components/Aside";
import Advertisements from "./Influencers/Advertisements";
import Ads from "./Influencers/Ads";
import InfluenceurStatus from "./Influencers/InfluenceurStatus";
import FindShop from "./Influencers/FindShop";
import EditProfile from "./Influencers/EditProfile";
import "./index.css"
import backgroundStatus from "../assets/backgroundStatus.jpg";
import adsItem from "./Influencers/adsItem";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
                    <Aside isShop={false}/>
                </div>
                <div style={{marginLeft: "200px"}}>
                    <Switch>
                        <Route path="/dashboard/advertisements" component={Advertisements}/>
                        <Route path="/dashboard/item" component={adsItem}/>
                        <Route path="/dashboard/ads" component={Ads}/>
                        <Route path="/dashboard/status" component={InfluenceurStatus}/>
                        <Route path="/dashboard/shops" component={FindShop}/>
                        <Route path="/dashboard/edit-profile" component={EditProfile}/>
                    </Switch>
                </div>
            </div>
        );
    }
}