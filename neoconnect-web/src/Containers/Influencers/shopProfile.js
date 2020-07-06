import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {
    Grid,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    InputAdornment,
    Input,
} from '@material-ui/core';
import { Rate } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultShopProfilePic from "../../assets/defaultShopProfilePic.jpg"
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
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import PlaceIcon from '@material-ui/icons/Place';
import StarRatings from 'react-star-ratings';
import CreateIcon from '@material-ui/icons/Create';
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

class shopProfile extends React.Component{
    constructor(props) {
        super(props);
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
            clickedSignal: false
        };
    }

    getShopData = () => {
      let id = this.getUrlParams((window.location.search));

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/${id.id}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => res.json())
          .then(res => {console.log("SHOP = ", res);this.setState({shopData: res})})
          .catch(error => console.error('Error:', error));
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
        console.log("RES ", res.status);
        if (res && res.status == 200)
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
            .then(res => { console.log("RES", res);res.json(); this.handleResponse(res)})
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
                <p style={{color: "#5f5f5f", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
                <p style={{color: "black", marginTop: "15px"}}>{x.comment}</p>
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
      this.setState({signal: false, raison: "", clickedSignal: false})
    }

    handleCloseRate = () => {
      this.setState({visible: false})
    }

    handleOpen = () => {
      this.setState({signal: true})
    }

    handleAnnonceReport(thisTmp) {
      this.setState({clickedSignal: true})
      console.log("RAIson = ", thisTmp.state.raison);
      console.log(this.state.shopData);
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
              console.log("RES SIGNAL ", res);
              if (res.status == 200) {
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

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.shopData && this.state.userData ?
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
                             <Button variant="secondary" onClick={this.handleClose}>
                               Annuler
                             </Button>
                             <Button variant="success" onClick={() => {this.handleAnnonceReport(this)}}>
                               Signaler
                             </Button>
                           </Modal.Footer>
                          </Modal>
                          <Row className="pt-4 ml-4">
                            <Col md={3}>
                              <Image style={{width: '250px', height: '230px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}  src={(!this.state.shopData.userPicture || this.state.shopData.userPicture.length == 0) ? noShop : this.state.shopData.userPicture[0].imageData} rounded />
                            </Col>
                            <Col md={3} className="pt-2">
                              <Row className="ml-0">
                                <h1 style={{fontWeight: '300', marginRight: '25px'}}>{this.state.shopData.pseudo}</h1>
                                <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
                              </Row>
                              <PlaceIcon /> {this.state.shopData.city ? this.state.shopData.city : "Non renseigné"}
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
                            </Col>
                            <Col md={4} className="pt-2 ml-2">
                              <Row>
                                <h2 style={{fontWeight: '300'}}>
                                  Note
                                </h2>
                              </Row>

                              {!this.state.shopData.average && <p style={{fontWeight: '200'}}>Aucune note</p>}
                              <Row>
                                {this.state.shopData.average &&
                                <p className="pt-1 mr-3">{this.state.shopData.average}</p>}
                                <StarRatings
                                   rating={this.state.shopData.average ? this.state.shopData.average : 0}
                                   starRatedColor="#FFC106"
                                   numberOfStars={5}
                                   name='rating'
                                   starDimension="20px"
                                 />
                                <CreateIcon onClick={() => {this.setState({visible: true})}} className="ml-4 mt-2 editIcon" style={{width:'15px', height: '15px'}}/>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="ml-4 mt-4">
                            <Col md={6}>
                              <h1 style={{fontWeight: '300'}}>Avis</h1>
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
                                !this.state.shopData.comment || this.state.shopData.comment.length === 0 ? "" : this.state.shopData.comment.map(x => this.handleComment(x))
                              }
                            </Col>
                            <Col md={6} className="pr-4">
                              <h1 style={{fontWeight: '300'}}>Description</h1>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
            </Grid>
        );
    }
}

export default withRouter(shopProfile)

// <Grid item xs={12}>
//     <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "3.5rem"}}>
//         <ListItem style={{height: "4.375rem"}}>
//             <ListItemAvatar style={{marginRight: "1rem"}}>
//                 <Avatar alt="Avatar not found" src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? "" : this.state.userData.userPicture[0].imageData} style={{width: "40px", height: "40px"}}/>
//             </ListItemAvatar>
//             <ListItemText style={{borderBottom: "1px solid #292929"}}>
//                 <Input
//                     id="standard-adornment"
//                     placeholder="Commenter"
//                     name="commentInput"
//                     value={this.state.commentInput}
//                     onChange={this.handleChange}
//                     style={{width: "100%"}}
//                     onKeyPress={this.handleKeyPress}
//                     endAdornment={
//                         <InputAdornment position="end">
//                            <div className="report"
//                                onClick={this.handleSendMessage}
//                                style={{marginTop: "-1rem"}}
//                            >
//                                <SendIcon style={{color: "#292929", width: "2rem", height: "2rem"}}/>
//                            </div>
//                        </InputAdornment>
//                    }
//                 />
//             </ListItemText>
//         </ListItem>
//         <ListItemSecondaryAction>
//         </ListItemSecondaryAction>
//     </List>
//     <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem"}}>
//         {
//             !this.state.shopData.comment || this.state.shopData.comment.length === 0 ?
//                 ""
//                 :
//                 this.state.shopData.comment.map(x => this.handleComment(x))
//         }
//     </List>
// </Grid>


// <Avatar alt="Avatar not found" src={(!this.state.shopData.userPicture || this.state.shopData.userPicture.length == 0) ? noShop : this.state.shopData.userPicture[0].imageData} style={{width: "250px", height: "250px", position: "absolute", backgroundColor: "white", marginTop: "24rem", zIndex: "10", boxShadow: "0 0 10px"}}/>

// <Grid container justify="center" alignItems="center">
//     <Avatar alt="Avatar not found" src={(!this.state.shopData.userPicture || this.state.shopData.userPicture.length == 0) ? noShop : this.state.shopData.userPicture[0].imageData} style={{width: "250px", height: "250px", position: "absolute", backgroundColor: "white", marginTop: "24rem", zIndex: "10", boxShadow: "0 0 10px"}}/>
// </Grid>
// <Grid item style={{backgroundImage: `url(${this.state.shopData.shopBanner ? this.state.shopData.shopBanner : defaultShopProfilePic})`, backgroundSize: "cover", backgroundPosition: "center center", width: "100%", height: "500px", position: "fixed"}}>
// </Grid>
// <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "19rem", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}}>
//     <Grid item xs={12} style={{marginTop: "14rem", height: "auto", cursor: "pointer"}}>
//         <h1 style={{textAlign: "center"}} onClick={() => this.consultShop(this.state.shopData.website)}>{this.state.shopData.pseudo}</h1>
//         <Button variant="outline-danger" onClick={() => {this.handleOpen()}}>Signaler</Button>
//     </Grid>
//     <Grid item xs={12} md={5} style={{marginTop: "5rem", marginLeft: "4rem"}}>
//         <h1>Déscription</h1>
//         <h4 style={{marginTop: "2rem"}}>{this.state.shopData.userDescription}</h4>
//     </Grid>
//     <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem", textAlign: "center"}}>
//         <h1 style={{textAlign: "center"}}>Note</h1>
//         <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`${this.state.shopData.average ? this.state.shopData.average.toFixed(1) : "0" }/5`}</h1>
//         <Button style={{height: "30px", backgroundColor: "black", color: 'white'}} onClick={this.handleModal}>Notez cette boutique</Button>
//     </Grid>
//     <Grid item xs={12} style={{marginRight: "12.5rem", marginLeft: "12.5rem", marginTop: "5rem"}}>
//         <h2 style={{textAlign: "center"}}>Avis</h2>
//         <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "3.5rem"}}>
//             <ListItem style={{height: "4.375rem"}}>
//                 <ListItemAvatar style={{marginRight: "1rem"}}>
//                     <Avatar alt="Avatar not found" src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? "" : this.state.userData.userPicture[0].imageData} style={{width: "40px", height: "40px"}}/>
//                 </ListItemAvatar>
//                 <ListItemText style={{borderBottom: "1px solid #292929"}}>
//                     <Input
//                         id="standard-adornment"
//                         placeholder="Commenter"
//                         name="commentInput"
//                         value={this.state.commentInput}
//                         onChange={this.handleChange}
//                         style={{width: "100%"}}
//                         onKeyPress={this.handleKeyPress}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                <Button
//                                    onClick={this.handleSendMessage}
//                                    style={{marginTop: "-1rem"}}
//                                >
//                                    <SendIcon style={{color: "#292929", width: "2rem", height: "2rem"}}/>
//                                </Button>
//                            </InputAdornment>
//                        }
//                     />
//                 </ListItemText>
//             </ListItem>
//             <ListItemSecondaryAction>
//             </ListItemSecondaryAction>
//         </List>
//         <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem"}}>
//             {
//                 !this.state.shopData.comment || this.state.shopData.comment.length === 0 ?
//                     ""
//                     :
//                     this.state.shopData.comment.map(x => this.handleComment(x))
//             }
//         </List>
//     </Grid>
// </Grid>


// <Modal open={this.state.visible} onClose={this.handleModal}>
//     <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
//         <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
//             <Grid item xs={12}>
//                 <h3 style={{color: "black"}}>Notez cette boutique !</h3>
//             </Grid>
//             <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
//                 <Rate onChange={(e) => this.handleMark(e)} />
//             </Grid>
//             <Grid item xs={12}>
//                 <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleSendMark}>Noter</Button>
//             </Grid>
//         </Grid>
//     </Slide>
// </Modal>
