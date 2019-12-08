import React from 'react';
import { Form, Icon, Button } from 'antd';
import {Grid, Input} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import "../index.css"


export default class ForgotPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            mailSend: false,
        }
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handleResponse = (res) => {
        if (res.status === 200)
            this.setState({mailSend: true})
    }

    handleSubmit = () => {
        let body = {
            "email": this.state.email,
        };
        if (!body.email) {
            this.setState({errorMessage: true})
        }
        else {
            this.setState({errorMessage: false})
            body = JSON.stringify(body);
            fetch("http://168.63.65.106/forgotPassword", {
                method: 'POST',
                body: body,
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => { res.json(); this.handleResponse(res)})
                .catch(error => console.error('Error:', error));
        }
    };

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
                <Grid className="landing-page-mid-div" style={{transform: "translateY(-35px)", borderRadius: "12px"}}>
                    {
                        this.state.mailSend ?
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Le lien</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "ff4343"}}/>
                            </Grid>
                        </Grid>
                        :
                            <Form className="formular" onSubmit={this.handleSubmit}>
                                <Grid container style={{marginTop: "40px", marginBottom: "40px"}} spacing={3}>
                                    <Grid iem style={{textAlign: "center"}} xs={12}>
                                        <h2 style={{textDecoration: "underline"}}>Reset your password</h2>
                                        <p style={{fontSize: "20px"}}>Un email va être envoyer sur votre messagerie, verifiez vos spam !</p>
                                    </Grid>
                                    <Grid item className="input-form" xs={12}>
                                        <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                        <Input
                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleEmailChange}
                                        />
                                    </Grid>
                                    {
                                        this.state.errorMessage ?
                                            <Grid item style={{textAlign: "center", marginTop: "-20px", marginBottom: "-20px"}} xs={12}>
                                                <h5 style={{color: "red"}}>Aucun email renseigné</h5>
                                            </Grid>
                                            :
                                            ""
                                    }
                                    <Grid item xs={12}>
                                        <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Send mail</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                    }
                </Grid>
            </Grid>
        );
    }
}
