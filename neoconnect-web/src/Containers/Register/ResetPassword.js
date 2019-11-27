import React from 'react';
import { Form, Icon, Button } from 'antd';
import { Input } from '@material-ui/core';
import "../index.css"


export default class ResetPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            password2: "",
        }
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handlePassword2Change = (e) => {
        this.setState({password2: e.target.value});
    }

    handleResponse = (res) => {
        console.log("res: ", res.status)
        if (res.status === 200)
            this.props.history.push('/landing-page/login')
    }

    handleSubmit = () => {
        let body = {
            "password": this.state.password,
            "password2": this.state.password2,
        };
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/resetPassword", { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <div className="landing-page-mid-div">
                <Form className="formular" onSubmit={this.handleSubmit}>
                    <div className="input-form" style={{paddingTop: "20px"}}>


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
                    <div style={{marginTop: "50px", paddingBottom: "30px"}}>
                        <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Register</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
