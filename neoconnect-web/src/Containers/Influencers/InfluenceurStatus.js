import React from 'react';
import { withRouter } from "react-router-dom"
import {Avatar, Grid, Card, CardHeader, CardContent, CardMedia, Button, Fab, CircularProgress} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import StarIcon from '@material-ui/icons/Star';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PhoneIcon from '@material-ui/icons/Phone';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,} from 'recharts';
import { curveCardinal } from 'd3-shape';
import avatar from "../../assets/avatar1.png"
import instagram from  "../../assets/instagram.png"
import twitter from  "../../assets/twitter.png"
import snapchat from  "../../assets/snapchat.png"
import facebook from  "../../assets/facebook.png"
import 'antd/dist/antd.css';
import "../index.css"
import baniereInf from "../../assets/baniereiIng.jpg";
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
        const data = [
            {
                name: 'Lundi', uv: 4000, pv: 2400, amt: 2400,
            },
            {
                name: 'Mardi', uv: 3000, pv: 1398, amt: 2210,
            },
            {
                name: 'Mercredi', uv: 2000, pv: 9800, amt: 2290,
            },
            {
                name: 'Jeudi', uv: 2780, pv: 3908, amt: 2000,
            },
            {
                name: 'Vendredi', uv: 1890, pv: 4800, amt: 2181,
            },
            {
                name: 'Samedi', uv: 2390, pv: 3800, amt: 2500,
            },
            {
                name: 'Dimanche', uv: 3490, pv: 4300, amt: 2100,
            },
        ];


        const domainData = [
            {
                subject: 'Mode', A: 120, B: 110, fullMark: 150,
            },
            {
                subject: 'High tech', A: 98, B: 130, fullMark: 150,
            },
            {
                subject: 'Jeux vidéo', A: 86, B: 130, fullMark: 150,
            },
            {
                subject: 'Sport/fitness', A: 99, B: 100, fullMark: 150,
            },
            {
                subject: 'Food', A: 85, B: 90, fullMark: 150,
            },
            {
                subject: 'Cosmetique', A: 65, B: 85, fullMark: 150,
            },
        ];

        const cardinal = curveCardinal.tension(0.2);
        return (
            <Grid container justify="center">
                {
                    this.state.userData ?
                        <Grid container justify="center">
                            <div style={{backgroundImage: "url(" + "http://www.favorisxp.com/fonds-decran/logos/supreme/supreme-zipper-new-york-times-square-fond-ecran-gratuit-pc-hd-wallpaper.jpg" + ")", backgroundSize: "cover", backgroundPosition: "center center", transform: 'translateY(-25px)', width: "100%", height: "500px", position: "fixed", zIndex: "-1"}}/>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="Avatar not found" src={"http://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"} style={{width: "180px", height: "180px", position: "absolute", backgroundColor: "white", marginTop: "18.5rem", zIndex: "10"}}/>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "12rem", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}} justify="content">
                                <Grid item xs={12}>
                                    <h1 style={{textAlign: "center", marginTop: "13rem"}}>{this.state.userData.full_name}</h1>
                                </Grid>
                                <Grid container style={{marginTop: "5rem"}}>
                                    <Grid item xs={12} md={4}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image={instagram} />
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{this.state.userData.instagram}</h2>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlzxD_EcjHhU0ugjCKaU5KBvxz0iRi4ae9NKSwOOmcb8BV2Xv&s" className="influencer-status-card-media"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{this.state.userData.twitter}</h2>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia image={snapchat} className="influencer-status-card-media"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{this.state.userData.snapchat}</h2>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image={facebook}/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{this.state.userData.facebook}</h2>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN1dvrN_VLGXTWeIs34dQhiblQPiBClRJ2PcFu0qic1GoIlYc5qA&s"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{this.state.userData.email}</h2>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="https://purepng.com/public/uploads/medium/purepng.com-phone-icon-ios-7symbolsiconsapple-iosiosios-7-iconsios-7-721522596639qvzzs.png"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{this.state.userData.phone}</h2>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="https://image.flaticon.com/icons/png/512/69/69524.png"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{`${this.state.userData.postal}, ${this.state.userData.city}`}</h2>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Card class="influencer-status-card-item">
                                                    <CardMedia className="influencer-status-card-media" image="http://icons.iconarchive.com/icons/fps.hu/free-christmas-flat/256/star-icon.png"/>
                                                    <CardContent style={{textAlign: "center"}}>
                                                        <h2>{/*this.state.userData.theme*/"Mode"}</h2>
                                                    </CardContent>
                                                </Card>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container justify="center">
                                            <Grid item xs={12} md={6} style={{textAlign: "center"}}>
                                                <h1>Note</h1>
                                                <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`5/5`}</h1>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <h1>Status</h1>
                                                <h5 style={{padding: "10px"}}>Jeune influenceur dynamique, j'aime la mode et les jeux vidéo. N'hesitez pas à me contacter via mes résaux ou sur Neoconnect !</h5>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign: "center", marginTop: "3.825rem"}}>
                                                <h1>Votre activité ces derniers jours</h1>
                                                <div style={{paddingLeft: "5.125rem", marginTop: "2rem"}}>
                                                    <AreaChart width={900} height={400} data={data} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                                                        <Area type={cardinal} dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                                                    </AreaChart>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign: "center", marginTop: "3.825rem"}}>
                                                <h1>Vos domaines favoris</h1>
                                                <div style={{paddingLeft: "17.5rem"}}>
                                                    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={600} data={domainData}>
                                                        <PolarGrid />
                                                        <PolarAngleAxis dataKey="subject" />
                                                        <PolarRadiusAxis />
                                                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                                    </RadarChart>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems="center" justify="center" style={{marginBottom: "30px", marginTop: "30px"}}>
                                    <Fab variant="extended" aria-label="delete" style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", color: "white"}} onClick={this.handleEditProfile}>
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
