import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import { Rate } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg";
import noAvatar from "../../assets/noImageFindInf.jpg";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import StarRatings from 'react-star-ratings';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import { store } from 'react-notifications-component';
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
            commentData: null,
            markData: null,
            commentInput: "",
            mark: null,
            raison: "",
            info: "",
            messageModal: false,
            msg: "",
            clickedSignal: false
        };
    }

    getShopData = () => {
      let id = this.getUrlParams((window.location.search));

      if (id) {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/${id.id}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => {this.setState({shopData: res})})
            .catch(error => console.error('Error:', error));
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
        .catch(error => console.error('Error:', error));

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

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
    };

    handleResponse = (res) => {
        if (res && res.status === 200)
          this.getShopData();
    };

    handleSendMessage = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/comment/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""});
    };

    handleSendMark = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/mark/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({visible: false});
    };

    // <ListItem style={{height: "4.375rem", marginBottom: "2rem"}} key={x.id}>
    //     <ListItemAvatar style={{marginRight: "1rem"}}>
    //         <Avatar src={x.avatar}/>
    //         <p>{x.pseudo}</p>
    //     </ListItemAvatar>
    //     <ListItemText>
    //         <p style={{color: "#5f5f5f", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
    //         <p style={{color: "black", marginTop: "15px"}}>{x.comment}</p>
    //     </ListItemText>
    //     <ListItemSecondaryAction>
    //     </ListItemSecondaryAction>
    // </ListItem>

    handleComment = (x) => {
        return (
            <Row key={x.id}>
              <Col md={2} className="centerBlock">
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
                store.addNotification({
                  title: "Envoyé",
                  message: "Nous avons bien pris en compte votre signalement pour la marque " + thisTmp.state.shopData.pseudo,
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
            }).catch(error => console.error('Error:', error));
      }
    }

    handleMsgRes = async (res) => {
      var msg;
      if (res.status === 200) {
        msg = await res.json();

        this.setState({messageModal: false});
        store.addNotification({
          title: "Envoyé",
          message: "Message envoyé à " + this.state.shopData.pseudo,
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
        msg = await res.json();
        store.addNotification({
          title: "Erreur",
          message: "Une erreur s'est produite, veuillez essayer ultérieurement: " + (msg ? msg : res.statusText),
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
    }

    handleSendMsg() {

      if (this.state.msg) {
        let body = {
            "message": this.state.msg,
            "userId": this.state.shopData.id.toString(), //destinataire
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
          ).catch(error => console.error('Error:', error));
      }
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
                          <Modal centered show={this.state.signal} onHide={this.handleClose}>
                           <Modal.Header closeButton>
                             <Modal.Title>Signaler cette marque</Modal.Title>
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
                             <Button className="btnInf" onClick={() => {this.handleAnnonceReport(this)}}>
                               Signaler
                             </Button>
                           </Modal.Footer>
                          </Modal>
                          <Row className="pt-4 ml-4">
                            <Col md={3}>
                              <Image style={{width: '250px', height: '230px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}  src={(!this.state.shopData.userPicture || this.state.shopData.userPicture.length === 0) ? noShop : this.state.shopData.userPicture[0].imageData} rounded />
                            </Col>
                            <Col md={3} className="pt-2">
                              <Row className="ml-0">
                                <h1 style={{fontWeight: '300', marginRight: '25px', color: 'white'}}>{this.state.shopData.pseudo}</h1>
                                <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
                              </Row>
                              <Image className="iconProfileSocial" src={place}/> <span style={{color: 'white'}}>{this.state.shopData.city ? this.state.shopData.city : "Non renseigné"}</span>
                                <Badge className="ml-4 pill">
                                  {this.state.shopData.function}
                                </Badge>
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
                                  <Button className="btnInf mt-4 ml-2" onClick={() => {this.setState({messageModal: true})}}>Contacter</Button>
                                </Row>
                            </Col>
                            <Col md={4} className="pt-2 ml-2">
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
                              </Row>
                            </Col>
                          </Row>
                          <Row className="ml-4 mt-4">
                            <Col md={6}>
                              <h1 style={{fontWeight: '300', color: 'white'}}>Avis</h1>
                              <Row className="mt-4 mb-4">
                                <Col md={1}>
                                  <Image style={{width: '40px', height: '40px'}} src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle />
                                </Col>
                                <Col md={8}>
                                  <Form.Control onChange={this.handleChange} value={this.state.commentInput} className="inputComment" type="text" placeholder="Commenter" />
                                </Col>
                                <Col md={1} className="my-auto">
                                  <SendIcon className="report"  onClick={this.handleSendMessage} style={{color: "#7FB780", width: "1.5rem", height: "1.5rem"}}/>
                                </Col>
                              </Row>
                              {
                                !this.state.shopData.comment || this.state.shopData.comment.length === 0 ? "" : this.state.shopData.comment.map(x => this.handleComment(x))
                              }
                            </Col>
                            <Col md={6} className="pr-4">
                              <h1 style={{fontWeight: '300', color: 'white'}}>Description</h1>
                              <p style={{color: 'white'}}>
                                {this.state.shopData.userDescription ? this.state.shopData.userDescriptio : "Description non fourni"}
                              </p>
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
            </div>
        );
    }
}

export default withRouter(shopProfile)

// <Image className="iconProfileSocial ml-4 mt-2 editIcon" src={edit} onClick={() => {this.setState({visible: true})}} style={{width:'15px', height: '15px'}}/>
// <Modal centered show={this.state.visible} onHide={this.handleCloseRate}>
//  <Modal.Header closeButton>
//    <Modal.Title>Notez cette boutique</Modal.Title>
//  </Modal.Header>
//  <Modal.Body>
//    <Rate onChange={(e) => this.handleMark(e)} />
//  </Modal.Body>
//  <Modal.Footer>
//    <Button className="btnCancel" onClick={this.handleCloseRate}>
//      Annuler
//    </Button>
//    <Button className="btnInf" onClick={this.handleSendMark}>
//      Noter
//    </Button>
//  </Modal.Footer>
// </Modal>
