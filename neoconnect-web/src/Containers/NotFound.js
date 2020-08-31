import React from 'react';
import {Grid} from "@material-ui/core";
import "./index.css";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import face from "../assets/sad.svg";
import Image from 'react-bootstrap/Image';

export default class NotFound extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            client: localStorage.getItem("userType"),
        };
    }

    render() {
        return (
          <div className={this.state.client == 'shop' ? 'shopBg' : 'infBg'}>
            <Row className="justify-content-md-center pt-4">
              <Image style={{width: "30%", height: "30%"}} src={face}/>
            </Row>
            <Row className="justify-content-md-center mt-4">
              <h1 style={{color: 'white'}}>404</h1>
            </Row>
            <Row className="justify-content-md-center mt-4">
              <h4 style={{color: 'white', fontWeight: '300'}}>La page que vous cherchez n'existe pas ou vous ne possédez pas les droit d'accès.</h4>
            </Row>
            <Row className="justify-content-md-center mt-4">
              <Button className="btnShop" onClick={() => {
               this.state.client == "shop" ? this.props.history.push('/shop-dashboard/ads') : (!this.state.client ? this.props.history.push('/landing-page') : this.props.history.push('/dashboard/advertisements'));
              }}>Retour</Button>
            </Row>
          </div>
        );
    }
}
