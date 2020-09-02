import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {
    Avatar,
    List,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItem,
    ListItemText,
    Input, InputAdornment
} from '@material-ui/core';
import {Rate} from "antd";
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import avatar from "../../assets/avatar1.png";
import edit from "../../assets/edit.svg";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import { store } from 'react-notifications-component';

class adsItem extends React.Component{
    constructor(props) {
        super(props);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            userData: null,
            visible: false,
            adData: null,
            actualId: 0,
            fonction: "",
            mark: null,
            commentInput: "",
            signal: false,
            note: false,
            info: "",
            type:['', 'Mode', 'Cosmetique', 'Technologie', 'Nourriture', 'Jeux video', 'Sport/Fitness'],
            raison: "",
            commentData: null,
            urlId: parseInt(this.getUrlParams((window.location.search)).id, 10),
        };
    }

    componentDidMount = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("HELLO , ", res);return (res.json())})
            .then(res => this.setState({adData: res}))
            .catch(error => console.error('Error:', error));

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/me`, {method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({userData: res}))
            .catch(error => console.error('Error:', error));
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

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
        if (this.state.fonction) {
            this.setState({fonction: ""})
        } else {
            this.setState({fonction: fonction})
        }
    }

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleAnnonceSubscribe = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${this.state.adData.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              if (res.status === 200) {
                this.setState({visible: false});
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
        this.props.history.push("/dashboard/advertisements")
    }

    handleAnnonceNotation = (item) => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };

        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/mark/${parseInt(id.id)}`,
          {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => {
              this.setState({note: false})
            })
            .catch(error => console.error('Error:', error));
        this.handleModal("")
    }

    displayImage = (item, id) => {
        return (
            <Carousel.Item key={id} style={{maxHeight: '400px'}}>
              <img
                style={{objectFit: "contain", maxHeight: '400px'}}
                className="d-block"
                src={item.imageData}
                alt="product img"
              />
            </Carousel.Item>
        )
    }

    handleSendMessage = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/comment/${id.id}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""})
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleAnnonceReport = () => {
      this.setState({clickedSignal: true})
      var name = this.state.adData.productName;
      if (this.state.raison) {
        let body = {
            "offerName": this.state.adData.productName,
            "subject": this.state.raison,
            "message": this.state.info,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/report/${this.state.adData.id}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              res.json();
              if (res.status === 200) {
                this.setState({signal: false, raison: "", info: ""});
                store.addNotification({
                  title: "Envoyé",
                  message: "Nous avons bien pris en compte votre signalement pour l'offre " + name,
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

    handleComment = (x) => {
        return (
            <ListItem key={x.id} style={{height: "4.375rem", marginBottom: "2rem"}}>
                <ListItemAvatar style={{marginRight: "1rem"}}>
                    <Avatar src={x.avatar}/>
                    <p>{x.pseudo}</p>
                </ListItemAvatar>
                <ListItemText>
                    <p style={{color: "#5f5f5f", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
                    <p style={{color: "black", marginTop: "12px"}}>{x.comment}</p>
                </ListItemText>
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    handleOpen = () => {
      this.setState({signal: true})
    }

    handleClose = () => {
      this.setState({signal: false, raison: "", clickedSignal: false, info: ""})
    }

    handleOpenNote = () => {
      this.setState({note: true})
    }

    handleCloseNote = () => {
      this.setState({note: false, raison: ""})
    }

    render() {
      console.log("WEI ", this.state.adData);
        return (
            <div justify="center" className="infBg">

                  <Modal centered show={this.state.signal} onHide={this.handleClose}>
                   <Modal.Header closeButton>
                     <Modal.Title>Signaler cette offre</Modal.Title>
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

                  <Modal centered show={this.state.note} onHide={this.handleCloseNote}>
                   <Modal.Header closeButton>
                     <Modal.Title>Noter cette offre</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                      <Rate onChange={(e) => this.handleMark(e)} />
                   </Modal.Body>
                   <Modal.Footer>
                     <Button className="btnCancel" onClick={this.handleClose}>
                       Annuler
                     </Button>
                     <Button className="btnInf" onClick={() => this.handleAnnonceNotation(this.state.adData)}>
                       Noter
                     </Button>
                   </Modal.Footer>
                  </Modal>
                {
                  this.state.adData &&
                  <Row className="p-4">
                    <Col md={6}>
                      <Carousel controls={true} style={{height: '400px'}}>
                        {
                            this.state.adData.productImg ?
                            this.state.adData.productImg.map((item, id) => this.displayImage(item, id)) :
                            <p>No image</p>
                        }
                      </Carousel>
                    </Col>
                    <Col md={4}>
                        <h6 style={{color: 'white'}}>{this.state.adData.productType}</h6>
                          <div style={{ textAlign:'left'}}>
                            <h3 style={{marginTop: "2rem", color: 'white', display: "inline"}}>{this.state.adData.brand ? this.state.adData.brand : "Sans marque"}</h3>
                            <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red', display: "inline", marginLeft: '5px'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
                          </div>

                        <h3 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.productName ? this.state.adData.productName : "Sans nom"}</h3>
                        <h4 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{"Sex: " + (this.state.adData.productSex ? this.state.adData.productSex : "Non défini")}</h4>
                        <Row className="m-0 p-0">
                          <h4 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{`Note: ${this.state.adData.average ? this.state.adData.average.toFixed(1) : "0"}/5`}</h4>
                          <Image className="ml-4 mt-4" src={edit} style={{width: '15px', height: '15px'}} onClick={() => this.handleOpenNote()}/>
                        </Row>
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.productSubject ?  `Article: ${this.state.type[this.state.adData.productSubject]}` : ""}</h5>
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{`${this.state.adData.productDesc ? this.state.adData.productDesc : ""}`}</h5>
                        <Button onClick={() => this.handleAnnonceSubscribe()} className="btnInf">Postuler</Button>
                    </Col>
                    <Col md={8} className="mt-4">
                      <h2 style={{textAlign: "center", color: 'white'}}>Avis</h2>
                             <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "3.5rem"}}>
                                 <ListItem style={{height: "4.375rem"}}>
                                     <ListItemAvatar style={{marginRight: "1rem"}}>
                                         <Avatar alt="Avatar not found" src={avatar} style={{width: "40px", height: "40px"}}/>
                                     </ListItemAvatar>
                                     <ListItemText style={{borderBottom: "1px solid #292929"}}>
                                         <Input
                                             id="standard-adornment"
                                             placeholder="Commenter"
                                             name="commentInput"
                                             value={this.state.commentInput}
                                             onChange={this.handleChange}
                                             style={{width: "100%"}}
                                             endAdornment={
                                                 <InputAdornment position="end">
                                                     <Button
                                                         onClick={this.handleSendMessage}
                                                         style={{marginTop: "-1rem", backgroundColor: 'transparent', borderColor: "transparent"}}
                                                     >
                                                         <SendIcon style={{color: "white", width: "2rem", height: "2rem"}}/>
                                                     </Button>
                                                 </InputAdornment>
                                             }
                                         />
                                     </ListItemText>
                                 </ListItem>
                             </List>
                    </Col>
                  </Row>
                }
            </div>
        );
    }
}

export default withRouter(adsItem)

//
// <Grid container style={{padding: "30px"}}>
//     <Grid item xs={12} md={7} style={{padding: "30px", height: "auto", borderRight: "2px solid #292929"}}>
//         <Carousel style={{height: "auto"}} showThumbs={false} infiniteLoop={true} centerSlidePercentage={80}>
//             {
//                 this.state.adData.productImg ?
//                     this.state.adData.productImg.map(x => this.displayImage(x))
//                     :
//                     <Grid container style={{height: "auto", backgroundColor: "#ffffff"}} justify="center" alignItems="flex-start">
//                         <img src={noImages} style={{width: "200px", height: "800px", marginTop: "10px"}} alt="MISSING JPG"/>
//                     </Grid>
//             }
//         </Carousel>
//     </Grid>
//     <Grid item xs={12} md={5} style={{padding: "3.125rem", paddingLeft: "1.25rem"}}>
//         <h6 style={{color: 'white'}}>{this.state.adData.productType}</h6>
//           <div style={{ textAlign:'left'}}>
//             <h3 style={{marginTop: "2rem", color: 'white', display: "inline"}}>{this.state.adData.brand ? this.state.adData.brand : "Sans marque"}</h3>
//             <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red', display: "inline", marginLeft: '5px'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
//           </div>
//
//         <h3 style={{marginTop: "2rem", color: 'white'}}>{this.state.adData.productName ? this.state.adData.productName : "Sans nom"}</h3>
//         <h4 style={{marginTop: "2rem", marginBottom: "2rem", color: 'white'}}>{`Sex: ${this.state.adData.productSex}`}</h4>
//         <Button onClick={() => this.handleAnnonceSubscribe()} className="btnInf">S'ABONNER</Button>
//         <h4 style={{marginTop: "1rem", color: 'white'}}>{`Note: ${this.state.adData.average ? this.state.adData.average.toFixed(1) : "0"}/5`}</h4>
//         <Button onClick={() => this.handleOpenNote()}  className="btnInf">Noter</Button>
//
//         <h5 style={{marginTop: "3rem", color: 'white'}}>{this.state.adData.productSubject ?  `Article: ${this.state.adData.productSubject}` : ""}</h5>
//         <h5 style={{marginTop: "3rem", color: 'white'}}>{`${this.state.adData.productDesc ? this.state.adData.productDesc : ""}`}</h5>
//     </Grid>
//     <Grid item xs={12} style={{marginRight: "12.5rem", marginLeft: "12.5rem", marginTop: "5rem"}}>
//         <h2 style={{textAlign: "center", color: 'white'}}>Avis</h2>
//         <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "3.5rem"}}>
//             <ListItem style={{height: "4.375rem"}}>
//                 <ListItemAvatar style={{marginRight: "1rem"}}>
//                     <Avatar alt="Avatar not found" src={avatar} style={{width: "40px", height: "40px"}}/>
//                 </ListItemAvatar>
//                 <ListItemText style={{borderBottom: "1px solid #292929"}}>
//                     <Input
//                         id="standard-adornment"
//                         placeholder="Commenter"
//                         name="commentInput"
//                         value={this.state.commentInput}
//                         onChange={this.handleChange}
//                         style={{width: "100%"}}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <Button
//                                     onClick={this.handleSendMessage}
//                                     style={{marginTop: "-1rem", backgroundColor: 'transparent', borderColor: "transparent"}}
//                                 >
//                                     <SendIcon style={{color: "white", width: "2rem", height: "2rem"}}/>
//                                 </Button>
//                             </InputAdornment>
//                         }
//                     />
//                 </ListItemText>
//             </ListItem>
//             <ListItemSecondaryAction>
//             </ListItemSecondaryAction>
//         </List>
//         <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem"}}>
//             {
//                 this.state.adData.comment.map(x => this.handleComment(x))
//             }
//         </List>
//     </Grid>
// </Grid>

// :
//     <Loader
//         type="Triangle"
//         color="#292929"
//         height={200}
//         width={200}
//         style={{marginTop: "14rem"}}
//     />
