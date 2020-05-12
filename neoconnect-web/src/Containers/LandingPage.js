import React from 'react';
import {Switch, Route } from "react-router-dom"
import {Grid, Card, CardContent, CardMedia, CardActionArea} from "@material-ui/core";
import backgroundImage from "../assets/Equinox-Shop.jpg";
import "./index.css"
import Header from "../Components/Header";
import InfluencerSignUp from "./Register/InscriptionInfluenceurs";
import ShopSignUp from "./Register/InscriptionCommercants";
import Login from "./Login/Login";
import About from "./About";
import Contributors from "./Contributor";
import Contact from "./Contact";
import chatShop from "../assets/chat_red.png";
import queuShop from "../assets/queue.png";
import deliveryShop from "../assets/delivery.png";
import chatInf from "../assets/chat.png";
import socialSaheInf from "../assets/social_share_red.png";
import followerInf from "../assets/followers_red.png";
import storeLogo from "../assets/storeLogo.png"
import Footer from "../Components/Footer";
import ResetPassword from "./Register/ResetPassword";
import ForgotPassword from "./Register/ForgotPassword";

export default class LandingPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header />
                {
                    this.props.location["pathname"] === "/landing-page" ?
                        <div style={{display: "block", marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: "2", height: "auto", width: "100%"}}>
                            <Grid container>
                                <Grid className="landing-div first-div" item xs={12} style={{marginTop: "4rem"}}>
                                    <h1 style={{textAlign: "center", background: "-webkit-linear-gradient(65deg, #E5DF24, #1C8FDC)", paddingTop: "100px", webkitBackgroundClip: "text", webkitTextFillColor: "transparent", fontSize: "90px"}}>
                                        Boutique
                                    </h1>
                                    <h1 style={{textAlign: "center", color: "white", marginTop: "80px", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Soyez au premier plan</h1>
                                    <h4 style={{textAlign: "center", color: "white", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Neoconnect est la plateforme idéale pour les marques qui souhaitent entrer en<br/>
                                        contact en quelques clics avec une communauté de jeunes influenceurs</h4>
                                </Grid>
                                <Grid container style={{backgroundColor: "white", paddingLeft: "100px", paddingRight: "100px", height: "700px"}}>
                                    <Grid item xs={4} style={{padding: "30px", position: "relative", marginTop: "auto", marginBottom: "auto"}}>
                                        <Card style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                            <CardMedia
                                                image={chatShop}
                                                style={{width: "auto", height: "300px", margin: "10px"}}
                                            />
                                            <CardContent>
                                                <h5 style={{textAlign: "center", padding: "10px"}}>Mise en relation avec des influenceurs</h5>
                                                <p style={{textAlign: "center", padding: "15px", paddingLeft: "15px", paddingRight: "15px", fontSize: "15px"}}>Choisissez quel influenceurs arborera vos produit pour les mettre en valeur</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4} style={{padding: "30px", position: "relative", marginTop: "auto", marginBottom: "auto"}}>
                                        <Card style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                            <CardMedia
                                                image={queuShop}
                                                style={{width: "auto", height: "300px", margin: "10px"}}
                                            />
                                            <CardContent>
                                                <h5 style={{textAlign: "center", padding: "10px"}}>Gagnez en visibilité</h5>
                                                <p style={{textAlign: "center", padding: "15px", paddingLeft: "15px", paddingRight: "15px", fontSize: "15px"}}>Bénéficier de notre reseau pour faire votre publicité et gagné de la clientel rapidement</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4} style={{padding: "30px", position: "relative", marginTop: "auto", marginBottom: "auto"}}>
                                        <Card style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                            <CardMedia
                                                image={deliveryShop}
                                                style={{width: "auto", height: "300px", margin: "10px"}}
                                            />
                                            <CardContent>
                                                <h5 style={{textAlign: "center", padding: "10px"}}>Agrandisser votre commerces</h5>
                                                <p style={{textAlign: "center", padding: "15px", paddingLeft: "15px", paddingRight: "15px", fontSize: "15px"}}>Optez pour une de nos solutions qui permettra à votre entreprise de s'agrandir plus vite</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid className="landing-div second-div" item xs={12}>
                                    <h1 style={{textAlign: "center", background: "-webkit-linear-gradient(65deg, #E5DF24, #1C8FDC)", paddingTop: "80px", webkitBackgroundClip: "text", webkitTextFillColor: "transparent", fontSize: "90px"}}>
                                        Influenceur
                                    </h1>
                                    <h1 style={{textAlign: "center", color: "white", marginTop: "60px", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Soyez au premier plan</h1>
                                    <h4 style={{textAlign: "center", color: "white", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Devenez un influenceur incontournable</h4>
                                </Grid>
                                <Grid container style={{backgroundColor: "white", paddingLeft: "100px", paddingRight: "100px", height: "700px"}}>
                                    <Grid item xs={4} style={{padding: "30px", position: "relative", marginTop: "auto", marginBottom: "auto"}}>
                                        <Card style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                            <CardMedia
                                                image={chatInf}
                                                style={{width: "auto", height: "300px", margin: "10px"}}
                                            />
                                            <CardContent>
                                                <h5 style={{textAlign: "center", padding: "10px"}}>Mise en relation avec des marques</h5>
                                                <p style={{textAlign: "center", padding: "15px", paddingLeft: "15px", paddingRight: "15px", fontSize: "15px"}}>Crééz des relation avec differentes marque pour de futur partenariats</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4} style={{padding: "30px", position: "relative", marginTop: "auto", marginBottom: "auto"}}>
                                        <Card style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                            <CardMedia
                                                image={socialSaheInf}
                                                style={{width: "auto", height: "300px", margin: "10px"}}
                                            />
                                            <CardContent>
                                                <h5 style={{textAlign: "center", padding: "10px"}}>Publication du produit</h5>
                                                <p style={{textAlign: "center", padding: "15px", paddingLeft: "15px", paddingRight: "15px", fontSize: "15px"}}>Recevez le produit d'une marque et partagez le sur vos reseaux sociaux</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4} style={{padding: "30px", position: "relative", marginTop: "auto", marginBottom: "auto"}}>
                                        <Card style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                            <CardMedia
                                                image={followerInf}
                                                style={{width: "auto", height: "300px", margin: "10px"}}
                                            />
                                            <CardContent>
                                                <h5 style={{textAlign: "center", padding: "10px"}}>Faite de votre passion un métier</h5>
                                                <p style={{textAlign: "center", padding: "15px", paddingLeft: "15px", paddingRight: "15px", fontSize: "15px"}}>Gagnez des followers, des produits de marque et de la notoriété grace à notre reseaux</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid className="landing-div third-div" item xs={12}>
                                    <h1 style={{textAlign: "center", color: "white", lineHeight: "normal", paddingTop: "145px", fontSize: "92px"}}>
                                        Téléchargez notre application
                                    </h1>
                                    <h2 style={{textAlign: "center", color: "white", marginTop: "60px"}}>Disponible sur android et ios !</h2>
                                    <img src={storeLogo} alt={"Error: no Logo"} style={{width: "37.5rem"}}/>
                                </Grid>
                            </Grid>
                            <Footer/>
                        </div>
                        :
                        <div style={{backgroundImage: "url(" + "https://media.cdn-equinox.com/website/Images/Club-Assets/Clubs/Dallas/RiverOaks/April1/RiverOaks_Shop_2048x900.jpg" + ")", backgroundSize: "cover", backgroundPosition: "center center", width: "100%", height: "100%", position: "fixed"}}>
                                <Switch>
                                    <Route path="/landing-page/login" exact component={Login}/>
                                    <Route path="/landing-page/about" component={About}/>
                                    <Route path="/landing-page/contributors" component={Contributors}/>
                                    <Route path="/landing-page/influencer-sign-up" component={InfluencerSignUp}/>
                                    <Route path="/landing-page/shop-sign-up" component={ShopSignUp}/>
                                    <Route path="/landing-page/forgot-password" component={ForgotPassword}/>
                                    <Route path="/landing-page/reset-password" component={ResetPassword}/>
                                    <Route path="/landing-page/contact" component={Contact}/>
                                </Switch>
                        </div>
                }
            </div>
        );
    }
}

