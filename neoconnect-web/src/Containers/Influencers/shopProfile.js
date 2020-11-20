import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg";
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
import facebookOff from "../../assets/facebookOff.svg";
import twitter from "../../assets/twitter.svg";
import twitterOff from "../../assets/twitterOff.svg";
import instagram from "../../assets/instagram.svg";
import instagramOff from "../../assets/instagramOff.svg";
import snapchat from "../../assets/snapchat.svg";
import snapchatOff from "../../assets/snapchatOff.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import place from "../../assets/place.svg";
import edit from "../../assets/edit.svg";
import {Rate} from "antd";
import { showNotif } from '../Utils.js';

class shopProfile extends React.Component{
    constructor(props) {
        super(props);

        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            shopData: [],
            userData: null,
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
            follow: props.location.state ? props.location.state : false,
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

    getUserData = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/me`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      }).then(res => res.json())
        .then(res => this.setState({userData: res}))
        .catch(error => showNotif(true, "Erreur",null));

    }

    componentDidMount = () => {
      this.getShopData();
      this.getUserData();

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
                <Image style={{width: '40px', height: '40px'}} src={x.avatar ? x.avatar : noAvatar} roundedCircle />
                <p style={{fontWeight: '200'}}>{x.pseudo}</p>
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
                this.setState({visible: false, follow: true});
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
                this.setState({visible: false, follow: false});
              }
              else {
                showNotif(true, "Erreur, Veuillez essayer ultérieurement", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
              }
            })
            .catch(error => showNotif(true, "Erreur",null));
    }

    render() {
        return (
            <div className="infBg">
                {
                  this.state.shopData && this.state.userData ?
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
                        <Row style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", borderRadius: "0.25rem"}}  className="mb-4 p-2 pl-4" xs={1} sm={1} md={2} lg={3} xl={3}>
                          <Col className="my-auto">
                            <div className="centerBlock" align="center">
                              <Image className="img-fluid" style={{width: '160px', height: '160px', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}} src={!this.state.shopData.userPicture || this.state.shopData.userPicture.length === 0 ? noAvatar : this.state.shopData.userPicture[0].imageData} roundedCircle/>
                            </div>
                          </Col>
                          <Col>
                            <Row className="ml-0">
                              <h1 style={{fontWeight: '300', marginRight: '25px', color: 'white'}}>{this.state.shopData.pseudo}</h1>
                              <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
                            </Row>
                            <Image className="iconProfileSocial" src={place}/> <span style={{color: 'white'}}>{this.state.shopData.city ? this.state.shopData.city : "Non renseigné"}</span>
                              <Row className="ml-0 mt-2">
                                {this.state.shopData.facebook ? <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip>
                                      {this.state.shopData.facebook}
                                    </Tooltip>
                                  }
                                >
                                  <Image className="iconProfileSocial" src={facebook}/>
                                </OverlayTrigger> : <Image className="iconProfileSocial" src={facebookOff}/>}
                                {this.state.shopData.instagram ? <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip>
                                      {this.state.shopData.instagram}
                                    </Tooltip>
                                  }
                                >
                                <Image className="iconProfileSocial" src={instagram}/>
                                </OverlayTrigger> : <Image src={instagramOff} className="iconProfileSocial"/>}
                                {this.state.shopData.twitter ? <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip>
                                      {this.state.shopData.twitter}
                                    </Tooltip>
                                  }
                                >
                                  <Image className="iconProfileSocial" src={twitter}/>
                                </OverlayTrigger> : <Image className="iconProfileSocial" src={twitterOff}/>}
                                {this.state.shopData.snapchat ? <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip>
                                      {this.state.shopData.snapchat}
                                    </Tooltip>
                                  }
                                >
                                  <Image className="iconProfileSocial" src={snapchat}/>
                                </OverlayTrigger> : <Image className="iconProfileSocial" src={snapchatOff}/>}
                              </Row>
                              <Row>
                                {
                                  this.state.follow === true ?
                                  <Button variant="outline-light" className="mt-4 ml-2" onClick={this.handleUnFollow}>Désabonner</Button>:
                                  <Button variant="outline-light" className="mt-4 ml-2" onClick={this.handleFollow}>S'abonner</Button>
                                }
                                <Button variant="outline-light" className="mt-4 ml-2" onClick={() => {this.setState({messageModal: true})}}>Contacter</Button>
                              </Row>
                          </Col>
                          <Col className="pt-2">
                            <Row>
                              <h2 style={{fontWeight: '300', color: 'white'}}>
                                Note
                              </h2>
                            </Row>

                            {!this.state.shopData.average && <p style={{fontWeight: '200'}}>Aucune note</p>}
                            <Row>
                              {this.state.shopData.average &&
                              <p className="pt-1 mr-3" style={{color: "white"}}>{this.state.shopData.average}</p>}
                              <StarRatings
                                 rating={this.state.shopData.average ? this.state.shopData.average : 0}
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
                                    !this.state.shopData.comment || this.state.shopData.comment.length === 0 ? "" : this.state.shopData.comment.map(x => this.handleComment(x))
                                  }
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={5} className="pl-0">
                            <Card className="mr-2" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", backgroundColor: "transparent"}}>
                              <Card.Body>
                                <Card.Title style={{color: 'white'}}>À propos</Card.Title>
                                <Card.Text style={{color: 'white'}}>
                                {this.state.shopData.userDescription ? this.state.shopData.userDescription : "Pas de description fourni"}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                      :
                      <Loader
                          type="Triangle"
                          color="#292929"
                          height={200}
                          width={200}
                          style={{marginTop: "14rem"}}
                      />
                }
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
