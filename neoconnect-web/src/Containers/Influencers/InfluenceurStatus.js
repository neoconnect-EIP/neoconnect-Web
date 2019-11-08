import React from 'react';
import { withRouter } from "react-router-dom"
import {Avatar, Grid, Card, CardHeader, CardContent, CardMedia, Button, Fab} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import avatar from "../../assets/avatar1.png"
import instagram from  "../../assets/instagram.png"
import twitter from  "../../assets/twitter.png"
import snapchat from  "../../assets/snapchat.png"
import facebook from  "../../assets/facebook.png"
import "../index.css"

class InfluenceurStatus extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount = () => {
        fetch("http://168.63.65.106/inf/me", { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
    }

    handleEditProfile = () => {
        this.props.history.push("/dashboard/edit-profile")
    }

    render() {
        return (
            <div style={{padding: "25px"}}>
                <Card style={{boxShadow: "0 12px 18px -12px", marginTop: "13%"}}>
                    <Grid container justify="center" alignItems="center" style={{marginTop: "-70px"}}>
                        <Avatar alt="Avatar not found" src={avatar} style={{width: "180px", height: "180px", position: "absolute"}}/>
                    </Grid>
                    <Grid>
                        <h1 style={{textAlign: "center", marginTop: "90px"}}>pseudo influencer</h1>
                    </Grid>
                    <Grid container spacing={4} style={{marginTop: "20px"}}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia className="influencer-status-card-media" image={instagram} />
                                <CardContent style={{textAlign: "center"}}>
                                    <h1>influcer pseudo</h1>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia image={twitter} className="influencer-status-card-media"/>
                                <CardContent style={{textAlign: "center"}}>
                                    <h1>influcer pseudo</h1>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia image={snapchat} className="influencer-status-card-media"/>
                                <CardContent style={{textAlign: "center"}}>
                                    <h1>influcer pseudo</h1>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Card class="influencer-status-card-item">
                                <CardMedia className="influencer-status-card-media" image={facebook}/>
                                <CardContent style={{textAlign: "center"}}>
                                    <h1>influcer pseudo</h1>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="center" style={{marginBottom: "30px"}}>
                        <Fab variant="extended" aria-label="delete" style={{backgroundImage: "linear-gradient(40deg, #ff4343, #982d2d, #712121)", color: "white"}} onClick={this.handleEditProfile}>
                            Edit Profile
                            <EditIcon style={{marginLeft: "10px"}}/>
                        </Fab>
                    </Grid>
                </Card>
            </div>
        );
    }
}

export default withRouter(InfluenceurStatus)
