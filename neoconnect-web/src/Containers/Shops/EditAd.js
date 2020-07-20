import React from 'react';
import { withRouter } from "react-router-dom"
import { Grid} from '@material-ui/core/';
import {Steps} from 'antd';
import "../index.css"
import {FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { store } from 'react-notifications-component';

const { Step } = Steps;
const steps = [
    {
        title: 'Donnez un nom',
    },
    {
        title: 'Décrivez votre item',
    },
    {
        title: 'Importez vos images',
    },
    {
        title: 'Selectionnez un type',
    },
    {
        title: 'Selectionnez vos Cible',
    },
    {
        title: 'Validation',
    },
];

class EditAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productImgName1: "",
            productImgName2: "",
            productImgName3: "",
            productImgData4: "",
            productImg: [],
            productName: "",
            productSex: "",
            productDesc: "",
            productSubject: "",
            productColor: "",
            productBrand: "",
            current: 0,
            isEnd: false,
            isLoading: true,
            homme: false,
            femme: false,
            sub: 1,
            uni: true
        };
    }

    statesetter = (res) => {
      console.log("RES ", res);
        this.setState({
            productImg: res.productImg,
            productName: res.productName,
            productSex: res.productSex,
            productDesc: res.productDesc,
            productSubject: res.productSubject,
            isLoading: false,
            homme: res.productSex == "homme" ? true : false,
            femme: res.productSex == "femme" ? true : false,
            uni: res.productSex == "unisexe" ? true : false,
        })
    };

    componentDidMount() {
        let id = this.getUrlParams((window.location.search));

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${id.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.statesetter(res))
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

    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h1>Modifier le nom de votre annonce: </h1>
                            <Input
                                type="text"
                                name="productName"
                                placeholder="name"
                                value={this.state.productName}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h1>Modifier la description de votre annonce: </h1>
                            <TextField
                                id="demo-simple-select-outlined"
                                name="productDesc"
                                label="Déscription"
                                multiline
                                rows="8"
                                margin="normal"
                                variant="outlined"
                                style={{width: "700px", height: "160px"}}
                                value={this.state.productDesc}
                                onChange={(value) => this.handleChange(value)}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12}>
                            <h1 style={{textAlign: "center"}}>Modifier les images de votre item ?</h1>
                            <Grid container>
                                <Grid item xs={12} style={{textAlign: "center", marginBottom: "2rem", marginTop: "3rem"}}>
                                    <input type="file" onChange={e => this.handleImage1(e)}/>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                                    <input type="file" onChange={e => this.handleImage2(e)}/>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                                    <input type="file" onChange={e => this.handleImage3(e)}/>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                                    <input type="file" onChange={e => this.handleImage4(e)}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h1>Modifier le type d'item correspondant à votre annonce: </h1>
                            <FormControl variant="outlined" style={{width: "150px"}}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Theme
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    name="productSubject"
                                    value={this.state.productSubject}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value={1}>Mode</MenuItem>
                                    <MenuItem value={2}>Cosmetique</MenuItem>
                                    <MenuItem value={3}>Hight tech</MenuItem>
                                    <MenuItem value={4}>Food</MenuItem>
                                    <MenuItem value={5}>Jeux vidéo</MenuItem>
                                    <MenuItem value={6}>Sport/fitness</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                );
            case 4:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h1>Modifier à qui s'adresse votre annonce ? </h1>
                            <FormControl variant="outlined" style={{width: "10rem"}}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Genre
                                </InputLabel>
                                <Select
                                    name="productSex"
                                    labelId="demo-simple-select-label"
                                    value={this.state.productSex}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="homme">Homme</MenuItem>
                                    <MenuItem value="femme">Femme</MenuItem>
                                    <MenuItem value="unisexe">Unisexe</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                );
            case 5:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h1>Vérifiez bien vos informations avant de valider.</h1>
                            <h3>Cliquez sur "VALIDER" pour terminer l'édition</h3>
                        </Grid>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    };

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
        };
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
        };
        reader.readAsDataURL(file);
    };

    handleGolobalImg = () => {
        const tmp = [];
        var image1 = {};
        var image2 = {};
        var image3 = {};
        var image4 = {};

        if (this.state.productImgName1) {
            image1.imageName = this.state.productImgName1;
            image1.imageData = this.state.productImgData1;
            tmp.push(image1)
        }
        if (this.state.productImgName2) {
            image2.imageName = this.state.productImgName2;
            image2.imageData = this.state.productImgData2;
            tmp.push(image2)
        }
        if (this.state.productImgName3) {
            image3.imageName = this.state.productImgName3;
            image3.imageData = this.state.productImgData3;
            tmp.push(image3)
        }
        if (this.state.productImgName4) {
            image4.imageName = this.state.productImgName4;
            image4.imageData = this.state.productImgData4;
            tmp.push(image4)
        }

        return tmp
    }

    handleChange = (e) => {
        let change = {};

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleResponse = (res) => {
        if (res.status === 200)
            this.setState({isEnd: true});
    };

    handleSubmit = () => {
      if (!this.state.productName || !this.state.productDesc) {
        store.addNotification({
          title: "Erreur",
          message: "Veuillez fournir nom et description de l'annonce",
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
            showIcon: true,
            pauseOnHover: true
          }
        });
      }
      else {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "productImg": this.handleGolobalImg(),
            "productName": this.state.productName,
            "productSex": this.state.productSex,
            "productDesc": this.state.productDesc,
            "productSubject": this.state.productSubject,
            "color": this.state.productColor,
            "brand": this.state.productBrand
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${id.id}`, {
            method: 'PUT',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
      }
    }

    render() {   //TODO probleme image 
          return (
              <div justify="center" className="shopBg"  >
                <Navbar expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Modification d'une annonce</Navbar.Brand>
                </Navbar>
                  {
                      !this.state.isEnd ?
                        <Form className="mx-4 mt-4">
                          <Form.Row>
                            <Form.Group as={Col}>
                              <Form.Label style={{color:'white'}}>Nom</Form.Label>
                              <Form.Control placeholder="Nom de votre annonce" value={this.state.productName} onChange={e => {this.setState({productName: e.target.value})}}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                              <Form.Label style={{color:'white'}}>Marque</Form.Label>
                              <Form.Control placeholder="Marque de votre offre" value={this.state.productBrand} onChange={e => {this.setState({productBrand: e.target.value})}}/>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group as={Col}>
                              <Form.Label style={{color:'white'}}>Thème</Form.Label>
                              <Form.Control as="select" value={this.state.sub} onChange={(e) =>{ this.setState({sub: e.target.value});}}>
                                <option value={1}>Mode</option>
                                <option value={2}>Cosmetique</option>
                                <option value={3}>High tech</option>
                                <option value={4}>Nourriture</option>
                                <option value={5}>Jeux vidéo</option>
                                <option value={6}>Sport/Fitness</option>
                              </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                              <Form.Label style={{color:'white'}}>Description</Form.Label>
                              <Form.Control placeholder="Description de votre annonce" value={this.state.productDesc} onChange={e => {this.setState({productDesc: e.target.value})}}/>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>

                            <Form.Group as={Col}  sm={2} >
                              <Form.Label style={{color:'white'}}>Couleur</Form.Label>
                              <Form.Control placeholder="Couleur de votre produit" value={this.state.productColor} onChange={e => {this.setState({productColor: e.target.value})}}/>
                            </Form.Group>

                            <fieldset>
                              <Form.Group as={Col}>
                                <Form.Label sm={2} style={{color: 'white'}}>
                                  Cible
                                </Form.Label>
                                <Col sm={10}>
                                  <Form.Check style={{color: 'white'}} type="radio" label="Homme" checked={this.state.homme}
                                    onChange={() => { this.setState({homme: true, femme: false, uni: false, productSex: "homme"})}}
                                  />
                                  <Form.Check style={{color: 'white'}} type="radio" label="Femme" checked={this.state.femme}
                                    onChange={() => { this.setState({homme: false, femme: true, uni: false, productSex: "femme"})}}
                                  />
                                  <Form.Check style={{color: 'white'}} type="radio" label="Unisexe" checked={this.state.uni}
                                    onChange={() => { this.setState({homme: false, femme: false, uni: true, productSex: "unisexe"})}}
                                  />
                                </Col>
                              </Form.Group>
                            </fieldset>


                            <Form.Group as={Col}>
                              <Form.Label as="legend" column sm={2} style={{color: 'white'}}>
                                Images
                              </Form.Label>
                                <Form.File style={{color:'white'}} className="mt-2" onChange={e => this.handleImage1(e)}/>
                                <Form.File style={{color:'white'}} className="mt-2" onChange={e => this.handleImage2(e)}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                              <Form.Label as="legend" column sm={2} style={{color: 'transparent'}}>
                                Images
                              </Form.Label>
                                <Form.File style={{color:'white'}} className="mt-2" onChange={e => this.handleImage3(e)}/>
                                <Form.File style={{color:'white'}} className="mt-2" onChange={e => this.handleImage3(e)}/>
                            </Form.Group>

                          </Form.Row>

                          <Form.Row className="mt-4">
                            <Button className="mx-auto btnShop" onClick={() => {this.handleSubmit()}}>
                              Sauvegarder l'annonce
                            </Button>
                          </Form.Row>

                        </Form>
                      :
                      <Grid container style={{marginTop: "7.5rem", padding: "15rem"}}>
                          <Grid item xs={12}>
                              <h1 style={{textAlign: "center"}}>Annonce modifié avec succès</h1>
                          </Grid>
                              <Grid item xs={12} style={{textAlign: "center"}}>
                                  <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "#292929"}}/>
                              </Grid>
                      </Grid>
                  }
              </div>
          );
      }
  }


export default withRouter(EditAd)
//
// return (
//     <Grid container justify="center">
//         {
//             this.state.isLoading ?
//                 <Loader
//                     type="Triangle"
//                     color="#292929"
//                     height={200}
//                     width={200}
//                     style={{marginTop: "14rem"}}
//                 />
//                 :
//                 <Grid>
//                     {
//                         !this.state.isEnd ?
//                             <Grid container>
//                                 <Grid item xs={12} style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
//                                     <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Modifier une annonce</h1>
//                                 </Grid>
//                                 <Steps current={this.state.current} style={{marginTop: "130px", padding: "25px"}}>
//                                     {steps.map(item => (
//                                         <Step key={item.id} title={item.title} />
//                                     ))}
//                                 </Steps>
//                                 <Grid item className="steps-content" xs={12}>{steps[this.state.current].content}</Grid>
//                                 <Grid container className="steps-action" xs={12} justify="center">
//                                     <Grid item={12}>
//                                         {
//                                             this.getStepContent(this.state.current)
//                                         }
//                                     </Grid>
//                                     <Grid item xs={12} style={{textAlign: "center"}}>
//                                         <Button disabled={this.state.current < 1} variant="contained" color="secondary"  onClick={this.prev} style={{marginRight: "2rem"}}>
//                                             PREVIOUS
//                                         </Button>
//                                         {
//                                             this.state.current < 5 ?
//                                                 <Button variant="contained" color="secondary" onClick={this.next}>
//                                                     NEXT
//                                                 </Button>
//                                                 :
//                                                 <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
//                                                     VALIDER
//                                                 </Button>
//                                         }
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             :
//                             <Grid container style={{marginTop: "7.5rem", padding: "15rem"}}>
//                                 <Grid item xs={12}>
//                                     <h1 style={{textAlign: "center"}}>Annonce édité avec succès</h1>
//                                 </Grid>
//                                 <Grid item xs={12} style={{textAlign: "center"}}>
//                                     <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "#292929"}}/>
//                                 </Grid>
//                             </Grid>
//                     }
//                 </Grid>
//         }
//     </Grid>
// );
// }
// }
