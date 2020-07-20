import React from 'react';
import {Form, Icon, Steps} from 'antd';
import {Grid, Input, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import "../index.css";
import { store } from 'react-notifications-component';

const { Step } = Steps;

export default class ShopSignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: null,
            password2: "",
            full_name: "",
            email: "",
            postal: "",
            city: "",
            prone: "",
            theme: "",
            function: "",
            society: "",
            current: 0,
            isEnd: false,
            goodPassword: false,
            errMsg: {
              "Bad Request, Please give a pseudo and a password": "Veuillez fournir un pseudo et un mot de passe",
              "Bad Request, User already exist": "Nom d'utilisateur déjà existant",
              "Invalid password, the password must contain at least 1 capital letter, 1 small letter, 1 number and must be between 4 and 12 characters": "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.",
              "Invalid Pseudo, the pseudo must be between 4 and 12 characters": "Pseudo invalide. il doit être entre 4 et 12 caractères."
            }
        }
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleResponse = async (res) => {
      console.log(res);
        if (res.status === 200)
            this.props.history.push('/landing-page/login')
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
              showIcon: true,
              pauseOnHover: true
            }
          });
        }
    };

    handleSubmit = () => {
      console.log("HELLO",  this.state.username);
        let body = {
            "pseudo": this.state.username,
            "password": this.state.password,
            "password2": this.state.password2,
            "full_name": this.state.full_name,
            "email": this.state.email,
            "postal": this.state.postal,
            "city": this.state.city,
            "phone": this.state.phone,
            "theme": this.state.theme,
            "function": this.state.function,
            "society": this.state.society,
        };
        body = JSON.stringify(body);
        console.log("BODY", body);

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/register`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => this.handleResponse(res))
            .catch(error => console.error('Error222:', error));

            // res.json();
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container justify="center">
                        <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                            <h1 style={{color: "#fff"}}>Identifiant et mot de passe</h1>
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="user" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="username"
                                placeholder="Pseudo"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="lock" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={this.state.password}
                                onChange={this.handleChange}
                                size="large"
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Icon type="lock" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
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
                            <h1 style={{color: "#fff"}}>Informations personelles</h1>
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="user" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="full_name"
                                placeholder="Nom et prénom"
                                value={this.state.full_name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="home" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="postal"
                                placeholder="Code postal"
                                value={this.state.postal}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="home" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="city"
                                placeholder="Ville"
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="mail" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Icon type="mobile" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
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
                            <h1 style={{color: "#fff"}}>Renseigner vos réseaux</h1>
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="skin" style={{ color: '#fff', marginRight: "8px"}} />
                            <FormControl variant="outlined" style={{width: "21.7rem", color: "#fff"}}>
                                <InputLabel id="demo-simple-select-outlined-label" style={{color: "#fff"}}>
                                    Thème
                                </InputLabel>
                                <Select
                                    style={{color: "#fff"}}
                                    labelId="demo-simple-select-outlined-label"
                                    name="theme"
                                    value={this.state.theme}
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
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="shop" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="society"
                                placeholder="Société"
                                value={this.state.society}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Icon type="info" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="function"
                                placeholder="Fonction"
                                value={this.state.function}
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
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
                <Grid className="landing-page-mid-div" style={{transform: "translateY(-35px)", borderRadius: "12px", backgroundColor: "#000000a8", backdropFilter: "blur(8px)"}}>
                    <div style={{backgroundImage: "linear-gradient(65deg, #000, #292929)", marginLeft: "5rem", marginRight: "5rem", marginTop: "-2rem", borderRadius: "8px"}}>
                        <h1 style={{textAlign: "center", color: "white", paddingBottom: "0.5rem"}}>Inscription boutique</h1>
                    </div>
                    <Form className="formular" onSubmit={this.handleSubmit} style={{margin: "2rem"}}>
                        <Steps progressDot current={this.state.current}>
                            <Step title={<p style={{color: "#fff"}}>Identifiant et mot de passe</p>}/>
                            <Step title={<p style={{color: "#fff"}}>Informations personelles</p>}/>
                            <Step title={<p style={{color: "#fff"}}>Renseignez vos réseaux</p>}/>
                        </Steps>
                        <Grid container className="steps-action" justify="center">
                            <Grid item={12}>
                                {
                                    this.getStepContent(this.state.current)
                                }
                            </Grid>
                            <Grid item xs={12} style={{textAlign: "center"}}>
                                <Button disabled={this.state.current < 1} variant="contained" color="secondary"  onClick={this.prev} style={{marginRight: "2rem"}}>
                                    Précédent
                                </Button>
                                {
                                    this.state.current < 2 ?
                                        <Button  disabled={this.state.password !== this.state.password2} variant="contained" color="secondary" onClick={this.next}>
                                            Suivant
                                        </Button>
                                        :
                                        <Button onClick={this.handleSubmit} style={{color: 'white', height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "10px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
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
