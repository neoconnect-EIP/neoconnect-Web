import React from 'react';
import { withRouter } from "react-router-dom"
import {Grid} from "@material-ui/core";
import "./index.css"
import instagram from "../assets/instagram.png"
import twitter from "../assets/twitter.png"
import snapchat from "../assets/snapchat.png"
import facebook from "../assets/facebook.png"

class Footer extends React.Component {

    handleContact = () => {
        this.props.history.push('/landing-page/contact')
    }

    render() {
        return (
          <div className="footer">
              <Grid container style={{paddingLeft: "25rem", paddingRight: "25rem"}}>
                  <Grid item xs={6}>
                      <Grid class="footer-button">
                          <a onClick={this.handleContact}>Nous contacter</a>
                      </Grid>
                      <Grid class="footer-button">
                          <a onClick={null}>Politique de confidentialité</a>
                      </Grid>
                      <Grid class="footer-button">
                          <a onClick={null}>Conditions générales d'utilisation</a>
                      </Grid>
                      <Grid class="footer-button">
                          <a onClick={null}>Mentions légales</a>
                      </Grid>
                  </Grid>
                  <Grid item xs={6}>
                      <Grid>
                          <span style={{color: "white", fontSize: "20px"}}>Nos Résaux sociaux</span>
                      </Grid>
                      <Grid style={{marginTop: "10px"}}>
                          <img alt="NO IMG" src={instagram} style={{width: "40px", marginRight: "10px"}} onClick={null}/>
                          <img alt="NO IMG" src={twitter} style={{width: "40px", marginRight: "10px"}} onClick={null}/>
                          <img alt="NO IMG" src={snapchat} style={{width: "40px", marginRight: "2px"}} onClick={null}/>
                          <img alt="NO IMG" src={facebook} style={{width: "58px", marginRight: "10px"}} onClick={null}/>
                      </Grid>
                  </Grid>
              </Grid>
          </div>
        );
    }
}
export default withRouter(Footer)