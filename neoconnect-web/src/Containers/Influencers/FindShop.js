import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Modal, Slide} from "@material-ui/core";
import noImages from "../../assets/noImages.jpg";
import StarIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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
                            <img src={item.productImg} style={{width: "100%", height: "21.875rem"}} alt="MISSING JPG"/>
                        </CardMedia>
                    </CardActionArea>
                    <CardContent style={{width: "100%", height: "auto"}}>
                        <Grid container>
                            <Grid item xs={10}>
                                <h1>{` ${item.productBrand ? item.productBrand : "No brand"}`}</h1>
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
        const fakeData = [
            {
                id: 1,
                productImg: [
                    "https://www.eestairs.com/html/filesystem/storeFolder/347/1500-1500/force/png/Nike-Store-Utrecht-1-1-.jpg",
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
                    "https://images.taubman.com/www.shopdolphinmall.com/asset_cache/1538584596Adidas-2368x1056.jpg",
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
                    "http://legattolifestyle.com/wp-content/uploads/2013/09/gucci-store-on-google-maps.jpg",
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
                    "http://www.artlistparis.com/uploads/m_artlist-set-design-jmstudio-portfolio-store-louis-vuitton-fw-2016-champs-elysees-5b3a139d4e2c967018090470250afdf7b1b7b0ce68e9937af639aed12f32ec3b.jpg",
                ],
                productBrand : "Louis Vuitton",
                productName : "Sac messenger capsule été 2018",
                productType : "Sac messenger",
                productColor : "Marron",
                productSex : "Uni",
                productDesc : "Item de la capsule été 2018, en colaboration avec Virgile Hablot, disponible en édition limité, faite en cuire de buffle, certie d'une boucle en or 18 carat, doublure en soie véritable",
                mark : 2,
            },
        ];

        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Trouver une boutique</h1>
                </Grid>
                {
                    fakeData ?
                        <Grid container className="advertisements-list" style={{marginTop: "120px"}}>
                            {
                               fakeData.map(item => this.handleCard(item))
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
