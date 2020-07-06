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
            fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/forgotPassword`, {
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
                <Grid className="landing-page-mid-div" style={{transform: "translateY(-35px)", borderRadius: "12px", backgroundColor: "#000000a8", backdropFilter: "blur(8px)"}}>
                    {
                        this.state.mailSend ?
                            <Grid container>
                                <Grid style={{backgroundImage: "linear-gradient(65deg, #000, #292929)", marginLeft: "4rem", marginRight: "4rem", marginTop: "-1.3rem", borderRadius: "8px"}} xs={12}>
                                    <h2 style={{color: "white"}}>Mail envoyé avec succes</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "#292929"}}/>
                                </Grid>
                            </Grid>
                        :
                            <Form className="formular" onSubmit={this.handleSubmit}>
                                <Grid style={{backgroundImage: "linear-gradient(65deg, #000, #292929)", marginLeft: "5rem", marginRight: "5rem", marginTop: "-1.3rem", borderRadius: "8px", height: "3rem"}}>
                                    <h2 style={{color: "white"}}>Reset your password</h2>
                                </Grid>
                                <Grid container style={{marginTop: "40px", marginBottom: "40px"}} spacing={3}>
                                    <Grid iem style={{textAlign: "center"}} xs={12}>
                                        <p style={{fontSize: "20px", color: "#ffffff"}}>Un email va être envoyer sur votre messagerie, verifiez vos spam !</p>
                                    </Grid>
                                    <Grid item className="input-form" xs={12}>
                                        <Icon type="mail" style={{ color: '#ffffff', marginRight: "8px"}}/>
                                        <Input
                                            style={{color: "#fff"}}
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
                                        <Button onClick={this.handleSubmit} style={{width: "9.375rem", height: "2.1875rem", borderRadius: "10px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>SEND MAIL</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                    }
                </Grid>
            </Grid>
        );
    }
}
