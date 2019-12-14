import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Card, CardContent, CardActions, CardMedia, Button, Grid, Modal, Slide, Avatar, List, ListItemSecondaryAction, ListItemAvatar, ListItem, IconButton, ListItemText}from '@material-ui/core';
import {Spin} from "antd";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import noImages from "../../assets/noImages.jpg"


class adsItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            adData: null,
            actualId: 0,
            fonction: "",
            comment: null,
        };
    }

    componentDidMount = () => {
        let id = this.getUrlParams((window.location.search));

        fetch(`http://168.63.65.106/offer/${id.id}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({adData: res}))
            .catch(error => console.error('Error:', error));
    }

    getUrlParams = (search) => {
        if (search === "")
            return null;
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, {[key]: decodeURIComponent(val)})
        }, {})
    }

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
        if (this.state.fonction) {
            this.setState({fonction: ""})
        } else {
            this.setState({fonction: fonction})
        }
    }

    handleAnnonceSubsribe = (item) => {
        fetch(`http://168.63.65.106/offer/apply/${item.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal(item[0].id)
    }

    handleAnnonceNotation = (item) => {
        fetch(`http://168.63.65.106/user/mark/${item.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
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

    render() {
        if (this.state.adData)
            console.log("adData: ", this.state.adData[0])
        return (
            <Grid container justify="center">
                <Modal
                    open={this.state.visible}
                    onClose={() => this.handleModal(0)}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        {
                            this.state.fonction === "subscribe" ?
                                <div style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <h3 style={{color: "black"}}>Subscribe to this annonce ?</h3>
                                    <h4 style={{marginBottom: "30px", color: "black"}}>{this.state.adData.brand ? this.state.adData.brand : "No brand"}</h4>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleModal("")}>Cancel</Button>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceSubsribe(this.state.adData)}>Subscribe</Button>
                                </div>
                                :
                                <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <Grid item xs={12}>
                                        <h3 style={{color: "black"}}>Rate this annonce !</h3>
                                    </Grid>
                                    <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                        <StarIcon  style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                        <StarIcon  style={{float: "right", marginTop: "8px", color: "grey"}}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceNotation(this.state.adData)}>Rate</Button>
                                    </Grid>
                                </Grid>
                        }
                    </Slide>
                </Modal>
                {
                    this.state.adData ?
                        <Grid container spacing={3} style={{padding: "30px"}}>
                            <Grid item xs={12} md={7} style={{padding: "30px"}}>
                                <Carousel style={{height: "280px"}} showThumbs={false} infiniteLoop={true} centerSlidePercentage={80}>
                                    {
                                        //item.productImg === "Produit sans image" ?
                                        <Grid container style={{height: "240px", backgroundColor: "#ffffff"}} justify="center" alignItems="flex-start">
                                            <img src={noImages} style={{width: "170px", height: "200px", marginTop: "10px"}} alt="MISSING JPG"/>
                                        </Grid>
                                        //  :
                                        //item.productImg.map(x => this.displayImage(x))
                                    }
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} md={3} style={{padding: "50px", boxShadow: "0 0 5px"}}>
                                <h6>{this.state.adData[0].productDesc}</h6>
                                <h3>{this.state.adData[0].productBrand ? this.state.adData[0].productBrand : "No brand"}</h3>
                                <Button onClick={() => this.handleModal( "subscribe")} style={{width: "100%",  backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", marginTop: "40px"}}>Subscribe</Button>
                                <Button onClick={() => this.handleModal( "rate")} style={{width: "100%", backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", marginTop: "10px"}}>Rate</Button>
                                <h6 style={{marginTop: "10px"}}>{`Article: ${this.state.adData[0].productName}`}</h6>
                                <h6 style={{marginTop: "10px"}}>{`Sexe: ${this.state.adData[0].productSex}`}</h6>
                            </Grid>
                            <Grid item xs={12} style={{marginRight: "200px", marginLeft: "200px", marginTop: "50px", boxShadow: "0 0 5px"}}>
                                <h2 style={{textAlign: "center"}}>Avis</h2>
                                <List style={{paddingLeft: "10px", paddingRight: "10px", border: "2px solid black"}}>
                                    <ListItem style={{height: "auto", border: "black 1px"}}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                            <p style={{color: "black", marginTop: "15px"}}>
                                                this is a default com
                                            </p>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" style={{backgroundImage: "linear-gradient(45deg, #e86868, #d64f4f, #d64f4f)"}}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    :
                    <div style={{marginTop: "350px"}}>
                        <Spin size={"large"}/>
                    </div>
                    }
            </Grid>
        );
    }
}

export default withRouter(adsItem)
