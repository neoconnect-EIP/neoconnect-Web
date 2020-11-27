import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css";
import StarIcon from '@material-ui/icons/Star';
import noShop from "../../assets/noImageFindInf.jpg"
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
import { showNotif } from '../Utils.js';
import { displayLoad } from '../../Components/Utils.js';

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
      popular: [],
      bestMark: [],
      tendance: [],
      popularOffer: [],
      bestMarkOffer: [],
      tendanceOffer: [],
      applied: [],
      loading: true,
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
        if  (res.status === 200)
        return (res.json());
        this.setState({loading: false});
      })
      .then(res => {
        this.setState({popular: res.listShopPopulaire, bestMark: res.listShopTendance, tendance: res.listShopTendance,
          popularOffer: res.listOfferPopulaire, bestMarkOffer: res.listOfferTendance, tendanceOffer: res.listOfferTendance, loading: false});
        })
        .catch(err => {
          showNotif(true, "Erreur", null);
          this.setState({loading: false});
        });
      }

      componentDidMount() {
        if (localStorage.getItem("Jwt")) {
          this.getAllShop();
        }
      }

      handleGlobalShop = (item) => {
        this.props.history.push({pathname: `/dashboard/shop/${item.id}`});

      }

      handleGlobalAnnonce = (id) => {
        this.props.history.push({pathname: `/dashboard/item/${id}`});
      }

      handleCard = (item) => {
        return (
          <Col key={item.id} className="mb-3">
            <Card className="mt-4 ml-2 cardlist" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
              <Card.Img className="card" style={{height: '190px', objectFit: 'cover'}} onClick={() => this.handleGlobalShop(item)} variant="top" src={item.userPicture === null || item.userPicture.length === 0 ? noShop : item.userPicture[0].imageData} alt="MISSING JPG"/>
              <Card.Body>
                <Card.Title>{item.pseudo ? item.pseudo : "Sans nom"}</Card.Title>
                <Row className="ml-1">
                  {
                    item.follow === true ?
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
              this.getAllShop();
              this.setState({visible: false});
              showNotif(false, "Abonné", "Vous êtes bien abonné");
            }
            else {
              showNotif(true, "Erreur", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
            }
          })
          .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", null));
        }

        handleUnfollow = (id) => {
          fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/unfollow/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status === 200) {
              this.getAllShop();
              showNotif(false, "Désabonné", "Vous êtes bien désabonné");
            }
            else {
              showNotif(true, "Erreur", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
            }
          })
          .catch(error => showNotif(true,  "Erreur",null));
        }

        handleAnnonceSubscribe = (item) => {

          fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${item.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status === 200) {
              this.getAllShop();
              showNotif(false, "Postulé", "Nous avons bien pris en compte votre demande");
            }
            else {
              showNotif(true, "Erreur", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
            }
          })
          .catch(error => showNotif(true, "Erreur",null));
        }

        handleDelete = (id) => {
          fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => {
            if (res.status === 200)
            return (res.json());
          })
          .then(res => {
            this.getAllShop();
            showNotif(false, "Réussi", "l'annulation est bien prise en compte");
          })
          .catch(error => {
            showNotif(true, "Erreur", null);
          });
        };

        handleCardOffer = (item) => {
          return (
            <Col key={item.id} className="mb-3">
              <Card className="mt-4 ml-2 pointerClick" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                <Card.Img className="card"  style={{height: '190px', objectFit: 'cover'}}  onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData}  alt="MISSING JPG"/>
                <Card.Body>
                  <Row className="mx-1">
                    <h5 className="mr-auto">{`${item.productName ? item.productName : "Sans nom"}`}</h5>
                  </Row>
                  <Row className="mx-1">
                    <Col className="mx-0 px-0">
                      <p className="mr-auto">{item.productSubject}</p>
                      <p style={{fontWeight: '300', fontSize: '12px'}}>{new Date(item.updatedAt).toLocaleDateString('fr-FR', {dateStyle: 'short'}) + ' ' + new Date(item.updatedAt).toLocaleTimeString('fr-FR', {timeStyle: 'short'})}</p>
                    </Col>
                  </Row>
                  <Row className="ml-1">
                    {
                      !item.status && <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleAnnonceSubscribe(item)}}>Postuler</Button>
                  }
                  {
                    item.status && item.status === "pending" && <Button variant="outline-secondary" className="mr-auto" onClick={() => {this.handleDelete(item.id)}}>Annuler</Button>

                }
                {
                  item.status && item.status === "refused" &&
                  <p>Demande refusé</p>
                }
                {
                  item.status && item.status === "accepted" &&
                  <p>Demande accepté</p>
                }
              </Row>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    manageOfferCard = (icon, title, offers) => {
      return (
        <>
        <Row className="pl-4 mt-4 mr-0 ml-0">
          <Image src={icon}/>
          <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>{title}</h4>
        </Row>
        <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
          {
            (offers && offers.length > 0) ? offers.map(inf => this.handleCardOffer(inf)) :
            <p className="ml-4 mt-2 text-light">Aucune offre pour le moment</p>
          }
        </Row>
        </>
    )
  }

  manageShopCard = (icon, title, shops) => {
    return (
      <>
      <Row className="pl-4 mt-4 mr-0 ml-0">
        <Image src={icon}/>
        <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>{title}</h4>
      </Row>
      <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={3}>
        {
          (shops && shops.length > 0) ? shops.map(inf => this.handleCard(inf)) :
          <p className="ml-4 mt-2 text-light">Aucune marque pour le moment</p>

        }
      </Row>
      </>
  )
}

render() {
  return (
    <div className="infBg">
      <Navbar expand="lg" className="mb-4" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
        <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Actualité</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Navbar>
      {
        this.state.loading ? displayLoad() :
        <div>
          {this.manageShopCard(heart, "Marques du moment", this.state.tendance)}
          {this.manageShopCard(fire, "Marques populaires", this.state.popular)}
          {this.manageShopCard(star, "Marques les mieux notés", this.state.bestMark)}
          {this.manageOfferCard(heart, "Offres du moment", this.state.tendanceOffer)}
          {this.manageOfferCard(fire, "Offres populaires", this.state.popularOffer)}
        </div>
      }
    </div>
  );
}
}

export default withRouter(Actuality)
