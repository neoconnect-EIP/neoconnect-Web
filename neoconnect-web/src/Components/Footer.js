import React from 'react';
import { withRouter } from "react-router-dom"
import "./index.css"
import facebook from "../assets/facebook-logo.png"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import snapchatOff from "../assets/snapchatOff.svg";
import instagramOff from "../assets/instagramOff.svg";
import twitterOff from "../assets/twitterOff.svg";

class Footer extends React.Component {

    handleContact = () => {
        this.props.history.push('/landing-page/contact')
    }

    render() {
        return (
          <div className="footer">
              <Row>
                  <Col className="ml-4" md={4}>
                    <span style={{color: "white", fontSize: "20px"}}>Nos Résaux sociaux</span><br/>
                    <a  href="https://www.facebook.com/neoconnect2021" target="_blank"><img className="mr-2" alt="NO IMG" src={facebook} style={{width: "40px"}}/></a>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            À venir
                          </Tooltip>
                        }
                      >
                      <Image className="iconProfileSocial" src={instagramOff}/>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            À venir
                          </Tooltip>
                        }
                      >
                    <Image className="iconProfileSocial" src={twitterOff}/>
                    </OverlayTrigger>

                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            À venir
                          </Tooltip>
                        }
                      >
                    <Image className="iconProfileSocial" src={snapchatOff}/>
                    </OverlayTrigger>

                  </Col>
              </Row>
          </div>
        );
    }
}
export default withRouter(Footer)

// <Col md={4} className="ml-4">
//
// </Col>
// <Button variant="link" onClick={null}>Politique de confidentialité</Button><br/>
// <Button variant="link" onClick={null}>Conditions générales d'utilisation</Button><br/>
// <Button variant="link" onClick={null}>Mentions légales</Button>
