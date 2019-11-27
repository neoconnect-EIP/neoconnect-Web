import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history"
import LandingPage from "./Containers/LandingPage";
import Dashboard from "./Containers/Dashboard";
import ShopDashboard from "./Containers/ShopDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/shop-dashboard" component={ShopDashboard}/>
        </Switch>
    </Router>
    , document.getElementById('root')
);
