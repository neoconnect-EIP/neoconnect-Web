import React from 'react';
import { withRouter } from "react-router-dom"
import {Avatar, Grid, Card, CardContent, CardMedia, Fab, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core/';
import "../index.css"
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
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

class ShopStatus extends React.Component{
    constructor(props) {
        super(props);

        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") != "shop")
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
            file: null,
            userPicture: null,
            tmpTheme: ['', 'Mode', 'Cosmetique', 'Haute technologie', 'Food', 'Jeux vidéo', 'Sport/fitness']

        };
    }

    //TODO food ou nourriture

    getShop = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/me`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
          .then(res => res.json())
          .then(res => this.setState({userData: res}))
          .catch(error => console.error('Error:', error));
    }

    componentDidMount = () => {
        this.getShop();
    }

    // handleEditProfile = () => {
    //     this.props.history.push("/shop-dashboard/edit-profile")
    // }

    handleResponse = (res) => {
      this.setState({visible: false});
      this.getShop();
    }

    handleClose = () => {
        this.setState({visible: false})
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
          userPicture: this.state.userData.userPicture[0],
        });
    }

    handleSubmit = () => {
        let body = {
            "pseudo": this.state.name,
            "userType": this.state.userData.userType,
            "full_name": this.state.fullName,
            "email": this.state.email,
            "phone": this.state.phone,
            "city": this.state.city,
            "userPicture": this.state.userPicture,
            "userDescription": this.state.desc,
            "facebook": this.state.facebook,
            "twitter": this.state.twitter,
            "snapchat": this.state.snapchat,
            "instagram": this.state.instagram,
            "twitch": this.state.twitch,
            "pinterest": this.state.pinterest,
            "youtube": this.state.youtube,
            "tiktok": this.state.tiktok,
            "theme": this.state.theme,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/me`, { method: 'PUT', body: body,headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    handleSplitString = (str) => {
        var tmp = "";
        var i = 0;

        i = str.indexOf(",");
        tmp = str.substr(i + 1)
        return tmp
    };

    handleImageChange = (e) => {
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

    render() {
        return (
            <div className="shopBg"  >
              <Modal size="lg" centered show={this.state.visible} onHide={this.handleClose}>
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
                      <Form.Group as={Col} className="mt-4">
                        <FormControl variant="outlined" style={{ color: 'black'}}>
                          <InputLabel id="demo-simple-select-outlined-label" style={{color: 'black'}}>
                              Thème
                          </InputLabel>
                          <Select
                              style={{color: 'black'}}
                              labelId="demo-simple-select-outlined-label"
                              name="theme"
                              value={this.state.tmpTheme.indexOf(this.state.theme)}
                              onChange={e => {this.setState({theme: this.state.tmpTheme[e.target.value]})}}
                          >
                              <MenuItem value={1}>Mode</MenuItem>
                              <MenuItem value={2}>Cosmetique</MenuItem>
                              <MenuItem value={3}>Haute Technologie</MenuItem>
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
                  <Button className="btnCancel" onClick={this.handleClose}>
                    Annuler
                  </Button>
                  <Button className="btnInfDelete" onClick={() => {this.setState({visible: false, visibleDelete: true})}}>Supprimer le compte</Button>
                  <Button className="btnShop" onClick={this.handleSubmit}>
                    Sauvegarder
                  </Button>
                  </Modal.Footer>
                </Modal>
                {
                    this.state.userData ?
                    <div>
                      <Row className="mx-0">
                        <Col className="mx-auto mt-4" align="center">
                          <Image style={{width: '250px', height: '250px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)", marginBottom: '20px'}}
                            src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle/>
                          <h2 style={{color: 'white', fontWeight: '400'}}>{this.state.userData.full_name}</h2>
                          <p style={{color: 'white', fontWeight: '300'}}>{this.state.userData.theme}</p>
                        </Col>
                      </Row>
                      <Row className="ml-4 mt-4">
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
                      <Row className="ml-4 mt-4">
                        <Col>
                          <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Bio</h2>
                          <p style={{color: 'white'}}>{this.state.userData.userDescription ? this.state.userData.userDescription : "Non fourni"}</p>
                        </Col>
                        <Col>
                          <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Note</h2>
                          {this.state.userData.average ?
                            <Row>
                              <Col md={1}>
                                <h3 style={{color: 'white', fontWeight: '300'}}>{this.state.userData.average}</h3>
                              </Col>
                              <Col>
                                <StarRatings
                                   rating={this.state.userData.average ? this.state.userData.average : 0}
                                   starRatedColor="#FFC106"
                                   numberOfStars={5}
                                   name='rating'
                                   starDimension="20px"
                                 />
                              </Col>
                            </Row> :
                            <p style={{color: 'white'}}> Auncune note</p>
                        }
                        </Col>
                      </Row>
                      <Row className="mx-0 mt-4 pt-4">
                        <Col align="center">
                          <Button className="btnShop" onClick={this.handleChangeInfo}>Modifer vos informations</Button>
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

export default withRouter(ShopStatus)
