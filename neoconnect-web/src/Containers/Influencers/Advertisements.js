import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, Button, Grid, Modal}from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
        };
    }

    componentDidMount = () => {
        fetch("http://168.63.65.106/offer/list", { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
    }

    handleModal = (id) => {
        this.setState({visible: !this.state.visible, actualId: id})
    }

    handleAnnonceSubsribe = (item) => {
        console.log("id: ", item);
        fetch(`http://168.63.65.106/offer/apply/${item[0].id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
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
        console.log("actualId: ", this.state.actualId);
        return (
            <Grid item xs={12} md={6} lg={4}>
                <Modal
                    open={this.state.visible && item[0].id === this.state.actualId}
                    onClose={() => this.handleModal(0)}
                >
                    <div style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center"}}>
                        <h3>Subscribe to this annonce ?</h3>
                        <h4 style={{marginBottom: "30px"}}>{brand}</h4>
                        <Button style={{backgroundColor: "#d23e3e", margin: "10px", color: "white"}} onClick={() => this.handleModal(0)}>Cancel</Button>
                        <Button style={{backgroundColor: "#d23e3e", margin: "10px", color: "white"}} onClick={() => this.handleAnnonceSubsribe(item)}>Subscribe</Button>
                    </div>
                </Modal>
                <Card style={{height: "355px", border: " solid #d23e3e", margin: "50px"}}>
                    <CardHeader className="col" title={title} subheader={brand} style={{width: "100%", height: "50px", overflowY: "hide"}}/>
                    <CardContent style={{width: "100%", height: "280px"}}>
                        <Carousel style={{height: "280px"}} showThumbs={false} infiniteLoop={true} centerSlidePercentage={80}>
                                {
                                    item[0].images.map(x => this.displayImage(x))
                                }
                        </Carousel>
                        <Button onClick={() => this.handleModal(item[0].id)} style={{height: "30px",marginTop: "5px", backgroundColor: "#d23e3e", color: "white", fontSize: "10px"}}>Subscribe</Button>
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

        console.log("item1: ", item1[0].id);
        return (
            <div style={{position: "relative", marginLeft: "-30px", textAlign: "center"}}>
                <h1 style={{marginTop: "30px", marginBottom: "30px"}}>List of Advertisements</h1>
                <Grid container className="advertisements-list">
                    { this.handleCard("Card number 1", "Annonced by Guccy", item1) }
                    { this.handleCard("Card number 2", "Annonced by Champion", item2) }
                    { this.handleCard("Card number 3", "Annonced by Amiri", item3) }
                    { this.handleCard("Card number 4", "Annonced by Champion", item4) }
                </Grid>
            </div>
        );
    }
}

export default withRouter(Advertisements)
