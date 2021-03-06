import React from 'react';
import { withRouter } from "react-router-dom"
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import "../../index.css"
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import noAvatar from "../../assets/noImageFindInf.jpg";
import StarRatings from 'react-star-ratings';
import snapchat from "../../assets/snapchat.svg";
import tiktok from "../../assets/tiktok.svg";
import twitch from "../../assets/twitch.svg";
import pinterest from "../../assets/pinterest.svg";
import instagram from "../../assets/instagram.svg";
import youtube from "../../assets/youtube.svg";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import { showNotif } from '../Utils.js';
import { displaySocialMed, displayLoad } from '../../Components/Utils.js';

class Ads extends React.Component {
  constructor(props) {
    super(props);

    localStorage.setItem('menuId', 9);
    if (!localStorage.getItem("Jwt"))
      this.props.history.push('/landing-page/login');
    if (localStorage.getItem("userType") !== "shop")
      this.props.history.push('/page-not-found');
    this.state = {
      adsData: null,
      visible: false,
      actualAd: null,
      message: "",
      modalMode: "",
      productImg: [],
      productName: "",
      productSex: "",
      productDesc: "",
      productSubject: "",
      createdAt: "",
      updatedAt: "",
      type:['', 'Mode', 'Cosmetique', 'Technologie', 'Nourriture', 'Jeux video', 'Sport/Fitness'],
      errMsg: {
        "Bad Request, please Put idUser, idOffer and status in body": "Veuillez fournir l'idUser, l'idOffer et le status",
        "Bad Request, Only for Shop": "Vous devrez être une marque pour effectuer cette action",
        "Bad Request, Bad field status": "mauvais type de status",
        "Bad Request, No apply": "L'offre a déjà étais accepté ou refusé ou supprimé.",
        "Bad Request, No authorized": "non authorisé",
      },
    };
  };

  getOffers = () => {
    fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/shop/${localStorage.getItem("userId")}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
    })
    .then(res => {
      if (res.status === 200) {
        return (res.json());
      }
      else {
        throw res;
      }
    })
    .then(res => this.setState({adsData: res}))
    .catch(error => {
      showNotif(true, "Erreur",null)
      this.setState({adsData: []});
    });
  }

  componentDidMount = () => {
    this.getOffers();
  };

  handleVisibleModal = (ad) => {
    this.setState({visible: !this.state.visible, actualAd: ad});
    this.getOffers();
  };

  handleEdit = (id) => {
    this.props.history.push(`/shop-dashboard/edit-ad?id=${id}`)
  }

  handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
    })
    .then(res => {res.json(); this.handleVisibleModal(null, "")})
    .catch(error => showNotif(true, "Erreur",null));
  };

  handleMessageChange = (e) => {
    this.setState({message: e.target.value})
  };

  handleClose = () => {
    this.setState({visible: false})
  }

  handleResponse = async (res, choice, inf) => {
    var msg = await res.json();

    if (res.status === 200) {
      showNotif(false, "Envoyé", "Nous avons bien pris en compte votre " + (choice ? "acceptation" :  "refus") + " . Une notification sera envoyé à " + inf.pseudo);
      this.getOffers();
    }
    else {
      showNotif(true, "Erreur", "Une erreur s'est produite, veuillez essayer ultérieurement: " + this.state.errMsg[msg]);
    }

  }

  acceptDeclineInf = (choice, inf) => {

    var body = {
      'idUser': inf.idUser,
      'idOffer':  inf.idOffer,
      'status': choice
    };

    body = JSON.stringify(body);
    fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/choiceApply`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => this.handleResponse(res, choice, inf))
      .catch(error => showNotif(true, "Erreur",null));

    }

    listInf = (ad) => {
        return (
          ad.apply.map((inf, id) => (
            <Col className="mb-2" key={id}>
              <Card className="cardlist">
                <Card.Img style={{height: '190px', objectFit: 'cover'}} onClick={() => {this.props.history.push(`/shop-dashboard/influencer?id=${inf.idUser}`)}}
                  variant="top" className="pointerClick" src={!inf.userPicture || inf.userPicture.length === 0 ? noAvatar : inf.userPicture[0].imageData} />
                <Card.Body>
                  <Row>
                    <h5 className="ml-2">{inf.pseudo}</h5>
                    <p className="ml-auto" style={{fontWeight: '300', fontSize: 12}}>{new Date(inf.createdAt).toLocaleDateString()}</p>
                  </Row>
                  <StarRatings
                    rating={inf.average ? inf.average : 0}
                    starRatedColor="#FFC106"
                    numberOfStars={5}
                    name='rating'
                    starDimension="20px"
                    />
                  <Row className="ml-0 mt-2">
                    {displaySocialMed(inf.facebook, facebook)}
                    {displaySocialMed(inf.instagram, instagram)}
                    {displaySocialMed(inf.twitter, twitter)}
                    {displaySocialMed(inf.youtube, youtube)}
                    {displaySocialMed(inf.snapchat, snapchat)}
                    {displaySocialMed(inf.tiktok, tiktok)}
                    {displaySocialMed(inf.pinterest, pinterest)}
                    {displaySocialMed(inf.twitch, twitch)}
                  </Row>
                  <Row className="mt-4">
                    {
                      inf.status === 'accepted' ?
                      <p className="ml-2" style={{fontWeight: '300', minWidth: '300px'}}>Demande acceptée</p> :
                        (inf.status === 'pending' ?
                        <div>
                          <Button className="btnInf" onClick={() => {this.acceptDeclineInf(true, inf)}}>Accepter</Button>
                          <Button className="btnDelete ml-4" onClick={() => {this.acceptDeclineInf(false, inf)}}>Refuser</Button>
                        </div> :
                        <p className="ml-2" style={{fontWeight: '300'}}>Demande refusée</p>
                      )
                    }
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        )
    }

    listOffer = () => {
      if (this.state.adsData &&  this.state.adsData.length > 0) {
        return (
          this.state.adsData.map((ad, id) => (
            <div key={id}>
              <Row className="ml-4 mt-4 offerBg mr-4">
                <p className="offerTitle mx-auto my-auto p-2">{ad.productName}</p>
                <p className="offerTitle mx-auto my-auto p-2">{this.state.type[ad.productSubject]}</p>
                <p className="offerTitle mx-auto my-auto p-2">{"Créée le " + new Date(ad.createdAt).toLocaleDateString()}</p>
                <p className="offerTitle mx-auto my-auto p-2">{"Modifiée le " + new Date(ad.updatedAt).toLocaleDateString()}</p>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip>
                      Modifier
                    </Tooltip>
                  }
                  >
                  <EditTwoToneIcon style={{fill: "white"}} className="pointerClick my-auto mr-2" onClick={() => this.handleEdit(ad.id)}/>
                </OverlayTrigger>{' '}
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip>
                      Supprimer
                    </Tooltip>
                  }
                  >
                  <DeleteTwoToneIcon style={{fill: "white"}} className="pointerClick my-auto mr-3" onClick={() => this.handleVisibleModal(ad)}/>
                </OverlayTrigger>{' '}
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip>
                      Voir les détails
                    </Tooltip>
                  }
                  >
                  <MoreHorizTwoToneIcon style={{fill: "white"}} className="pointerClick my-auto mr-3" onClick={() => {this.props.history.push({pathname: `/shop-dashboard/item/${ad.id}`})}}/>
                </OverlayTrigger>{' '}
              </Row>
              {
                (ad.apply && ad.apply.length > 0) ?
                 <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                   {this.listInf(ad)}
                 </Row> :
                <p className="text-light mb-0 ml-4 mt-2 pl-2">Aucune candidature pour le moment.</p>
              }
            </div>
          ))
        )
      }
      else {
        return (
          <p className="ml-2 mt-2 text-light">Aucune offre publié pour le moment</p>
        );
      }
    }



    render() {
      return (
        <div justify="center" className="shopBgDark">
          <Modal centered show={this.state.visible} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>Êtes-vous sur de vouloir supprimer cette offre ?</Modal.Body>
            <Modal.Footer>
              <Button className="btnCancel" onClick={this.handleClose}>
                Non
              </Button>
              <Button className="btnDelete" onClick={() => this.handleDelete(this.state.actualAd.id)}>
                Oui
              </Button>
            </Modal.Footer>
          </Modal>
          <Navbar style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
            <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Liste de vos offres</Navbar.Brand>
          </Navbar>
          {
            this.state.adsData ? this.listOffer() :
            displayLoad()
          }
        </div>
      );
    }
  }

  export default withRouter(Ads)
