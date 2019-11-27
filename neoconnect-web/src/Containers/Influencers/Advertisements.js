import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, Button, Grid, Modal}from '@material-ui/core';
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
            <div style={{height: "240px", marginTop: "2px", alignContent: "center"}}>
                <img src={x.image} style={{width: "170px", height: "200px", marginTop: "10px"}} alt="MISSING JPG"/>
            </div>
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
                    {
                        this.state.fonction === "subscribe" ?
                            <div style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", backgroundImage: "linear-gradient(0deg, #ff4343, #982d2d, #712121)"}}>
                                <h3 style={{color: "white"}}>Subscribe to this annonce ?</h3>
                                <h4 style={{marginBottom: "30px", color: "white"}}>{brand}</h4>
                                <Button style={{backgroundImage: "linear-gradient(180deg, #ff4343, #982d2d, #712121)", margin: "10px", boxShadow: "4px 3px 6px"}} onClick={() => this.handleModal(0)}>Cancel</Button>
                                <Button style={{backgroundImage: "linear-gradient(180deg, #ff4343, #982d2d, #712121)", margin: "10px", boxShadow: "4px 3px 6px"}} onClick={() => this.handleAnnonceSubsribe(item)}>Subscribe</Button>
                            </div>
                            :
                            <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", backgroundImage: "linear-gradient(0deg, #ff4343, #982d2d, #712121)"}}>
                                <Grid item xs={12}>
                                    <h3 style={{color: "white"}}>Rate this ads !</h3>
                                </Grid>
                                <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                    <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                    <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                    <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                    <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                    <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button style={{backgroundImage: "linear-gradient(180deg, #ff4343, #982d2d, #712121)", margin: "10px", boxShadow: "4px 3px 6px"}} onClick={() => this.handleAnnonceNotation(item)}>Rate</Button>
                                </Grid>
                            </Grid>
                    }
                </Modal>
                <Card style={{height: "355px", boxShadow: "#807e7e 1px 2px 7px 0px", margin: "50px", backgroundImage: "linear-gradient(65deg, #ff4343, #982d2d, #712121)"}}>
                    <CardHeader className="col" title={`Annonced by ${brand}`} style={{width: "100%", height: "50px", overflowY: "hide", color: "white"}}/>
                    <CardContent style={{width: "100%", height: "280px"}}>
                        <Carousel style={{height: "280px"}} showThumbs={false} infiniteLoop={true} centerSlidePercentage={80}>
                                {
                                    item[0].images.map(x => this.displayImage(x))
                                }
                        </Carousel>
                        <Button onClick={() => this.handleModal(item[0].id, "subscribe")} style={{height: "30px",marginTop: "5px", backgroundColor: "black", fontSize: "10px"}}>Subscribe</Button>
                        <StarIcon  onClick={() => this.handleModal(item[0].id, "notation")} style={{float: "right", marginTop: "8px", color: "gold"}}/>
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
            <div style={{position: "relative", marginLeft: "-30px", textAlign: "center"}}>
                <h1 style={{marginTop: "30px", marginBottom: "30px"}}>List of Advertisements</h1>
                <Grid container className="advertisements-list">
                    { this.handleCard("Card number 1", "Guccy", item1) }
                    { this.handleCard("Card number 2", "Champion", item2) }
                    { this.handleCard("Card number 3", "Amiri", item3) }
                    { this.handleCard("Card number 4", "Champion", item4) }
                </Grid>
            </div>
        );
    }
}

export default withRouter(Advertisements)
