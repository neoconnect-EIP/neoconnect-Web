import React from 'react';
import {Switch, Route } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Aside from "../Components/Aside";
import ShopStatus from "./Shops/ShopStatus";
import EditProfile from "./Shops/EditProfile";
import FindInfluencers from "./Shops/FindInfluencers";
import Ads from "./Shops/Ads";
import PostAd from "./Shops/PostAd";
import "./index.css"

export default class ShopDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("userData: ", this.state.userData)
        return (
            <Grid container>
                <Grid item xs={2}>
                    <Aside isShop={true}/>
                </Grid>
                <Grid item xs={10} style={{marginLeft: "-30px"}}>
                    <Switch>
                        <Route path="/shop-dashboard/post-ad" component={PostAd}/>
                        <Route path="/shop-dashboard/ads" component={Ads}/>
                        <Route path="/shop-dashboard/status" component={ShopStatus}/>
                        <Route path="/shop-dashboard/status" component={FindInfluencers}/>
                        <Route path="/shop-dashboard/edit-profile" component={EditProfile}/>
                    </Switch>
                </Grid>
            </Grid>
        );
    }
}