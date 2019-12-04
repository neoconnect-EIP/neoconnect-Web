import React from 'react';
import { Form, Icon, Button } from 'antd';
import Switch from '@material-ui/core/Switch';
import { Input } from '@material-ui/core';

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            back: true,
            username: "",
            password: "",
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
            res.userType === "influencer" ? this.props.history.push('/dashboard/advertisements') : this.props.history.push('/shop-dashboard/ads')
        }
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
            <div style={{paddingTop: "200px"}}>
                <div className="landing-page-mid-div">
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
                        </div>
                        <div style={{marginTop: "50px", paddingBottom: "30px"}}>
                            <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Login</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
