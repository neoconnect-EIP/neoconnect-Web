import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import {Card, Grid, CardMedia, CardContent, CardActionArea} from "@material-ui/core";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noImageFindInf from "../../assets/noImageFindInf.jpg"



class FindInfluencers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            influencersData: null,
        };
    }

    componentDidMount = () => {
        fetch(`http://168.63.65.106/shop/listInf`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({influencersData: res}))
            .catch(error => console.error('Error:', error));
    };

    handleGlobalInf = (id) => {
        this.props.history.push(`/shop-dashboard/influencer?id=${id}`)
    }

    cardInf = (inf) => {
        return (
            <Grid item xs={12} md={6} style={{padding: "5rem", paddingRight: "12rem", height: "auto", marginBottom: "10rem"}}>
                <Card style={{width: "30rem", height: "36rem"}}>
                    <CardActionArea onClick={() => this.handleGlobalInf(inf.id)}>
                        <CardMedia>
                            <img src={!inf.userPicture || inf.userPicture.length === 0 ? noImageFindInf : inf.userPicture[0].imageData} style={{width: "30rem", height: "36rem", backgroundPosition: "center"}} alt="MISSING JPG"/>
                        </CardMedia>
                    </CardActionArea>
                </Card>
                <div style={{width: "15rem", height: "auto", backgroundColor: "#292929", marginTop: "-25rem", position: "relative", marginLeft: "24rem", borderRadius: "10px",
                    borderRight: "2px solid #292929", borderTop: "2px solid #292929", borderBottom: "2px solid #292929", padding: "0.5rem"}}>
                    <h1 style={{color: "white", paddingBottom: "1rem", marginBottom: "2rem", textDecoration: "underline"}}>{inf.pseudo}</h1>
                    <h5 style={{color: "white"}}>{inf.email}</h5>
                    <h5 style={{color: "white"}}>{inf.phone}</h5>
                    <h5 style={{color: "white"}}>{inf.theme}</h5>
                    <h5 style={{color: "white"}}>{`note: ${inf.average ? inf.average.toFixed(1) : "0" }/5`}</h5>
                </div>
            </Grid>
        );
    }

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.influencersData ?
                        <Grid container justify="center">
                            {
                                this.state.influencersData.map(inf => this.cardInf(inf))
                            }
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

export default withRouter(FindInfluencers)