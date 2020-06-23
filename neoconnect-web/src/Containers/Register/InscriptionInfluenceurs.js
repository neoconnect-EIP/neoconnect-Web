import React from 'react';
import {Form, Icon, Steps} from 'antd';
import {Grid, Input, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import "../index.css"
import { store } from 'react-notifications-component';

const { Step } = Steps;

export default class InfluencerSignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            password: null,
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
            current: 0,
            isEnd: false,
            goodPassword: false,
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
            title: "Error",
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
              onScreen: true
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
                            <h1 style={{color: "white"}}>Identifiant et mot de passe</h1>
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="user" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="pseudo"
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
                            <h1 style={{color: "white"}}>Informations personelles</h1>
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
                            <Icon type="mail" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="mobile" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="phone"
                                placeholder="Numéro de téléphone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="home" style={{ color: '#fff', marginRight: "8px"}}/>
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
                            <Icon type="home" style={{ color: '#fff', marginRight: "8px"}}/>
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="city"
                                placeholder="Ville"
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="skin" style={{ color: '#fff', marginRight: "8px", transform: "translateY(15px)"}}/>
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
                    </Grid>
                );
            case 2:
                return (
                    <Grid container justify="center">
                        <Grid item xs={12} style={{textAlign: "center", marginTop: "1rem", marginBottom: "1rem"}}>
                            <h1 style={{color: "white"}}>Renseigner vos réseaux</h1>
                        </Grid>
                        <Grid className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="instagram" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="instagram"
                                placeholder="Instagram"
                                value={this.state.instagram}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="facebook" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="facebook"
                                placeholder="Facebook"
                                value={this.state.facebook}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "1rem"}}>
                            <Icon type="twitter" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="twitter"
                                placeholder="Twitter"
                                value={this.state.twitter}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item className="input-form" xs={12} style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Icon type="aliwangwang" style={{ color: '#fff', marginRight: "8px"}} />
                            <Input
                                style={{color: "#fff"}}
                                type="text"
                                name="snapchat"
                                placeholder="Snapchat"
                                value={this.state.snapchat}
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
                        <h1 style={{textAlign: "center", color: "white", paddingBottom: "0.5rem"}}>Inscription influenceur</h1>
                    </div>
                    <div style={{margin: "2rem"}}>
                        <Steps progressDot current={this.state.current}>
                            <Step title={<p style={{color: "#fff"}}>Identifiant et mot de passe</p>}/>
                            <Step title={<p style={{color: "#fff"}}>Informations personelles</p>}/>
                            <Step title={<p style={{color: "#fff"}}>Renseignez votre activité</p>}/>
                        </Steps>
                        <Grid container className="steps-action" justify="center" style={{color: "white"}}>
                            <Grid item={12}>
                                {
                                    this.getStepContent(this.state.current)
                                }
                            </Grid>
                            <Grid item xs={12} style={{textAlign: "center"}}>
                                <Button disabled={this.state.current < 1} variant="contained" color="secondary"  onClick={this.prev} style={{marginRight: "2rem"}}>
                                    PREV
                                </Button>
                                {
                                    this.state.current < 2 ?
                                        <Button  disabled={this.state.password !== this.state.password2} variant="contained" color="secondary" onClick={this.next}>
                                            NEXT
                                        </Button>
                                        :
                                        <Button onClick={this.handleSubmit} style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "10px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
                                            REGISTER
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
