import React from 'react';
import {Switch, Route } from "react-router-dom"
import "./index.css"
import Header from "../Components/Header";
import InfluencerSignUp from "./Register/InscriptionInfluenceurs";
import ShopSignUp from "./Register/InscriptionCommercants";
import Login from "./Login/Login";
import About from "./About";
import Contributors from "./Contributor";
import backgroundImage from "../assets/Equinox-Shop.jpg";

export default class LandingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="landing-page-header">
                <Header />
                <div style={{backgroundImage: "url(" + backgroundImage + ")", position: "relative", backgroundSize: "cover", backgroundPosition: "center center", width: "100%", height: "100%", zIndex: "0"}}>
                    <div style={{height: "872px"}}>
                        <Switch>
                            <Route path="/landing-page/login" component={Login}/>
                            <Route path="/landing-page/about" component={About}/>
                            <Route path="/landing-page/contributors" component={Contributors}/>
                            <Route path="/landing-page/influencer-sign-up" component={InfluencerSignUp}/>
                            <Route path="/landing-page/shop-sign-up" component={ShopSignUp}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

