import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Avatar, Grid, Card, CardHeader, CardContent, CardMedia, Button, Fab, Input} from '@material-ui/core/';
import { Icon } from 'antd';
import DoneIcon from '@material-ui/icons/Done';
import avatar from "../../assets/avatar1.png"
import instagram from  "../../assets/instagram.png"
import twitter from  "../../assets/twitter.png"
import snapchat from  "../../assets/snapchat.png"
import facebook from  "../../assets/facebook.png"
import "../index.css"

class EditProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            picture: "",
            password: "",
            password2: "",
            instagram: "",
            twitter: "",
            snapchat: "",
            facebook: "",
            file: null,
            imagePreviewUrl: avatar,
        };
    }

    handleProfileEdited = () => {
        this.props.history.push("/dashboard/status")
    }

    handleInfluencerName = (e) => {
        this.setState({name: e.target.value});
    }

    handleInfluencerpassword = (e) => {
        this.setState({password: e.target.value});
    }

    handleInfluencerpassword2 = (e) => {
        this.setState({password2: e.target.value});
    }

    handleInstagramName = (e) => {
        this.setState({instagram: e.target.value});
    }

    handleTwitterName = (e) => {
        this.setState({twitter: e.target.value});
    }

    handleSnapchatName = (e) => {
        this.setState({snapchat: e.target.value});
    }

    handleFacebookName = (e) => {
        this.setState({facebook: e.target.value});
    }

    handleResponse = () => {
        this.handleProfileEdited()
    }

    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    handleSubmit = () => {
        let body = {
            "pseudo": this.state.name,
            "password": this.state.password,
            "password2": this.state.password2,
            "instagram": this.state.instagram,
            "twitter": this.state.twitter,
            "snapchat": this.state.snapchat,
            "facebook": this.state.facebook,
        };
        body = JSON.stringify(body);
        /*fetch("http://168.63.65.106/", { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));*/
    };

    render() {
        return (
            <div style={{padding: "25px"}}>
                <Card style={{boxShadow: "0 12px 18px -12px", marginTop: "7%"}}>
                    <Grid container justify="center" alignItems="center" style={{marginTop: "-70px"}}>
                        <div className="picture-container">
                            <div className="picture" style={{marginRight: "auto", marginLeft: "auto"}}>
                                <img src={this.state.imagePreviewUrl} className="picture-src" alt="…" style={{width: "180px", height: "180px", position: "absolute", marginLeft: "45px"}}/>
                                <input type="file" onChange={e => this.handleImageChange(e)} style={{marginTop: "190px"}} />
                            </div>
                        </div>
                    </Grid>
                    <Grid style={{textAlign: "center", marginTop: "90px"}}>
                        <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                        <Input type="text"
                               name="influencer name"
                               placeholder="Influencer name"
                               value={this.state.name}
                               onChange={this.handleInfluencerName}
                        />
                    </Grid>
                    <Grid style={{textAlign: "center", marginTop: "90px"}}>
                        <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                        <Input type="password"
                                   name="password"
                                   placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handleInfluencerpassword}
                            />
                    </Grid>
                    <Grid style={{textAlign: "center", marginTop: "90px"}}>
                        <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                        <Input type="text"
                                   name="password validation"
                                   placeholder="Password"
                                   value={this.state.password2}
                                   onChange={this.handleInfluencerpassword2}
                            />
                    </Grid>
                    <Grid container spacing={4} style={{marginTop: "20px"}}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia className="influencer-status-card-media" image={instagram} />
                                <CardContent style={{textAlign: "center"}}>
                                    <Input  type="text"
                                            name="instagram name"
                                            placeholder="Instagram name"
                                            value={this.state.instagram}
                                            onChange={this.handleInstagramName}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia image={twitter} className="influencer-status-card-media"/>
                                <CardContent style={{textAlign: "center"}}>
                                    <Input type="text"
                                           name="twitter name"
                                           placeholder="Twitter name"
                                           value={this.state.twitter}
                                           onChange={this.handleTwitterName}/>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia image={snapchat} className="influencer-status-card-media"/>
                                <CardContent style={{textAlign: "center"}}>
                                    <Input type="text"
                                           name="snapchat name"
                                           placeholder="Snapchat name"
                                           value={this.state.snapchat}
                                           onChange={this.handleSnapchatName}/>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia className="influencer-status-card-media" image={facebook}/>
                                <CardContent style={{textAlign: "center"}}>
                                    <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                    <Input type="text"
                                           name="facebook name"
                                           placeholder="Facebook name"
                                           value={this.state.facebook}
                                           onChange={this.handleFacebookName}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="center" style={{marginBottom: "30px"}}>
                        <Fab variant="extended" aria-label="delete" style={{backgroundImage: "linear-gradient(40deg, #ff4343, #982d2d, #712121)", color: "white"}} onClick={this.handleSubmit}>
                            Confirme
                            <DoneIcon style={{marginLeft: "10px"}}/>
                        </Fab>
                    </Grid>
                </Card>
            </div>
        );
    }
}

export default withRouter(EditProfile)