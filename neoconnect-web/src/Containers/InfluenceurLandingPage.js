import React from 'react';
import { NavLink, Redirect, Link } from "react-router-dom"
import "./index.css"
import Aside from "../Components/Aside";

export default class InfluenceurLandingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Aside data={null}/>
            </div>
        );
    }
}

