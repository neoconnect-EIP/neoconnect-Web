import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Avatar, Grid, Card, CardHeader, CardContent, CardMedia, Button, Fab, Input, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core/';
import {Icon, Spin} from 'antd';
import DoneIcon from '@material-ui/icons/Done';
import avatar from "../../assets/avatar1.png"
import instagram from  "../../assets/instagram.png"
import twitter from  "../../assets/twitter.png"
import snapchat from  "../../assets/snapchat.png"
import facebook from  "../../assets/facebook.png"
import "../index.css"
import baniereInf from "../../assets/baniereiIng.jpg";

class EditProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            fullName: "",
            email: "",
            phone: "",
            postal: "",
            city: "",
            theme: "",
            facebook: "",
            instagram: "",
            twitter: "",
            snapchat: "",
            picture: null,
            file: null,
            profilePic: null,
            imagePreviewUrl: avatar,
        };
    }

    componentDidMount = () => {
        fetch("http://168.63.65.106/inf/me", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({
                pseudo: res.pseudo,
                fullName: res.full_name,
                email: res.email,
                phone: res.phone,
                postal: res.postal,
                city: res.city,
                theme: res.theme,
                facebook: res.facebook,
                instagram: res.instagram,
                twitter: res.twitter,
                snapchat: res.snapchat,
                profilePic: res.profilePic
            }))
            .catch(error => console.error('Error:', error));
    }

    handleResponse = (res) => {
        if (res.status === 200)
            this.props.history.push("/dashboard/status")
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                profilePic: reader.result,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    handleSubmit = () => {
        let body = {
            "pseudo": this.state.name,
            "profilePic": this.state.profilePic,
            "full_name": this.state.fullName,
            "email": this.state.email,
            "phone": this.state.phone,
            "postal": this.state.postal,
            "city": this.state.city,
            "theme": this.state.theme,
            "facebook": this.state.facebook,
            "twitter": this.state.twitter,
            "snapchat": this.state.snapchat,
            "instagram": this.state.instagram,
        };
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/inf/me", { method: 'PUT', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <div style={{padding: "25px"}}>
                <div style={{backgroundImage: "url(" + baniereInf + ")", backgroundSize: "cover", backgroundPosition: "center center", transform: 'translateY(-25px)', width: "100%", height: "300px", position: "fixed", zIndex: "-1", marginLeft: "-120px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "white", textAlign: "center"}}>Edit Profile</h1>
                </div>
                {
                    this.state.pseudo ?
                        <Card style={{boxShadow: "0 12px 18px -12px", marginTop: "12rem"}}>
                            <Grid container justify="center" alignItems="center" style={{marginTop: "-70px"}}>
                                <div className="picture-container">
                                    <div className="picture" style={{marginRight: "auto", marginLeft: "auto"}}>
                                        <Avatar alt="Avatar not found" src={this.state.file ? this.state.imagePreviewUrl : avatar} style={{width: "180px", height: "180px", position: "absolute", backgroundColor: "white"}}/>
                                        <input type="file" onChange={e => this.handleImageChange(e)} style={{marginTop: "190px"}} />
                                    </div>
                                </div>
                            </Grid>
                            <Grid container>
                                <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                    <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <Input type="text"
                                           name="pseudo"
                                           placeholder="Influencer name"
                                           value={this.state.pseudo}
                                           onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid xs={6} style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                    <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <Input type="text"
                                           name="fullName"
                                           placeholder="Full name"
                                           value={this.state.fullName}
                                           onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                    <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <Input type="text"
                                           name="email"
                                           placeholder="Email"
                                           value={this.state.email}
                                           onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                    <Icon type="mobile" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <Input type="text"
                                           name="phone"
                                           placeholder="Phone"
                                           value={this.state.phone}
                                           onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                    <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <Input type="text"
                                           name="postal"
                                           placeholder="Postal"
                                           value={this.state.postal}
                                           onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                    <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <Input type="text"
                                           name="city"
                                           placeholder="City"
                                           value={this.state.city}
                                           onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                    <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <FormControl variant="outlined" style={{width: "182px"}}>
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Theme
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            name="theme"
                                            value={this.state.theme}
                                            onChange={this.handleThemeChange}
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
                            </Grid>
                            <Grid container spacing={4} style={{marginTop: "20px"}}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia className="influencer-status-card-media" image={instagram} />
                                        <CardContent style={{textAlign: "center"}}>
                                            <Input  type="text"
                                                    name="instagram"
                                                    placeholder="Instagram name"
                                                    value={this.state.instagram}
                                                    onChange={this.handleChange}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia image={twitter} className="influencer-status-card-media"/>
                                        <CardContent style={{textAlign: "center"}}>
                                            <Input type="text"
                                                   name="twitter"
                                                   placeholder="Twitter name"
                                                   value={this.state.twitter}
                                                   onChange={this.handleChange}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia image={snapchat} className="influencer-status-card-media"/>
                                        <CardContent style={{textAlign: "center"}}>
                                            <Input type="text"
                                                   name="snapchat"
                                                   placeholder="Snapchat name"
                                                   value={this.state.snapchat}
                                                   onChange={this.handleChange}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia className="influencer-status-card-media" image={facebook}/>
                                        <CardContent style={{textAlign: "center"}}>
                                            <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                            <Input type="text"
                                                   name="facebook"
                                                   placeholder="Facebook name"
                                                   value={this.state.facebook}
                                                   onChange={this.handleChange}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center" justify="center" style={{marginBottom: "30px"}}>
                                <Fab variant="extended" aria-label="delete" style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", color: "white"}} onClick={this.handleSubmit}>
                                    Confirme
                                    <DoneIcon style={{marginLeft: "10px"}}/>
                                </Fab>
                            </Grid>
                        </Card>
                    :
                    <div style={{textAlign: "center", marginTop: "350px"}}>
                        <Spin size={"large"}/>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(EditProfile)