import React from 'react';
import { withRouter } from "react-router-dom"
import "./index.css"
import instagram from "../assets/instagram-logo.png"
import twitter from "../assets/twitter.png"
import snapchat from "../assets/snapchat-logo.png"
import facebook from "../assets/facebook-logo.png"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class Footer extends React.Component {

    handleContact = () => {
        this.props.history.push('/landing-page/contact')
    }

    render() {
        return (
          <div className="footer">
              <Row>
                  <Col md={4} className="ml-4">
                    <Button variant="link" onClick={this.handleContact}>Nous contacter</Button><br/>
                    <Button variant="link" onClick={null}>Politique de confidentialité</Button><br/>
                    <Button variant="link" onClick={null}>Conditions générales d'utilisation</Button><br/>
                    <Button variant="link" onClick={null}>Mentions légales</Button>
                  </Col>
                  <Col md={4}>
                    <span style={{color: "white", fontSize: "20px"}}>Nos Résaux sociaux</span><br/>
                    <img className="mr-2" alt="NO IMG" src={instagram} style={{width: "40px"}} onClick={null}/>
                    <img className="mr-2" alt="NO IMG" src={twitter} style={{width: "40px"}} onClick={null}/>
                    <img className="mr-2" alt="NO IMG" src={snapchat} style={{width: "40px"}} onClick={null}/>
                    <img className="mr-2" alt="NO IMG" src={facebook} style={{width: "40px"}} onClick={null}/>
                  </Col>
              </Row>
          </div>
        );
    }
}
export default withRouter(Footer)
