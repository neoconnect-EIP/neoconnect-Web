import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab, Grid} from '@material-ui/core/';
import { Steps, message} from 'antd';
import "../index.css"
import {FormControl, Input, InputLabel, MenuItem, Select, Slide, TextField} from "@material-ui/core";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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

class PostAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productImg: null,
            productName: "",
            productSex: "",
            productDesc: "",
            productSubject: "",
            current: 0,
            isEnd: false,
        };
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
                            <h1>Donnez un nom à votre annonce: </h1>
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
                            <h1>Donnez une description à votre annonce: </h1>
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
                            <h1>A quoi resemble votre item ?</h1>
                            <ImagesUploader
                                onChange={(e) => this.setState({images: e})}
                                images={this.state.images}
                                optimisticPreviews
                                multiple={true}
                                max={5}
                                onLoadEnd={(res, err) => {
                                    if (err) {
                                        console.error(err);
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h1>A quel type d'item correspond votre annonce: </h1>
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
                            <h1>A qui s'adresse votre annonce ? </h1>
                            <Input
                                type="text"
                                name="productSex"
                                placeholder="Homme/Femme/Unisexe"
                                value={this.state.productSex}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                );
            case 5:
                return (
                    <Grid container justify="center" style={{margin: "4rem"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h1>Vérifiez bien vos informations avant de valider.</h1>
                            <h3>(Vous pourrez modifier votre annonce si besoin dans l'onglet "Ads".)</h3>
                        </Grid>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleResponse = (res) => {
        if (res.status === 200)
            this.setState({isEnd: true})
    };

    handleSubmit = () => {
        let body = {
            "productImg": this.state.productImg,
            "productName": this.state.productName,
            "productSex": this.state.productSex,
            "productDesc": this.state.productDesc,
            "productSubject": this.state.productSubject,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/offer/insert`, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Création d'une annonce</h1>
                </Grid>
                {
                    !this.state.isEnd ?
                        <Grid container style={{marginTop: "130px", padding: "25px"}}>
                            <Steps current={this.state.current}>
                                {steps.map(item => (
                                    <Step key={item.id} title={item.title} />
                                ))}
                            </Steps>
                            <Grid item className="steps-content" xs={12}>{steps[this.state.current].content}</Grid>
                            <Grid container className="steps-action" xs={12} justify="center">
                                <Grid item={12}>
                                    {
                                        this.getStepContent(this.state.current)
                                    }
                                </Grid>
                                <Grid item xs={12} style={{textAlign: "center"}}>
                                    <Button disabled={this.state.current < 1} variant="contained" color="secondary"  onClick={this.prev} style={{marginRight: "2rem"}}>
                                        Previous
                                    </Button>
                                    {
                                        this.state.current < 5 ?
                                            <Button variant="contained" color="secondary" onClick={this.next}>
                                                Next
                                            </Button>
                                            :
                                            <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
                                                Validez
                                            </Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid container style={{marginTop: "7.5rem", padding: "15rem"}}>
                            <Grid item xs={12}>
                                <h1 style={{textAlign: "center"}}>Annonce posté avec succès</h1>
                            </Grid>
                                <Grid item xs={12} style={{textAlign: "center"}}>
                                    <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "ff4343"}}/>
                                </Grid>
                        </Grid>
                }
            </Grid>
        );
    }
}

export default withRouter(PostAd)