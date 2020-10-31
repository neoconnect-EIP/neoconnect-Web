import React from 'react';
import {Icon} from 'antd';
import {Grid, Input, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import "../index.css"
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import twitter from "../../assets/twitter.svg";
import pinterest from "../../assets/pinterest.svg";
import twitch from "../../assets/twitch.svg";
import snapchat from "../../assets/snapchat.svg";
import tiktok from "../../assets/tiktok.svg";


export default class InfluencerSignUp extends React.Component{
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
            theme: null,
            instagram: "",
            facebook: "",
            twitter: "",
            snapchat: "",
            youtube: "",
            twitch: "",
            pinterest: "",
            tiktok: "",
            current: 0,
            isEnd: false,
            goodPassword: false,
            errorMsg: 'Veuillez remplir les champs obligatoire: Pseudo, email et mot de passe',
        }
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleResponse = async (res) => {
        if (res.status === 200)
            this.props.history.push('/landing-page/login');
        else {
          var msg = await res.json();
          store.addNotification({
            title: "Erreur",
            message: this.state.errMsg[msg],
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

    handleSubmit = e => {
        let body = {
            "pseudo": this.state.pseudo,
            "password": this.state.password,
            "full_name": this.state.full_name,
            "email": this.state.email,
            "phone": this.state.phone,
            "postal": this.state.postal,
            "city": this.state.city,
            "theme": this.state.theme,
            "facebook": this.state.facebook,
            "twitter": this.state.twitter,
            "snapchat": this.state.snapchat,
            "instagram": this.state.instagram,
            "youtube": this.state.youtube,
            "twitch": this.state.twitch,
            "pinterest": this.state.pinterest,
            "tiktok": this.state.instagram,
        };

        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/register`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => {this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container justify="center">
                        <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                            <h1 style={{fontWeight: '300'}}>Informations de compte</h1>
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
                            <Icon type="mail" style={{ color: 'black', marginRight: "8px"}}/>
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
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container justify="center">
                        <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                            <h1 style={{fontWeight: '300'}}>Informations personelles</h1>
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
                            <Icon type="mobile" style={{ color: 'black', marginRight: "8px"}}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="phone"
                                placeholder="Numéro de téléphone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="home" style={{ color: 'black', marginRight: "8px"}}/>
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
                            <Icon type="home" style={{ color: 'black', marginRight: "8px"}}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="postal"
                                placeholder="Code postal"
                                value={this.state.postal}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid className="input-form" style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="skin" style={{ color: 'black', marginRight: "8px", transform: "translateY(15px)"}}/>
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
                                    <MenuItem value={2}>Cosmétique</MenuItem>
                                    <MenuItem value={3}>Hight tech</MenuItem>
                                    <MenuItem value={4}>Nourriture</MenuItem>
                                    <MenuItem value={5}>Jeux vidéo</MenuItem>
                                    <MenuItem value={6}>Sport/fitness</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container justify="center">
                        <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                            <h1 style={{fontWeight: "300"}}>Renseigner vos réseaux</h1>
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
                          <Image className="iconProfileSocial" src={youtube}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="youtube"
                                placeholder="Youtube"
                                value={this.state.youtube}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                          <Image className="iconProfileSocial" src={twitch}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="twitch"
                                placeholder="Twitch"
                                value={this.state.twitch}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                          <Image className="iconProfileSocial" src={pinterest}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="pinterest"
                                placeholder="Pinterest"
                                value={this.state.pinterest}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                          <Image className="iconProfileSocial" src={tiktok}/>
                            <Input
                                style={{color: 'black'}}
                                type="text"
                                name="tiktok"
                                placeholder="Tiktok"
                                value={this.state.tiktok}
                                onChange={this.handleChange}
                            />
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
        store.addNotification({
          title: "Erreur",
          message: this.state.errorMsg,
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
      if (this.state.pseudo.length > 12 || this.state.pseudo.length < 3) {
        this.state.errorMsg = 'Pseudo invalide. il doit être entre 4 et 12 caractères.';
        return (false);
      }
      if (this.state.password != this.state.password2) {
        this.state.errorMsg = 'Les mots de passes diffèrent.';
        return (false);
      }
      if (!RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$').test(this.state.password)) {
        this.state.errorMsg = "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.";
        return (false);
      }
      return (true);
    }

    checkTheme = () => {
      if (!this.state.theme) {
        this.state.errorMsg = 'Veuillez sélectionner le thème.';
        return (false);
      }
      return true;
    }

    checkForm = () => {
      switch (this.state.current) {
          case 0:
            if (!this.emailValid() || !this.passPseudoValid()) return false;
            else return (true);
          case 1:
            if (!this.checkTheme()) return false;
            else return (true);
      }
    }

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" className="infBg" style={{height: "100%"}}>
                <Grid className="landing-page-mid-div" style={{transform: "translateY(-35px)", borderRadius: "12px", backgroundColor: "white", backdropFilter: "blur(8px)"}}>
                    <div style={{margin: "4rem"}}>

                        <Grid container className="steps-action" justify="center" style={{color: "white"}}>
                            <Grid>
                                {
                                    this.getStepContent(this.state.current)
                                }
                            </Grid>
                            <Grid item xs={12} style={{textAlign: "center"}}>
                                <Button disabled={this.state.current < 1}  onClick={this.prev} className="btnInf" style={{marginRight: "2rem"}}>
                                    Précédent
                                </Button>
                                {
                                  this.state.current < 2 ?
                                      <Button className="btnInf" onClick={() => {this.next()}}>
                                          Suivant
                                      </Button>
                                      :
                                      <Button onClick={this.handleSubmit} className="btnInf">
                                          S'inscrire
                                      </Button>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

// errMsg: {
//   "Bad Request, Please give a pseudo and a password": "Veuillez fournir un pseudo et un mot de passe",
//   "Bad Request, User already exist": "Nom d'utilisateur déjà existant",
//   "Invalid password, the password must contain at least 1 capital letter, 1 small letter, 1 number and must be between 4 and 12 characters": "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.",
//   "Invalid Pseudo, the pseudo must be between 4 and 12 characters": "Pseudo invalide. il doit être entre 4 et 12 caractères."
// }
