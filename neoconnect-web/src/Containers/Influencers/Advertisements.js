import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Card, CardActionArea, CardContent, CardActions, CardMedia, Button, Grid, Modal, Slide}from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarIcon from '@material-ui/icons/Star';
import noImages from "../../assets/noImages.jpg"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Advertisements extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            actualId: null,
            adsData: null,
        };
    }

    componentDidMount = () => {
        fetch("http://168.63.65.106/offer/list", { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({adsData: res}))
            .catch(error => console.error('Error:', error));
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push(`/dashboard/item?id=${id}`)
    }

    handleModal = (id) => {
        this.setState({visible: !this.state.visible, actualId: id})
    }

    handleAnnonceSubsribe = (item) => {
        fetch(`http://168.63.65.106/offer/apply/${item.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal(item.id)
    }

    handleCard = (item) => {
        return (
            <Grid item xs={12} md={6} lg={4}>
                <Modal
                    open={this.state.visible && item.id === this.state.actualId}
                    onClose={() => this.handleModal(0)}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        <div style={{width: "400px", height: "auto", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                            <div style={{marginRight: "1.5rem", marginLeft: "1.5rem", backgroundColor: "#292929", borderRadius: "10px"}}>
                                <h3 style={{color: "white"}}>Subscribe to this annonce ?</h3>
                            </div>
                            <h4 style={{marginBottom: "30px", color: "black"}}>{item.productBrand ? item.productBrand : "Sans marque"}</h4>
                            <Button style={{backgroundColor: "#292929", fontSize: "1.3rem", borderRadius: "10px", boxShadow: "0 0 10px", marginBottom: "1rem", marginLeft: "1.5rem"}} onClick={() => this.handleModal(0)}>CANCEL</Button>
                            <Button style={{backgroundColor: "#292929", fontSize: "1.3rem", borderRadius: "10px", boxShadow: "0 0 10px", marginBottom: "1rem", marginLeft: "1.5rem"}} onClick={() => this.handleAnnonceSubsribe(item)}>SUBSCRIBE</Button>
                        </div>
                    </Slide>
                </Modal>
                <Card style={{height: "auto", boxShadow: "#807e7e 8px 8px 20px -4px", margin: "50px", borderRadius: "6px", backgroundColor: "#292929"}}>
                    <CardActionArea onClick={() => this.handleGlobalAnnonce(item.id)}>
                        <CardMedia>
                            <img src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData} style={{width: "100%", height: "500px"}} alt="MISSING JPG"/>
                        </CardMedia>
                    </CardActionArea>
                    <CardContent style={{width: "100%", height: "100px"}}>
                        <h6 style={{color: "#fff"}}>{`${item.productType ? item.productType : ""} ${item.productBrand ? item.productBrand : "Sans marque"}`}</h6>
                        <h6 style={{color: "#fff", marginTop: "2rem"}}>{`${item.productColor ? item.productColor : ""}`}</h6>
                    </CardContent>
                    <CardActions style={{justifyContent: "center"}}>
                        <Button onClick={() => this.handleModal(item.id)} style={{width: "9.375rem", height: "2.6rem", fontSize: "1.2rem", marginBottom: "0.5rem", marginLeft: "5rem", borderRadius: "10px", backgroundColor: "transparent", border: "1px solid white"}}>SUBSCRIBE</Button>
                        <h6 style={{marginLeft: "3rem", marginBottom: "10px", color: "#fff"}}>{item.average ? item.average.toFixed(1) : "0"}/5</h6>
                        <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    render() {
        console.log("adsData: ", this.state.adsData);
        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 -3px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Liste des annonces</h1>
                </Grid>
                {
                    this.state.adsData ?
                        <Grid container className="advertisements-list" style={{marginTop: "120px"}}>
                            {
                                this.state.adsData.map(item => this.handleCard(item))
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

export default withRouter(Advertisements)
