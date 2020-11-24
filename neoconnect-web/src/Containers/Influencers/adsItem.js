import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import avatar from "../../assets/noImageFindInf.jpg";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import LoadingOverlay from 'react-loading-overlay';
import { showNotif } from '../Utils.js';
import edit from "../../assets/edit.svg";
import {Rate} from "antd";
import Loader from 'react-loader-spinner';

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
            mark: null,
            pseudo: '',
            email: '',
            commentInput: "",
            emailMe: '',
            signal: false,
            note: false,
            info: "",
            share: false,
            raison: "",
            isActive: false,
            urlId: localStorage.getItem("Jwt") ? parseInt(this.props.match.params.id) : 0,
            link: window.location.href,
            suggestions: null,
            applied: props.location.state ? props.location.state : [],
        };
    }

    getDetailOffer = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {return (res.json())})
          .then(res => this.setState({adData: res}))
          .catch(error => showNotif(true, "Erreur",null));

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/offer/applied/${localStorage.getItem("userId")}`, {method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => res.json())
          .then(res => {this.setState({applied: res})})
          .catch(error => showNotif(true, "Erreur",null));
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
            if (res.status === 200)
              return (res.json());
          })
          .then(res => {
            this.getDetailOffer();
          })
          .catch(error => {
            showNotif(true, "Erreur", null);
          });
        // this.props.history.push("/dashboard/advertisements")
    }

    handleResponse = async (res) => {
      var msg = await res.json();

      if (res.status === 200) {
        showNotif(false, "Envoyé", "Nous avons bien envoyé votre message");
        this.setState({share: false, email: '', pseudo: '', emailMe: ''})
      }
      else {
        showNotif(true, "Erreur", msg);
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
          .catch(error => showNotif(true, "Erreur",null));
      }
      else {
        showNotif(true, "Erreur", msg);
      }
    }

    // sendMsg = () => {
    //   this.setState({isActive: true, share: false});
    //
    //   var encodedKey = encodeURIComponent("pseudo");
    //   var encodedValue = encodeURIComponent(this.state.pseudo);
    //   var formBody = encodedKey + "=" + encodedValue;
    //
    //   fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/search`, {
    //       method: 'POST',
    //       body: formBody,
    //       headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //           "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
    //   }).then(res => this.searchRes(res))
    //     .catch(error => showNotif(true, "Erreur",null));
    // }

  sendEmail = () => {
    if (this.state.emailMe && this.state.email) {
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
        .catch(error => {
          this.setState({isActive: false});
          showNotif(true, "Erreur",null);
        });
      }
      else {
        showNotif(true, "Erreur", "Veuillez remplir tout les champs.");
      }
    }

  handleAnnonceNotation = (item) => {
    let body = {
        "mark": this.state.mark,
    };

    body = JSON.stringify(body);
    fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/mark/${parseInt(this.state.urlId)}`,
      {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => res.json())
      .then(res => {
        this.setState({note: false});
        this.getDetailOffer();
      })
      .catch(error => showNotif(true, "Erreur",null));
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
      let body = {
          "comment": this.state.commentInput,
      };
      body = JSON.stringify(body);
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/comment/${this.state.urlId}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => { res.json(); this.getDetailOffer();})
          .catch(error => showNotif(true, "Erreur",null));
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
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/report/${this.state.adData.id}`,
      {
        method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {
        res.json();
        if (res.status === 200) {
          this.setState({signal: false, raison: "", info: ""});
          showNotif(false, "Envoyé", "Nous avons bien pris en compte votre signalement pour l'offre " + name);
        }
      }).catch(error => showNotif(true, "Erreur",null));
    }
  }

  handleComment = (x) => {
      return (
        <Row key={x.id} xs={3} md={3} lg={3} sm={3} xl={3} className="pl-4">
          <Col xs={2} md={2} lg={2} sm={2} xl={2}>
            <div className="centerBlock" align="center">
              <Image style={{width: '40px', height: '40px'}} src={x.avatar ? x.avatar : avatar} roundedCircle />
              <p style={{fontWeight: '200', color: 'white'}}>{x.pseudo}</p>
            </div>
          </Col>
          <Col>
            <p style={{color: "white", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
            <p style={{color: "white", marginTop: "15px"}}>{x.comment}</p>
          </Col>
        </Row>
      );
  }

  handleGlobalAnnonce = (id) => {
    window.location.pathname = `/dashboard/item/${id}`;
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
      if (res.status === 200)
        return (res.json());
    })
    .then(res => {
      this.getDetailOffer();
    })
    .catch(error => showNotif(true, "Erreur", null));
  };

    render() {
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
                     <Form.Label>Email du destinataire*</Form.Label>
                     <Form.Control value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}}/>
                   </Form.Group>
                   <Form.Group controlId="formBasicEmail" as={Col}>
                     <Form.Label>Votre email*</Form.Label>
                     <Form.Control value={this.state.emailMe} onChange={(e) => {this.setState({emailMe: e.target.value})}}/>
                   </Form.Group>
                 </Form.Row>
                </Form>
               </Modal.Body>
               <Modal.Footer>
                 <Button className="btnInf" onClick={() => {this.sendEmail()}}>
                   Envoyer
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
                  this.state.adData ?
                  <>
                  <Row className="p-4 mx-0">
                    <Col md={6}>
                      <Carousel controls={true} style={{height: '400px'}}>
                        {
                          this.state.adData.productImg ?
                          this.state.adData.productImg.map((item, id) => this.displayImage(item, id)) :
                          <p>No image</p>
                        }
                      </Carousel>
                    </Col>
                    <Col md={6}>
                      <h6 style={{color: 'white'}}>{this.state.adData.productType}</h6>
                        <div style={{ textAlign:'left'}}>
                          <h3 style={{marginTop: "1rem", color: 'white', fontWeight: '300', display: "inline"}}>{this.state.adData.productName ? this.state.adData.productName : "Sans nom"}</h3>
                          <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red', display: "inline", marginLeft: '5px'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
                        </div>
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{`${this.state.adData.productDesc ? this.state.adData.productDesc : ""}`}</h5>
                        {
                          (this.state.adData.productSubject === 'Mode' || this.state.adData.productSubject === 'Cosmétique') &&
                          <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{ this.state.adData.productSex}</h5>
                        }
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.productSubject}</h5>
                        <Row className="m-0 p-0">
                          <h4 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>Note: {this.state.adData.average ? (this.state.adData.average.toFixed(1) + '/5') : "Aucune note"}</h4>
                          <Image className="ml-4 mt-4 report" src={edit} style={{width: '15px', height: '15px'}} onClick={() => this.handleOpenNote()}/>
                        </Row>
                        {
                          this.state.applied.some(el => el.idOffer === this.state.adData.id) ?
                          <Button onClick={() => this.handleDelete(this.state.adData.id)} className="btnInf">Annuler</Button>:
                          <Button onClick={() => this.handleAnnonceSubscribe()} className="btnInf">Postuler</Button>
                          }
                        <Button onClick={() => this.setState({share: true})} className="btnInf ml-2">Partager</Button>
                    </Col>
                  </Row>
                  <Row className=" pb-4 mx-0">
                    <Col md={8} className="mt-4">
                      <h2 style={{fontWeight: '300', color: 'white'}} className="ml-4" >Avis</h2>
                      <Row className="mt-4 mb-4 pl-4" xs={3} md={3} lg={3} sm={3} xl={3}>
                        <Col xs={2} md={2} lg={2} sm={2} xl={2} className="centerBlock">
                          <div className="centerBlock" align="center">
                            <Image style={{width: '40px', height: '40px'}} src={!this.state.userData || !this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? avatar : this.state.userData.userPicture[0].imageData} roundedCircle />
                          </div>
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
                  </Row>
                </> :
                <Loader
                    type="Triangle"
                    color="white"
                    height={200}
                    width={200}
                    style={{paddingTop: "14rem", marginLeft: '40%'}}

                />
                }
            </div>
          </LoadingOverlay>
        );
    }
}

export default withRouter(adsItem);

// <Form.Row className='mt-4'>
//  <Form.Group controlId="formBasicEmail" as={Col} sm={6}>
//    <Form.Label>Pseudo du destinataire</Form.Label>
//    <Form.Control value={this.state.pseudo} onChange={(e) => {this.setState({pseudo: e.target.value})}}/>
//  </Form.Group>
// </Form.Row>
// <Button onClick={() => this.sendMsg()} className="btnInf ml-2">Via message privé</Button>
// <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.productSubject == 'mode' ||  this.state.adData.productSubject == 'cosmetic'? `Couleur: ${this.state.adData.color}` : ""}</h5>
// <h3 style={{marginTop: "2rem", color: 'white', display: "inline"}}>{this.state.adData.brand ? this.state.adData.brand : "Sans marque"}</h3>
