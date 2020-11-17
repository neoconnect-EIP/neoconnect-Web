import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {Rate} from "antd";
import SendIcon from '@material-ui/icons/Send';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
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

class InfluencerProfile extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            infData: null,
            userData: null,
            visible: false,
            commentInput: "",
            signal: false,
            raison: "",
            info: "",
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
          .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
    }

    componentDidMount = () => {

      this.getInfData();

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/me`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
          .then(res => res.json())
          .then(res => this.setState({userData: res}))
          .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
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

    handleResponse = (res) => {
        if (res && res.status === 200)
          this.getInfData();
    };

    handleSendMark = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/mark/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
        this.setState({visible: false});
    };


    handleSendMessage = () => {
      if (this.state.commentInput && this.state.commentInput.length > 0 && this.state.commentInput.replace(/  +/g, ' ').length > 1) {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/comment/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
        this.setState({ commentInput: ""});
      }
    }

    handleComment = (x) => {
        return (
            <Row key={x.id}>
              <Col xs={2} md={2} lg={2} sm={2} xl={2} className="centerBlock">
                <div className="centerBlock" align="center">
                  <Image style={{width: '40px', height: '40px'}} src={x.avatar ? x.avatar : noAvatar} roundedCircle />
                  <p style={{fontWeight: '200'}}>{x.pseudo}</p>
                </div>
              </Col>
              <Col xs={8} md={8} lg={8} sm={8} xl={8}>
                <p style={{color: "white", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
                <p style={{color: "white", marginTop: "15px"}}>{x.comment}</p>
              </Col>
            </Row>
        )
    };

    handleOpen = () => {
      this.setState({signal: true})
    }

    handleCloseRate = () => {
      this.setState({visible: false})
    }

    handleClose = () => {
      this.setState({signal: false, raison: "", info: ""})
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
            }).catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
      }
    }


    handleMsgRes = async (res) => {
      var msg;
      if (res.status === 200) {
        msg = await res.json();

        this.setState({messageModal: false});
        showNotif(false, "Envoyé", "Message envoyé à " + this.state.infData.pseudo);
      }
      else {
        msg = await res.json();
        showNotif(true, "Erreur", "Une erreur s'est produite, veuillez essayer ultérieurement: " + (msg ? msg : res.statusText));
      }
    }

    handleSendMsg() {

      if (this.state.msg) {
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
            .then(res => this.handleMsgRes(res)
          ).catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));
      }
    }

    render() {
      console.log(this.state.infData);
        return (
            <div className="shopBg">
                {
                    this.state.infData && this.state.userData ?
                      <div>
                        <Modal centered show={this.state.messageModal} onHide={() => {this.setState({messageModal: false})}}>
                         <Modal.Header closeButton>
                           <Modal.Title>Contacter</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                           <Form>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Message à envoyer</Form.Label>
                              <Form.Control value={this.state.msg} onChange={(e) => {this.setState({msg: e.target.value})}}/>
                              <Form.Text className="text-muted">
                                Un chat sera créer dans vos messagerie avec cette boutique.
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
                        <Modal centered show={this.state.visible} onHide={this.handleCloseRate}>
                         <Modal.Header closeButton>
                           <Modal.Title>Notez cette boutique</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                           <Rate onChange={(e) => this.handleMark(e)} />
                         </Modal.Body>
                         <Modal.Footer>
                           <Button className="btnCancel" onClick={this.handleCloseRate}>
                             Annuler
                           </Button>
                           <Button className="btnShop" onClick={this.handleSendMark}>
                             Noter
                           </Button>
                         </Modal.Footer>
                        </Modal>
                        <Modal centered show={this.state.signal} onHide={this.handleClose}>
                         <Modal.Header closeButton>
                           <Modal.Title>Signaler cette influenceur</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                           <Form>
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>Raison</Form.Label>
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
                          <Col >
                            <Row className="ml-0">
                              <h1 style={{fontWeight: '300', color: 'white'}}>{this.state.infData.pseudo}</h1>
                              <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report ml-4"/>
                            </Row>
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
                              <Badge pill className="pill mt-2 mb-4">
                                {this.state.infData.theme}
                              </Badge>
                            </Row>
                            <Button className="btnShop ml-1 mt-3" style={{padding: '4px !important'}} onClick={() => {this.setState({messageModal: true})}}>Contacter</Button>
                          </Col>
                          <Col>
                            <h2 style={{fontWeight: '300', color: 'white'}}>
                              Note
                            </h2>
                            {!this.state.infData.average && <p style={{fontWeight: '200', color: 'white'}}>Aucune note</p>}
                            <Row className="pl-1">
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
                          <Col>
                            <h2 style={{fontWeight: '300', color: 'white'}}>Réseaux sociaux</h2>
                            <Row className="ml-0 mt-2">
                              {this.state.infData.facebook && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.facebook}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={facebook}/>
                              </OverlayTrigger>}
                              {this.state.infData.instagram && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.instagram}
                                  </Tooltip>
                                }
                              >
                              <Image className="iconProfileSocial" src={instagram}/>
                              </OverlayTrigger>}
                              {this.state.infData.twitter && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.twitter}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={twitter}/>
                              </OverlayTrigger>}
                              {this.state.infData.youtube && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.youtube}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={youtube}/>
                              </OverlayTrigger>}
                              {this.state.infData.snapchat && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.snapchat}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={snapchat}/>
                              </OverlayTrigger>}
                              {this.state.infData.tiktok && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.tiktok}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={tiktok}/>
                              </OverlayTrigger>}
                              {this.state.infData.pinterest && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.pinterest}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={pinterest}/>
                              </OverlayTrigger>}
                              {this.state.infData.twitch && <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.twitch}
                                  </Tooltip>
                                }
                              >
                                <Image style={{width: '20px', height: '20px'}} src={twitch}/>
                              </OverlayTrigger>}
                              {!this.state.infData.facebook && !this.state.infData.instagram && !this.state.infData.twitter && !this.state.infData.youtube &&
                              !this.state.infData.snapchat && !this.state.infData.tiktok && !this.state.infData.pinterest && !this.state.infData.twitch &&
                              <p style={{fontWeight: '200', color: 'white'}}>Aucun réseaux sociaux</p>
                            }
                            </Row>
                          </Col>
                        </Row>
                        <Row className="ml-0">
                          <Col md={7} className="pl-0">
                            <Card className="ml-2" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", backgroundColor: "transparent"}}>
                              <Card.Body>
                                <Card.Title style={{color: 'white', marginLeft: '20px'}}>Avis</Card.Title>
                                  <Row className="mt-4 mb-4"  xs={3} md={3} lg={3} sm={3} xl={3}>
                                    <Col xs={2} md={2} lg={2} sm={2} xl={2}>
                                      <div className="centerBlock" align="center">
                                        <Image style={{width: '40px', height: '40px'}} src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle />
                                      </div>
                                    </Col>
                                    <Col xs={8} md={8} lg={8} sm={8} xl={8}>
                                      <Form.Control onChange={this.handleChange} value={this.state.commentInput} className="inputComment" type="text" placeholder="Commenter" />
                                    </Col>
                                    <Col xs={1} md={1} lg={1} sm={1} xl={1} className="my-auto">
                                      <SendIcon className="report"  onClick={this.handleSendMessage} style={{color: "#7FB780", width: "1.5rem", height: "1.5rem"}}/>
                                    </Col>
                                  </Row>
                                  {
                                    !this.state.infData.comment || this.state.infData.comment.length === 0 ? "" : this.state.infData.comment.map(x => this.handleComment(x))
                                  }
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={5} className="pl-0">
                            <Card className="mr-2" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", backgroundColor: "transparent"}}>
                              <Card.Body>
                                <Card.Title style={{color: 'white'}}>À propos</Card.Title>
                                <Card.Text style={{color: 'white'}}>
                                {this.state.infData.userDescription ? this.state.infData.userDescription : "Pas de description fourni"}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>

                      </div>
                      :
                      <Loader
                          type="Triangle"
                          color="white"
                          height={200}
                          width={200}
                          style={{marginTop: "14rem"}}

                      />
                }
            </div>
        );
    }
}

export default withRouter(InfluencerProfile);
