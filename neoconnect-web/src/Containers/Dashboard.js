import React from 'react';
import {Switch, Route} from "react-router-dom"
import Aside from "../Components/Aside";
import Advertisements from "./Influencers/Advertisements";
import Ads from "./Influencers/Ads";
import InfluenceurStatus from "./Influencers/InfluenceurStatus";
import FindShop from "./Influencers/FindShop";
import Chat from "./Chat"
import "./index.css"
import adsItem from "./Influencers/adsItem";
import shopProfile from "./Influencers/shopProfile";
import actuality from "./Influencers/Actuality";
import Message from "./Message";
import Support from "./Support";
import NotFound from "./NotFound";

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
                      <Route path="/dashboard/item/:id" component={adsItem}/>
                      <Route path="/dashboard/ads" component={Ads}/>
                      <Route path="/dashboard/status" component={InfluenceurStatus}/>
                      <Route path="/dashboard/shops" component={FindShop}/>
                      <Route path="/dashboard/shop/:id" component={shopProfile}/>
                      <Route path="/dashboard/actuality" component={actuality}/>
                      <Route path="/dashboard/chat" component={Chat}/>
                      <Route path="/dashboard/message" component={Message}/>
                      <Route path="/dashboard/support" component={Support}/>
                      <Route component={NotFound}></Route>
                  </Switch>
                </div>
            </div>
        );
    }
}
