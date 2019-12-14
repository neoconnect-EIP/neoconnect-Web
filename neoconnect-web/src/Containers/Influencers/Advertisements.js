import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Card, CardActionArea, CardContent, CardActions, CardMedia, Button, Grid, Modal, Slide}from '@material-ui/core';
import {Spin} from "antd";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarIcon from '@material-ui/icons/Star';
import noImages from "../../assets/noImages.jpg"

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
        console.log("item: ", item)
        return (
            <Grid item xs={12} md={6} lg={4}>
                <Modal
                    open={this.state.visible && item.id === this.state.actualId}
                    onClose={() => this.handleModal(0)}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        <div style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                            <h3 style={{color: "black"}}>Subscribe to this annonce ?</h3>
                            <h4 style={{marginBottom: "30px", color: "black"}}>{item.brand ? item.brand : "No brand"}</h4>
                            <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleModal(0)}>Cancel</Button>
                            <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceSubsribe(item)}>Subscribe</Button>
                        </div>
                    </Slide>
                </Modal>

                <Card style={{height: "350px", boxShadow: "#807e7e 1px 2px 7px 0px", margin: "50px", borderRadius: "6px", backgroundColor: "#ebebeb"}}>
                    <CardActionArea onClick={() => this.handleGlobalAnnonce(item.id)}>
                        <CardMedia>
                            <img src={noImages} style={{width: "100%", height: "200px"}} alt="MISSING JPG"/>
                        </CardMedia>
                    </CardActionArea>
                    <CardContent style={{width: "100%", height: "100px"}}>
                        <h6>{`${item.productName} ${item.brand ? item.brand : "No brand"}`}</h6>
                        <p>{`${item.productDesc} - ${item.productSex}`}</p>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.handleModal(item.id)} style={{height: "28px", bottom: "5px", fontSize: "12px", backgroundColor: "black"}}>Subscribe</Button>
                        <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                        <h6 style={{marginBottom: "10px"}}>{item.note ? item.note : "0"}/5</h6>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Liste des annonce</h1>
                </Grid>
                {
                    this.state.adsData ?
                        <Grid container className="advertisements-list" style={{marginTop: "120px"}}>
                            {
                                this.state.adsData.map(item => this.handleCard(item))
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

export default withRouter(Advertisements)
