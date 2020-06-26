import React from 'react';
import {Form, Icon, Button} from 'antd';
import {Grid, Input} from '@material-ui/core';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            isLoading: false,
        }
    }

    handleEmailChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleResponse = (res) => {
        if (res.userType) {
            this.setState({isLoading: false})
            res.userType === "influencer" ? this.props.history.push('/dashboard/advertisements') : this.props.history.push('/shop-dashboard/ads')
        }
        else {
            this.setState({isLoading: false})
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
        this.setState({isLoading: true})
        console.log(process.env);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/login`, { method: 'POST', mode: 'cors', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => {return res.json()})
            .then(res => {localStorage.setItem('Jwt', res.token); localStorage.setItem('userId', res.userId); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.handleSubmit()
        }
    };

    render() {

        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
                <div className="landing-page-mid-div" style={{transform: "translateY(-65px)", borderRadius: "12px", backgroundColor: "#000000a8", backdropFilter: "blur(8px)"}}>
                    {
                        this.state.isLoading ?
                            <Loader
                                type="Triangle"
                                color="#fff"
                                height={200}
                                width={200}
                                style={{marginTop: "2rem", marginBottom: "2rem"}}
                            />
                            :
                            <Form onSubmit={this.handleSubmit} style={{paddingTop: "50px", textAlign: "center"}}>
                                <div style={{backgroundImage: "linear-gradient(65deg, #000, #292929)", marginLeft: "5rem", marginRight: "5rem", marginTop: "-4.5rem", borderRadius: "8px", height: "3rem"}}>
                                    <h2 style={{marginBottom: "4rem", color: "white"}}>Connexion</h2>
                                </div>
                                <div className="input-form" style={{marginTop: "2rem"}}>
                                    <Icon type="user" style={{ color: '#fff', marginRight: "8px"}} />
                                    <Input
                                        style={{color: "#fff"}}
                                        type="text"
                                        name="email"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleEmailChange}
                                    />
                                </div>
                                <div className="input-form">
                                    <Icon type="lock" style={{ color: '#fff', marginRight: "8px" }} />
                                    <Input
                                        style={{color: "#fff"}}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                        onKeyPress={this.handleKeyPress}
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
                                        <Button onClick={this.handleSubmit} disabled={this.state.isLoading} style={{width: "9.375rem", height: "2.1875rem", borderRadius: "10px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>LOGIN</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p style={{color: "#fff", marginTop: "0.2", marginBottom: "0rem"}}>-or-</p>
                                        <a style={{color: "#fff"}} onClick={this.forgotPassword}>forgot password</a>
                                    </Grid>
                                </Grid>
                            </Form>
                    }
                </div>
            </Grid>
        );
    }
}
