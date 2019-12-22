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
                <Card style={{height: "650px", boxShadow: "#807e7e 1px 2px 7px 0px", margin: "50px", borderRadius: "6px", backgroundColor: "#ebebeb"}}>
                    <CardActionArea onClick={() => this.handleGlobalAnnonce(item.id)}>
                        <CardMedia>
                            <img src={item.productImg[0]} style={{width: "100%", height: "500px"}} alt="MISSING JPG"/>
                        </CardMedia>
                    </CardActionArea>
                    <CardContent style={{width: "100%", height: "100px"}}>
                        <h6>{`${item.productType} ${item.productBrand ? item.productBrand : "No brand"}`}</h6>
                        <h6>{`${item.productColor ? item.productColor : "no color"}`}</h6>
                    </CardContent>
                    <CardActions style={{justifyContent: "center"}}>
                        <Button onClick={() => this.handleModal(item.id)} style={{height: "28px", bottom: "5px", fontSize: "12px", backgroundColor: "black"}}>Subscribe</Button>
                        <h6 style={{marginLeft: "3rem", marginBottom: "10px"}}>{item.mark ? item.mark : "0"}/5</h6>
                        <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    render() {
        const fakeData = [
            {
                id: 1,
                productImg: [
                    "https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ri1pr5ogghi8fejhfc9q/react-element-55-shoe-DRf8mz.jpg",
                ],
                productBrand : "Nike",
                productName : "Nike react element 55",
                productType : "Sneakers",
                productColor : "black/white",
                productSex : "Femme",
                productDesc : "La chaussure Nike React Element 55 pour Femme s'inspire des chaussures de running Nike classiques, telles que la Internationalist, en y ajoutant des motifs réfléchissants, et est dotée de la technologie Nike React.",
                mark : 3,
            },
            {
                id: 2,
                productImg: [
                    "http://mediaus.topshop.com/wcsstore/TopShopUS/images/catalog/TS12S28KBLK_Zoom_F_1.jpg",
                    ],
                productBrand : "Adidas",
                productName : "Hoodies original 215",
                productType : "Hoodies",
                productColor : "black/white",
                productSex : "Homme",
                productDesc : "",
                mark : 4,
            },
            {
                id: 3,
                productImg: [
                    "https://images.ikrix.com/product_images/original/gucci-belts-gg-supreme-belt-00000093650f00s001.jpg",
                ],
                productBrand : "Gucci",
                productName : "Ceinture cuire basic",
                productType : "Belt",
                productColor : "Argent/marrons",
                productSex : "Homme",
                productDesc : "Cette ceinture de la premiere collection gucci 1990, fait en cuire de veau par les meilleur artisant de la maison Gucci, sera embelire votre tenu préférer",
                mark : 5,
            },
            {
                id: 4,
                productImg: [
                    "https://img0.etsystatic.com/056/0/8945940/il_570xN.707442774_i0aj.jpg",
                ],
                productBrand : "Louis Vuitton",
                productName : "Sac messenger capsule été 2018",
                productType : "Sac messenger",
                productColor : "Marron",
                productSex : "Uni",
                productDesc : "Item de la capsule été 2018, en colaboration avec Virgile Hablot, disponible en édition limité, faite en cuire de buffle, certie d'une boucle en or 18 carat, doublure en soie véritable",
                mark : 2,
            },
        ]
        console.log("fakeData: ", fakeData);
        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Liste des annonces</h1>
                </Grid>
                {
                    fakeData ?
                        <Grid container className="advertisements-list" style={{marginTop: "120px"}}>
                            {
                                fakeData.map(item => this.handleCard(item))
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
