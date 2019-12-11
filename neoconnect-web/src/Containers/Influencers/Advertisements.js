import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, Button, Grid, Modal, Slide}from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarIcon from '@material-ui/icons/Star';

import gucci1 from "../../assets/gucci1.jpeg"
import gucci2 from "../../assets/gucci2.jpeg"
import gucci3 from "../../assets/gucci3.jpeg"
import champion1 from "../../assets/champion1.jpeg"
import champion2 from "../../assets/champion2.jpeg"
import champion3 from "../../assets/champion3.jpeg"
import amiri1 from "../../assets/amiri1.jpeg"
import amiri2 from "../../assets/amiri2.jpeg"
import amiri3 from "../../assets/amiri3.jpeg"
import backgroundStatus from "../../assets/backgroundStatus.jpg";


class Advertisements extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            actualId: null,
            adsData: null,
            fonction: null,
        };
    }

    componentDidMount = () => {
        fetch("http://168.63.65.106/offer/list", { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({adsData: res}))
            .catch(error => console.error('Error:', error));
    }

    handleModal = (id, fonction) => {
        this.setState({visible: !this.state.visible, actualId: id})
        if (this.state.fonction) {
            this.setState({fonction: ""})
        } else {
          this.setState({fonction: fonction})
        }
    }

    handleAnnonceSubsribe = (item) => {
        fetch(`http://168.63.65.106/offer/apply/${item[0].id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal(item[0].id)
    }

    handleAnnonceNotation = (item) => {
        fetch(`http://168.63.65.106/offer/rate/${item[0].id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal(item[0].id)
    }

    displayImage = (x) => {
        return (
            <Grid container style={{height: "240px", backgroundColor: "#ffffff"}} justify="center" alignItems="flex-start">
                <img src={x.image} style={{width: "170px", height: "200px", marginTop: "10px"}} alt="MISSING JPG"/>
            </Grid>
        )
    }

    handleCard = (title, brand, item) => {
        console.log("adsData: ", this.state.adsData);
        return (
            <Grid item xs={12} md={6} lg={4}>
                <Modal
                    open={this.state.visible && item[0].id === this.state.actualId}
                    onClose={() => this.handleModal(0)}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        {
                            this.state.fonction === "subscribe" ?
                                <div style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <h3 style={{color: "black"}}>Subscribe to this annonce ?</h3>
                                    <h4 style={{marginBottom: "30px", color: "black"}}>{brand}</h4>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleModal(0)}>Cancel</Button>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceSubsribe(item)}>Subscribe</Button>
                                </div>
                                :
                                <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <Grid item xs={12}>
                                        <h3 style={{color: "black"}}>Rate this ads !</h3>
                                    </Grid>
                                    <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                        <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceNotation(item)}>Rate</Button>
                                    </Grid>
                                </Grid>
                        }
                    </Slide>
                </Modal>
                <Card style={{height: "355px", boxShadow: "#807e7e 1px 2px 7px 0px", margin: "50px", borderRadius: "6px", backgroundColor: "#ebebeb"}}>
                    <CardContent style={{width: "100%", height: "280px", padding: "0"}}>
                        <Carousel style={{height: "280px"}} showThumbs={false} infiniteLoop={true} centerSlidePercentage={80}>
                                {
                                    item[0].images.map(x => this.displayImage(x))
                                }
                        </Carousel>
                        <div style={{padding: "20px", textAlign: "center"}}>
                            <h4>{brand}</h4>
                            <Button onClick={() => this.handleModal(item[0].id, "subscribe")} style={{height: "30px", marginTop: "5px", transform: "translateX(14px)", backgroundColor: "black", fontSize: "10px"}}>Subscribe</Button>
                            <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "gold"}}/>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    render() {
        var item1 = [{id: 1, images: [{image: gucci1}, {image: gucci2}, {image: gucci3}]}];
        var item2 = [{id: 2, images: [{image: champion1}, {image: champion2}, {image: champion3}]}];
        var item3 = [{id: 3, images: [{image: amiri1}, {image: amiri2}, {image: amiri3}]}];
        var item4 = [{id: 4, images: [{image: champion1}, {image: champion2}, {image: champion3}]}];

        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Liste des annonce</h1>
                </Grid>
                <Grid container className="advertisements-list" style={{marginTop: "120px"}}>
                    { this.handleCard("Card number 1", "Gucci", item1) }
                    { this.handleCard("Card number 2", "Champion", item2) }
                    { this.handleCard("Card number 3", "Amiri", item3) }
                    { this.handleCard("Card number 1", "Gucci", item1) }
                    { this.handleCard("Card number 2", "Champion", item2) }
                    { this.handleCard("Card number 4", "Champion", item4) }
                    { this.handleCard("Card number 3", "Amiri", item3) }
                    { this.handleCard("Card number 4", "Champion", item4) }
                    { this.handleCard("Card number 3", "Amiri", item3) }
                    { this.handleCard("Card number 4", "Champion", item4) }
                    { this.handleCard("Card number 2", "Champion", item2) }
                    { this.handleCard("Card number 4", "Champion", item4) }
                    { this.handleCard("Card number 4", "Champion", item4) }
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Advertisements)
