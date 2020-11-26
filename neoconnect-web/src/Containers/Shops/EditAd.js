import React from 'react';
import { withRouter } from "react-router-dom"
import { Grid} from '@material-ui/core/';
import "../index.css"
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { showNotif, themeVal } from '../Utils.js';
import { FormControl, InputLabel, Select, MenuItem} from '@material-ui/core/';
import LoadingOverlay from 'react-loading-overlay';

class EditAd extends React.Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            productImgName1: "",
            productImgName2: "",
            productImgName3: "",
            productImgData4: "",
            productImg: [],
            productName: "",
            productSex: "",
            productDesc: "",
            current: 0,
            isEnd: false,
            isLoading: true,
            homme: false,
            femme: false,
            theme: "",
            uni: true,
            isActive: false,
            visible: false,
        };
    }

    statesetter = (res) => {
        this.setState({
            productBrand: res.brand,
            productImg: res.productImg,
            productName: res.productName,
            productSex: res.productSex,
            productDesc: res.productDesc,
            theme: res.productSubject,
            isLoading: false,
            homme: res.productSex === "Homme" ? true : false,
            femme: res.productSex === "Femme" ? true : false,
            uni: res.productSex === "Unisexe" ? true : false,
        })
    };

    componentDidMount() {
        let id = this.getUrlParams((window.location.search));

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${id.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          if (res.status === 200)
            return res.json();
        })
        .then(res => this.statesetter(res))
        .catch(error => {showNotif(true, "Erreur", null)});
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

    handleSplitString = (str) => {
        var tmp = "";
        var i = 0;

        i = str.indexOf(",");
        tmp = str.substr(i + 1)
        return tmp
    };

    handleImage1 = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                productImgName1: file.name,
                productImgData1: this.handleSplitString(reader.result),
            });
            reader.readAsDataURL(file);
        };
        if (file)
          reader.readAsDataURL(file);
    };

    handleImage2 = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                productImgName2: file.name,
                productImgData2: this.handleSplitString(reader.result),
            });
        };
        if (file)
          reader.readAsDataURL(file);
    };

    handleImage3 = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                productImgName3: file.name,
                productImgData3: this.handleSplitString(reader.result),
            });
        };
        if (file)
          reader.readAsDataURL(file);
    };

    handleImage4 = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                productImgName4: file.name,
                productImgData4: this.handleSplitString(reader.result),
            });
            reader.readAsDataURL(file);
        };
        if (file)
          reader.readAsDataURL(file);
    };

    handleGolobalImg = () => {
        const tmp = [];

        if (this.state.productImgName1) {
            tmp.push({
              imageName: this.state.productImgName1,
              imageData: this.state.productImgData1
            })
        }
        if (this.state.productImgName2) {
          tmp.push({
            imageName: this.state.productImgName2,
            imageData: this.state.productImgData2
          })
        }
        if (this.state.productImgName3) {
          tmp.push({
            imageName: this.state.productImgName3,
            imageData: this.state.productImgData3
          })
        }
        if (this.state.productImgName4) {
          tmp.push({
            imageName: this.state.productImgName4,
            imageData: this.state.productImgData4
          })
        }
        return tmp
    }

    handleChange = (e) => {
        let change = {};

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleResponse = (res) => {
      this.setState({isActive: false});
      if (res.status === 200)
          this.setState({isEnd: true});
    };

    handleSubmit = () => {
      var images = this.handleGolobalImg();
      console.log("img ", images);
      console.log("this.state.productDesc ", this.state.productDesc);
      console.log("this.state.productName ", this.state.productName);
      console.log("this.state.theme ", this.state.theme);
      if (!this.state.productName || this.state.productDesc.length > 255 || images.length === 0 || !this.state.theme) {
        showNotif(true, "Erreur", "Veuillez fournir nom, thème, description de l'offre et au moins une image. La description ne dois pas dépasser 255 caractères.");
      }
      else {
        this.setState({isActive: true});
        let id = this.getUrlParams((window.location.search));
        let body = {
            "productImg": images,
            "productName": this.state.productName,
            "productSex": (this.state.theme === 'Mode' || this.state.theme === 'Mode' === 'Cosmétique') ?
            (this.state.homme ? "Homme" : (this.state.femme ? "Femme" : "Unisexe")) : null,
            "productDesc": this.state.productDesc,
            "productSubject": this.state.theme,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${id.id}`, {
            method: 'PUT',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.handleResponse(res)})
            .catch(error => {this.setState({isActive: false});showNotif(true, "Erreur",null)});
      }
    }

    handleDelete = () => {
        let id = this.getUrlParams((window.location.search));
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${id.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          if (res.status >= 500)
            throw res;
          if (res.status === 200)
            this.props.history.push('/shop-dashboard/ads')
        })
        .catch(error => {showNotif(true, "Erreur",null)});
    };

    render() {
          return (
            <LoadingOverlay
              active={this.state.isActive}
              spinner
              text='Chargement...'
              >
              <div justify="center" className="shopBg"  >
                <Navbar expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Modification d'une offre</Navbar.Brand>
                </Navbar>
                  {
                      !this.state.isEnd ?
                        <Form className="mx-auto mt-4" style={{width: '40%'}}>
                          <Form.Row>
                            <Form.Group as={Col}>
                              <Form.Label style={{color:'white'}}>Marque</Form.Label>
                              <p style={{color:'white'}}>{this.state.productBrand}</p>
                            </Form.Group>
                            <Form.Group as={Col} className="mt-1">
                              <FormControl variant="outlined" style={{ color: 'white'}}>
                                <InputLabel id="demo-simple-select-outlined-label" style={{color: 'white'}}>
                                    Thème*
                                </InputLabel>
                                <Select
                                    style={{color: 'white'}}
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
                                  <MenuItem value={6}>Sport/Fitness</MenuItem>
                                </Select>
                              </FormControl>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group as={Col} sm={12}>
                              <Form.Label style={{color:'white'}}>Nom*</Form.Label>
                              <Form.Control placeholder="Nom de votre offre" value={this.state.productName} onChange={e => {this.setState({productName: e.target.value})}}/>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group as={Col} sm={12}>
                              <Form.Label style={{color:'white'}}>Description*</Form.Label>
                              <Form.Control placeholder="Description de votre offre" value={this.state.productDesc} onChange={e => {this.setState({productDesc: e.target.value})}}/>
                            </Form.Group>
                          </Form.Row>
                          {
                            (this.state.theme === "Mode" || this.state.theme === "Cosmétique") &&
                            <Form.Row>
                              <Form.Label sm={12} style={{color: 'white', marginRight: 30, marginLeft: 5}}>Cible</Form.Label>
                              <Form.Check style={{color: 'white', marginRight: 10}} type="radio" label="Homme" checked={this.state.homme}
                                onChange={() => { this.setState({homme: true, femme: false, uni: false, productSex: "Homme"})}}/>
                              <Form.Check style={{color: 'white', marginRight: 10}} type="radio" label="Femme" checked={this.state.femme}
                                onChange={() => { this.setState({homme: false, femme: true, uni: false, productSex: "Femme"})}}/>
                              <Form.Check style={{color: 'white'}} type="radio" label="Unisexe" checked={this.state.uni}
                                onChange={() => { this.setState({homme: false, femme: false, uni: true, productSex: "Unisexe"})}}/>
                            </Form.Row>
                          }
                          <Form.Row>
                            <Form.Group as={Col}>
                              <Form.Label as="legend" style={{color: 'white', fontSize: 18}}>
                                Images*
                              </Form.Label>
                              <Form.File style={{color:'white'}} accept="image/*" className="mt-2" onChange={e => this.handleImage1(e)}/>
                              <Form.File style={{color:'white'}} accept="image/*" className="mt-2" onChange={e => this.handleImage2(e)}/>
                              <Form.File style={{color:'white'}} accept="image/*" className="mt-2" onChange={e => this.handleImage3(e)}/>
                              <Form.File style={{color:'white'}} accept="image/*" className="mt-2" onChange={e => this.handleImage4(e)}/>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row className="mt-4">
                            <Col>
                              <Button onClick={() => {this.setState({visible: true})}} className="btnDelete">Supprimer</Button>
                            </Col>
                            <Col>
                              <Button className="mx-auto btnShop" onClick={() => {this.handleSubmit()}}>Sauvegarder</Button>
                            </Col>
                          </Form.Row>

                        </Form>
                      :
                      <Grid container style={{marginTop: "7.5rem", padding: "15rem"}}>
                          <Grid item xs={12}>
                              <h1 style={{textAlign: "center"}}>Offre modifié avec succès</h1>
                          </Grid>
                              <Grid item xs={12} style={{textAlign: "center"}}>
                                  <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "#292929"}}/>
                              </Grid>
                      </Grid>
                  }
              </div>
              <Modal centered show={this.state.visible} onHide={() => { this.setState({visible: false})}}>
                <Modal.Header closeButton>
                  <Modal.Title>Suppression d'offre</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sur de vouloir supprimer votre offre ?</Modal.Body>
                <Modal.Footer>
                  <Button className="btnCancel" onClick={() => { this.setState({visible: false})}}>
                    Non
                  </Button>
                  <Button className="btnDelete" onClick={this.handleDelete}>
                    Oui
                  </Button>
                </Modal.Footer>
              </Modal>
            </LoadingOverlay>
          );
      }
  }


export default withRouter(EditAd)
