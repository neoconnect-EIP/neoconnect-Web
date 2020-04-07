import React from 'react';
import {Switch, Route } from "react-router-dom"
import Aside from "../Components/Aside";
import ShopStatus from "./Shops/ShopStatus";
import EditProfile from "./Shops/EditProfile";
import FindInfluencers from "./Shops/FindInfluencers";
import Ads from "./Shops/Ads";
import PostAd from "./Shops/PostAd";
import EditAd from "./Shops/EditAd";
import InfluencerProfile from "./Shops/InfluencerProfile";
import "./index.css"

export default class ShopDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("userData: ", this.state.userData)
        return (
            <div>
                <div>
                    <Aside isShop={true}/>
                </div>
                <div style={{marginLeft: "200px"}}>
                    <Switch>
                        <Route path="/shop-dashboard/post-ad" component={PostAd}/>
                        <Route path="/shop-dashboard/ads" component={Ads}/>
                        <Route path="/shop-dashboard/edit-ad" component={EditAd}/>
                        <Route path="/shop-dashboard/status" component={ShopStatus}/>
                        <Route path="/shop-dashboard/edit-profile" component={EditProfile}/>
                        <Route path="/shop-dashboard/influencers" component={FindInfluencers}/>
                        <Route path="/shop-dashboard/influencer" component={InfluencerProfile}/>
                    </Switch>
                </div>
            </div>
        );
    }
}