import React from 'react';
import { withRouter } from "react-router-dom"
import { FormControl, InputLabel, Select, MenuItem} from '@material-ui/core/';
import "../index.css"
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
import place from "../../assets/place.svg";
import mail from "../../assets/mail.svg";
import phone from "../../assets/phone.svg";
import account from "../../assets/account.svg";
import StarRatings from 'react-star-ratings';
import noAvatar from "../../assets/noImageFindInf.jpg";
import LoadingOverlay from 'react-loading-overlay';
import { store } from 'react-notifications-component';
import Badge from 'react-bootstrap/Badge';
import { showNotif } from '../Utils.js';

class ShopStatus extends React.Component{
    constructor(props) {
        super(props);

        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');

        this.state = {
            userData: null,
            visible: false,
            fullName: "",
            pseudo: "",
            desc: "",
            instagram: "",
            snapchat: "",
            facebook: "",
            twitter: "",
            phone: "",
            email: "",
            city: "",
            theme: "",
            society: "",
            website: "",
            fonction: "",
            visibleDelete: false,
            file: null,
            userPicture: null,
            imgChanged: false,
            isActive: false,
            followers: [],
            themeValue: ['', 'mode', 'cosmetique', 'hight tech', 'food', 'jeux video', 'sport/fitness'],
        };

    }

    handleRes = async (res) => {
      var msg;
      if (res.status === 200) {
        msg = await res.json();
        this.setState({userData: msg})
      }
      else {
        msg = await res.json();
        console.log("Error msg", msg);
      }
    }

    getShop = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/me`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {this.handleRes(res);})
      .catch(error => console.error('Error:', error));
    }

    getFollowers = () => {
      console.log("token ", localStorage.getItem("Jwt"));
      console.log("token ", localStorage.getItem("userId"));
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/follow/${localStorage.getItem("userId")}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {
        if (res.status >= 400)
          throw res;
        return (res.json());
      })
      .then(res => {
        this.setState({followers: res})
      })
      .catch(error => console.error('Error:', error));
    }


    componentDidMount = () => {
        this.getShop();
        this.getFollowers();
    }

    handleResponse = (res) => {
      this.setState({visible: false});
      this.getShop();
    }

    handleResponse = async (res) => {
        if (res.status === 200) {
          this.setState({isActive: false});
          this.getShop();
        }
        else {
          var msg = await res.json();
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
          this.setState({isActive: false});
        }
    }

    handleClose = (modalName) => {
        // this.setState({visible: false})
      this.state[modalName] = false;
      this.forceUpdate();
    }

    handleChangeInfo = () => {
        this.setState({
          visible: true,
          fullName: this.state.userData.full_name,
          desc: this.state.userData.userDescription,
          pseudo: this.state.userData.pseudo,
          phone: this.state.userData.phone,
          email: this.state.userData.email,
          city: this.state.userData.city,
          snap: this.state.userData.snapchat,
          facebook: this.state.userData.facebook,
          twitter: this.state.userData.twitter,
          instagram: this.state.userData.instagram,
          theme: this.state.userData.theme,
          society: this.state.userData.society,
          fonction: this.state.userData.function,
          website: this.state.userData.website,
          userPicture: this.state.userData.userPicture ? this.state.userData.userPicture[0] : null,
        });
    }

    displayFollowers = () => {
      console.log("follow ",   this.state.followers.followers);
      return (
        this.state.followers.map((val, idx) => (
          <Container fluid>
            <Row>
              <Col>
                <p style={{fontWeight: '200'}}>{val.pseudo}</p>
              </Col>
              <Col>
                <Button variant="outline-dark"  onClick={() => {}}>Voir profil</Button>
              </Col>
            </Row>
        </Container>
        )
      ));
    };

    handleSubmit = () => {
      if (!this.state.theme || !this.state.email || !this.state.pseudo) {
        store.addNotification({
          title: "Erreur",
          message: "Les champs pseudo, email et thème sont obligatoire",
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
      else {
        this.setState({isActive: true, visible: false});

        let body = {
            "pseudo": this.state.name,
            "userType": this.state.userData.userType,
            "full_name": this.state.fullName,
            "email": this.state.userData.email != this.state.email ? this.state.email : undefined,
            "phone": this.state.phone,
            "city": this.state.city,
            "website": this.state.website,
            "function": this.state.fonction,
            "userPicture": this.state.imgChanged ? this.state.userPicture : undefined,
            "userDescription": this.state.desc,
            "theme": this.state.themeValue.indexOf(this.state.theme).toString(),
            "facebook": this.state.userData.facebook != this.state.facebook ? this.state.facebook : undefined,
            "twitter": this.state.userData.twitter != this.state.twitter ? this.state.twitter : undefined,
            "snapchat": this.state.userData.snapchat != this.state.snapchat ? this.state.snapchat : undefined,
            "instagram": this.state.userData.instagram != this.state.instagram ? this.state.instagram : undefined,
        };

        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/me`, { method: 'PUT', body: body,headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
        .then(res => {this.handleResponse(res)})
        .catch(error => console.error('Error:', error));
      }
    };

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
        .catch(console.error)
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



    render() {
        return (
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Chargement...'
            >
              <div className="shopBg"  >
              <Modal centered show={this.state.visibleDelete} onHide={() => { this.setState({visibleDelete: false})}}>
                <Modal.Header closeButton>
                  <Modal.Title>Suppression de compte</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sur de vouloir supprimer votre compte ?</Modal.Body>
                <Modal.Footer>
                  <Button className="btnCancel" onClick={() => { this.setState({visibleDelete: false})}}>
                    Non
                  </Button>
                  <Button className="btnInfDelete" onClick={this.handleDelete}>
                    Oui
                  </Button>
                </Modal.Footer>
              </Modal>
                <Modal size="lg" centered show={this.state.visible} onHide={() => {this.handleClose('visible')}}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modifier vos informations</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <Form className="mx-4 mt-4">
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>Nom et Prénom</Form.Label>
                          <Form.Control value={this.state.fullName} onChange={e => {this.setState({fullName: e.target.value})}}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>Pseudo</Form.Label>
                          <Form.Control value={this.state.pseudo} onChange={e => {this.setState({pseudo: e.target.value})}}/>
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
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>Twitter</Form.Label>
                          <Form.Control value={this.state.twitter} onChange={e => {this.setState({twitter: e.target.value})}}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>Snapchat</Form.Label>
                          <Form.Control value={this.state.snapchat} onChange={e => {this.setState({snapchat: e.target.value})}}/>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>Société</Form.Label>
                          <Form.Control value={this.state.society} onChange={e => {this.setState({society: e.target.value})}}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>Function</Form.Label>
                          <Form.Control value={this.state.fonction} onChange={e => {this.setState({fonction: e.target.value})}}/>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>Site web</Form.Label>
                          <Form.Control value={this.state.website} onChange={e => {this.setState({website: e.target.value})}}/>
                        </Form.Group>
                        <Form.Group as={Col} className="mt-4">
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
                      </Form.Row>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btnCancel" onClick={() => {this.handleClose('visible')}}>
                      Annuler
                    </Button>
                    <Button className="btnInfDelete" onClick={() => {this.setState({visible: false, visibleDelete: true})}}>Supprimer le compte</Button>
                    <Button className="btnShop" onClick={this.handleSubmit}>
                      Sauvegarder
                    </Button>
                    </Modal.Footer>
                  </Modal>
                  {
                    this.state.userData &&
                    <div>
                      <Row className="mx-0">
                        <div style={{position: 'absolute', top: 10, right: 20}}>
                          <Button variant="outline-light" onClick={this.handleChangeInfo}>Modifer vos informations</Button>
                        </div>
                        <Col className="mx-auto" style={{marginTop: '60px'}} align="center">
                          <Image style={{width: '250px', height: '250px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", marginBottom: '20px'}}
                            src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle/>
                          <h2 style={{color: 'white', fontWeight: '400'}}>{this.state.userData.full_name}</h2>
                          <Badge pill className="pill mt-2">{this.state.userData.theme != 'food' ? this.state.userData.theme.charAt(0).toUpperCase() + this.state.userData.theme.slice(1) : 'Nourriture'}</Badge>
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
                              <h3 style={{color: 'white'}}>{this.state.followers.length}</h3>
                              <p style={{color: 'white', fontWeight: '400'}}>Nombre d'abonnée</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="ml-4 mt-4 mx-0">
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
                          </Row>
                        </Col>
                      </Row>
                      <Row className="ml-4 mt-4 mx-0">
                        <Col>
                          <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Bio</h2>
                          <p style={{color: 'white'}}>{this.state.userData.userDescription ? this.state.userData.userDescription : "Non fourni"}</p>
                        </Col>
                        <Col>
                          <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Avis</h2>
                            {!this.state.userData.comment || this.state.userData.comment.length === 0 ? <p style={{color: 'white'}}>Aucun commentaire</p> : this.state.userData.comment.map(x => this.handleComment(x))}
                        </Col>
                      </Row>
                    </div>
                  }
              </div>
              <Modal centered  size={"sm"} show={this.state.showFollowers} onHide={() => {this.handleClose('showFollowers')}}>
                <Modal.Header closeButton>
                  <Modal.Title>Vos abonnements</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 {
                   (this.state.followers && this.state.followers.length > 0) ? this.displayFollowers() : <p>Pas d'abonnée</p>
                 }
                </Modal.Body>
              </Modal>
            </LoadingOverlay>
        );
    }
}

export default withRouter(ShopStatus);

// <Row className="mx-0 mt-4 pt-4 pb-4">
//   <Col align="center">
//     <Button className="btnShop" onClick={this.handleChangeInfo}>Modifer vos informations</Button>
//   </Col>
// </Row>
//
