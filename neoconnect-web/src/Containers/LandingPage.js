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
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
                                <Row className="pt-4 pb-4 mt-4 mb-4">
                                  <Col md={4}>
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                      <Card.Img variant="top" src={chatShop} />
                                      <Card.Body>
                                        <Card.Title className="text-center">Mise en relation avec des influenceurs</Card.Title>
                                        <Card.Text className="text-center">
                                          Choisissez quel influenceurs arborera vos produit pour les mettre en valeur
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4}>
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                      <Card.Img variant="top" src={queuShop} />
                                      <Card.Body>
                                        <Card.Title className="text-center">Gagnez en visibilité</Card.Title>
                                        <Card.Text className="text-center">
                                          Bénéficier de notre reseau pour faire votre publicité et gagné de la clientel rapidement
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4}>
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                      <Card.Img variant="top" src={deliveryShop} />
                                      <Card.Body>
                                        <Card.Title className="text-center">Agrandisser votre commerces</Card.Title>
                                        <Card.Text className="text-center">
                                          Optez pour une de nos solutions qui permettra à votre entreprise de s'agrandir plus vite
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
                                <Row>
                                  <Col md={4} className="pt-4 pb-4">
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", padding: "10px" }}>
                                      <Card.Img variant="top" src={chatInf} />
                                      <Card.Body>
                                        <Card.Title className="text-center">Mise en relation avec des marques</Card.Title>
                                        <Card.Text className="text-center">
                                          Crééz des relation avec differentes marque pour de futur partenariats
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4} className="pt-4 pb-4">
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", padding: "10px" }}>
                                      <Card.Img variant="top" src={socialSaheInf} />
                                      <Card.Body>
                                        <Card.Title className="text-center">Publication du produit</Card.Title>
                                        <Card.Text className="text-center">
                                          Recevez le produit d'une marque et partagez le sur vos reseaux sociaux
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col md={4} className="pt-4 pb-4">
                                    <Card className="mx-auto mb-4" style={{ width: '100%', minHeight: '26rem', maxWidth: '24rem', borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", padding: "10px" }}>
                                      <Card.Img variant="top" src={followerInf} />
                                      <Card.Body>
                                        <Card.Title className="text-center">Faite de votre passion un métier</Card.Title>
                                        <Card.Text className="text-center">
                                          Gagnez des followers, des produits de marque et de la notoriété grace à notre reseaux
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
