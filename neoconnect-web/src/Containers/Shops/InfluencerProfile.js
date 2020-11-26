import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import {Rate} from "antd";
import SendIcon from '@material-ui/icons/Send';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import edit from "../../assets/edit.svg";
import StarRatings from 'react-star-ratings';
import place from "../../assets/place.svg";
import mail from "../../assets/mail.svg";
import phone from "../../assets/phone.svg";
import noAvatar from "../../assets/noImageFindInf.jpg";
import snapchat from "../../assets/snapchat.svg";
import tiktok from "../../assets/tiktok.svg";
import twitch from "../../assets/twitch.svg";
import pinterest from "../../assets/pinterest.svg";
import instagram from "../../assets/instagram.svg";
import youtube from "../../assets/youtube.svg";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import { showNotif } from '../Utils.js';
import { displayComment, displaySocialMed, displayLoad } from '../../Components/Utils.js';
import LoadingOverlay from 'react-loading-overlay';

class InfluencerProfile extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            infData: null,
            visible: false,
            commentInput: "",
            signal: false,
            raison: "",
            info: "",
            isActive: false,
            msg: "",
            messageModal: false,
            clickedSignal: false
        };
    }

    getInfData = () => {
      let id = this.getUrlParams((window.location.search));

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/${id.id}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
          .then(res => res.json())
          .then(res => {this.setState({infData: res})})
          .catch(error => showNotif(true, "Erreur",null));
    }

    componentDidMount = () => {
      this.getInfData();
    };

    getUrlParams = (search) => {
        if (search === "")
            return null;
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, {[key]: decodeURIComponent(val)})
        }, {})
    };

    handleChange = (e) => {
      this.setState({commentInput: e.target.value});
    };

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleSendMark = () => {
        this.setState({isActive: true});
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/mark/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status === 200)
              return (res.json());
            this.setState({isActive: false});
          })
          .then(res => {this.setState({isActive: false, visible: false});this.getInfData();})
          .catch(error => {this.setState({isActive: false});showNotif(true, "Erreur",null)});
    };


    handleSendMessage = () => {
      if (this.state.commentInput && this.state.commentInput.length > 0 && this.state.commentInput.replace(/  +/g, ' ').length > 1) {
        this.setState({isActive: true});
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/comment/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status === 200)
              return (res.json());
            this.setState({isActive: false});
          })
          .then(res => {this.setState({isActive: false, commentInput: ""});this.getInfData();})
          .catch(error => {this.setState({isActive: false});showNotif(true, "Erreur",null)});
      }
    }

    closeModal = (modalName) => {
      let stateVal = {raison: "", info: "", msg: ""};
      stateVal[modalName] = false;
      this.setState(stateVal);
    }

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleInfReport(thisTmp) {
      this.setState({clickedSignal: true})

      if (this.state.raison) {
        let body = {
            "pseudo": this.state.infData.pseudo,
            "subject": this.state.raison,
            "message": this.state.info,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/report/${this.state.infData.id}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
        .then(res => {
          res.json();
          if (res.status === 200) {
            this.setState({signal: false, raison: "", info: ""});
            showNotif(false, "Envoyé", "Nous avons bien pris en compte votre signalement pour l'influenceur " + thisTmp.state.infData.pseudo);
          }
        }).catch(error => showNotif(true, "Erreur",null));
      }
    }


    handleMsgRes = async (res) => {
      if (res.status === 200) {
        this.setState({messageModal: false});
        showNotif(false, "Envoyé", "Message envoyé à " + this.state.infData.pseudo);
      }
      else {
        showNotif(true, "Erreur", null);
      }
      this.setState({isActive: false});
    }

    handleSendMsg() {
      if (this.state.msg) {
        this.setState({isActive: true});
        let body = {
            "message": this.state.msg,
            "userId": this.state.infData.id.toString(), //destinataire
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/message`,
          {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => this.handleMsgRes(res))
          .catch(error => {
            this.setState({isActive: false});
            showNotif(true, "Erreur", null);
          });
      }
    }

    render() {
        return (
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Chargement...'
            >
            <div className="shopBg">
                {
                    this.state.infData ?
                      <div>
                        <Modal centered show={this.state.messageModal} onHide={() => this.closeModal('messageModal')}>
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
                           <Button className="btnCancel" onClick={() => this.closeModal('messageModal')}>
                             Annuler
                           </Button>
                           <Button className="btnInf" onClick={() => {this.handleSendMsg()}}>
                             Envoyer
                           </Button>
                         </Modal.Footer>
                        </Modal>
                        <Modal centered show={this.state.visible} onHide={() => this.closeModal('visible')}>
                         <Modal.Header closeButton>
                           <Modal.Title>Notez cette marque</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                           <Rate onChange={(e) => this.handleMark(e)} />
                         </Modal.Body>
                         <Modal.Footer>
                           <Button className="btnCancel" onClick={() => this.closeModal('visible')}>
                             Annuler
                           </Button>
                           <Button className="btnShop" onClick={this.handleSendMark}>
                             Noter
                           </Button>
                         </Modal.Footer>
                        </Modal>
                        <Modal centered show={this.state.signal} onHide={() => this.closeModal('signal')}>
                         <Modal.Header closeButton>
                           <Modal.Title>Signaler cette influenceur</Modal.Title>
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
                           <Button className="btnCancel" onClick={() => this.closeModal('signal')}>
                             Annuler
                           </Button>
                           <Button className="btnShop" onClick={() => {this.handleInfReport(this)}}>
                             Signaler
                           </Button>
                         </Modal.Footer>
                        </Modal>
                        <Row style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", borderRadius: "0.25rem"}} className="mb-4 p-2 pl-4" xs={1} sm={1} md={2} lg={3} xl={4}>
                          <Col className="my-auto">
                            <div className="centerBlock" align="center">
                              <Image className="img-fluid" style={{width: '160px', height: '160px', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}} src={!this.state.infData.userPicture || this.state.infData.userPicture.length === 0 ? noAvatar : this.state.infData.userPicture[0].imageData} roundedCircle/>
                            </div>
                          </Col>
                          <Col xs='auto' md='auto' lg='auto' sm='auto' xl='auto'>
                            <Row className="ml-0">
                              <h1 style={{fontWeight: '300', color: 'white'}}>{this.state.infData.pseudo}</h1>
                              <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => this.setState({signal: true})} className="my-auto border border-danger rounded-circle pointerClick ml-4"/>
                              <Badge pill className="pill my-4 ml-2">{this.state.infData.theme}</Badge>
                            </Row>
                              <p className="text-light">{this.state.infData.userDescription}</p>
                            <Button className="btnShop mt-1" style={{padding: '4px !important'}} onClick={() => {this.setState({messageModal: true})}}>Contacter</Button>
                          </Col>
                          <Col className="my-auto">
                            <h3 className="text-light" align="center">{this.state.infData.nbOfferApplied}</h3>
                            <h3 className="text-light" align="center" style={{fontWeight: '300'}}>Offres effectué</h3>
                          </Col>
                          <Col align="center" className="my-auto">
                            <Row className="pl-1 mx-auto mt-2">
                              {this.state.infData.average &&
                              <p className="pt-1 mr-3" style={{color: 'white'}}>{this.state.infData.average}</p>}
                              <StarRatings
                                 rating={this.state.infData.average ? this.state.infData.average : 0}
                                 starRatedColor="#FFC106"
                                 numberOfStars={5}
                                 name='rating'
                                 starDimension="20px"
                               />
                               <Image className="iconProfileSocial ml-4 mt-2 editIcon" src={edit} onClick={() => {this.setState({visible: true})}} style={{width:'15px', height: '15px'}}/>
                            </Row>
                          </Col>
                        </Row>
                        <Row className="ml-0">
                          <Col md={7} className="pl-0">
                            <div className="ml-2 p-3" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", backgroundColor: "transparent"}}>
                                <h2 style={{color: 'white', fontWeight: '300'}}>Avis</h2>
                                  <Row className="mb-4 pt-2"  xs={2} md={2} lg={2} sm={2} xl={2}>
                                    <Col xs={9} md={9} lg={9} sm={9} xl={9}>
                                      <Form.Control onChange={this.handleChange} value={this.state.commentInput} className="inputComment" type="text" placeholder="Commenter" />
                                    </Col>
                                    <Col xs={1} md={1} lg={1} sm={1} xl={1} className="my-auto">
                                      <SendIcon className="pointerClick"  onClick={this.handleSendMessage} style={{color: "#7FB780", width: "1.5rem", height: "1.5rem"}}/>
                                    </Col>
                                  </Row>
                                  {
                                    !this.state.infData.comment || this.state.infData.comment.length === 0 ? "" : this.state.infData.comment.map(x => displayComment(x))
                                  }
                            </div>
                          </Col>
                          <Col md={5} className="pl-0">
                            <div className="mr-2 p-3" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", backgroundColor: "transparent"}}>
                              <h2 style={{color: 'white', fontWeight: '300'}}>Information de l'influenceur</h2>
                                <Row className="ml-0">
                                  <Col md={12} className="pl-0">
                                    <Image className="iconProfileSocial" src={place}/> <span style={{color: 'white'}}>{this.state.infData.city ? this.state.infData.city : "Non renseigné"}</span>
                                  </Col>
                                  <Col md={12} className="pl-0">
                                    <Image className="iconProfileSocial" src={mail}/> <span style={{color: 'white'}}>{this.state.infData.email ? this.state.infData.email : "Non renseigné"}</span>
                                  </Col>
                                  <Col md={12} className="pl-0">
                                    <Image className="iconProfileSocial" src={phone}/> <span style={{color: 'white'}}>{this.state.infData.phone ? this.state.infData.phone : "Non renseigné"}</span>
                                  </Col>
                                </Row>
                                <Row className="ml-0 mt-2">
                                  {displaySocialMed(this.state.infData.facebook, facebook)}
                                  {displaySocialMed(this.state.infData.instagram, instagram)}
                                  {displaySocialMed(this.state.infData.twitter, twitter)}
                                  {displaySocialMed(this.state.infData.youtube, youtube)}
                                  {displaySocialMed(this.state.infData.snapchat, snapchat)}
                                  {displaySocialMed(this.state.infData.tiktok, tiktok)}
                                  {displaySocialMed(this.state.infData.pinterest, pinterest)}
                                  {displaySocialMed(this.state.infData.twitch, twitch)}
                                </Row>
                            </div>
                          </Col>
                        </Row>

                      </div>
                      :
                      displayLoad()
                }
            </div>
          </LoadingOverlay>
        );
    }
}

export default withRouter(InfluencerProfile);
