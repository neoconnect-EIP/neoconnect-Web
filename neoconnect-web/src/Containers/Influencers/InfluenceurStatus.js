import React from 'react';
import { withRouter } from "react-router-dom"
import {Avatar, Grid, Card, CardHeader, CardContent, CardMedia, Button, Fab, CircularProgress} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,} from 'recharts';
import instagram from  "../../assets/instagram.png"
import snapchat from  "../../assets/snapchat.png"
import facebook from  "../../assets/facebook.png"
import 'antd/dist/antd.css';
import "../index.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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
            <Grid container justify="center">
                {
                    this.state.userData ?
                        <Grid container justify="center">
                            <div style={{backgroundColor: "#292929", backgroundSize: "cover", backgroundPosition: "center center", transform: 'translateY(-25px)', width: "100%", height: "500px", position: "fixed", zIndex: "-1"}}/>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="Avatar not found" src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? "" : this.state.userData.userPicture[0].imageData} style={{width: "250px", height: "250px", position: "absolute", backgroundColor: "white", marginTop: "16.5rem", zIndex: "10", boxShadow: "0 0 10px"}}/>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "12rem", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}} justify="content">
                                <Grid item xs={12}>
                                    <h1 style={{textAlign: "center", marginTop: "15rem"}}>{this.state.userData.full_name}</h1>
                                </Grid>
                                <Grid container style={{marginTop: "5rem"}}>
                                    <Grid item xs={12} md={5}>
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image={instagram} />
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{this.state.userData.instagram}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlzxD_EcjHhU0ugjCKaU5KBvxz0iRi4ae9NKSwOOmcb8BV2Xv&s" className="influencer-status-card-media"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{this.state.userData.twitter}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia image={snapchat} className="influencer-status-card-media"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{this.state.userData.snapchat}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image={facebook}/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{this.state.userData.facebook}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN1dvrN_VLGXTWeIs34dQhiblQPiBClRJ2PcFu0qic1GoIlYc5qA&s"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{this.state.userData.email}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="https://purepng.com/public/uploads/medium/purepng.com-phone-icon-ios-7symbolsiconsapple-iosiosios-7-iconsios-7-721522596639qvzzs.png"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{this.state.userData.phone}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="https://image.flaticon.com/icons/png/512/69/69524.png"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{`${this.state.userData.postal}, ${this.state.userData.city}`}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="http://icons.iconarchive.com/icons/fps.hu/free-christmas-flat/256/star-icon.png"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h4>{this.state.userData.theme}</h4>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid container justify="center">
                                            <Grid item xs={12} md={6} style={{textAlign: "center"}}>
                                                <h1>Note</h1>
                                                <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`${this.state.userData.average ? this.state.userData.average.toFixed(1) : "0" }/5`}</h1>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <h1>Status</h1>
                                                <h5 style={{padding: "10px"}}>{this.state.userData.userDescription}</h5>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" justify="center" style={{marginBottom: "30px", marginTop: "30px"}}>
                                    <Fab variant="extended" aria-label="delete" style={{backgroundColor: "#292929", color: "white"}} onClick={this.handleEditProfile}>
                                        Edit Profile
                                        <EditIcon style={{marginLeft: "10px"}}/>
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

export default withRouter(InfluenceurStatus)
