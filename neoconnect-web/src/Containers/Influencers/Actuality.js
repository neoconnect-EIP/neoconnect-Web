import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import StarIcon from '@material-ui/icons/Star';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import fire from "../../assets/fire.svg";
import star from "../../assets/star.svg";
import heart from "../../assets/heart.svg";
import noImages from "../../assets/noImages.jpg"
import { store } from 'react-notifications-component';
import { showNotif } from '../Utils.js';

class Actuality extends React.Component{
    constructor(props) {
        super(props);
        localStorage.setItem('menuId', 0);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            show: false,
            back: false,
            popular: null,
            bestMark: null,
            tendance: null,
            popularOffer: null,
            bestMarkOffer: null,
            tendanceOffer: null,
            applied: [],
            followed: [],
            suggestions: [],
        };

    }

    getAllShop = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/actuality`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {
        return (res.json());
      })
      .then(res => {
        this.setState({popular: res.listShopPopulaire, bestMark: res.listShopTendance, tendance: res.listShopTendance,
        popularOffer: res.listOfferPopulaire, bestMarkOffer: res.listOfferTendance, tendanceOffer: res.listOfferTendance})
      })
    }

    getAppliedOffer = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/offer/applied/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          if (res.status >= 400)
            throw res;
          return res.json()
        })
        .then(res => this.setState({applied: res}))
        .catch(error => {
          showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText);
        });
    }

    getFollowedShop = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/follow`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => res.json())
      .then(res => this.setState({followed: res}))
      .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
    }

    getSuggestions() {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/suggestion/`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status >= 400)
              throw res;
            return res.json();
          })
          .then(res => this.setState({suggestions: res}))
          .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getAllShop();
        this.getAppliedOffer();
        this.getFollowedShop();
        this.getSuggestions();
    }

    handleGlobalShop = (id) => {
        // this.props.history.push(`/dashboard/shop?id=${id}`)
        this.props.history.push({pathname: `/dashboard/shop/${id}`, state: this.state.followed});

    }

    handleGlobalAnnonce = (id) => {
      this.props.history.push({pathname: `/dashboard/item/${id}`, state: this.state.applied});
        // this.props.history.push(`/dashboard/item?id=${id}`)
    }

    handleCard = (item) => {
        return (
            <Col key={item.id} className="mb-3">
              <Card className="mt-4 ml-2 cardlist" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                <Card.Img className="card" style={{height: '190px', objectFit: 'cover'}} onClick={() => this.handleGlobalShop(item.id)} variant="top" src={item.userPicture === null || item.userPicture.length === 0 ? noShop : item.userPicture[0].imageData} alt="MISSING JPG"/>
                <Card.Body>
                  <Card.Title>{item.pseudo ? item.pseudo : "Sans nom"}</Card.Title>
                  <Row className="ml-1">
                    {
                      this.state.followed.some(el => el.idFollow === item.id) ?
                      <Button variant="outline-secondary" className="mr-auto" onClick={() => {this.handleUnfollow(item.id)}}>Désabonner</Button> :
                        <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleFollow(item)}}>S'abonner</Button>
                    }
                    <p>{item.average != null ? (item.average.toFixed(1) + '/5') : "Aucune note"}</p>
                    {item.average != null && <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold", marginLeft: '10px'}}/>}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
        );
    }

    handleFollow = (item) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/follow/${item.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              if (res.status === 200) {
                this.getFollowedShop();
                this.setState({visible: false});
                store.addNotification({
                  title: "Abonné",
                  message: "Vous êtes bien abonné",
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  pauseOnHover: true,
                  isMobile: true,
                  animationIn: ["animated", "fadeIn"],
                  animationOut: ["animated", "fadeOut"],
                  dismiss: {
                    duration: 7000,
                    onScreen: true,
                    showIcon: true
                  }
                });
              }
              else {
                store.addNotification({
                  title: "Erreur",
                  message: "Un erreur s'est produit. Veuillez essayer ultérieurement.",
                  type: "danger",
                  insert: "top",
                  container: "top-right",
                  pauseOnHover: true,
                  isMobile: true,
                  animationIn: ["animated", "fadeIn"],
                  animationOut: ["animated", "fadeOut"],
                  dismiss: {
                    duration: 7000,
                    onScreen: true,
                    showIcon: true
                  }
                });
              }
            })
            .catch(error => console.error('Error:', error));
    }

    handleUnfollow = (id) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/unfollow/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              if (res.status === 200) {
                this.getFollowedShop();
                showNotif(false, "Désabonné", "Vous êtes bien désabonné");
              }
              else {
                showNotif(true, "Erreur", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
              }
            })
            .catch(error => showNotif(true,  "Erreur, Veuillez essayer ultérieurement", error.statusText));
    }

    handleAnnonceSubscribe = (item) => {

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${item.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              if (res.status === 200) {
                this.getAppliedOffer();
                store.addNotification({
                  title: "Postulé",
                  message: "Nous avons bien pris en compte votre demande",
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  pauseOnHover: true,
                  isMobile: true,
                  animationIn: ["animated", "fadeIn"],
                  animationOut: ["animated", "fadeOut"],
                  dismiss: {
                    duration: 7000,
                    onScreen: true,
                    showIcon: true
                  }
                });
              }
              else {
                store.addNotification({
                  title: "Erreur",
                  message: "Un erreur s'est produit. Veuillez essayer ultérieurement.",
                  type: "danger",
                  insert: "top",
                  container: "top-right",
                  pauseOnHover: true,
                  isMobile: true,
                  animationIn: ["animated", "fadeIn"],
                  animationOut: ["animated", "fadeOut"],
                  dismiss: {
                    duration: 7000,
                    onScreen: true,
                    showIcon: true
                  }
                });
              }
            })
            .catch(error => console.error('Error:', error));
    }

    handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          if (res.status >= 400)
            throw res;
          return res.json()
        })
        .then(res => {
          this.getAppliedOffer();
          showNotif(false, "Réussi", "l'annulation est bien prise en compte");
        })
        .catch(error => {
          showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText);
        });
    };

    handleCardOffer = (item) => {
        return (
            <Col key={item.id} className="mb-3">
                <Card className="mt-4 ml-2 report" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                  <Card.Img className="card"  style={{height: '190px', objectFit: 'cover'}}  onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData}  alt="MISSING JPG"/>
                  <Card.Body>
                    <Card.Title>{`${item.productType ? item.productType : ""} ${item.productName ? item.productName : "Sans nom"}`}</Card.Title>
                    <Card.Text>
                      {`${item.productColor ? item.productColor : ""}`}
                    </Card.Text>
                    <Row className="ml-1">
                      {
                        this.state.applied.some(el => el.idOffer === item.id) ?
                        <Button variant="outline-secondary" className="mr-auto" onClick={() => {this.handleDelete(item.id)}}>Annuler</Button>:
                        <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleAnnonceSubscribe(item)}}>Postuler</Button>
                      }
                      <p>{item.average ? (item.average.toFixed(1) + '/5') : "Aucune note"}</p>
                      {item.average && <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold", marginLeft: '10px'}}/>}
                    </Row>
                  </Card.Body>
                </Card>
            </Col>
        );
    }

    render() {

        return (
          <div className="infBg"  >
                <Navbar expand="lg" className="mb-4" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand href="#home" style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Actualité</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  </Navbar.Collapse>
                </Navbar>
                <Row className="pl-4 mt-4 mr-0 ml-0">
                  <Image src={star}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Suggestion d'offre</h4>
                </Row>
                <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                  {
                      this.state.suggestions && this.state.suggestions.map(inf => this.handleCardOffer(inf))
                  }
              </Row>
                <Row className="pl-4 mr-0 ml-0">
                  <Image src={heart}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Boutiques du moment</h4>
                </Row>
                <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                  {
                      this.state.tendance && this.state.tendance.map(inf => this.handleCard(inf))
                  }
                </Row>
                <Row className="pl-4 mr-0 ml-0">
                  <Image src={fire}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Boutiques populaires</h4>
                </Row>
                <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                  {
                      this.state.popular && this.state.popular.map(inf => this.handleCard(inf))
                  }
                </Row>
                <Row className="pl-4 mt-4 mr-0 ml-0">
                  <Image src={star}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Boutiques les mieux notés</h4>
                </Row>
                <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                  {
                      this.state.bestMark && this.state.bestMark.map(inf => this.handleCard(inf))
                  }
                </Row>
                <Row className="pl-4 mr-0 ml-0">
                  <Image src={heart}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Offres du moment</h4>
                </Row>
                <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                  {
                      this.state.tendanceOffer && this.state.tendanceOffer.map(inf => this.handleCardOffer(inf))
                  }
                </Row>
                <Row className="pl-4 mr-0 ml-0">
                  <Image src={fire}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Offres populaires</h4>
                </Row>
                <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                  {
                      this.state.popularOffer && this.state.popularOffer.map(inf => this.handleCardOffer(inf))
                  }
                </Row>
                <Row className="pl-4 mt-4 mr-0 ml-0">
                  <Image src={star}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Offres les mieux notés</h4>
                </Row>
                <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                  {
                      this.state.bestMarkOffer && this.state.bestMarkOffer.map(inf => this.handleCardOffer(inf))
                  }
              </Row>
            </div>
        );
    }
}

export default withRouter(Actuality)
