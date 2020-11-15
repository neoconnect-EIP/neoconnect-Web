import React from 'react';
import { Form } from 'antd';
import { Input, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import "../index.css"
import Button from 'react-bootstrap/Button';
import LoadingOverlay from 'react-loading-overlay';
import { showNotif } from './Utils.js';

export default class Contact extends React.Component{
    constructor(props) {
        super(props);
        localStorage.setItem('menuId', 14);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        this.state = {
            email: "",
            subject: "",
            message: "",
            mailSend: false,
            isActive: false,
            client: localStorage.getItem("userType"),
            pseudo: localStorage.getItem("pseudo"),
        };
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    handleSubjectChange = (e) => {
        this.setState({subject: e.target.value})
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    }

    handleResponse = async (res) => {
        var msg;
        if (res.status === 200) {
          msg = await res.json();
          this.setState({mailSend: true});
          showNotif(false, "Envoyé", msg)
        this.setState({subject: "", pseudo: "", email: "", message: ""});
        }
      else {
          msg = await res.json();
          showNotif(true, "Erreur", msg);
      }
      this.setState({isActive: false});
    }

    handleSubmit = () => {
        let body = {
            'pseudo': this.state.pseudo,
            'email': this.state.email,
            'subject': this.state.subject,
            'message': this.state.message,
        };

        body = JSON.stringify(body);
        this.setState({isActive: true});
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/contact`,
          { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => {this.handleResponse(res)})
            .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render() {
        return (
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Chargement...'
            >
            <Grid container direction="row" justify="center" className={this.state.client === "shop" ? "shopBg" : "infBg"} alignItems="center" style={{height: "100%"}}>
                <div className="landing-page-mid-div" style={{borderRadius: "12px", boxShadow: "1px, 1px, 1px black"}}>
                    {
                         <Form className="formular" onSubmit={this.handleSubmit}>
                             <h2 style={{paddingTop: "20px", marginBottom: "50px"}}>Nous contacter</h2>
                             <div className="input-form">
                               <FormControl variant="outlined" style={{width: "700px", color: 'black'}}>
                                   <InputLabel id="demo-simple-select-outlined-label" style={{color: 'black'}}>
                                       Type
                                   </InputLabel>
                                   <Select
                                       style={{color: 'black'}}
                                       labelId="demo-simple-select-outlined-label"
                                       name="type"
                                       value={this.state.type}
                                       onChange={this.handleChange}
                                   >
                                       <MenuItem value={1}>Bug</MenuItem>
                                       <MenuItem value={2}>Amélioration</MenuItem>
                                       <MenuItem value={3}>Commentaire</MenuItem>
                                       <MenuItem value={4}>Contact</MenuItem>
                                   </Select>
                               </FormControl>
                             </div>
                             <div className="input-form">
                                 <Input
                                     style={{width: "700px"}}
                                     type="text"
                                     name="subject"
                                     placeholder="Sujet"
                                     value={this.state.subject}
                                     onChange={this.handleSubjectChange}
                                     size="large"
                                 />
                             </div>
                             <div className="input-form">
                                 <Input
                                     style={{width: "700px"}}
                                     type="text"
                                     name="email"
                                     placeholder="Email"
                                     value={this.state.email}
                                     onChange={(val) => this.handleEmailChange(val)}
                                     size="large"
                                 />
                             </div>
                             <div className="input-form">
                                 <TextField
                                     id="outlined-multiline-static"
                                     label="Message"
                                     multiline
                                     rows="8"
                                     margin="normal"
                                     variant="outlined"
                                     style={{width: "700px", height: "160px"}}
                                     value={this.state.message}
                                     onChange={(value) => this.handleMessageChange(value)}
                                 />
                             </div>
                             <div style={{marginTop: "50px", paddingBottom: "30px"}}>
                                 <Button onClick={this.handleSubmit} className="btnInf">Envoyer</Button>
                             </div>
                         </Form>
                    }
                </div>
            </Grid>
          </LoadingOverlay>
        );
    }
}
