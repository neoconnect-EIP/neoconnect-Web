import React from 'react';
import { Form, Icon, Button } from 'antd';
import {Grid, Input} from '@material-ui/core';
import "../index.css"


export default class UpdatePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            resetPasswordToken: this.props.resetPasswordToken,
            password: "",
            password2: "",
        }
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handlePassword2Change = (e) => {
        this.setState({password2: e.target.value});
    }

    handleResponse = (res) => {
        if (res.status === 200)
            this.props.history.push('/landing-page/login')
    }

    handleSubmit = () => {
        let body = {
            "email": this.state.email,
            "resetPasswordToken": this.state.resetPasswordToken,
            "password": this.state.password,
            "password2": this.state.password2,
        };
        if (!body.email) {
            this.setState({errorMessage: true})
        }
        else {
            this.setState({errorMessage: false})
            body = JSON.stringify(body);
            fetch("http://168.63.65.106/updatePassword", {
                method: 'PUT',
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
                    <Form className="formular" onSubmit={this.handleSubmit}>
                        <Grid container style={{marginTop: "40px", marginBottom: "40px"}} spacing={3}>
                            <Grid iem style={{textAlign: "center"}} xs={12}>
                                <h2 style={{textDecoration: "underline"}}>Entré un nouveau mot de passe</h2>
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
                            <Grid item className="input-form" xs={12}>
                                <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={12}>
                                <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                    type="password2"
                                    name="password2"
                                    placeholder="Password confirmation"
                                    value={this.state.password2}
                                    onChange={this.handlePassword2Change}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>
                                    Update password
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        );
    }
}
