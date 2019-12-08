import React from 'react';
import { Form, Icon, Button } from 'antd';
import {Grid, Input, Snackbar, SnackbarContent} from '@material-ui/core';

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
        }
    }

    handleEmailChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleSnackbar = () => {
        console.log("here2")
        this.setState({openSnackbar: !this.state.openSnackbar})
    }

    handleResponse = (res) => {
        if (res.userType) {
            res.userType === "influencer" ? this.props.history.push('/dashboard/advertisements') : this.props.history.push('/shop-dashboard/ads')
        }
        else {
            this.setState({errorMessage: res.message})
        }
    }

    forgotPassword = () => {
        this.props.history.push('/landing-page/forgot-password')
    }

    handleSubmit = () => {
        let body = {
            "pseudo": this.state.username,
            "password": this.state.password,
        };
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/login", { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => {return res.json()})
            .then(res => {localStorage.setItem('Jwt', res.token); localStorage.setItem('userId', res.userId); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
                <div className="landing-page-mid-div" style={{transform: "translateY(-65px)", borderRadius: "12px"}}>
                    <Form onSubmit={this.handleSubmit} style={{paddingTop: "50px", textAlign: "center"}}>
                        <div className="input-form">
                            <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input type="text"
                                   name="email"
                                   placeholder="Username"
                                   value={this.state.username}
                                   onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px" }} />
                            <Input type="password"
                                   name="password"
                                   placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handlePasswordChange}
                            />
                            {
                                this.state.errorMessage ?
                                    <h5 style={{color: "red", marginBottom: "-30px"}}>{this.state.errorMessage}</h5>
                                    :
                                    ""
                            }
                        </div>
                        <Grid container style={{marginTop: "50px", paddingBottom: "30px"}}>
                            <Grid item xs={12}>
                                <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Login</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <a style={{color: "red"}} onClick={this.forgotPassword}>forgot password</a>
                            </Grid>
                        </Grid>
                    </Form>
                </div>
            </Grid>
        );
    }
}
