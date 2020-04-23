import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Avatar, Grid, Card, CardHeader, CardContent, CardMedia, Button, Fab, Input, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core/';
import {Icon} from 'antd';
import DoneIcon from '@material-ui/icons/Done';
import avatar from "../../assets/avatar1.png"
import instagram from  "../../assets/instagram.png"
import twitter from  "../../assets/twitter.png"
import snapchat from  "../../assets/snapchat.png"
import facebook from  "../../assets/facebook.png"
import "../index.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {TextField} from "@material-ui/core";

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
            userType: "",
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
                userType: res.userType,
                fullName: res.full_name,
                email: res.email,
                phone: res.phone,
                postal: res.postal,
                city: res.city,
                userDescription: res.userDescription,
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
            "userType": this.state.userType,
            "full_name": this.state.fullName,
            "email": this.state.email,
            "phone": this.state.phone,
            "postal": this.state.postal,
            "city": this.state.city,
            "userPicture": [{"imageName": `profilePic of UserId`, "imageData": this.state.profilePic}],
            "userDescription": this.state.userDescription,
            "facebook": this.state.facebook,
            "twitter": this.state.twitter,
            "snapchat": this.state.snapchat,
            "instagram": this.state.instagram,
        };
        console.log("body: ", body)
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/inf/me", { method: 'PUT', body: body,headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.pseudo ?
                        <Grid container justify="center">
                            <div style={{backgroundColor: "#292929", backgroundSize: "cover", backgroundPosition: "center center", transform: 'translateY(-25px)', width: "100%", height: "500px", position: "fixed", zIndex: "-1"}}/>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="Avatar not found" src={this.state.file ? this.state.imagePreviewUrl : ""} style={{width: "180px", height: "180px", position: "absolute", backgroundColor: "white", marginTop: "16rem", zIndex: "10"}}/>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "12rem", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}} justify="content">
                                <Grid container style={{marginTop: "13rem"}} justify="center">
                                    <Grid item xs={12} style={{textAlign: "center"}}>
                                        <input type="file" onChange={e => this.handleImageChange(e)}/>
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={12}>
                                        <TextField
                                            style={{width: "25rem"}}
                                            id="standard-multiline-flexible"
                                            label="Multiline"
                                            multiline
                                            rowsMax={4}
                                            name="userDescription"
                                            placeholder="status"
                                            value={this.state.userDescription}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
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
                                                name="userType"
                                                value={this.state.userType}
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
                                    <Fab variant="extended" aria-label="delete" style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", color: "white"}} onClick={this.handleSubmit}>
                                        Confirme
                                        <DoneIcon style={{marginLeft: "10px"}}/>
                                    </Fab>
                                </Grid>
                            </Grid>
                        </Grid>
                    :
                        <Loader
                            type="Triangle"
                            color="#292929"
                            height={200}
                            width={200}
                            style={{marginTop: "14rem"}}
                        />
                }
            </Grid>
        );
    }
}

export default withRouter(EditProfile)