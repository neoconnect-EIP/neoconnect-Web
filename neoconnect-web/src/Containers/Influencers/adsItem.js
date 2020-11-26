import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import LoadingOverlay from 'react-loading-overlay';
import { showNotif } from '../Utils.js';
import { displayComment } from '../../Components/Utils.js';
import Loader from 'react-loader-spinner';

class adsItem extends React.Component{
    constructor(props) {
        super(props);

        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            visible: false,
            adData: null,
            actualId: 0,
            pseudo: '',
            email: '',
            commentInput: "",
            emailMe: '',
            signal: false,
            info: "",
            share: false,
            raison: "",
            isActive: false,
            urlId: localStorage.getItem("Jwt") ? parseInt(this.props.match.params.id) : 0,
            link: window.location.href,
            suggestions: null,
        };
    }

    getDetailOffer = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {return (res.json())})
          .then(res => this.setState({adData: res}))
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

    handleAnnonceSubscribe = () => {
      this.setState({isActive: true});
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${this.state.adData.id}`,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => {
            if (res.status === 200)
              return (res.json());
            this.setState({isActive: false});
          })
          .then(res => {
            this.setState({isActive: false});
            this.getDetailOffer();
          })
          .catch(error => {
            showNotif(true, "Erreur", null);
            this.setState({isActive: false});
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
      this.setState({isActive: true});
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/comment/${this.state.urlId}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status === 200)
              return (res.json());
            this.setState({isActive: false});
          })
          .then(res => {this.setState({isActive: false, commentInput: ""});this.getDetailOffer();})
          .catch(error => showNotif(true, "Erreur",null));
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

  closeModal = (modalName) => {
    let stateVal = {raison: "", clickedSignal: false, info: ""};
    stateVal[modalName] = false;
    this.setState(stateVal);
  }

  handleGlobalAnnonce = (id) => {
    window.location.pathname = `/dashboard/item/${id}`;
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
              <Modal centered show={this.state.signal} onHide={() => this.closeModal('signal')}>
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
                 <Button className="btnCancel" onClick={() => this.closeModal('signal')}>
                   Annuler
                 </Button>
                 <Button className="btnInf" onClick={() => {this.handleAnnonceReport(this)}}>
                   Signaler
                 </Button>
               </Modal.Footer>
              </Modal>
              <Modal centered show={this.state.share} onHide={() => this.closeModal('share')}>
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
                          <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red', display: "inline", marginLeft: '5px'}} onClick={() => this.setState({signal: true})} className="my-auto border border-danger rounded-circle pointerClick"/>
                        </div>
                        {
                          this.state.adData.brand && <p style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>De la marque {this.state.adData.brand}</p>
                        }
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{`${this.state.adData.productDesc ? this.state.adData.productDesc : ""}`}</h5>
                        {
                          (this.state.adData.productSubject === 'Mode' || this.state.adData.productSubject === 'Cosmétique') &&
                          <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{ this.state.adData.productSex}</h5>
                        }
                        <p style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.productSubject}</p>
                          {
                            !this.state.adData.status && <Button className="mr-auto btnInf" onClick={() => {this.handleAnnonceSubscribe(this.state.adData)}}>Postuler</Button>
                          }
                          {
                            this.state.adData.status && this.state.adData.status === "pending" && <Button className="btnInf mr-auto" onClick={() => {this.handleDelete(this.state.adData.id)}}>Annuler</Button>

                          }
                          {
                              this.state.adData.status && this.state.adData.status === "refused" &&
                              <p className="text-light">Demande refusé</p>
                          }
                          {
                              this.state.adData.status && this.state.adData.status === "accepted" &&
                              <p className="text-light">Demande accepté</p>
                          }
                        <Button onClick={() => this.setState({share: true})} className="btnInf ml-2">Partager</Button>
                    </Col>
                  </Row>
                  <Row className=" pb-4 mx-0">
                    <Col md={8} className="mt-4">
                      <h2 style={{fontWeight: '300', color: 'white'}} className="ml-4" >Avis</h2>
                      <Row className="mt-4 mb-4 pl-4" xs={2} md={2} lg={2} sm={2} xl={2}>
                        <Col xs={8} md={8} lg={8} sm={8} xl={8}>
                          <Form.Control onChange={(e) => {this.setState({commentInput: e.target.value})}} value={this.state.commentInput} className="inputComment" type="text" placeholder="Commenter" />
                        </Col>
                        <Col xs={1} md={1} lg={1} sm={1} xl={1} className="my-auto">
                          <SendIcon className="pointerClick"  onClick={this.handleSendMessage} style={{color: "#7FB780", width: "1.5rem", height: "1.5rem"}}/>
                        </Col>
                      </Row>
                      {
                        this.state.adData && this.state.adData.comment && this.state.adData.comment.length > 0 && this.state.adData.comment.map(x => displayComment(x))
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
