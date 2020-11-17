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
import { showNotif } from '../Utils.js';


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
            themeValue: ['', 'Mode', 'Cosmétique', 'Hight tech', 'Nourriture', 'Jeux video', 'Sport/Fitness'],
            isActive: false,
            followed: [],
            showFollowers: false,
        };
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

    handleClose = (modalName) => {
      this.state[modalName] = false;
        this.forceUpdate();
    }

    handleCloseDelete = () => {
        this.setState({visibleDelete: false})
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
            "full_name": this.state.fullName,
            "email": this.state.userData.email !== this.state.email ? this.state.email : undefined,
            "phone": this.state.phone,
            "city": this.state.city,
            "userPicture": this.state.imgChanged ? this.state.userPicture : undefined,
            "userDescription": this.state.desc,
            "facebook": this.state.userData.facebook !== this.state.facebook ? this.state.facebook : undefined,
            "twitter": this.state.userData.twitter !== this.state.twitter ? this.state.twitter : undefined,
            "snapchat": this.state.userData.snapchat !== this.state.snapchat ? this.state.snapchat : undefined,
            "instagram": this.state.userData.instagram !== this.state.instagram ? this.state.instagram : undefined,
            "twitch": this.state.userData.twitch !== this.state.twitch ? this.state.twitch : undefined,
            "pinterest": this.state.userData.pinterest !== this.state.pinterest ? this.state.pinterest : undefined,
            "youtube": this.state.userData.youtube !== this.state.youtube ? this.state.youtube : undefined,
            "tiktok": this.state.userData.tiktok !== this.state.tiktok ? this.state.tiktok : undefined,
            "theme": this.state.themeValue.indexOf(this.state.theme).toString(),
        };
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
              <Modal size="lg" centered show={this.state.visible} onHide={() => {this.handleClose('visible')}}>
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
                        <Form.File className="mt-2" onChange={e => this.handleImageChange(e)}/>
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
                            value={this.state.themeValue.indexOf(this.state.theme)}
                            onChange={(e) => {
                              this.setState({theme: this.state.themeValue[e.target.value]});
                            }}
                        >
                          <MenuItem value={1}>Mode</MenuItem>
                          <MenuItem value={2}>Cosmétique</MenuItem>
                          <MenuItem value={3}>Hight tech</MenuItem>
                          <MenuItem value={4}>Nourriture</MenuItem>
                          <MenuItem value={5}>Jeux vidéo</MenuItem>
                          <MenuItem value={6}>Sport/fitness</MenuItem>
                        </Select>
                      </FormControl>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="btnCancel" onClick={() => {this.handleClose('visible')}}>
                    Annuler
                  </Button>
                  <Button className="btnInfDelete" onClick={() => {this.setState({visible: false, visibleDelete: true})}}>Supprimer le compte</Button>
                  <Button className="btnInf" onClick={this.handleSubmit}>
                    Sauvegarder
                  </Button>
                  </Modal.Footer>
                </Modal>
                <Modal centered show={this.state.visibleDelete} onHide={() => {this.handleClose('visible')}}>
                  <Modal.Header closeButton>
                    <Modal.Title>Suppression de compte</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Êtes-vous sur de vouloir supprimer votre compte ?</Modal.Body>
                  <Modal.Footer>
                    <Button className="btnCancel" onClick={this.handleCloseDelete}>
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
                        <Row xs={1} sm={1} md={2} lg={2} xl={2}>
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
                          <Col className="mx-auto mt-4 report" align="center" onClick={() => {this.setState({showFollowers: true});}}>
                            <h3 style={{color: 'white'}}>{this.state.followed.length}</h3>
                            <p style={{color: 'white', fontWeight: '400'}}>Nombre d'abonnement</p>
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
                        <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Réseaux social</h2>
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
                          !this.state.userData.comment || this.state.userData.comment.length === 0 ? <p style={{color: 'white'}}>Aucun commentaire</p> : this.state.userData.comment.map(x => this.handleComment(x))
                        }
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
              <Modal centered size={'sm'} show={this.state.showFollowers} onHide={() => {this.handleClose('showFollowers')}}>
                <Modal.Header closeButton>
                  <Modal.Title>Vos abonnements</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 {
                   this.state.followed && this.displayFollowers()
                 }
                </Modal.Body>
              </Modal>
            </LoadingOverlay>
          );
    }
}

export default withRouter(InfluenceurStatus)
