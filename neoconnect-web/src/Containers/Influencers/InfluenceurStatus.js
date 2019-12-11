import React from 'react';
import { withRouter } from "react-router-dom"
import {Avatar, Grid, Card, CardHeader, CardContent, CardMedia, Button, Fab, CircularProgress} from '@material-ui/core/';
import { Spin } from 'antd';
import EditIcon from '@material-ui/icons/Edit';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import StarIcon from '@material-ui/icons/Star';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PhoneIcon from '@material-ui/icons/Phone';
import avatar from "../../assets/avatar1.png"
import instagram from  "../../assets/instagram.png"
import twitter from  "../../assets/twitter.png"
import snapchat from  "../../assets/snapchat.png"
import facebook from  "../../assets/facebook.png"
import 'antd/dist/antd.css';
import "../index.css"
import baniereInf from "../../assets/baniereiIng.jpg";

class InfluenceurStatus extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
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
            .then(res => this.setState({userData: res}))
            .catch(error => console.error('Error:', error));
    }

    handleEditProfile = () => {
        this.props.history.push("/dashboard/edit-profile")
    }

    render() {
        return (
            <div style={{padding: "25px"}}>
                <div style={{backgroundImage: "url(" + baniereInf + ")", backgroundSize: "cover", backgroundPosition: "center center", transform: 'translateY(-25px)', width: "100%", height: "300px", position: "fixed", zIndex: "-1", marginLeft: "-120px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "white", textAlign: "center"}}>Profile</h1>
                </div>
                {
                    this.state.userData ?
                        <Card style={{boxShadow: "0 12px 18px -12px", marginTop: "12rem", borderRadius: "12px"}}>
                            <Grid container justify="center" alignItems="center" style={{marginTop: "-10px"}}>
                                <Avatar alt="Avatar not found" src={avatar} style={{width: "180px", height: "180px", position: "absolute", backgroundColor: "white"}}/>
                            </Grid>
                            <Grid>
                                <h1 style={{textAlign: "center", marginTop: "90px"}}>{this.state.userData.full_name}</h1>
                            </Grid>
                            <Grid container spacing={4} style={{marginTop: "20px"}}>
                                <Grid item xs={12} md={6} lg={3}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia className="influencer-status-card-media" image={instagram} />
                                        <CardContent style={{textAlign: "center"}}>
                                            <h2>{this.state.userData.instagram}</h2>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia image={twitter} className="influencer-status-card-media"/>
                                        <CardContent style={{textAlign: "center"}}>
                                            <h2>{this.state.userData.twitter}</h2>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia image={snapchat} className="influencer-status-card-media"/>
                                        <CardContent style={{textAlign: "center"}}>
                                            <h2>{this.state.userData.snapchat}</h2>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <Card class="influencer-status-card-item">
                                        <CardMedia className="influencer-status-card-media" image={facebook}/>
                                        <CardContent style={{textAlign: "center"}}>
                                            <h2>{this.state.userData.facebook}</h2>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} style={{marginTop: "40px", textAlign: "center"}}>
                                <Grid item item xs={12} md={6} lg={3}>
                                    <AlternateEmailIcon/>
                                    <h4>{this.state.userData.email}</h4>
                                </Grid>
                                <Grid item item xs={12} md={6} lg={3}>
                                    <PhoneIcon/>
                                    <h4>{this.state.userData.phone}</h4>
                                </Grid>
                                <Grid item item xs={12} md={6} lg={3}>
                                    <HomeWorkIcon/>
                                    <h4>{`${this.state.userData.postal}, ${this.state.userData.city}`}</h4>
                                </Grid>
                                <Grid item item xs={12} md={6} lg={3}>
                                    <StarIcon />
                                    <h4>{this.state.userData.theme}</h4>
                                </Grid>
                            </Grid>

                            <Grid container alignItems="center" justify="center" style={{marginBottom: "30px", marginTop: "30px"}}>
                                <Fab variant="extended" aria-label="delete" style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", color: "white"}} onClick={this.handleEditProfile}>
                                    Edit Profile
                                    <EditIcon style={{marginLeft: "10px"}}/>
                                </Fab>
                            </Grid>
                        </Card>
                        :
                        <div style={{textAlign: "center", marginTop: "350px"}}>
                            <Spin
                                size={"large"}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(InfluenceurStatus)
