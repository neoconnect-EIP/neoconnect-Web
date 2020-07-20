import React from 'react';
import { Form, Icon, Button } from 'antd';
import { Input, TextField, Grid } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import "../index.css"

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

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
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
                             <h2 style={{paddingTop: "20px", marginBottom: "50px"}}>Contact form</h2>
                             <div className="input-form">
                                 <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                 <Input
                                     type="text"
                                     name="pseudo"
                                     placeholder="Pseudo"
                                     value={this.state.pseudo}
                                     onChange={this.handlePseudoChange}
                                     size="large"
                                 />
                             </div>
                             <div className="input-form">
                                 <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                 <Input
                                     type="text"
                                     name="email"
                                     placeholder="Email"
                                     value={this.state.email}
                                     onChange={this.handleEmailChange}
                                     size="large"
                                 />
                             </div>
                             <div className="input-form">
                                 <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                 <Input
                                     type="text"
                                     name="subject"
                                     placeholder="Subject"
                                     value={this.state.subject}
                                     onChange={this.handleSubjectChange}
                                     size="large"
                                 />
                             </div>
                             <div className="input-form">
                                 <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
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
                                 <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Envoyer</Button>
                             </div>
                         </Form>
                    }
                </div>
            </Grid>
        );
    }
}
