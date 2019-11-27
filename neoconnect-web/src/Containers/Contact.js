import React from 'react';
import { Form, Icon, Button } from 'antd';
import { Input } from '@material-ui/core';
import { TextField }from '@material-ui/core';
import "../index.css"

export default class Contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            email: "",
            subject: "",
            message: ""
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
        console.log("res: ", res.status)
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
            <div className="landing-page-mid-div">
                <h2 style={{paddingTop: "20px", marginBottom: "50px"}}>Contact form</h2>
                <Form className="formular" onSubmit={this.handleSubmit}>
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
                        <Button onClick={this.handleSubmit} style={{width: "150px", height: "35px", borderRadius: "15px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>Register</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

