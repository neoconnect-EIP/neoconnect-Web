import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import {Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Input, InputAdornment, ListItemSecondaryAction} from "@material-ui/core";
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
import CreateIcon from '@material-ui/icons/Create';
import StarRatings from 'react-star-ratings';
import PlaceIcon from '@material-ui/icons/Place';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import noAvatar from "../../assets/noImageFindInf.jpg";
import snapchat from "../../assets/snapchat.svg";
import snapchatOff from "../../assets/snapchatOff.svg";
import tiktokOff from "../../assets/tiktokOff.svg";
import tiktok from "../../assets/tiktok.svg";
import twitch from "../../assets/twitch.svg";
import twitchOff from "../../assets/twitchOff.svg";
import pinterest from "../../assets/pinterest.svg";
import pinterestOff from "../../assets/pinterestOff.svg";
import instagram from "../../assets/instagram.svg";
import instagramOff from "../../assets/instagramOff.svg";
import youtube from "../../assets/youtube.svg";
import youtubeOff from "../../assets/youtubeOff.svg";
import facebook from "../../assets/facebook.svg";
import facebookOff from "../../assets/facebookOff.svg";
import twitter from "../../assets/twitter.svg";
import twitterOff from "../../assets/twitterOff.svg";
import { store } from 'react-notifications-component';

class InfluencerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infData: null,
            userData: null,
            visible: false,
            commentInput: "",
            signal: false,
            raison: "",
            info: "",
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
          .then(res => this.setState({infData: res}))
          .catch(error => console.error('Error:', error));
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
          .catch(error => console.error('Error:', error));
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

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
    };

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleResponse = (res) => {
        console.log("RES ", res.status);
        if (res && res.status == 200)
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
            .catch(error => console.error('Error:', error));
        this.setState({visible: false});
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
                <p style={{color: "#5f5f5f", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
                <p style={{color: "black", marginTop: "15px"}}>{x.comment}</p>
              </Col>
            </Row>
        )
    };

    handleOpen = () => {
      console.log("HELLO ", this.state.infData);
      this.setState({signal: true})
    }

    handleCloseRate = () => {
      this.setState({visible: false})
    }

    handleClose = () => {
      this.setState({signal: false})
    }

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleAnnonceReport(thisTmp) {
      this.setState({clickedSignal: true})
      console.log("Raison = ", thisTmp.state.raison);
      console.log(this.state.infData);
      console.log(this.state.raison);
      console.log(this.state.info);
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
              console.log("RES SIGNAL ", res);
              if (res.status == 200) {
                this.setState({signal: false});
                store.addNotification({
                  title: "Envoyé",
                  message: "Nous avons bien pris en compte votre signalement pour l'influenceur " + thisTmp.state.infData.pseudo,
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

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.infData && this.state.userData ?
                      <div>
                        <Modal centered show={this.state.visible} onHide={this.handleCloseRate}>
                         <Modal.Header closeButton>
                           <Modal.Title>Notez cette boutique</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                           <Rate onChange={(e) => this.handleMark(e)} />
                         </Modal.Body>
                         <Modal.Footer>
                           <Button variant="secondary" onClick={this.handleCloseRate}>
                             Annuler
                           </Button>
                           <Button variant="success" onClick={this.handleSendMark}>
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
                           <Button variant="secondary" onClick={this.handleClose}>
                             Annuler
                           </Button>
                           <Button variant="success" onClick={() => {this.handleAnnonceReport(this)}}>
                             Signaler
                           </Button>
                         </Modal.Footer>
                        </Modal>
                        <Row style={{boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", borderRadius: "0.25rem"}} className="m-2 ml-0">
                          <Col md={2} className="p-2 ml-4">
                            <Image style={{width: '200px', height: '200px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}} src={!this.state.infData.userPicture || this.state.infData.userPicture.length === 0 ? noAvatar : this.state.infData.userPicture[0].imageData} roundedCircle/>
                          </Col>
                          <Col md={3} className="pl-2 mt-4">
                            <Row className="ml-0">
                              <h1 style={{fontWeight: '300'}}>{this.state.infData.pseudo}</h1>
                              <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report ml-4"/>
                            </Row>
                            <Row className="ml-0">
                              <Col md={12} className="pl-0">
                                <PlaceIcon /> {this.state.infData.city ? this.state.infData.city : "Non renseigné"}
                              </Col>
                              <Col md={12} className="pl-0">
                                <EmailIcon /> {this.state.infData.email ? this.state.infData.email : "Non renseigné"}
                              </Col>
                              <Col md={12} className="pl-0">
                                <PhoneAndroidIcon /> {this.state.infData.phone ? this.state.infData.phone : "Non renseigné"}
                              </Col>
                                <Badge pill className="pill mt-2 mb-4">
                                  {this.state.infData.theme}
                                </Badge>
                            </Row>
                          </Col>
                          <Col md={3} className="mt-4">
                            <Row>
                              <h2 style={{fontWeight: '300'}}>
                                Note
                              </h2>
                            </Row>
                            {!this.state.infData.average && <p style={{fontWeight: '200'}}>Aucune note</p>}
                            <Row>
                              {this.state.infData.average &&
                              <p className="pt-1 mr-3">{this.state.infData.average}</p>}
                              <StarRatings
                                 rating={this.state.infData.average ? this.state.infData.average : 0}
                                 starRatedColor="#FFC106"
                                 numberOfStars={5}
                                 name='rating'
                                 starDimension="20px"
                               />
                              <CreateIcon onClick={() => {this.setState({visible: true})}} className="ml-4 mt-2 editIcon" style={{width:'15px', height: '15px'}}/>
                            </Row>
                          </Col>
                          <Col md={3}  className="mt-4">
                            <h2 style={{fontWeight: '300'}}>Réseaux sociaux</h2>
                            <Row className="ml-0 mt-2">
                              {this.state.infData.facebook ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.facebook}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={facebook}/>
                              </OverlayTrigger> : <Image className="iconProfileSocial" src={facebookOff}/>}
                              {this.state.infData.instagram ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.instagram}
                                  </Tooltip>
                                }
                              >
                              <Image className="iconProfileSocial" src={instagram}/>
                              </OverlayTrigger> : <Image src={instagramOff} className="iconProfileSocial"/>}
                              {this.state.infData.twitter ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.twitter}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={twitter}/>
                              </OverlayTrigger> : <Image className="iconProfileSocial" src={twitterOff}/>}
                              {this.state.infData.youtube ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.youtube}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={youtube}/>
                              </OverlayTrigger> : <Image className="iconProfileSocial" src={youtubeOff}/>}
                              {this.state.infData.snapchat ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.snapchat}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={snapchat}/>
                              </OverlayTrigger> : <Image className="iconProfileSocial" src={snapchatOff}/>}
                              {this.state.infData.tiktok ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.tiktok}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={tiktok}/>
                              </OverlayTrigger> : <Image className="iconProfileSocial" src={tiktokOff}/>}
                              {this.state.infData.pinterest ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.pinterest}
                                  </Tooltip>
                                }
                              >
                                <Image className="iconProfileSocial" src={pinterest}/>
                              </OverlayTrigger> : <Image className="iconProfileSocial" src={pinterestOff}/>}
                              {this.state.infData.twitch ? <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    {this.state.infData.twitch}
                                  </Tooltip>
                                }
                              >
                                <Image style={{width: '20px', height: '20px'}} src={twitch}/>
                              </OverlayTrigger> : <Image style={{width: '20px', height: '20px'}} src={twitchOff}/>}
                            </Row>
                          </Col>
                        </Row>
                        <Row className="ml-0">
                          <Col md={6} className="pl-0">
                            <Card className="ml-2" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                              <Card.Body>
                                <Card.Title>Avis</Card.Title>
                                <Card.Text>
                                  <Row className="mt-4 mb-4">
                                    <Col md={1}>
                                      <Image style={{width: '40px', height: '40px'}} src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle />
                                    </Col>
                                    <Col md={8}>
                                      <Form.Control onChange={this.handleChange} value={this.state.commentInput} className="inputComment" type="text" placeholder="Commenter" />
                                    </Col>
                                    <Col md={1}>
                                      <SendIcon className="report"  onClick={this.handleSendMessage} style={{color: "#7FB780", width: "1.5rem", height: "1.5rem"}}/>
                                    </Col>
                                  </Row>
                                  {
                                    !this.state.infData.comment || this.state.infData.comment.length === 0 ? "" : this.state.infData.comment.map(x => this.handleComment(x))
                                  }
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={6} className="pl-0">
                            <Card className="mr-2" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                              <Card.Body>
                                <Card.Title>À propos</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
            </Grid>
        );
    }
}

export default withRouter(InfluencerProfile)


// <Grid container>
//     <Modal open={this.state.visible} onClose={this.handleModal}>
//         <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
//             <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
//                 <Grid item xs={12}>
//                     <h3 style={{color: "black"}}>Notez cette influcenceur !</h3>
//                 </Grid>
//                 <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
//                     <Rate onChange={(e) => this.handleMark(e)} />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleSendMark}>Noter</Button>
//                 </Grid>
//             </Grid>
//         </Slide>
//     </Modal>
//     <Grid container justify="center" alignItems="center">
//         <Avatar alt="Avatar not found" src={!this.state.infData.userPicture || this.state.infData.userPicture.length === 0 ? "" : this.state.infData.userPicture[0].imageData} style={{width: "250px", height: "250px", position: "absolute", backgroundColor: "white", marginTop: "24rem", zIndex: "10", boxShadow: "0 0 10px"}}/>
//     </Grid>
//     <Grid item xs={12} style={{backgroundImage: `url(${!this.state.infData.userPicture || this.state.infData.userPicture.length === 0 ? "#292929" : this.state.infData.userPicture[0].imageData})`, backgroundSize: "cover", filter: "blur(8px)", backgroundPosition: "center", width: "100%", height: "500px", position: "fixed"}}>
//     </Grid>
//     <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "350px", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}}>
//         <Grid item style={{marginTop: "12rem", height: "auto", cursor: "pointer"}} xs={12}>
//             <h1 style={{textAlign: "center"}}>{this.state.infData.pseudo}</h1>
//         </Grid>
//         <Grid item xs={12} style={{marginTop: "4rem", textAlign: "center"}}>
//
//         </Grid>
//         <Grid item xs={12} md={5} style={{marginTop: "5rem", marginLeft: "4rem", textAlign: "center"}}>
//             <h1>Déscription</h1>
//             <h4 style={{marginTop: "2rem"}}>{this.state.infData.userDescription}</h4>
//         </Grid>
//         <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem", textAlign: "center"}}>
//             <h1 style={{textAlign: "center"}}>Note</h1>
//             <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`${this.state.infData.average ? this.state.infData.average.toFixed(1) : "0" }/5`}</h1>
//             <Button style={{height: "30px", backgroundColor: "black", color: 'white'}} onClick={this.handleModal}>Notez cette influenceur</Button>
//         </Grid>
//         <Grid item xs={12} style={{marginRight: "12.5rem", marginLeft: "12.5rem", marginTop: "5rem"}}>
//             <h2 style={{textAlign: "center"}}>Avis</h2>
//             <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "3.5rem"}}>
//                 <ListItem style={{height: "4.375rem"}}>
//                     <ListItemAvatar style={{marginRight: "1rem"}}>
//                         <Avatar alt="Avatar not found" src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? "" : this.state.userData.userPicture[0].imageData} style={{width: "40px", height: "40px"}}/>
//                     </ListItemAvatar>
//                     <ListItemText style={{borderBottom: "1px solid #292929"}}>
//                         <Input
//                             id="standard-adornment"
//                             placeholder="Commenter"
//                             name="commentInput"
//                             value={this.state.commentInput}
//                             onChange={this.handleChange}
//                             style={{width: "100%"}}
//                             onKeyPress={this.handleKeyPress}
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <Button
//                                         simple
//                                         onClick={this.handleSendMessage}
//                                         style={{marginTop: "-1rem"}}
//                                     >
//                                         <SendIcon style={{color: "#292929", width: "2rem", height: "2rem"}}/>
//                                     </Button>
//                                 </InputAdornment>
//                             }
//                         />
//                     </ListItemText>
//                 </ListItem>
//                 <ListItemSecondaryAction>
//                 </ListItemSecondaryAction>
//             </List>
//             <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem"}}>
//                 {
//                     this.state.infData.comment === null || this.state.infData.comment.length === 0 ?
//                         ""
//                         :
//                         this.state.infData.comment.map(x => this.handleComment(x))
//                 }
//             </List>
//         </Grid>
//     </Grid>
