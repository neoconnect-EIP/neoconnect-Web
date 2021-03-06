import React from 'react';
import {Icon} from 'antd';
import {Grid, Input, InputLabel, Select, MenuItem, FormControl} from '@material-ui/core';
import "../index.css"
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
import camera from "../../assets/camera.svg";
import { showNotif } from '../Utils.js';
import LoadingOverlay from 'react-loading-overlay';

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
      theme: "",
      instagram: "",
      facebook: "",
      twitter: "",
      snapchat: "",
      youtube: "",
      twitch: "",
      pinterest: "",
      tiktok: "",
      current: 0,
      imgChanged: false,
      file: null,
      sexe: '',
      bio: '',
      userPicture: null,
      errorMsg: 'Veuillez remplir les champs obligatoire: Pseudo, email et mot de passe',
      errMsg: {
        "Error, account already exists": "Erreur, compte existant, vérifiez vos réseaux sociaux",
        "Bad Request, Please give a pseudo and a password": "Veuillez fournir un pseudo et un mot de passe",
        "Bad Request, User already exist": "Nom d'utilisateur déjà existant",
        "Invalid password, the password must contain at least 1 capital letter, 1 small letter, 1 number and must be between 4 and 12 characters": "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.",
        "Invalid Pseudo, the pseudo must be between 3 and 24 characters": "Pseudo invalide. il doit être entre 3 et 12 caractères."
      },
      isActive: false,
      emailPseudoExist: true,
    }
    this.inputOpenFileRef = React.createRef();
  }

  handleChange = (e) => {
    let change = {}

    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleResponse = async (res) => {
    if (res.status === 200) {
      this.props.history.push('/landing-page/login');
      showNotif(false, "Succés", "Votre compte a bien été créé.");
    }
    else {
      var msg = await res.json();
      showNotif(true, "Erreur", this.state.errMsg[msg]);
    }
    this.setState({isActive: false});
  }

  handleSubmit = () => {
    this.setState({isActive: true});
    let body = {
      "pseudo": this.state.pseudo,
      "password": this.state.password,
      "full_name": this.state.full_name,
      "email": this.state.email,
      "phone": this.state.phone,
      "postal": this.state.postal,
      'userDescription': this.state.bio,
      "city": this.state.city,
      "theme": this.state.theme.toString(),
      "facebook": this.state.facebook,
      "twitter": this.state.twitter,
      "snapchat": this.state.snapchat,
      "instagram": this.state.instagram,
      "youtube": this.state.youtube,
      "twitch": this.state.twitch,
      "pinterest": this.state.pinterest,
      "tiktok": this.state.instagram,
      "sexe": parseInt(this.state.sexe) === 1 ? 'Homme': (parseInt(this.state.sexe) === 2 ? 'Femme' : undefined),
      "userPicture": this.state.imgChanged ? this.state.userPicture : undefined,
    };

    body = JSON.stringify(body);
    fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/register`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
    .then(res => {this.handleResponse(res)})
    .catch(error => {
      showNotif(true, "Erreur",null);
      this.setState({isActive: false});
    });
  };

  checkField = (pseudo) => {
    let body;
    if (pseudo === true)
      body = {"pseudo": this.state.pseudo};
    else
      body = {"email": this.state.email};
    body = JSON.stringify(body);
    fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/checkField`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res === true)
      showNotif(true, "Erreur", "Compte existant, veuillez essayer un autre email ou pseudo");
      else {
        if (pseudo === true) {
          this.checkField(false);
        }
        else {
          this.setState({emailPseudoExist: false, current: this.state.current + 1})
        }
      }
    })
    .catch(error => showNotif(true, "Erreur",null));
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
      this.setState({
        file: file,
        userPicture: this.handleSplitString(reader.result),
      });
    };
    if (file)
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
            <Icon type="user" style={{ color: 'black', marginRight: "8px"}}/>
            <Input
              style={{color: 'black'}}
              type="text"
              name="pseudo"
              placeholder="Pseudo*"
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
              placeholder="Email*"
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
              placeholder="Mot de passe*"
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
              placeholder="Confirmation*"
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
            <h1 style={{fontWeight: '300'}}>Informations de profil</h1>
          </Grid>
          <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
            <input ref={this.inputOpenFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {this.handleImgChange(e, thisTmp)}}/>
            {
              this.state.imgChanged ?
              <Image className="pointerClick" style={{width: '100px', height: '100px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}
                src={`data:image/jpeg;base64,${this.state.userPicture}`} onClick={this.showOpenFileDlg} roundedCircle/>
              :
              <div className="mx-auto pointerClick" onClick={this.showOpenFileDlg}
                style={{backgroundColor: '#50A2C0', width: '100px', height: '100px', borderRadius: '50px', display: 'flex'}} >
                <Image className="my-auto mx-auto" style={{width: '50px', height: 'auto'}} src={camera} />
              </div>
            }
          </Grid>
          <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
            <Icon type="user" style={{ color: 'black', marginRight: "8px"}}/>
            <Input
              style={{color: 'black'}}
              type="text"
              name="bio"
              placeholder="Description de votre profil"
              value={this.state.bio}
              onChange={this.handleChange}
              />
          </Grid>
        </Grid>
      );
      case 2:
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
            <Icon type="user" style={{ color: 'black', marginRight: "8px", transform: "translateY(15px)"}}/>
            <FormControl variant="outlined" style={{width: "21.7rem", color: 'black'}}>
              <InputLabel id="demo-simple-select-outlined-label" style={{color: 'black'}}>
                Sexe*
              </InputLabel>
              <Select
                style={{color: 'black'}}
                labelId="demo-simple-select-outlined-label"
                name="sexe"
                value={this.state.sexe}
                onChange={this.handleChange}
                >
                <MenuItem value={1}>Homme</MenuItem>
                <MenuItem value={2}>Femme</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid className="input-form" style={{textAlign: "center", marginBottom: "1rem"}}>
            <Icon type="skin" style={{ color: 'black', marginRight: "8px", transform: "translateY(15px)"}}/>
            <FormControl variant="outlined" style={{width: "21.7rem", color: 'black'}}>
              <InputLabel id="demo-simple-select-outlined-label" style={{color: 'black'}}>
                Thème*
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
                <MenuItem value={3}>High tech</MenuItem>
                <MenuItem value={4}>Nourriture</MenuItem>
                <MenuItem value={5}>Jeux vidéo</MenuItem>
                <MenuItem value={6}>Sport/fitness</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );
      case 3:
      return (
        <Grid container justify="center">
          <Grid item style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
            <h1 style={{fontWeight: "300"}}>Renseigner vos réseaux</h1>
          </Grid>
          <Grid className="input-form" style={{textAlign: "center", marginBottom: "1rem"}}>
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
          <Grid item className="input-form" style={{textAlign: "center", marginBottom: "1rem"}}>
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
          <Grid item className="input-form" style={{textAlign: "center", marginBottom: "1rem"}}>
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
          <Grid item className="input-form" style={{textAlign: "center", marginBottom: "2rem"}}>
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
          <Grid item className="input-form" style={{textAlign: "center", marginBottom: "2rem"}}>
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
          <Grid item className="input-form" style={{textAlign: "center", marginBottom: "2rem"}}>
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
          <Grid item className="input-form" style={{textAlign: "center", marginBottom: "2rem"}}>
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
          <Grid item className="input-form" style={{textAlign: "center", marginBottom: "2rem"}}>
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
      if (this.state.current === 0)
      this.checkField(true);
      else
      this.setState({ current: this.state.current + 1 });
    }
    else {
      showNotif(true, "Erreur", this.state.errorMsg);
    }
  }

  prev = () => {
    this.setState({current: this.state.current - 1});
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
      this.state.errorMsg = 'Pseudo invalide. il doit être entre 3 et 12 caractères. Il doit contenir que des lettres et chiffres.';
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

  checkTheme = () => {
    if (!this.state.theme || !this.state.sexe) {
      this.state.errorMsg = 'Veuillez sélectionner le thème et le sexe.';
      return (false);
    }
    return true;
  }

  checkForm = () => {
    switch (this.state.current) {
      case 0:
        if (!this.emailValid() || !this.passPseudoValid()) return false;
        else return (true);
      case 2:
        if (!this.checkTheme()) return false;
        else return (true);
      default:
        return (true);
    }
  }

  render() {
    return (
      <LoadingOverlay
        active={this.state.isActive}
        spinner
        text='Chargement...'
        >
        <div className="infBg" style={{paddingTop:'200px', overflow: 'auto'}}>
          <Grid container direction="row" >
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
                      this.state.current < 3 ?
                      <Button className="btnInf" onClick={() => {this.next()}}>
                        Suivant
                      </Button>
                      :
                      <Button onClick={() => {this.handleSubmit()}} className="btnInf">
                        S'inscrire
                      </Button>
                    }
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </LoadingOverlay>
    );
  }
}
