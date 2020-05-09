import React from 'react';
import {Grid, Input, TextField, Fab} from "@material-ui/core";
import "./index.css"
import {Icon} from "antd";
import background from '../assets/Equinox-Shop.jpg'

export default class About extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            email: "",
            subject: "",
            message: "",
            to: "",
        };
    }

    handleSend = () => {
        let body = {
            "pseudo": this.state.pseudo,
            "email": this.state.email,
            "subject": this.state.subject,
            "message": this.state.message,
            "to": this.state.to,
        };
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/user/contact", { method: 'POST', body: body,headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    /*changeConv = (id) => {
        this.setState({convId: id})
    }

    listItem = (item) => {
      return (
          <ListItem onClick={() => this.changeConv(item.id)}>
              <ListItemAvatar>
                  <Avatar>
                      <ImageIcon />
                  </Avatar>
              </ListItemAvatar>
              <Grid container>
                  <Grid item xs={12}>
                      <p style={{fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0", paddingTop: "0.5rem"}}>persone 1</p>
                  </Grid>
                  <Grid item xs={12}>
                      <p style={{fontSize: "0.80rem", color: "#292929"}}>last message</p>
                  </Grid>
              </Grid>
          </ListItem>
      );
    };*/

    render() {
        return (
            <Grid container justify="center" alignItems="center" style={{backgroundImage: `url(${background})`, backgroundSize: "cover", backdropFilter: "blur(8px)", width: "100%", height: "100vh"}}>
                {/* <Grid xs={3} style={{borderRight: "1px solid #292929", height: "100vh"}}>
                <List>
                    {
                        this.state.contacts ?
                            this.state.contacts.map(item => (
                                this.listItem(item)
                                )
                            )
                            :
                            <h5 style={{color: "#797979", textAlign: "center", marginTop: "49vh"}}>Aucuns contact pour le moment</h5>
                    }
                </List>
            </Grid>
            <Grid item xs={9} style={{height: "100vh"}}>
                <div style={{height: "90vh", width: "100%"}}>

                </div>
                <TextField style={{marginLeft: "2rem", backgroundColor: "#d9d9d9", borderRadius: "8px", width: "90%"}} multiline rowsMax="4" placeholder="écrivez un message..."/>
            </Grid>*/}
                <Grid style={{transform: "translateY(-65px)", borderRadius: "12px", backgroundColor: "rgba(198,198,198,0.66)", backdropFilter: "blur(8px)", width: "50rem", marginTop: "12rem"}}>
                    <Grid item xs={12} style={{marginTop: "-1.5rem", marginLeft: "3rem", marginRight: "3rem", textAlign: "center", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
                        <h2 style={{color: "white"}}>Contact</h2>
                    </Grid>
                    <Grid item style={{marginTop: "3rem", textAlign: "center"}} xs={12}>
                        <Icon type="user" style={{ color: '#292929', marginRight: "8px"}} />
                        <Input type="text"
                               name="pseudo"
                               color="secondary"
                               placeholder="pseudo"
                               value={this.state.pseudo}
                               style={{width: "42rem"}}
                               onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item style={{marginTop: "3rem", textAlign: "center"}} xs={12}>
                        <Icon type="user" style={{ color: '#292929', marginRight: "8px"}} />
                        <Input type="text"
                               name="email"
                               color="secondary"
                               placeholder="email"
                               value={this.state.email}
                               style={{width: "42rem"}}
                               onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item style={{marginTop: "3rem", textAlign: "center"}} xs={12}>
                        <Icon type="user" style={{ color: '#292929', marginRight: "8px"}} />
                        <Input type="text"
                               name="to"
                               color="secondary"
                               placeholder="to"
                               value={this.state.to}
                               style={{width: "42rem"}}
                               onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item style={{marginTop: "3rem", textAlign: "center"}} xs={12}>
                        <Icon type="user" style={{ color: '#292929', marginRight: "8px"}} />
                        <Input type="text"
                               name="subject"
                               color="secondary"
                               placeholder="subject"
                               style={{width: "42rem"}}
                               value={this.state.subject}
                               onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} style={{marginTop: "1rem", marginBottom: "1rem", textAlign: "center", color: "white"}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Message"
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
                        <Fab class="posted-ad-send-button"
                             onClick={() => this.handleSend()}
                             style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundColor: "#292929", textAlign: "center"}}
                        >
                            Send
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

