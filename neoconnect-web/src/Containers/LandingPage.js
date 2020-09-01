import React from 'react';
import {Switch, Route } from "react-router-dom"
import "./index.css"
import Header from "../Components/Header";
import InfluencerSignUp from "./Register/InscriptionInfluenceurs";
import ShopSignUp from "./Register/InscriptionCommercants";
import Login from "./Login/Login";
import About from "./About";
import Contributors from "./Contributor";
import Contact from "./Contact";
import chatShop from "../assets/chatShop.svg";
import queueShop from "../assets/queueShop.svg";
import deliveryShop from "../assets/deliveryShop.svg";
import chatInf from "../assets/chatInf.svg";
import socialShare from "../assets/socialShareInf.svg";
import followerInf from "../assets/followersInf.svg";
import storeLogo from "../assets/storeLogo.png"
import Footer from "../Components/Footer";
import ResetPassword from "./Register/ResetPassword";
import ForgotPassword from "./Register/ForgotPassword";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

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
                        // <div style={{display: "block", marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: "2", height: "auto", width: "100%"}}>
                            <div style={{width: '100%', paddingTop: "86px"}} className="mr-0 ml-0">
                                <Col md={12} className="landing-div first-div" style={{height: "40rem"}}>
                                  <div className="my-auto">
                                    <h1 style={{textAlign: "center", background: "-webkit-linear-gradient(65deg, #E5DF24, #1C8FDC)", paddingTop: "100px", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "90px"}}>
                                        Boutique
                                    </h1>
                                    <h1 style={{textAlign: "center", color: "white", marginTop: "80px", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Soyez au premier plan</h1>
                                    <h4 style={{textAlign: "center", color: "white", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Neoconnect est la plateforme idéale pour les marques qui souhaitent entrer en<br/>
                                        contact en quelques clics avec une communauté de jeunes influenceurs</h4>
                                  </div>
                                </Col>
                                <Row className="pt-4 pb-4 shopBgCard">
                                  <Col md={4}>
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', backgroundColor: "transparent"}}>
                                      <Card.Body>
                                        <Image src={chatShop} />
                                        <Card.Title className="text-center" style={{color:"white"}}>Mise en relation avec des influenceurs</Card.Title>
                                        <Card.Text className="text-center" style={{color:"white"}}>
                                          Créez des relations avec des influenceurs pour de futures partenariats
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4}>
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', backgroundColor: "transparent"}}>
                                      <Card.Body>
                                        <Image src={deliveryShop} />
                                        <Card.Title className="text-center" style={{color:"white"}}>Livraison du produit</Card.Title>
                                        <Card.Text className="text-center" style={{color:"white"}}>
                                          Livrez un produit à promouvoir à un influenceur
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4}>
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', backgroundColor: "transparent"}}>
                                      <Card.Body>
                                        <Image src={queueShop} />
                                        <Card.Title className="text-center" style={{color:"white"}}>Devenez une boutique incontournable</Card.Title>
                                        <Card.Text className="text-center" style={{color:"white"}}>
                                          Voyez votre nombre de client augmenter grâce aux influenceurs!
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                </Row>
                                <Col className="landing-div second-div"  style={{height: "40rem"}}>
                                  <h1 style={{textAlign: "center", background: "-webkit-linear-gradient(65deg, #E5DF24, #1C8FDC)", paddingTop: "80px", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "90px"}}>
                                      Influenceur
                                  </h1>
                                  <h1 style={{textAlign: "center", color: "white", marginTop: "60px", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Soyez au premier plan</h1>
                                  <h4 style={{textAlign: "center", color: "white", textShadow: "0px 0px 20px rgba(0, 0, 0)"}}>Devenez un influenceur incontournable</h4>
                                </Col>
                                <Row className="infBgCard">
                                  <Col md={4} className="pt-4 pb-4">
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', padding: "10px", backgroundColor: "transparent" }}>
                                      <Card.Body>
                                        <Image src={chatInf} />
                                        <Card.Title className="text-center" style={{color: "white"}}>Mise en relation avec des boutiques</Card.Title>
                                        <Card.Text className="text-center" style={{color: "white"}}>
                                          Crééz des relation avec differentes boutiques pour de futurs partenariats
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4} className="pt-4 pb-4">
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', padding: "10px", backgroundColor: "transparent" }}>
                                      <Card.Body>
                                        <Image src={socialShare} />
                                        <Card.Title className="text-center" style={{color: "white"}}>Publication du produit</Card.Title>
                                        <Card.Text className="text-center" style={{color: "white"}}>
                                          Recevez le produit d'une marque à partager sur vos réseaux
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4} className="pt-4 pb-4">
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', padding: "10px", backgroundColor: "transparent" }}>
                                      <Card.Body>

                                        <Image src={followerInf} />

                                        <Card.Title className="text-center" style={{color: "white"}}>Faite de votre passion un métier</Card.Title>
                                        <Card.Text className="text-center" style={{color: "white"}}>
                                          Voyez votre nombre de followers augmenter avec un produit gratuit en plus!
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                </Row>
                                <Col className="landing-div third-div" style={{height: "40rem"}}>
                                    <h1 className="text-white mx-auto text-center display-3 pt-4">
                                        <strong>Téléchargez notre application</strong>
                                    </h1>
                                    <h2 className="text-white text-center" >Disponible sur android et ios !</h2>
                                    <img src={storeLogo} alt={"Error: no Logo"} style={{maxWidth: "37.5rem", width: "70%"}}/>
                                </Col>
                              <Footer/>
                            </div>
                        // </div>
                        :
                        <div style={{backgroundImage: "url(https://media.cdn-equinox.com/website/Images/Club-Assets/Clubs/Dallas/RiverOaks/April1/RiverOaks_Shop_2048x900.jpg)", backgroundSize: "cover", backgroundPosition: "center center", width: "100%", marginTop: '86px', position: "fixed", height: 'calc(100% - 86px)'}}>
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
