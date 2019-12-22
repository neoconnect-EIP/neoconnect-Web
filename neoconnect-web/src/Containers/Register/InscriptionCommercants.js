import React from 'react';
import { Form, Icon, Button } from 'antd';
import {Grid, Input} from '@material-ui/core';
import "../index.css"


export default class ShopSignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            full_name: "",
            email: "",
            adress: "",
            city: "",
            prone: "",
            theme: "",
            function: "",
            society: "",
        }
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleResponse = (res) => {
        if (res.status === 200)
            this.props.history.push('/landing-page/login')
    };

    handleSubmit = () => {
        let body = {
            "pseudo": this.state.username,
            "password": this.state.password,
            "password2": this.state.password2,
            "full_name": this.state.full_name,
            "email": this.state.email,
            "adress": this.state.adress,
            "city": this.state.city,
            "phone": this.state.phone,
            "theme": this.state.theme,
            "function": this.state.function,
            "society": this.state.society,
        };
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/shop/register", { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
                <Grid className="landing-page-mid-div" style={{transform: "translateY(-35px)", borderRadius: "12px"}}>
                    <div style={{backgroundColor: "#d23e3e", marginLeft: "5rem", marginRight: "5rem", marginTop: "-2rem", borderRadius: "8px"}}>
                        <h1 style={{textAlign: "center", color: "white"}}>Inscription boutique</h1>
                    </div>
                    <Form className="formular" onSubmit={this.handleSubmit} style={{marginTop: "2rem"}}>
                        <Grid container spacing={2}>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                       type="text"
                                       name="username"
                                       placeholder="Username"
                                       value={this.state.username}
                                       onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                    type="text"
                                    name="full_name"
                                    placeholder="Full name"
                                    value={this.state.full_name}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" style={{marginBottom: "20px"}} xs={6}>
                                <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                       type="password"
                                       name="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                       size="large"
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                    type="password"
                                    name="password2"
                                    placeholder="Password confirmation"
                                    value={this.state.password2}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={12}>
                                <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="adress"
                                    placeholder="Adress"
                                    value={this.state.adress}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="mobile" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone number"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="shopping" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="theme"
                                    placeholder="theme"
                                    value={this.state.theme}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="shop" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="society"
                                    placeholder="Society"
                                    value={this.state.society}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="info" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input  type="text"
                                        name="function"
                                        placeholder="Function"
                                        value={this.state.function}
                                        onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginTop: "20px", marginBottom: "20px"}}>
                                <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Register</Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        );
    }
}
