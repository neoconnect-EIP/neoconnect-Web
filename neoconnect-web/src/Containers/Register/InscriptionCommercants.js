import React from 'react';
import { Form, Icon, Button } from 'antd';
import { Input } from '@material-ui/core';
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

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handlePassword2Change = (e) => {
        this.setState({password2: e.target.value});
    }

    handleFullNameChange = (e) => {
        this.setState({full_name: e.target.value});
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handleAdressChange = (e) => {
        this.setState({adress: e.target.value});
    }

    handleCityChange = (e) => {
        this.setState({city: e.target.value});
    }

    handlePhoneChange = (e) => {
        this.setState({phone: e.target.value});
    }

    handleThemeChange = (e) => {
        this.setState({theme: e.target.value});
    }

    handleFunctionChange = (e) => {
        this.setState({function: e.target.value});
    }

    handleSocietyChange = (e) => {
        this.setState({society: e.target.value});
    }

    handleResponse = (res) => {
        console.log("res: ", res.status)
        if (res.status === 200)
            this.props.history.push('/login')
    }

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
            <div>
                <div className="landing-page-mid-div">
                    <h1 style={{textAlign: "center", paddingTop: "30px", marginTop: "0"}}>Inscription commercant</h1>
                    <Form className="formular" onSubmit={this.handleSubmit}>
                        <div className="input-form">
                            <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                   type="text"
                                   name="username"
                                   placeholder="Username"
                                   value={this.state.username}
                                   onChange={this.handleUsernameChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                   type="password"
                                   name="password"
                                   placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handlePasswordChange}
                                   size="large"
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="password"
                                name="password2"
                                placeholder="Password confirmation"
                                value={this.state.password2}
                                onChange={this.handlePassword2Change}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="text"
                                name="full name"
                                placeholder="Full name"
                                value={this.state.full_name}
                                onChange={this.handleFullNameChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="text"
                                name="adress"
                                placeholder="Adress"
                                value={this.state.adress}
                                onChange={this.handleAdressChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={this.state.city}
                                onChange={this.handleCityChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="mobile" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="text"
                                name="phone"
                                placeholder="Phone number"
                                value={this.state.phone}
                                onChange={this.handlePhoneChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="shopping" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="text"
                                name="theme"
                                placeholder="theme"
                                value={this.state.theme}
                                onChange={this.handleThemeChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="shop" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input
                                type="text"
                                name="society"
                                placeholder="Society"
                                value={this.state.society}
                                onChange={this.handleSocietyChange}
                            />
                        </div>
                        <div className="input-form">
                            <Icon type="info" style={{ color: '#d23e3e', marginRight: "8px"}} />
                            <Input  type="text"
                                    name="function"
                                    placeholder="Function"
                                    value={this.state.function}
                                    onChange={this.handleFunctionChange}
                            />
                        </div>
                        <div>
                            <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Register</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
