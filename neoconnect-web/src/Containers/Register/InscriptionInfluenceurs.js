import React from 'react';
import { Form, Icon, Button } from 'antd';
import {Grid, Input, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import "../index.css"


export default class InfluencerSignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            password: "",
            password2: "",
            full_name: "",
            email: "",
            adress: "",
            city: "",
            prone: "",
            theme: null,
            instagram: "",
            facebook: "",
            twitter: "",
            snapchat: "",
        }
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleResponse = (res) => {
        if (res.status === 200)
            this.props.history.push('/landing-page/login')
    }

    handleSubmit = e => {
        let body = {
            "pseudo": this.state.pseudo,
            "password": this.state.password,
            "full_name": this.state.full_name,
            "email": this.state.email,
            "phone": this.state.phone,
            "postal": this.state.adress,
            "city": this.state.city,
            "theme": this.state.theme,
            "facebook": this.state.facebook,
            "twitter": this.state.twitter,
            "snapchat": this.state.snapchat,
            "instagram": this.state.instagram,
        };
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/inf/register", { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
                <Grid className="landing-page-mid-div" style={{transform: "translateY(-35px)", borderRadius: "12px"}}>
                    <h1 style={{textAlign: "center", paddingTop: "30px", marginTop: "0"}}>Inscription influenceur</h1>
                    <Form className="formular" onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                       type="text"
                                       name="pseudo"
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
                            <Grid item className="input-form" xs={6}>
                                <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}}/>
                                <Input
                                       type="password"
                                       name="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.handleChange}
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
                            <Grid item className="input-form" xs={6}>
                                <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}}/>
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
                            <Grid item className="input-form" xs={12}>
                                <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}}/>
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
                            <Grid className="input-form" xs={6}>
                                <Icon type="skin" style={{ color: '#d23e3e', marginRight: "8px", transform: "translateY(15px)"}} />
                                <FormControl variant="outlined" style={{width: "150px"}}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Theme
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        name="theme"
                                        value={this.state.theme}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value={1}>Mode</MenuItem>
                                        <MenuItem value={2}>Cosmetique</MenuItem>
                                        <MenuItem value={3}>Hight tech</MenuItem>
                                        <MenuItem value={4}>Food</MenuItem>
                                        <MenuItem value={5}>Jeux vidéo</MenuItem>
                                        <MenuItem value={6}>Sport/fitness</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid className="input-form" xs={6}>
                                <Icon type="instagram" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="instagram"
                                    placeholder="Instagram"
                                    value={this.state.instagram}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="facebook" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="facebook"
                                    placeholder="Facebook"
                                    value={this.state.facebook}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="twitter" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="twitter"
                                    placeholder="Twitter"
                                    value={this.state.twitter}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={6}>
                                <Icon type="aliwangwang" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                <Input
                                    type="text"
                                    name="snapchat"
                                    placeholder="Snapchat"
                                    value={this.state.snapchat}
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
