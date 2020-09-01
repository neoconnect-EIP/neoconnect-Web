import React from "react";
import { withRouter } from "react-router-dom"
import "../index.css"
import {Avatar, Card, CardContent, CardMedia, Modal, Slide, Fab, FormControl, Grid, Input, InputLabel, MenuItem, Select} from '@material-ui/core/';
import {TextField} from "@material-ui/core";
import {Icon} from "antd";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import snapchat from "../../assets/snapchat.png";
import facebook from "../../assets/facebook.png";
import DoneIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DeleteIcon from '@material-ui/icons/Delete'

import Loader from "react-loader-spinner";
import avatar from "../../assets/avatar1.png";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            city: "",
            email: "",
            fonction: "",
            mark: "",
            phone: "",
            postal: "",
            pseudo: "",
            society: "",
            theme: "",
            facebook: "",
            instagram: "",
            twitter: "",
            snapchat: "",
            picture: null,
            file: null,
            userDescription: "",
            userPicture: null,
            imagePreviewUrl: avatar,
            website: "",
            isLoad: false
        };
    }

    componentDidMount = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({
                city: res.city,
                email: res.email,
                fonction: res.fonction,
                mark: res.mark,
                phone: res.phone,
                postal: res.postal,
                pseudo: res.pseudo,
                society: res.society,
                theme: res.theme,
                facebook: res.facebook,
                instagram: res.instagram,
                twitter: res.twitter,
                snapchat: res.snapchat,
                userDescription: res.userDescription,
                userPicture: res.userPicture,
                website: res.website,
                isLoad: true,
            }))
            .catch(error => console.error('Error:', error));
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
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
                changed: true,
            });
        };
        reader.readAsDataURL(file);
    };

    handleSubmit = () => {
        let body = {
            "city": this.state.city,
            "email": this.state.email,
            "fonction": this.state.fonction,
            "phone": this.state.phone,
            "postal": this.state.postal,
            "pseudo": this.state.pseudo,
            "society": this.state.society,
            "theme": this.state.theme,
            "userPicture": this.state.userPicture,
            "facebook": this.state.facebook,
            "instagram": this.state.instagram,
            "twitter": this.state.twitter,
            "snapchat": this.state.snapchat,
            "userDescription": this.state.userDescription,
            "website": this.state.website,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/me`, { method: 'PUT', body: body,headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    };

    handleResponse = (res) => {
        if (res.status === 200)
            this.props.history.push("/shop-dashboard/status")
    }
    handleDelete = () => {
        // const userId = localStorage.getItem('userId')
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`
            }
        })
        .then(res => {
            localStorage.clear();
            this.props.history.push('/landing-page')
        })
        .catch(console.error)
        // fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/${userId}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Authorization": `Bearer ${localStorage.getItem("Jwt")}`
        //     }
        // })
        // .then(res => {
        //     localStorage.clear();
        //     this.props.history.push('/landing-page')
        // })
        // .catch(console.error)
    }
    handleVisibleModal = (ad, mode) => {
        this.setState({visible: !this.state.visible})
    }
    render () {
        return (
            <Grid container justify="center">
            <Modal
                    open={this.state.visible}
                    onClose={() => this.handleVisibleModal(null, "")}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>

                                    <Grid container justify="center" style={{width: "50rem", height: "auto", position: "relative", marginTop: "18.75rem", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "8px"}}>
                                        <Grid item xs={12} style={{backgroundColor: "#292929", height: "auto", marginLeft: "4rem", marginRight: "4rem", borderRadius: "8px", marginTop: "-1.8rem"}}>
                                            <h2 style={{color: "white", marginTop: "0.5rem", marginBottom: "0.5rem"}}>Supprimer une offre</h2>
                                        </Grid>
                                        <Grid item xs={12} justify="center" style={{marginBottom: "1.2rem"}}>
                                            <h3 style={{marginTop: "2rem"}}>{`Are you sure you want to delete your account ?`}</h3>
                                            <Fab class="posted-ad-send-button" onClick={() => this.handleVisibleModal(null, "")} style={{marginRight: "3rem", height: "3rem", fontSize: "1.2rem"}}>
                                                ANNULER
                                            </Fab>
                                            <Fab class="posted-ad-send-button" onClick={() => this.handleDelete()} style={{backgroundImage: "none", marginRight: "3rem", height: "3rem", fontSize: "1.2rem", backgroundColor: "#4CB051"}}>
                                                CONFIRMER
                                            </Fab>
                                        </Grid>
                                    </Grid>

                    </Slide>
            </Modal>
                {
                    this.state.isLoad ?
                        <Grid container justify="center">
                            <div style={{backgroundColor: "#292929", backgroundSize: "cover", backgroundPosition: "center center", transform: 'translateY(-25px)', width: "100%", height: "500px", position: "fixed", zIndex: "-1"}}/>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="Avatar not found" src={!this.state.userPicture || this.state.userPicture.length === 0 ? "" : this.state.userPicture[0].imageData} style={{width: "180px", height: "180px", position: "absolute", backgroundColor: "white", marginTop: "16rem", zIndex: "10"}}/>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "12rem", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}} justify="content">
                                <Grid container style={{marginTop: "13rem"}} justify="center">
                                    <Grid item xs={12} style={{textAlign: "center"}}>
                                        <input type="file" onChange={e => this.handleImageChange(e)}/>
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={12}>
                                        <TextField
                                            style={{width: "25rem"}}
                                            id="standard-multiline-flexible"
                                            label="Multiline"
                                            multiline
                                            rowsMax={4}
                                            name="userDescription"
                                            placeholder="status"
                                            value={this.state.userDescription}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                        <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                        <Input type="text"
                                               name="pseudo"
                                               placeholder="Influencer name"
                                               value={this.state.pseudo}
                                               onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid xs={6} style={{textAlign: "center", marginTop: "90px"}}>
                                        <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                        <Input type="text"
                                               name="fullName"
                                               placeholder="Full name"
                                               value={this.state.fullName}
                                               onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                        <Icon type="mail" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                        <Input type="text"
                                               name="email"
                                               placeholder="Email"
                                               value={this.state.email}
                                               onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                        <Icon type="mobile" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                        <Input type="text"
                                               name="phone"
                                               placeholder="Phone"
                                               value={this.state.phone}
                                               onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                        <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                        <Input type="text"
                                               name="postal"
                                               placeholder="Postal"
                                               value={this.state.postal}
                                               onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                        <Icon type="home" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                        <Input type="text"
                                               name="city"
                                               placeholder="City"
                                               value={this.state.city}
                                               onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", marginTop: "90px"}} xs={6}>
                                        <Icon type="lock" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                        <FormControl variant="outlined" style={{width: "182px"}}>
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                Theme
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                name="theme"
                                                value={this.state.theme}
                                                onChange={this.handleChange}
                                            >
                                                <MenuItem value={"Mode"}>Mode</MenuItem>
                                                <MenuItem value={"Cosmetique"}>Cosmetique</MenuItem>
                                                <MenuItem value={"Hight tech"}>Hight tech</MenuItem>
                                                <MenuItem value={"Food"}>Food</MenuItem>
                                                <MenuItem value={"Jeux vidéo"}>Jeux vidéo</MenuItem>
                                                <MenuItem value={"Sport/fitness"}>Sport/fitness</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4} style={{marginTop: "20px"}}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Card class="influencer-status-card-item">
                                            <CardMedia className="influencer-status-card-media" image={instagram} />
                                            <CardContent style={{textAlign: "center"}}>
                                                <Input  type="text"
                                                        name="instagram"
                                                        placeholder="Instagram name"
                                                        value={this.state.instagram}
                                                        onChange={this.handleChange}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Card class="influencer-status-card-item">
                                            <CardMedia image={twitter} className="influencer-status-card-media"/>
                                            <CardContent style={{textAlign: "center"}}>
                                                <Input type="text"
                                                       name="twitter"
                                                       placeholder="Twitter name"
                                                       value={this.state.twitter}
                                                       onChange={this.handleChange}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Card class="influencer-status-card-item">
                                            <CardMedia image={snapchat} className="influencer-status-card-media"/>
                                            <CardContent style={{textAlign: "center"}}>
                                                <Input type="text"
                                                       name="snapchat"
                                                       placeholder="Snapchat name"
                                                       value={this.state.snapchat}
                                                       onChange={this.handleChange}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Card class="influencer-status-card-item">
                                            <CardMedia className="influencer-status-card-media" image={facebook}/>
                                            <CardContent style={{textAlign: "center"}}>
                                                <Icon type="user" style={{ color: '#d23e3e', marginRight: "8px"}} />
                                                <Input type="text"
                                                       name="facebook"
                                                       placeholder="Facebook name"
                                                       value={this.state.facebook}
                                                       onChange={this.handleChange}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="center" justify="center" style={{marginBottom: "30px"}}>
                                    <Fab variant="extended" aria-label="delete" style={{backgroundColor: "#292929", color: "white"}} onClick={this.handleSubmit}>
                                        Confirme
                                        <DoneIcon style={{marginLeft: "10px"}}/>
                                    </Fab>
                                    <Fab variant="extended" aria-label="delete" style={{backgroundColor: "red", color: "black"}} onClick={this.handleVisibleModal}>
                                        Supprimer le compte
                                        <DeleteIcon style={{marginLeft: "10px"}}/>
                                    </Fab>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Loader
                            type="Triangle"
                            color="#292929"
                            height={200}
                            width={200}
                            style={{marginTop: "14rem"}}
                        />
                }
            </Grid>
        );
    }
}
export default withRouter(EditProfile)
