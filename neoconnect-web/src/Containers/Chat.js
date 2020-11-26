import React from 'react';
import {Grid, Input, TextField} from "@material-ui/core";
import "./index.css"
import {Icon} from "antd";
import Button from 'react-bootstrap/Button';
import { showNotif, emailValid } from './Utils.js';
import LoadingOverlay from 'react-loading-overlay';

export default class Chat extends React.Component{
    constructor(props) {
        super(props);
        localStorage.setItem('menuId', 6);
        this.state = {
            pseudo: localStorage.getItem("pseudo"),
            email: "",
            subject: "",
            message: "",
            to: "",
            isActive: false,
            client: localStorage.getItem("userType")
        };
    }

    handleResponse = async (res) => {
      var msg = await res.json();

      if (res.status !== 200) {
        showNotif(true, "Erreur", null);
      }
      else {
        showNotif(false, "Envoyé", "Votre email a bien été envoyé.");
        this.setState({email: "", subject: "", message: "", to: ""});
      }
      this.setState({isActive: false});
    }


    handleSend = () => {
      if (!this.state.email || !this.state.subject || !this.state.message || !this.state.to) {
        showNotif(true, "Erreur", 'Veuillez remplir tout les champs.')
      }
      else if(!emailValid(this.state.email) || !emailValid(this.state.to))
        showNotif(true, "Erreur", 'Veuillez remplir des addresses email valide.')
      else {
        this.setState({isActive: true});
        var body = {
            "pseudo": this.state.pseudo,
            "email": this.state.email,
            "subject": this.state.subject,
            "message": this.state.message,
            "to": this.state.to,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/contact`, {
           method: 'POST',
           body: body,
           headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => {this.handleResponse(res)})
          .catch(error => {this.setState({isActive: false});showNotif(true, "Erreur, Veuillez essayer ultérieurement", null)});
      }
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    render() {
        return (
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Chargement...'
            >
            <Grid container justify="center" alignItems="center" className={this.state.client === "shop" ? "shopBg" : "infBg"}>
                <Grid >
                    <Grid item xs={12} style={{ marginLeft: "3rem", marginRight: "3rem", textAlign: "center"}}>
                        <h2 style={{color: "white"}}>Contact</h2>
                    </Grid>
                    <Grid item style={{marginTop: "3rem", textAlign: "center"}} xs={12}>
                        <Icon type="mail" style={{ color: 'white', marginRight: "8px"}} />
                        <Input type="text"
                               name="email"
                               color="secondary"
                               placeholder="Votre addresse email*"
                               value={this.state.email}
                               style={{width: "42rem"}}
                               onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item style={{marginTop: "3rem", textAlign: "center"}} xs={12}>
                        <Icon type="mail" style={{ color: 'white', marginRight: "8px"}} />
                        <Input type="text"
                               name="to"
                               color="secondary"
                               placeholder="Email destinataire*"
                               value={this.state.to}
                               style={{width: "42rem"}}
                               onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item style={{marginTop: "3rem", textAlign: "center"}} xs={12}>
                        <Icon type="user" style={{ color: 'white', marginRight: "8px"}} />
                        <Input type="text"
                               name="subject"
                               color="secondary"
                               placeholder="Sujet*"
                               value={this.state.subject}
                               style={{width: "42rem"}}
                               onChange={this.handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} style={{marginTop: "1rem", marginBottom: "1rem", textAlign: "center", color: "white"}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Message*"
                            multiline
                            rows="8"
                            color="secondary"
                            name="message"
                            margin="normal"
                            variant="outlined"
                            style={{width: "43.75rem", height: "10rem"}}
                            value={this.state.message}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}  style={{ marginBottom: "3rem", textAlign: "center"}}>
                      <Button className={`mt-4 ${this.state.client ? 'btnShop' : 'btnInf'}`} onClick={() => this.handleSend()}>Envoyer</Button>
                    </Grid>
                </Grid>
            </Grid>
          </LoadingOverlay>
        );
    }
}
