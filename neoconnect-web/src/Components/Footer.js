import React from 'react';
import {Grid} from "@material-ui/core";
import "./index.css"
import instagram from "../assets/instagram.png"
import twitter from "../assets/twitter.png"
import snapchat from "../assets/snapchat.png"
import facebook from "../assets/facebook.png"

export default class Footer extends React.Component {
    render() {
        return (
          <div className="footer">
              <Grid container style={{paddingLeft: "400px", paddingRight: "400px"}}>
                  <Grid item xs={6}>
                      <Grid class="footer-button">
                          <a onClick={null}>Nous contacter</a>
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
                          <img alt="NO IMG" src={snapchat} style={{width: "40px", marginRight: "10px"}} onClick={null}/>
                          <img alt="NO IMG" src={facebook} style={{width: "40px", marginRight: "10px"}} onClick={null}/>
                      </Grid>
                  </Grid>
              </Grid>
          </div>
        );
    }
}