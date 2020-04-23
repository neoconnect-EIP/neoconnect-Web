import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Modal, Slide} from "@material-ui/core";
import StarIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg"

class FindShop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shopList: null,
        };
    }

    componentDidMount() {
        fetch("http://168.63.65.106/inf/listShop", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({shopList: res}))
            .catch(error => console.error('Error:', error));
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push(`/dashboard/shop?id=${id}`)
    }

    handleCard = (item) => {
        return (
            <Grid item xs={12} md={6}>
                <Card className="findShopCard">
                    <CardActionArea onClick={() => this.handleGlobalAnnonce(item.id)}>
                        <CardMedia>
                            <img src={item.userPicture === null || item.userPicture.length === 0 ? noShop : item.userPicture[0].imageData} style={{width: "100%", height: "21.875rem"}} alt="MISSING JPG"/>
                        </CardMedia>
                    </CardActionArea>
                    <CardContent style={{width: "100%", height: "auto"}}>
                        <Grid container>
                            <Grid item xs={10}>
                                <h1>{` ${item.pseudo ? item.pseudo : "No brand"}`}</h1>
                            </Grid>
                            <Grid item xs={2}>
                                <h2 style={{marginBottom: "10px", marginLeft: "20px"}}>{item.mark ? item.mark : "0"}/5</h2>
                                <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    render() {

        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Trouver une boutique</h1>
                </Grid>
                {
                    this.state.shopList ?
                        <Grid container className="advertisements-list" style={{marginTop: "120px"}}>
                            {
                                this.state.shopList.map(item => this.handleCard(item))
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

export default withRouter(FindShop)
