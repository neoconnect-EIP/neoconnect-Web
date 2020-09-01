import React from 'react';
import { Form } from 'antd';
import { Input, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import "../index.css"
import Button from 'react-bootstrap/Button';


export default class Contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            email: "",
            subject: "",
            message: "",
            mailSend: false,
        };
    }

    handlePseudoChange = (e) => {
        this.setState({pseudo: e.target.value})
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

    handleResponse = (res) => {
        if (res.status === 200)
            this.setState({mailSend: true})
    }

    handleSubmit = () => {
        let body = {
            pseudo: this.state.pseudo,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message,
        };

        body = JSON.stringify(body);
        fetch("http://168.63.65.106/contact", { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render() {
        return (
            <Grid container direction="row" justify="center" className={"infBg"} alignItems="center" style={{height: "100%"}}>
                <div className="landing-page-mid-div" style={{borderRadius: "12px", boxShadow: "1px, 1px, 1px black"}}>
                    {
                     this.state.mailSend ?
                         <Grid container>
                             <Grid item xs={12}>
                                 <h2>Message envoyé</h2>
                             </Grid>
                             <Grid item xs={12}>
                                 <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "ff4343"}}/>
                             </Grid>
                         </Grid>
                     :
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
        );
    }
}
