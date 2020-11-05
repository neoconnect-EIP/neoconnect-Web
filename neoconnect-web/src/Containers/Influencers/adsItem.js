import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Rate} from "antd";
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import avatar from "../../assets/noImageFindInf.jpg";
import edit from "../../assets/edit.svg";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import { store } from 'react-notifications-component';
import LoadingOverlay from 'react-loading-overlay';
import StarIcon from '@material-ui/icons/Star';
import noImages from "../../assets/noImages.jpg";
import { showNotif } from '../Utils.js';

class adsItem extends React.Component{
    constructor(props) {
        super(props);
        console.log("props", props.location.state);

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
            pseudo: '',
            email: '',
            commentInput: "",
            emailMe: '',
            signal: false,
            note: false,
            info: "",
            share: false,
            type:['', 'Mode', 'Cosmetique', 'High Tech', 'Nourriture', 'Jeux video', 'Sport/Fitness'],
            raison: "",
            isActive: false,
            urlId: localStorage.getItem("Jwt") ? parseInt(this.props.match.params.id) : 0,
            link: window.location.href,
            suggestions: null,
            applied: props.location.state,
        };
    }

    getDetailOffer = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {return (res.json())})
          .then(res => this.setState({adData: res}))
          .catch(error => console.error('Error:', error));

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/suggestion/`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status >= 400)
              throw res;
            return res.json();
          })
          .then(res => this.setState({suggestions: res}))
          .catch(error => console.error('Error:', error));
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/offer/applied/${localStorage.getItem("userId")}`, {method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => res.json())
          .then(res => {this.setState({applied: res})})
          .catch(error => console.error('Error:', error));
    }

    componentDidMount = () => {
      if (localStorage.getItem("Jwt"))
        this.getDetailOffer();
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
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${this.state.adData.id}`,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => {
            if (res.status >= 400)
              throw res;
            return res.json()
          })
          .then(res => {
            this.getDetailOffer();
          })
          .catch(error => {
            showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText);
          });
        // this.props.history.push("/dashboard/advertisements")
    }

    handleResponse = async (res) => {
      var msg = await res.json();

      if (res.status === 200) {
        store.addNotification({
          title: "Envoyé",
          message: "Nous avons bien envoyé votre message",
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
        this.setState({share: false, email: '', pseudo: '', emailMe: ''})
      }
      else {
        store.addNotification({
          title: "Erreur",
          message: msg,
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
      this.setState({isActive: false});
    }

    searchRes = async (res) => {
      var msg = await res.json();

      if (res.status === 200) {
        let body = {
            'message': this.state.link,
            'userId': msg.id.toString(),
        };
        body = JSON.stringify(body);

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/message`,
          {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => this.handleResponse(res))
          .catch(error => console.error('Error:', error));
      }
      else {
        store.addNotification({
          title: "Erreur",
          message: msg,
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

    sendMsg = () => {
      this.setState({isActive: true, share: false});

      var encodedKey = encodeURIComponent("pseudo");
      var encodedValue = encodeURIComponent(this.state.pseudo);
      var formBody = encodedKey + "=" + encodedValue;


      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/search`, {
          method: 'POST',
          body: formBody,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      }).then(res => this.searchRes(res))
        .catch(error => console.error('Error:', error));
    }

    sendEmail = () => {
        this.setState({isActive: true, share: false});
        var body = {
            "pseudo": localStorage.getItem("pseudo"),
            "email": this.state.emailMe,
            "subject": "Partage lien d'offre",
            "message": "Je te partage l'offre : " + this.state.link,
            "to": this.state.email,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/contact`, {
           method: 'POST',
           body: body,
           headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => {this.handleResponse(res)})
          .catch(error => this.setState({isActive: false}));
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
              this.setState({note: false});
              this.getDetailOffer();
            })
            .catch(error => console.error('Error:', error));
        this.handleModal("")
    }

    displayImage = (item, id) => {
        return (
            <Carousel.Item key={id} style={{maxHeight: '400px'}}>
              <img
                style={{objectFit: "contain", maxHeight: '350px'}}
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
            .then(res => { res.json(); this.getDetailOffer();})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""})
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
          <Row key={x.id} xs={3} md={3} lg={3} sm={3} xl={3}>
            <Col xs={2} md={2} lg={2} sm={2} xl={2} className="centerBlock">
              <div className="centerBlock" align="center">
                <Image style={{width: '40px', height: '40px'}} src={x.avatar ? x.avatar : avatar} roundedCircle />
                <p style={{fontWeight: '200'}}>{x.pseudo}</p>
              </div>
            </Col>
            <Col>
              <p style={{color: "white", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
              <p style={{color: "white", marginTop: "15px"}}>{x.comment}</p>
            </Col>
          </Row>
        )
    }

    handleGlobalAnnonce = (id) => {
      window.location.pathname = `/dashboard/item/${id}`;
      //window.location.reload(false);
      // this.getDetailOffer();
    }


    displaySuggestion = (item) => {
        return (
          <Col key={item.id}>
            <Card className="mt-4 ml-2 report" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
              <Card.Img style={{height: '160px', objectFit: 'cover'}} className="card" onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={!item.productImg || item.productImg.length === 0 ? noImages : item.productImg[0].imageData}  alt="MISSING JPG"/>
              <Card.Body>
                <Card.Title>{item.productName ? item.productName : "Sans nom"}</Card.Title>
                <Row className="ml-1">
                  <p>{item.average ? item.average.toFixed(1) + '/5' : "Aunce note"}</p>
                  <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                </Row>
              </Card.Body>
            </Card>
          </Col>
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

    handleCloseShare = () => {
      this.setState({share: false})
    }

    handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          if (res.status >= 400)
            throw res;
          return res.json()
        })
        .then(res => {
          this.getDetailOffer();
        })
        .catch(error => {
          showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText);
        });
    };

    render() {
      console.log("sugg ", this.state.suggestions);
        return (
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Chargement...'
            >
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

                  <Modal centered show={this.state.share} onHide={this.handleCloseShare}>
                   <Modal.Header closeButton>
                     <Modal.Title>Partager</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <Form>
                      <Form.Group controlId="formBasiclink">
                        <Form.Label>Lien à  partager</Form.Label>
                        <Form.Control value={this.state.link} onChange={(e) => {this.setState({link: e.target.value})}}/>
                      </Form.Group>
                      <Form.Row className='mt-2'>
                       <Form.Group controlId="formBasicEmail" as={Col}>
                         <Form.Label>Email du destinataire</Form.Label>
                         <Form.Control value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}}/>
                       </Form.Group>
                       <Form.Group controlId="formBasicEmail" as={Col}>
                         <Form.Label>Votre email</Form.Label>
                         <Form.Control value={this.state.emailMe} onChange={(e) => {this.setState({emailMe: e.target.value})}}/>
                       </Form.Group>
                     </Form.Row>
                     <Button onClick={() => this.sendEmail()} className="btnInf ml-2">Via email</Button>

                      <Form.Row className='mt-4'>
                       <Form.Group controlId="formBasicEmail" as={Col} sm={6}>
                         <Form.Label>Pseudo du destinataire</Form.Label>
                         <Form.Control value={this.state.pseudo} onChange={(e) => {this.setState({pseudo: e.target.value})}}/>
                       </Form.Group>
                      </Form.Row>
                      <Button onClick={() => this.sendMsg()} className="btnInf ml-2">Via message privé</Button>


                    </Form>
                   </Modal.Body>
                  </Modal>
                {
                  this.state.adData &&
                  <>
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
                          <h4 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>Note: {this.state.adData.average ? (this.state.adData.average.toFixed(1) + '/5') : "Aucune note"}</h4>
                        </Row>
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.productSubject ?  `Article: ${this.state.adData.productSubject}` : ""}</h5>
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{`${this.state.adData.productDesc ? this.state.adData.productDesc : ""}`}</h5>
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.color ? `Couleur: ${this.state.adData.color}` : ""}</h5>
                        {
                          this.state.applied.some(el => el.idOffer === this.state.adData.id) ?
                          <Button onClick={() => this.handleDelete(this.state.adData.id)} className="btnInf">Annuler</Button>:
                          <Button onClick={() => this.handleAnnonceSubscribe()} className="btnInf">Postuler</Button>
                          }
                        <Button onClick={() => this.setState({share: true})} className="btnInf ml-2">Partager</Button>
                    </Col>
                  </Row>
                  <Row className="mr-2 pb-4">
                    <Col md={6} className="mt-4">
                      <h2 style={{fontWeight: '300', color: 'white'}} className="ml-4" >Avis</h2>
                      <Row className="mt-4 mb-4" xs={3} md={3} lg={3} sm={3} xl={3}>
                        <Col xs={2} md={2} lg={2} sm={2} xl={2} className="centerBlock">
                          {this.state.userData &&
                            <div className="centerBlock" align="center">
                          <Image style={{width: '40px', height: '40px'}} src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? avatar : this.state.userData.userPicture[0].imageData} roundedCircle />
                        </div>}
                        </Col>
                        <Col xs={8} md={8} lg={8} sm={8} xl={8}>
                          <Form.Control onChange={(e) => {this.setState({commentInput: e.target.value})}} value={this.state.commentInput} className="inputComment" type="text" placeholder="Commenter" />
                        </Col>
                        <Col xs={1} md={1} lg={1} sm={1} xl={1} className="my-auto">
                          <SendIcon className="report"  onClick={this.handleSendMessage} style={{color: "#7FB780", width: "1.5rem", height: "1.5rem"}}/>
                        </Col>
                      </Row>
                      {
                        this.state.adData && this.state.adData.comment && this.state.adData.comment.length > 0 && this.state.adData.comment.map(x => this.handleComment(x))
                      }
                    </Col>
                    <Col md={6} className="mt-4">
                      <h2 style={{fontWeight: '300', color: 'white'}} className="ml-4" >Suggestion</h2>
                      <Row xs={1} md={2} lg={2} sm={2} xl={3}>
                        {!this.state.suggestions || this.state.suggestions.length > 0 && this.state.suggestions != 'No Data' && this.state.suggestions.map(item => this.displaySuggestion(item))}
                      </Row>
                      {!this.state.suggestions && <h5 style={{fontWeight: '300', color: 'white'}} className="ml-4 mt-3" >Aucune suggestion trouvé</h5>}
                      </Col>
                    </Row>
                  </>
                }
            </div>
          </LoadingOverlay>
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

// <h2 style={{textAlign: "center", color: 'white', marginTop: "2rem", fontWeight: '400'}}>Avis</h2>
//        <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "1rem"}}>
//            <ListItem style={{height: "4.375rem"}}>
//                <ListItemAvatar style={{marginRight: "1rem"}}>
//                    <Avatar alt="Avatar not found" src={avatar} style={{width: "40px", height: "40px"}}/>
//                </ListItemAvatar>
//                <ListItemText style={{borderBottom: "1px solid #292929"}}>
//                    <Input
//                        id="standard-adornment"
//                        placeholder="Commenter"
//                        name="commentInput"
//                        value={this.state.commentInput}
//                        onChange={this.handleChange}
//                        style={{width: "100%"}}
//                        endAdornment={
//                            <InputAdornment position="end">
//                                <Button
//                                    onClick={this.handleSendMessage}
//                                    style={{marginTop: "-1rem", backgroundColor: 'transparent', borderColor: "transparent"}}
//                                >
//                                    <SendIcon style={{color: "white", width: "2rem", height: "2rem"}}/>
//                                </Button>
//                            </InputAdornment>
//                        }
//                    />
//                </ListItemText>
//            </ListItem>
//        </List>

// <Modal centered show={this.state.note} onHide={this.handleCloseNote}>
//  <Modal.Header closeButton>
//    <Modal.Title>Noter cette offre</Modal.Title>
//  </Modal.Header>
//  <Modal.Body>
//     <Rate onChange={(e) => this.handleMark(e)} />
//  </Modal.Body>
//  <Modal.Footer>
//    <Button className="btnCancel" onClick={this.handleClose}>
//      Annuler
//    </Button>
//    <Button className="btnInf" onClick={() => this.handleAnnonceNotation(this.state.adData)}>
//      Noter
//    </Button>
//  </Modal.Footer>
// </Modal>

// <Image className="ml-4 mt-4 report" src={edit} style={{width: '15px', height: '15px'}} onClick={() => this.handleOpenNote()}/>
