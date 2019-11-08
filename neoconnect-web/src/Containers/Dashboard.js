import React from 'react';
import {Switch, Route } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Aside from "../Components/Aside";
import Advertisements from "./Influencers/Advertisements";
import Ads from "./Influencers/Ads";
import InfluenceurStatus from "./Influencers/InfluenceurStatus";
import FindShop from "./Influencers/FindShop";
import "./index.css"
import EditProfile from "./Influencers/EditProfile";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("userData: ", this.state.userData)
        return (
            <Grid container>
                <Grid item xs={2}>
                    <Aside/>
                </Grid>
                <Grid item xs={10} style={{marginLeft: "-30px"}}>
                        <Switch>
                            <Route path="/dashboard/advertisements" component={Advertisements}/>
                            <Route path="/dashboard/ads" component={Ads}/>
                            <Route path="/dashboard/status" component={InfluenceurStatus}/>
                            <Route path="/dashboard/shops" component={FindShop}/>
                            <Route path="/dashboard/edit-profile" component={EditProfile}/>
                        </Switch>
                </Grid>
            </Grid>
        );
    }
}