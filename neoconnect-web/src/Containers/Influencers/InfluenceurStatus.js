import React from 'react';
import { withRouter } from "react-router-dom"
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import 'antd/dist/antd.css';
import "../index.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import facebook from "../../assets/facebookWhite.svg";
import instagram from "../../assets/instagramWhite.svg";
import snapchat from "../../assets/snapchatWhite.svg";
import twitter from "../../assets/twitterWhite.svg";
import tiktok from "../../assets/tiktokWhite.svg";
import youtube from "../../assets/youtubeWhite.svg";
import twitch from "../../assets/twitchWhite.svg";
import pinterest from "../../assets/pinterestWhite.svg";
import place from "../../assets/place.svg";
import mail from "../../assets/mail.svg";
import phone from "../../assets/phone.svg";
import account from "../../assets/account.svg";
import StarRatings from 'react-star-ratings';
import noAvatar from "../../assets/noImageFindInf.jpg";
import LoadingOverlay from 'react-loading-overlay';
import Badge from 'react-bootstrap/Badge';
import { showNotif, themeVal } from '../Utils.js';
import { Line } from 'react-chartjs-2';
import { displayComment } from '../../Components/Utils.js';

class InfluenceurStatus extends React.Component{
    constructor(props) {
        super(props);
        localStorage.setItem('menuId', 1);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            userData: null,
            visible: false,
            fullName: "",
            pseudo: "",
            desc: "",
            tiktok: "",
            instagram: "",
            facebook: "",
            snapchat: "",
            youtube: "",
            pinterest: "",
            twitter: "",
            twitch: "",
            phone: "",
            email: "",
            city: "",
            theme: "",
            file: null,
            userPicture: null,
            visibleDelete: false,
            imgChanged: false,
            isActive: false,
            followed: [],
            showFollowers: false,
            showParrainage: false,
            code: '',
        };
    }

    getData = () => {
       let data = {
        labels: ['Avant', 'Maintenant'],
        datasets: [
          {
            label: "Youtube",
            backgroundColor: 'transparent',
            borderColor: '#EA3323',
            borderWidth: 2,
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: '#EA3323',
            data: [
                (this.state.userData.youtube && this.state.userData.youtubeNb) ? this.state.userData.youtubeNb[0] : 0,
                (this.state.userData.youtube && this.state.userData.youtubeNb && this.state.userData.youtubeNb.length > 1) ? this.state.userData.youtubeNb[1] : "",
            ]
          },
          {
            label: "Twitch",
            backgroundColor: 'transparent',
            borderColor: '#603DB0',
            borderWidth: 2,
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: '#603DB0',
            data: [
                (this.state.userData.twitch && this.state.userData.twitchNb) ? this.state.userData.twitchNb[0] : 0,
                (this.state.userData.twitch && this.state.userData.twitchNb && this.state.userData.twitchNb.length > 1) ? this.state.userData.twitchNb[1] : "",
            ]
          },
          {
            label: "Twitter",
            backgroundColor: 'transparent',
            borderColor: '#68A8EB',
            borderWidth: 2,
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: '#68A8EB',
            data: [
                (this.state.userData.twitter && this.state.userData.twitterNb) ? this.state.userData.twitterNb[0] : 0,
                (this.state.userData.twitter && this.state.userData.twitterNb&& this.state.userData.twitterNb.length > 1) ? this.state.userData.twitterNb[1] : "",
            ]
          },
          {
            label: "Instagram",
            backgroundColor: 'transparent',
            borderColor: '#B13C75',
            borderWidth: 2,
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: '#B13C75',
            data: [
                (this.state.userData.instagram && this.state.userData.instagramNb) ? this.state.userData.instagramNb[0] : 0,
                (this.state.userData.instagram && this.state.userData.instagramNb && this.state.userData.instagramNb.length > 1) ? this.state.userData.instagramNb[1] : "",
            ]
          },
          {
            label: "Facebook",
            backgroundColor: 'transparent',
            borderColor: '#3876EA',
            borderWidth: 2,
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: '#3876EA',
            data: [
                (this.state.userData.facebook && this.state.userData.facebookNb) ? this.state.userData.facebookNb[0] : 0,
                (this.state.userData.facebook && this.state.userData.facebookNb && this.state.userData.facebookNb.length > 1) ? this.state.userData.facebookNb[1] : "0",
            ]
          },
          {
            label: "Pinterest",
            backgroundColor: 'transparent',
            borderColor: '#86FB7D',
            borderWidth: 2,
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: '#86FB7D',
            data: [
                (this.state.userData.pinterest && this.state.userData.pinterestNb) ? this.state.userData.pinterestNb[0] : 0,
                (this.state.userData.pinterest && this.state.userData.pinterestNb && this.state.userData.pinterestNb.length > 1) ? this.state.userData.pinterestNb[1] : "",
            ]
          },
          {
            label: "TikTok",
            backgroundColor: 'transparent',
            borderColor: '#000000',
            borderWidth: 2,
            hoverBackgroundColor: 'rgb(176, 196, 179)',
            hoverBorderColor: '#000000',
            data: [
                (this.state.userData.tiktok && this.state.userData.tiktokNb) ? this.state.userData.tiktokNb[0] : 0,
                (this.state.userData.tiktok && this.state.userData.tiktokNb && this.state.userData.tiktokNb.length > 1) ? this.state.userData.tiktokNb[1] : "",
            ]
          },
          {
            label: "Snapchat",
            backgroundColor: 'transparent',
            borderColor: '#FCEC60',
            borderWidth: 2,
            hoverBackgroundColor: 'transparent',
            hoverBorderColor: '#FCEC60',
            data: [
                (this.state.userData.snapchat && this.state.userData.snapchatNb) ? this.state.userData.snapchatNb[0] : 0,
                (this.state.userData.snapchat && this.state.userData.snapchatNb && this.state.userData.snapchatNb.length > 1) ? this.state.userData.snapchatNb[1] : "",
            ]
          }
        ]
      };
      return data;
    }

    getInf = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/me`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => res.json())
      .then(res => this.setState({userData: res}))
      .catch(error => showNotif(true, "Erreur",null));
    }

    getFollowed = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/follow`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => res.json())
      .then(res => this.setState({followed: res}))
      .catch(error => showNotif(true, "Erreur",null));
    }

    componentDidMount = () => {
        this.getInf();
        this.getFollowed();
    }

    closeModal = (modalName) => {
      let stateVal = {};
      stateVal[modalName] = false;
      this.setState(stateVal);
    }

    handleChangeInfo = () => {
        this.setState({
          visible: true,
          fullName: this.state.userData.full_name ? this.state.userData.full_name : "",
          desc: this.state.userData.userDescription ? this.state.userData.userDescription : "",
          pseudo: this.state.userData.pseudo,
          phone: this.state.userData.phone,
          email: this.state.userData.email,
          city: this.state.userData.city ? this.state.userData.city : "",
          snap: this.state.userData.snapchat ? this.state.userData.snapchat : "",
          facebook: this.state.userData.facebook ? this.state.userData.facebook : "",
          twitter: this.state.userData.twitter ? this.state.userData.twitter : "",
          instagram: this.state.userData.instagram ? this.state.userData.instagram : "",
          pinterest: this.state.userData.pinterest ? this.state.userData.pinterest : "",
          twitch: this.state.userData.twitch ? this.state.userData.twitch : "",
          tiktok: this.state.userData.tiktok ? this.state.userData.tiktok : "",
          youtube: this.state.userData.youtube ? this.state.userData.youtube : "",
          theme: this.state.userData.theme,
          userPicture: this.state.userData.userPicture ? this.state.userData.userPicture[0] : null,
        });
    }

    handleResponse = async (res) => {
        if (res.status === 200) {
          this.setState({isActive: false});
          this.getInf();
        }
        else {
          var msg = await res.json();
          showNotif(true,  "Erreur", msg);
          this.setState({isActive: false});
        }
    }

    handleCodeResponse = async (res) => {
      if (res.status === 200) {
        this.setState({code: '', showParrainage: false});
        showNotif(false, "Réussi", "Nous avons bien pris en compte de votre code de parrainage.");
      }
      else {
        var msg = await res.json();
        showNotif(true,  "Erreur", msg);
      }
      this.setState({isActive: false});
    }

    submitCode = () => {
      if (!this.state.code) {
        showNotif(true,  "Erreur", "Veuillez fournir le code de parrainage.");
      }
      else {
        this.setState({isActive: true});
        let body = {
            "codeParrainage": this.state.code,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/insertParrainage`, { method: 'POST', body: body,headers: {
                'Content-Type': 'application/json'}})
        .then(res => {
          if (res.status >= 500)
            throw res;
          this.handleCodeResponse(res);
        })
        .catch(error => showNotif(true,  "Erreur, Veuillez essayer ultérieurement", error.statusText));
      }
    }

    displayFollowers = () => {
      return (
        this.state.followed.map((val, idx) => (
          <Container fluid key={idx}>
            <Row>
              <Col>
                <p style={{fontWeight: '200'}}>{val.pseudo}</p>
              </Col>
              <Col>
                <Button variant="outline-dark"  onClick={() => {this.handleUnFollow(val.id)}}>Désabonner</Button>
              </Col>
            </Row>
        </Container>
        )
      ));
    };

    handleSubmit = () => {
      this.setState({isActive: true, visible: false});
      if (!this.state.theme || !this.state.email || !this.state.pseudo) {
        showNotif(true,  "Erreur", "Les champs pseudo, email et thème sont obligatoire");
      }
      else {
        this.setState({isActive: true, visible: false});
        let body = {
            "full_name": this.state.userData.full_name !== this.state.fullName ? this.state.fullName : undefined,
            "email": this.state.userData.email !== this.state.email ? this.state.email : undefined,
            "phone": this.state.userData.phone !== this.state.phone ? this.state.phone : undefined,
            "city": this.state.userData.city !== this.state.city ? this.state.city : undefined,
            "userPicture": this.state.imgChanged ? this.state.userPicture : undefined,
            "userDescription": this.state.userData.userDescription !== this.state.desc ? this.state.desc : undefined,
            "facebook": this.state.userData.facebook !== this.state.facebook ? this.state.facebook : undefined,
            "twitter": this.state.userData.twitter !== this.state.twitter ? this.state.twitter : undefined,
            "snapchat": this.state.userData.snapchat !== this.state.snapchat ? this.state.snapchat : undefined,
            "instagram": this.state.userData.instagram !== this.state.instagram ? this.state.instagram : undefined,
            "twitch": this.state.userData.twitch !== this.state.twitch ? this.state.twitch : undefined,
            "pinterest": this.state.userData.pinterest !== this.state.pinterest ? this.state.pinterest : undefined,
            "youtube": this.state.userData.youtube !== this.state.youtube ? this.state.youtube : undefined,
            "tiktok": this.state.userData.tiktok !== this.state.tiktok ? this.state.tiktok : undefined,
            "theme": themeVal.indexOf(this.state.theme).toString(),
        };
        Object.keys(body).forEach((key) => (body[key] === undefined) && delete body[key]);
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/me`, { method: 'PUT', body: body,headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
        .then(res => {this.handleResponse(res)})
        .catch(error => showNotif(true,  "Erreur",null));
    }
  }

    handleSplitString = (str) => {
        var tmp = "";
        var i = 0;

        i = str.indexOf(",");
        tmp = str.substr(i + 1)
        return tmp
    };

    handleImageChange = (e) => {
        this.state.imgChanged = true;
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                userPicture: this.handleSplitString(reader.result),
            });
        };
        reader.readAsDataURL(file);
    };

    handleDelete = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`
            }
        })
        .then(res => {
            localStorage.clear();
            showNotif(false, "Succès", "Suppression de compte réussi.");
            this.props.history.push('/landing-page')
        })
        .catch(error => showNotif(true,  "Erreur",null))
    }

    handleUnFollow = (id) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/unfollow/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
        .then(res => {
          if (res.status === 200) {
            showNotif(false, "Abonné", "Vous êtes bien désabonné");
            this.getFollowed();
          }
          else {
            showNotif(true, "Erreur", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
          }
        })
        .catch(error => showNotif(true, "Erreur",null));
    }

    render() {
        return (
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Chargement...'
            >
            <div className="infBg">
              <Modal size="lg" centered show={this.state.visible} onHide={() => {this.closeModal('visible')}}>
                <Modal.Header closeButton>
                  <Modal.Title>Modifier vos informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form className="mx-4 mt-4">
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Pseudo</Form.Label>
                        <Form.Control value={this.state.pseudo} onChange={e => {}} disabled/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Nom et Prénom</Form.Label>
                        <Form.Control value={this.state.fullName} onChange={e => {this.setState({fullName: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label column>
                          Photo de profile
                        </Form.Label>
                        <Form.File className="mt-2" accept="image/*" onChange={e => this.handleImageChange(e)}/>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={this.state.email} onChange={e => {this.setState({email: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control value={this.state.phone} onChange={e => {this.setState({phone: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Ville</Form.Label>
                        <Form.Control value={this.state.city} onChange={e => {this.setState({city: e.target.value})}}/>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control value={this.state.desc} onChange={e => {this.setState({desc: e.target.value})}}/>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control value={this.state.facebook} onChange={e => {this.setState({facebook: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control value={this.state.instagram} onChange={e => {this.setState({instagram: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Snapchat</Form.Label>
                        <Form.Control value={this.state.snapchat} onChange={e => {this.setState({snapchat: e.target.value})}}/>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Twitter</Form.Label>
                        <Form.Control value={this.state.twitter} onChange={e => {this.setState({twitter: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>TikTok</Form.Label>
                        <Form.Control value={this.state.tiktok} onChange={e => {this.setState({tiktok: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Youtube</Form.Label>
                        <Form.Control value={this.state.youtube} onChange={e => {this.setState({youtube: e.target.value})}}/>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Pinterest</Form.Label>
                        <Form.Control value={this.state.pinterest} onChange={e => {this.setState({pinterest: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Twitch</Form.Label>
                        <Form.Control value={this.state.twitch} onChange={e => {this.setState({twitch: e.target.value})}}/>
                      </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col} style={{ paddingLeft: 0}}>
                      <FormControl variant="outlined" style={{ color: 'black'}}>
                        <InputLabel id="demo-simple-select-outlined-label" style={{color: 'black'}}>
                            Thème
                        </InputLabel>
                        <Select
                            style={{color: 'black'}}
                            labelId="demo-simple-select-outlined-label"
                            name="theme"
                            value={themeVal.indexOf(this.state.theme)}
                            onChange={(e) => {
                              this.setState({theme: themeVal[e.target.value]});
                            }}
                        >
                          <MenuItem value={1}>Mode</MenuItem>
                          <MenuItem value={2}>Cosmétique</MenuItem>
                          <MenuItem value={3}>High tech</MenuItem>
                          <MenuItem value={4}>Nourriture</MenuItem>
                          <MenuItem value={5}>Jeux vidéo</MenuItem>
                          <MenuItem value={6}>Sport/fitness</MenuItem>
                        </Select>
                      </FormControl>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="btnCancel" onClick={() => {this.closeModal('visible')}}>
                    Annuler
                  </Button>
                  <Button className="btnInfDelete" onClick={() => {this.setState({visible: false, visibleDelete: true})}}>Supprimer le compte</Button>
                  <Button className="btnInf" onClick={this.handleSubmit}>
                    Sauvegarder
                  </Button>
                  </Modal.Footer>
                </Modal>
                <Modal centered show={this.state.visibleDelete} onHide={() => {this.closeModal('visibleDelete')}}>
                  <Modal.Header closeButton>
                    <Modal.Title>Suppression de compte</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Êtes-vous sur de vouloir supprimer votre compte ?</Modal.Body>
                  <Modal.Footer>
                    <Button className="btnCancel" onClick={() => this.closeModal('visibleDelete')}>
                      Non
                    </Button>
                    <Button className="btnInfDelete" onClick={this.handleDelete}>
                      Oui
                    </Button>
                  </Modal.Footer>
                </Modal>
                {
                this.state.userData ?
                  <div>
                    <Row className="mx-0">
                      <div style={{position: 'absolute', top: 10, right: 20}}>
                        <Button variant="outline-light" onClick={this.handleChangeInfo}>Modifier vos informations</Button>
                      </div>
                      <Col className="mx-auto" style={{marginTop: '60px'}} align="center">
                        <Image style={{width: '250px', height: '250px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", marginBottom: '20px'}}
                          src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle/>
                        <h2 style={{color: 'white', fontWeight: '400'}}>{this.state.userData.full_name}</h2>
                        {
                          this.state.userData.theme &&
                          <Badge pill className="pill mt-2">{this.state.userData.theme !== 'food' ? this.state.userData.theme.charAt(0).toUpperCase() + this.state.userData.theme.slice(1) : 'Nourriture'}</Badge>
                        }
                        <Row xs={1} sm={2} md={2} lg={3} xl={3}>
                          <Col className="mx-auto mt-4" align="center">
                            <div className="mb-3">
                              <StarRatings
                                 rating={this.state.userData.average ? this.state.userData.average : 0}
                                 starRatedColor="#FFC106"
                                 numberOfStars={5}
                                 name='rating'
                                 starDimension="20px" />
                             </div>
                            <p style={{color: 'white', fontWeight: '300'}}>Note</p>
                          </Col>
                          <Col className="mx-auto mt-4 pointerClick" align="center" onClick={() => {this.setState({showFollowers: true});}}>
                            <h3 style={{color: 'white'}}>{this.state.followed.length}</h3>
                            <p style={{color: 'white', fontWeight: '400'}}>Abonnement</p>
                          </Col>
                          <Col className="mx-auto mt-4 pointerClick" align="center" onClick={() => {this.setState({showParrainage: true});}}>
                            <h3 style={{color: 'white'}}>{this.state.userData.countParrainage}</h3>
                            <p style={{color: 'white', fontWeight: '400'}}>Parrainage</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="ml-4 mt-4 mx-0" xs={1} sm={1} md={2} lg={2} xl={2}>
                      <Col>
                        <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Informations du compte</h2>
                        <Col>
                          <Row className="mx-0 mb-1">
                            <Image className="iconProfileSocial" src={account}/>
                            <p style={{color:'white'}}>{this.state.userData.pseudo}</p>
                          </Row>
                          <Row className="mx-0 mb-1">
                            <Image className="iconProfileSocial" src={place}/>
                            <p style={{color:'white'}}>{this.state.userData.city ? this.state.userData.city : "Non fourni"}</p>
                          </Row>
                          <Row className="mx-0 mb-1">
                            <Image className="iconProfileSocial" src={mail}/>
                            <p style={{color:'white'}}>{this.state.userData.email ? this.state.userData.email : "Non fourni"}</p>
                          </Row>
                          <Row className="mx-0 mb-1">
                            <Image className="iconProfileSocial" src={phone}/>
                            <p style={{color:'white'}}>{this.state.userData.phone ? this.state.userData.phone : "Non fourni"}</p>
                          </Row>
                        </Col>
                      </Col>
                      <Col>
                        <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Réseaux sociaux</h2>
                        <Row>
                          <Col>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={facebook}/>
                              <p style={{color: 'white'}}>{this.state.userData.facebook ? this.state.userData.facebook : "Non fourni"}</p>
                            </Row>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={instagram}/>
                              <p style={{color: 'white'}}>{this.state.userData.instagram ? this.state.userData.instagram : "Non fourni"}</p>
                            </Row>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={snapchat}/>
                              <p style={{color: 'white'}}>{this.state.userData.snapchat ? this.state.userData.snapchat : "Non fourni"}</p>
                            </Row>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={twitter}/>
                              <p style={{color: 'white'}}>{this.state.userData.twitter ? this.state.userData.twitter : "Non fourni"}</p>
                            </Row>
                          </Col>
                          <Col>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={tiktok}/>
                              <p style={{color: 'white'}}>{this.state.userData.tiktok ? this.state.userData.tiktok : "Non fourni"}</p>
                            </Row>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={youtube}/>
                              <p style={{color: 'white'}}>{this.state.userData.youtube ? this.state.userData.youtube : "Non fourni"}</p>
                            </Row>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={pinterest}/>
                              <p style={{color: 'white'}}>{this.state.userData.pinterest ? this.state.userData.pinterest : " Non fourni"}</p>
                            </Row>
                            <Row className="mx-0 mb-1">
                              <Image className="iconProfileSocial" src={twitch}/>
                              <p style={{color: 'white'}}>{this.state.userData.twitch ? this.state.userData.twitch : "Non fourni"}</p>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="ml-4 mt-4 mx-0" xs={1} sm={1} md={2} lg={2} xl={2}>
                      <Col>
                        <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Bio</h2>
                        <p style={{color: 'white'}}>{this.state.userData.userDescription ? this.state.userData.userDescription : "Non fourni"}</p>
                      </Col>
                      <Col>
                        <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Avis</h2>
                        {
                          !this.state.userData.comment || this.state.userData.comment.length === 0 ? <p style={{color: 'white'}}>Aucun commentaire</p> : this.state.userData.comment.map(x => displayComment(x))
                        }
                      </Col>
                    </Row>
                    {
                      this.state.userData &&
                      <Row className="ml-4 mt-4 mx-0 pb-3">
                        <Col>
                          <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Avancées</h2>
                          <div>
                            <Line
                              data={this.getData()}
                              width={200}
                              height={250}
                              options={{ maintainAspectRatio: false }}
                            />
                          </div>
                        </Col>
                      </Row>
                    }
                  </div>
                  :
                  <div>
                    <Loader
                        type="Triangle"
                        color="#fff"
                        height={200}
                        width={400}
                        style={{paddingTop: "14rem", marginLeft: '40%'}}
                    />
                  </div>
                }
              </div>
              <Modal centered size={'sm'} show={this.state.showFollowers} onHide={() => {this.closeModal('showFollowers')}}>
                <Modal.Header closeButton>
                  <Modal.Title>Vos abonnements</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 {
                   this.state.followed && this.state.followed.length > 0 ? this.displayFollowers() : 'Aucun abonnement pour le moment'
                 }
                </Modal.Body>
              </Modal>
              <Modal centered show={this.state.showParrainage} onHide={() => {this.closeModal('showParrainage')}}>
                <Modal.Header closeButton>
                  <Modal.Title>Parrainage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                  this.state.userData &&
                  <div>
                    <p>Code de parrainage: <b>{this.state.userData.codeParrainage}</b></p>
                    <p>Vous avez été parrainé ? Rentrez votre code ci dessous</p>
                    <Form.Label>Code</Form.Label>
                    <Form.Control value={this.state.code} onChange={e => {this.setState({code: e.target.value})}}/>
                  </div>
                }
                </Modal.Body>
                <Modal.Footer>
                  <Button className="btnCancel" onClick={() => {this.closeModal('showParrainage')}}>Annuler</Button>
                  <Button className="btnInf" onClick={this.submitCode}>Envoyer</Button>
                </Modal.Footer>
              </Modal>
            </LoadingOverlay>
          );
    }
}

export default withRouter(InfluenceurStatus)
