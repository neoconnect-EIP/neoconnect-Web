import React from 'react';
import {Switch, Route } from "react-router-dom"
import Aside from "../Components/Aside";
import ShopStatus from "./Shops/ShopStatus";
import FindInfluencers from "./Shops/FindInfluencers";
import Actuality from "./Shops/Actuality";
import Ads from "./Shops/Ads";
import PostAd from "./Shops/PostAd";
import EditAd from "./Shops/EditAd";
import AdsDetail from "./Shops/AdsDetail";
import InfluencerProfile from "./Shops/InfluencerProfile";
import "./index.css"
import Chat from "./Chat";
import Message from "./Message";
import Support from "./Support";

export default class ShopDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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
                        <Route path="/shop-dashboard/influencers" component={FindInfluencers}/>
                        <Route path="/shop-dashboard/influencer" component={InfluencerProfile}/>
                        <Route path="/shop-dashboard/actuality" component={Actuality}/>
                        <Route path="/shop-dashboard/chat" component={Chat}/>
                        <Route path="/shop-dashboard/message" component={Message}/>
                        <Route path="/shop-dashboard/support" component={Support}/>
                        <Route path="/shop-dashboard/item/:id" component={AdsDetail}/>
                    </Switch>
                </div>
            </div>
        );
    }
}
