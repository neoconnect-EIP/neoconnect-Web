import React from 'react';
import {Form, Icon} from 'antd';
import {Grid, Input, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import "../index.css";
import Image from 'react-bootstrap/Image';
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import snapchat from "../../assets/snapchat.svg";
import twitter from "../../assets/twitter.svg";
import camera from "../../assets/camera.svg";
import { showNotif } from '../Utils.js';

export default class ShopSignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            password: "",
            password2: "",
            full_name: "",
            email: "",
            postal: "",
            city: "",
            phone: "",
            theme: "",
            site: "",
            facebook: "",
            instagram: "",
            snapchat: "",
            twitter: "",
            current: 0,
            isEnd: false,
            imgChanged: false,
            themeValue: ['', 'mode', 'cosmetique', 'high tech', 'food', 'jeux video',  'sport/fitness'],
            goodPassword: false,
            errMsg: {
              "Error, account already exists": "Erreur, compte existant",
              "Bad Request, Please give a pseudo and a password": "Veuillez fournir un pseudo et un mot de passe",
              "Bad Request, User already exist": "Nom d'utilisateur déjà existant",
              "Invalid password, the password must contain at least 1 capital letter, 1 small letter, 1 number and must be between 4 and 12 characters": "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.",
              "Invalid Pseudo, the pseudo must be between 4 and 12 characters": "Pseudo invalide. il doit être entre 4 et 12 caractères."
            },
        }
        this.inputOpenFileRef = React.createRef();
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleResponse = async (res) => {
        if (res.status === 200)
        {
          showNotif(false, "Succés", "Votre compte a bien été créé.");
          this.props.history.push('/landing-page/login');
        }
        else {
          var msg = await res.json();
          showNotif(true, "Erreur", this.state.errMsg[msg]);
        }
    };

    handleSubmit = () => {
      if (!this.state.theme) {
        showNotif(true, "Erreur", "Veuillez choisir un thème");
      } else {
        let body = {
            "pseudo": this.state.pseudo,
            "password": this.state.password,
            "password2": this.state.password2,
            "full_name": this.state.full_name,
            "email": this.state.email,
            "postal": this.state.postal,
            "city": this.state.city,
            "phone": this.state.phone,
            "website": this.state.site,
            "theme": this.state.theme.toString(),
            "userPicture": this.state.imgChanged ? this.state.userPicture : undefined,
        };
        body = JSON.stringify(body);

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/register`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => this.handleResponse(res))
            .catch(error => showNotif(true, "Erreur, Veuillez essayer ultérieurement", error.statusText));

      }
    };

    handleSplitString = (str) => {
        var tmp = "";
        var i = 0;

        i = str.indexOf(",");
        tmp = str.substr(i + 1)
        return tmp
    };

    showOpenFileDlg = () => {
      this.inputOpenFileRef.current.click()
    }

    handleImgChange(event, thisTmp) {
      thisTmp.state.imgChanged = true;
      event.preventDefault();
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
          thisTmp.setState({
              file: file,
              userPicture: thisTmp.handleSplitString(reader.result),
          });
      };
      reader.readAsDataURL(file);
  }

    getStepContent = (step) => {
      var thisTmp = this;

        switch (step) {
            case 0:
                return (
                    <Grid container justify="center">
                        <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                            <h1 style={{fontWeight: '300'}}>Informations de compte</h1>
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                          <input ref={this.inputOpenFileRef} type="file" style={{ display: "none" }} onChange={(e) => {this.handleImgChange(e, thisTmp)}}/>
                          {
                            this.state.imgChanged ?
                            <Image className="report" style={{width: '100px', height: '100px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}
                              src={`data:image/jpeg;base64,${this.state.userPicture}`} onClick={this.showOpenFileDlg} roundedCircle/>
                             :
                            <div className="mx-auto report" onClick={this.showOpenFileDlg}
                              style={{backgroundColor: '#8FBA86', width: '100px', height: '100px', borderRadius: '50px', display: 'flex'}} >
                                <Image className="my-auto mx-auto" style={{width: '50px', height: 'auto'}} src={camera} />
                            </div>
                          }
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="user" style={{ color: 'black', marginRight: "8px"}}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="pseudo"
                                placeholder="Pseudo"
                                value={this.state.pseudo}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="mail" style={{ color: 'black', marginRight: "8px"}} />
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="lock" style={{ color: 'black', marginRight: "8px"}}/>
                            <Input
                                style={{color: 'black'}}
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={this.state.password}
                                onChange={this.handleChange}
                                size="large"
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Icon type="lock" style={{ color: 'black', marginRight: "8px"}}/>
                            <Input
                                style={{color: 'black'}}
                                type="password"
                                name="password2"
                                placeholder="Confirmation"
                                value={this.state.password2}
                                onChange={this.handleChange}
                            />
                            {
                                !this.state.password || !this.state.password2.length ||
                                this.state.password === this.state.password2 ?
                                    ""
                                    :
                                    <p style={{color: "red"}}>Les mots de passes diffèrent</p>
                            }
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container justify="center">
                        <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                            <h1 style={{fontWeight: '300'}}>Informations personnelles</h1>
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="user" style={{ color: 'black', marginRight: "8px"}}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="full_name"
                                placeholder="Nom complet"
                                value={this.state.full_name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="home" style={{ color: 'black', marginRight: "8px"}} />
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="city"
                                placeholder="Ville"
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="home" style={{ color: 'black', marginRight: "8px"}} />
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="postal"
                                placeholder="Code postal"
                                value={this.state.postal}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Icon type="mobile" style={{ color: 'black', marginRight: "8px"}} />
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="phone"
                                placeholder="Numéro de téléphone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                );
                case 2:
                    return (
                        <Grid container justify="center">
                            <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                                <h1 style={{fontWeight: '300'}}>Renseigner vos réseaux</h1>
                            </Grid>
                            <Grid className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                                <Image className="iconProfileSocial" src={instagram}/>
                                <Input
                                    style={{color: 'black'}}
                                    type="text"
                                    name="instagram"
                                    placeholder="Instagram"
                                    value={this.state.instagram}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                              <Image className="iconProfileSocial" src={facebook}/>
                                <Input
                                    style={{color: 'black'}}
                                    type="text"
                                    name="facebook"
                                    placeholder="Facebook"
                                    value={this.state.facebook}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                              <Image className="iconProfileSocial" src={twitter}/>
                                <Input
                                    style={{color: 'black'}}
                                    type="text"
                                    name="twitter"
                                    placeholder="Twitter"
                                    value={this.state.twitter}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                              <Image className="iconProfileSocial" src={snapchat}/>
                                <Input
                                    style={{color: 'black'}}
                                    type="text"
                                    name="snapchat"
                                    placeholder="Snapchat"
                                    value={this.state.snapchat}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                                <Icon type="global" style={{ color: 'black', marginRight: "8px"}} />
                                <Input
                                    style={{color: 'black'}}
                                    type="text"
                                    name="siteweb"
                                    placeholder="Site web"
                                    value={this.state.site}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                                <Icon type="skin" style={{ color: 'black', marginRight: "8px"}} />
                                <FormControl variant="outlined" style={{width: "21.7rem", color: 'black'}}>
                                    <InputLabel id="demo-simple-select-outlined-label" style={{color: 'black'}}>
                                        Thème
                                    </InputLabel>
                                    <Select
                                        style={{color: 'black'}}
                                        labelId="demo-simple-select-outlined-label"
                                        name="theme"
                                        value={this.state.theme}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value={1}>Mode</MenuItem>
                                        <MenuItem value={2}>Cosmetique</MenuItem>
                                        <MenuItem value={3}>Haute Technologie</MenuItem>
                                        <MenuItem value={4}>Food</MenuItem>
                                        <MenuItem value={5}>Jeux vidéo</MenuItem>
                                        <MenuItem value={6}>Sport/fitness</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    );
            default:
                return 'Unknown step';
        }
    };

    next = () => {
      if (this.checkForm()) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
      else {
        showNotif(true, "Erreur", this.state.errorMsg);
      }
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    emailValid = () => {
      if (!RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").test(this.state.email)) {
        this.state.errorMsg = 'Email invalide.';
        return (false);
      }
      return (true);
    }

    passPseudoValid = () => {
      if (this.state.pseudo.length > 12 || this.state.pseudo.length < 3 || !this.state.pseudo.match("^[A-Za-z0-9]+$")) {
        this.state.errorMsg = 'Pseudo invalide. il doit être entre 4 et 12 caractères. Il doit contenir que des lettres et chiffres.';
        return (false);
      }
      if (this.state.password !== this.state.password2) {
        this.state.errorMsg = 'Les mots de passes diffèrent.';
        return (false);
      }
      if (!RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$').test(this.state.password)) {
        this.state.errorMsg = "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.";
        return (false);
      }
      return (true);
    }

    checkForm = () => {
      if (this.state.current === 0  && (!this.emailValid() || !this.passPseudoValid()))
        return false;
      return true;
    }

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" className="shopBg" style={{height: "100%"}}>
                <Grid className="landing-page-mid-div" style={{transform: "translateY(-35px)", borderRadius: "12px", backgroundColor: "white", backdropFilter: "blur(8px)"}}>

                    <Form className="formular" onSubmit={this.handleSubmit} style={{margin: "2rem"}}>
                        <Grid container className="steps-action" justify="center">
                            <Grid item={12}>
                                {
                                    this.getStepContent(this.state.current)
                                }
                            </Grid>
                            <Grid item xs={12} style={{textAlign: "center"}}>
                                <Button disabled={this.state.current < 1} className="btnShop" onClick={this.prev} style={{marginRight: "2rem"}}>
                                    Précédent
                                </Button>
                                {
                                    this.state.current < 3 ?
                                        <Button className="btnShop" onClick={this.next}>
                                            Suivant
                                        </Button>
                                        :
                                        <Button onClick={this.handleSubmit} className="btnShop">
                                            S'inscrire
                                        </Button>
                                }
                            </Grid>
                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        );
    }
}
