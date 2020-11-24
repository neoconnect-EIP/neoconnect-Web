import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noAvatar from "../../assets/noImageFindInf.jpg";
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import StarRatings from 'react-star-ratings';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";
import snapchat from "../../assets/snapchat.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import place from "../../assets/place.svg";
import edit from "../../assets/edit.svg";
import {Rate} from "antd";
import mail from "../../assets/mail.svg";
import phone from "../../assets/phone.svg";
import globe from "../../assets/globe.svg";
import { showNotif } from '../Utils.js';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import StarIcon from '@material-ui/icons/Star';
import noImages from "../../assets/noImages.jpg";

class shopProfile extends React.Component{
    constructor(props) {
        super(props);

        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            shopData: null,
            shopOffers: null,
            activeIndex: 0,
            visible: false,
            signal: false,
            markData: null,
            commentInput: "",
            mark: null,
            raison: "",
            info: "",
            messageModal: false,
            msg: "",
            clickedSignal: false,
            urlId: localStorage.getItem("Jwt") ? parseInt(this.props.match.params.id) : 0,
        };
    }

    getShopData = () => {
      if (this.state.urlId) {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => {this.setState({shopData: res})})
            .catch(error => showNotif(true, "Erreur",null));
      }
    }

    getShopOffers = () => {
      if (this.state.urlId) {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/shop/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => {console.log(res);this.setState({shopOffers: res})})
            .catch(error => showNotif(true, "Erreur",null));
      }
    }

    componentDidMount = () => {
      this.getShopData();
      this.getShopOffers();
    }

    getUrlParams = (search) => {
        if (search === "")
            return null;
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, {[key]: decodeURIComponent(val)})
        }, {})
    }

    handleChange = (e) => {
        this.setState({commentInput: e.target.value});
    };

    handleResponse = (res) => {
        if (res && res.status === 200)
          this.getShopData();
    };

    handleSendMessage = () => {
      if (this.state.commentInput && this.state.commentInput.length > 0 && this.state.commentInput.replace(/  +/g, ' ').length > 1) {
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/comment/${this.state.urlId}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => showNotif(true, "Erreur",null));
        this.setState({ commentInput: ""});
      }
    };

    handleSendMark = () => {
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/mark/${this.state.urlId}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {res.json(); this.handleResponse(res)})
            .catch(error => showNotif(true, "Erreur",null));
        this.setState({visible: false});
    };

    handleComment = (x) => {
        return (
          <Row key={x.id} xs={3} md={3} lg={3} sm={3} xl={3}>
            <Col xs={2} md={2} lg={2} sm={2} xl={2} className="centerBlock">
              <div className="centerBlock" align="center">
                <Image style={{width: '40px', height: '40px'}} src={!x.userPicture || x.userPicture.length === 0 ? noAvatar : x.userPicture[0].imageData} roundedCircle />
                <p style={{color: "white", fontWeight: '200'}}>{x.pseudo}</p>
              </div>
            </Col>
            <Col>
              <p style={{color: "white", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
              <p style={{color: "white", marginTop: "15px"}}>{x.comment}</p>
            </Col>
          </Row>
        )
    };

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.handleSendMessage()
        }
    };

    consultShop = (web) => {
        window.open(web, '_blank');
    }

    handleClose = () => {
      this.setState({signal: false, raison: "", clickedSignal: false, info: ""})
    }

    handleCloseRate = () => {
      this.setState({visible: false})
    }

    handleOpen = () => {
      this.setState({signal: true})
    }

    handleAnnonceReport(thisTmp) {
      this.setState({clickedSignal: true})
      if (this.state.raison) {
        let body = {
            "pseudo": this.state.shopData.pseudo,
            "subject": this.state.raison,
            "message": this.state.info,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/report/${thisTmp.state.shopData.id}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              res.json();
              if (res.status === 200) {
                this.setState({signal: false});
                showNotif(false,  "Envoyé", "Nous avons bien pris en compte votre signalement pour la marque " + thisTmp.state.shopData.pseudo)
              }
            }).catch(error => showNotif(true, "Erreur",null));
      }
    }

    handleMsgRes = async (res) => {
      var msg;
      msg = await res.json();
      if (res.status === 200) {
        this.setState({messageModal: false});
        showNotif(false, "Envoyé", "Message envoyé à " + this.state.shopData.pseudo);
      }
      else {
        showNotif(true,  "Erreur", msg);
      }
    }

    handleSendMsg() {

      if (this.state.msg) {
        let body = {
            "message": this.state.msg,
            "userId": this.state.shopData.id.toString(),
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/message`,
          {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
            .then(res => this.handleMsgRes(res)
          ).catch(error => showNotif(true, "Erreur",null));
      }
    }

    handleFollow = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/follow/${this.state.shopData.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              if (res.status === 200) {
                this.state.shopData.nbFollows += 1;
                this.setState({visible: false});
                this.getShopData();
              }
              else {
                showNotif(true, "Erreur, Veuillez essayer ultérieurement", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
              }
            })
            .catch(error => showNotif(true, "Erreur",null));
    }

    handleUnFollow = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/unfollow/${this.state.shopData.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              if (res.status === 200) {
                this.state.shopData.nbFollows -= 1;
                this.setState({visible: false});
                this.getShopData();
              }
              else {
                showNotif(true, "Erreur, Veuillez essayer ultérieurement", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
              }
            })
            .catch(error => showNotif(true, "Erreur",null));
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push({pathname: `/dashboard/item/${id}`, state: this.state.applied});
    }

    handleCard = (item) => {
        return (
          <Col key={item.id} xs={12} sm={12} md={12} lg={6} xl={6}>
            <Card className="mt-2 pointerClick" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
              <Card.Img style={{height: '190px', objectFit: 'cover'}} className="card" onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData}  alt="MISSING JPG"/>
              <Card.Body>
                <Card.Title>{`${item.productType ? item.productType : ""} ${item.productName ? item.productName : "Sans nom"}`}</Card.Title>
                <Row className="ml-1">
                  <p>{item.average && item.average.toFixed(1) + '/5'}</p>
                  {item.average && <StarIcon style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold", marginLeft: '10px'}}/>}
                </Row>
                <p>{item.productSubject}</p>
              </Card.Body>
            </Card>
          </Col>
        );
    }

    render() {
        return (
            <div className="infBg">
                {
                  this.state.shopData ?
                      <div>
                        <Modal centered show={this.state.messageModal} onHide={() => {this.setState({messageModal: false})}}>
                         <Modal.Header closeButton>
                           <Modal.Title>Contacter</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                           <Form>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Message à envoyer*</Form.Label>
                              <Form.Control value={this.state.msg} onChange={(e) => {this.setState({msg: e.target.value})}}/>
                              <Form.Text className="text-muted">
                                Un chat sera créer dans vos messagerie avec cette marque.
                              </Form.Text>
                            </Form.Group>
                          </Form>
                         </Modal.Body>
                         <Modal.Footer>
                           <Button className="btnCancel" onClick={() => {this.setState({messageModal: false})}}>
                             Annuler
                           </Button>
                           <Button className="btnInf" onClick={() => {this.handleSendMsg()}}>
                             Envoyer
                           </Button>
                         </Modal.Footer>
                        </Modal>
                        <Modal centered show={this.state.signal} onHide={this.handleClose}>
                         <Modal.Header closeButton>
                           <Modal.Title>Signaler cette marque</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                           <Form>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Raison*</Form.Label>
                              <Form.Control value={this.state.raison} onChange={(e) => {this.setState({raison: e.target.value})}}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                              <Form.Label>Information complémentaire</Form.Label>
                              <Form.Control value={this.state.info} onChange={(e) => {this.setState({info: e.target.value})}} placeholder="" />
                            </Form.Group>
                          </Form>
                         </Modal.Body>
                         <Modal.Footer>
                           {!this.state.raison && this.state.clickedSignal && <small className="text-danger">Veuillez informer une raison</small>}
                           <Button className="btnCancel" onClick={this.handleClose}>
                             Annuler
                           </Button>
                           <Button className="btnInf" onClick={() => {this.handleAnnonceReport(this)}}>
                             Signaler
                           </Button>
                         </Modal.Footer>
                        </Modal>
                        <div>
                          <Container fluid style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                              <Row xs={1} sm={1} md={1} lg={2} xl={2}>
                                <Col className="my-auto" xs={10} sm={8} md={4} lg={3} xl={2}>
                                  <div className="centerBlock mt-2" align="center">
                                    <Image className="img-fluid" style={{width: '160px', height: '160px', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}} src={!this.state.shopData.userPicture || this.state.shopData.userPicture.length === 0 ? noAvatar : this.state.shopData.userPicture[0].imageData} roundedCircle/>
                                  </div>
                                </Col>
                                <Col className="my-auto" xs={10} sm={12} md={8} lg={9} xl={10}>
                                  <Row className="mx-0 mt-4" align="center">
                                    <h2  className="my-auto mr-2" style={{color: 'white', fontWeight: '400'}}>{this.state.shopData.full_name}</h2>
                                    <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
                                    {
                                      this.state.shopData.theme &&
                                      <Badge pill className="pill my-3 py-auto mx-3">{this.state.shopData.theme}</Badge>
                                    }
                                    <Row className="ml-0 my-auto">
                                     {this.state.shopData.facebook && <OverlayTrigger
                                       placement="bottom"
                                       overlay={
                                         <Tooltip>
                                           {this.state.shopData.facebook}
                                         </Tooltip>
                                       }
                                     >
                                       <Image className="iconProfileSocial" src={facebook}/>
                                     </OverlayTrigger>}
                                     {this.state.shopData.instagram && <OverlayTrigger
                                       placement="bottom"
                                       overlay={
                                         <Tooltip>
                                           {this.state.shopData.instagram}
                                         </Tooltip>
                                       }
                                     >
                                     <Image className="iconProfileSocial" src={instagram}/>
                                     </OverlayTrigger>}
                                     {this.state.shopData.twitter && <OverlayTrigger
                                       placement="bottom"
                                       overlay={
                                         <Tooltip>
                                           {this.state.shopData.twitter}
                                         </Tooltip>
                                       }
                                     >
                                       <Image className="iconProfileSocial" src={twitter}/>
                                     </OverlayTrigger>}
                                     {this.state.shopData.snapchat && <OverlayTrigger
                                       placement="bottom"
                                       overlay={
                                         <Tooltip>
                                           {this.state.shopData.snapchat}
                                         </Tooltip>
                                       }
                                     >
                                       <Image className="iconProfileSocial" src={snapchat}/>
                                     </OverlayTrigger>}
                                    </Row>
                                  </Row>
                                  <Row xs={1} sm={2} md={2} lg={3} xl={3} className="mx-auto w-100">
                                    <Col className="mt-2 px-0" align="center">
                                      <h3 style={{color: 'white'}}>{this.state.shopData.nbFollows}</h3>
                                      <p style={{color: 'white', fontWeight: '400'}}>Nombre d'abonnée</p>
                                    </Col>
                                    <Col className="mt-2 px-0" align="center">
                                      <h3 style={{color: 'white'}}>{this.state.shopData.nbOfferPosted}</h3>
                                      <p style={{color: 'white', fontWeight: '400'}}>Nombre d'offres</p>
                                    </Col>
                                    <Col className="mt-2 px-0" align="center">
                                      <Row className="mb-3">
                                        <StarRatings
                                           rating={this.state.shopData.average ? this.state.shopData.average : 0}
                                           starRatedColor="#FFC106"
                                           numberOfStars={5}
                                           name='rating'
                                           starDimension="20px" />
                                         <Image className="iconProfileSocial ml-4 mt-2 editIcon" src={edit} onClick={() => {this.setState({visible: true})}} style={{width:'15px', height: '15px'}}/>
                                       </Row>
                                    </Col>
                                  </Row>
                                  <Row >
                                    <Col>
                                      <b className="text-light">{this.state.shopData.full_name}</b>
                                      <p className="text-light">{this.state.shopData.userDescription ? this.state.shopData.userDescription : "Pas de description fourni"}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                          </Container>
                          <Row className="px-auto pb-2">
                           {
                             this.state.shopData.follow === true ?
                             <Button className="mt-4 ml-auto btnInf" onClick={this.handleUnFollow}>Désabonner</Button> :
                             <Button className="mt-4 ml-auto btnInf" onClick={this.handleFollow}>S'abonner</Button>
                           }
                           <Button className="mt-4 mr-auto ml-2 btnInf" onClick={() => {this.setState({messageModal: true})}}>Contacter</Button>
                         </Row>
                          <Row xs={1} sm={1} md={2} lg={2} xl={2} className="mt-4 mx-0">
                            <Col className="mx-0 p-0">
                              <div className="mx-2 p-2" style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Informations de la marque</h2>
                                <Row className="mx-0 mb-1">
                                  <Image className="iconProfileSocial" src={globe}/>
                                  <p style={{color:'white'}}>{this.state.shopData.website ? this.state.shopData.website : "Non fourni"}</p>
                                </Row>
                                <Row className="mx-0 mb-1">
                                  <Image className="iconProfileSocial" src={mail}/>
                                  <p style={{color:'white'}}>{this.state.shopData.email ? this.state.shopData.email : "Non fourni"}</p>
                                </Row>
                                <Row className="mx-0 mb-1">
                                  <Image className="iconProfileSocial" src={place}/>
                                  <p style={{color:'white'}}>{this.state.shopData.city ? this.state.shopData.city : "Non fourni"}</p>
                                </Row>
                                <Row className="mx-0 mb-1">
                                  <Image className="iconProfileSocial" src={phone}/>
                                  <p style={{color:'white'}}>{this.state.shopData.phone ? this.state.shopData.phone : "Non fourni"}</p>
                                </Row>
                              </div>
                              <div className="mx-2 mt-4 p-2" style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Offres</h2>
                                {
                                   (this.state.shopOffers && this.state.shopOffers.length > 0) ?
                                    <Row className="mx-0" xs={1} sm={1} md={2} lg={2} xl={2}>
                                      {this.state.shopOffers.map(item => this.handleCard(item))}
                                    </Row> :
                                    <p className="text-light">Aucune offre posté.</p>
                                }
                              </div>
                            </Col>
                            <Col className="mx-0 p-0">
                              <div className="mx-2 p-2" style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                                <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Avis</h2>
                                <Row className="mt-4 mb-4"  xs={2} md={2} lg={2} sm={2} xl={2}>
                                  <Col xs={10} md={10} lg={10} sm={10} xl={10}>
                                    <Form.Control onChange={this.handleChange} value={this.state.commentInput} className="inputComment" type="text" placeholder="Commenter" />
                                  </Col>
                                  <Col xs={1} md={1} lg={1} sm={1} xl={1} className="my-auto">
                                    <SendIcon className="pointerClick"  onClick={this.handleSendMessage} style={{color: "#7FB780", width: "1.5rem", height: "1.5rem"}}/>
                                  </Col>
                                </Row>
                                {
                                  !this.state.shopData.comment || this.state.shopData.comment.length === 0 ? "" : this.state.shopData.comment.map(x => this.handleComment(x))
                                }
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      :
                      <Loader
                          type="Triangle"
                          color="#fff"
                          height={200}
                          width={200}
                          style={{paddingTop: "14rem", marginLeft: '40%'}}
                      />
                }
                <Modal centered show={this.state.visible} onHide={this.handleCloseRate}>
                 <Modal.Header closeButton>
                   <Modal.Title>Notez cette marque</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                   <Rate onChange={(e) => this.handleMark(e)} />
                 </Modal.Body>
                 <Modal.Footer>
                   <Button className="btnCancel" onClick={this.handleCloseRate}>
                     Annuler
                   </Button>
                   <Button className="btnInf" onClick={this.handleSendMark}>
                     Noter
                   </Button>
                 </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(shopProfile)

// <Row style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", borderRadius: "0.25rem"}}  className="mb-4 p-2 pl-4" xs={1} sm={1} md={2} lg={3} xl={3}>
//   <Col className="my-auto">
//     <div className="centerBlock" align="center">
//       <Image className="img-fluid" style={{width: '160px', height: '160px', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}} src={!this.state.shopData.userPicture || this.state.shopData.userPicture.length === 0 ? noAvatar : this.state.shopData.userPicture[0].imageData} roundedCircle/>
//     </div>
//   </Col>
//   <Col>
//     <Row className="ml-0">
//       <h1 style={{fontWeight: '300', marginRight: '25px', color: 'white'}}>{this.state.shopData.pseudo}</h1>
//       <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
//     </Row>
//     <Image className="iconProfileSocial" src={place}/> <span style={{color: 'white'}}>{this.state.shopData.city ? this.state.shopData.city : "Non renseigné"}</span>
//       <Row className="ml-0 mt-2">
//         {this.state.shopData.facebook && <OverlayTrigger
//           placement="bottom"
//           overlay={
//             <Tooltip>
//               {this.state.shopData.facebook}
//             </Tooltip>
//           }
//         >
//           <Image className="iconProfileSocial" src={facebook}/>
//         </OverlayTrigger>}
//         {this.state.shopData.instagram && <OverlayTrigger
//           placement="bottom"
//           overlay={
//             <Tooltip>
//               {this.state.shopData.instagram}
//             </Tooltip>
//           }
//         >
//         <Image className="iconProfileSocial" src={instagram}/>
//         </OverlayTrigger>}
//         {this.state.shopData.twitter && <OverlayTrigger
//           placement="bottom"
//           overlay={
//             <Tooltip>
//               {this.state.shopData.twitter}
//             </Tooltip>
//           }
//         >
//           <Image className="iconProfileSocial" src={twitter}/>
//         </OverlayTrigger>}
//         {this.state.shopData.snapchat && <OverlayTrigger
//           placement="bottom"
//           overlay={
//             <Tooltip>
//               {this.state.shopData.snapchat}
//             </Tooltip>
//           }
//         >
//           <Image className="iconProfileSocial" src={snapchat}/>
//         </OverlayTrigger>}
//       </Row>
//       <Row>
//         {
//           this.state.follow === true ?
//           <Button variant="outline-light" className="mt-4 ml-2" onClick={this.handleUnFollow}>Désabonner</Button>:
//           <Button variant="outline-light" className="mt-4 ml-2" onClick={this.handleFollow}>S'abonner</Button>
//         }
//         <Button variant="outline-light" className="mt-4 ml-2" onClick={() => {this.setState({messageModal: true})}}>Contacter</Button>
//       </Row>
//   </Col>
//   <Col className="pt-2">
//     <Row>
//       <h2 style={{fontWeight: '300', color: 'white'}}>Note</h2>
//     </Row>
//     {!this.state.shopData.average && <p style={{fontWeight: '200'}}>Aucune note</p>}
//     <Row>
//       {this.state.shopData.average &&
//       <p className="pt-1 mr-3" style={{color: "white"}}>{this.state.shopData.average}</p>}
//       <StarRatings
//          rating={this.state.shopData.average ? this.state.shopData.average : 0}
//          starRatedColor="#FFC106"
//          numberOfStars={5}
//          name='rating'
//          starDimension="20px"
//        />
//        <Image className="iconProfileSocial ml-4 mt-2 editIcon" src={edit} onClick={() => {this.setState({visible: true})}} style={{width:'15px', height: '15px'}}/>
//     </Row>
//   </Col>
//   <Col>
//     <h2 style={{fontWeight: '300', color: 'white'}}>Offres</h2>
//     <p className="text-light">{this.state.shopData.nbOfferPosted}</p>
//   </Col>
//   <Col>
//     <h2 style={{fontWeight: '300', color: 'white'}}>Abonnées</h2>
//     <p className="text-light">{this.state.shopData.nbFollows}</p>
//   </Col>
// </Row>
