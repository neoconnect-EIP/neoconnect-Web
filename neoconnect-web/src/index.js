import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history"
import LandingPage from "./Containers/LandingPage";
import NotFound from "./Containers/NotFound";
import Dashboard from "./Containers/Dashboard";
import ShopDashboard from "./Containers/ShopDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "./index.css";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const history = createBrowserHistory();

ReactDOM.render(
  <>
    <ReactNotification />
    <Router history={history}>
      <Switch>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/page-not-found" component={NotFound} />
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/shop-dashboard" component={ShopDashboard}/>
        <Redirect from="/" to="/landing-page"/>
      </Switch>
    </Router>
  </>
, document.getElementById('root')
);
