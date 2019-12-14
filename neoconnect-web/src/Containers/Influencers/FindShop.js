import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Modal, Slide} from "@material-ui/core";
import {Spin} from "antd";
import noImages from "../../assets/noImages.jpg";
import StarIcon from "@material-ui/core/SvgIcon/SvgIcon";

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

    handleCard = (item) => {
        console.log("item: ", item)
        return (
            <Grid item xs={12} md={6}>
                <Card style={{height: "auto", boxShadow: "#807e7e 1px 2px 7px 0px", margin: "50px", borderRadius: "6px", backgroundColor: "#ebebeb"}}>
                    <CardActionArea onClick={() => this.handleGlobalAnnonce(item.id)}>
                        <CardMedia>
                            <img src={noImages} style={{width: "100%", height: "350px"}} alt="MISSING JPG"/>
                        </CardMedia>
                    </CardActionArea>
                    <CardContent style={{width: "100%", height: "auto"}}>
                        <h6>{`${item.productName} ${item.brand ? item.brand : "No brand"}`}</h6>
                        <p>{`${item.productDesc} - ${item.productSex}`}</p>
                        <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                        <h6 style={{marginBottom: "10px"}}>{item.note ? item.note : "0"}/5</h6>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    render() {
        console.log("shopList: ", this.state.shopList)
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
                        <div style={{textAlign: "center", marginTop: "350px"}}>
                            <Spin size={"large"}/>
                        </div>
                }
            </Grid>
        );
    }
}

export default withRouter(FindShop)
