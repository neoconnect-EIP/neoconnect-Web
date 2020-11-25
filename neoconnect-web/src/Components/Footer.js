import React from 'react';
import { withRouter } from "react-router-dom"
import "./index.css"
import facebook from "../assets/facebook-logo.png"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
                    <a  href="https://www.facebook.com/neoconnect2021" rel="noopener noreferrer" target="_blank"><img className="mr-2" alt="NO IMG" src={facebook} style={{width: "40px"}}/></a>
                  </Col>
              </Row>
          </div>
        );
    }
}
export default withRouter(Footer)
