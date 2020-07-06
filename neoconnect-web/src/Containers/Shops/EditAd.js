import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Grid} from '@material-ui/core/';
import {Steps} from 'antd';
import "../index.css"
import {FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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
            productImgData1: "",
            productImgName2: "",
            productImgData2: "",
            productImgName3: "",
            productImgData3: "",
            productImgName4: "",
            productImgData4: "",
            productImg: [],
            productName: "",
            productSex: "",
            productDesc: "",
            productSubject: "",
            current: 0,
            isEnd: false,
            isLoading: true,
        };
    }

    statesetter = (res) => {
        this.setState({
            productImg: res.productImg,
            productName: res.productName,
            productSex: res.productSex,
            productDesc: res.productDesc,
            productSubject: res.productSubject,
            isLoading: false,
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
            this.setState({isEnd: true})
    };

    handleSubmit = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "productImg": this.state.productImg,
            "productName": this.state.productName,
            "productSex": this.state.productSex,
            "productDesc": this.state.productDesc,
            "productSubject": this.state.productSubject,
            "color": "",
            "brand": ""
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

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.isLoading ?
                        <Loader
                            type="Triangle"
                            color="#292929"
                            height={200}
                            width={200}
                            style={{marginTop: "14rem"}}
                        />
                        :
                        <Grid>
                            {
                                !this.state.isEnd ?
                                    <Grid container>
                                        <Grid item xs={12} style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                                            <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Modifier une annonce</h1>
                                        </Grid>
                                        <Steps current={this.state.current} style={{marginTop: "130px", padding: "25px"}}>
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
                                                    PREVIOUS
                                                </Button>
                                                {
                                                    this.state.current < 5 ?
                                                        <Button variant="contained" color="secondary" onClick={this.next}>
                                                            NEXT
                                                        </Button>
                                                        :
                                                        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
                                                            VALIDER
                                                        </Button>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container style={{marginTop: "7.5rem", padding: "15rem"}}>
                                        <Grid item xs={12}>
                                            <h1 style={{textAlign: "center"}}>Annonce édité avec succès</h1>
                                        </Grid>
                                        <Grid item xs={12} style={{textAlign: "center"}}>
                                            <CheckCircleOutlineIcon style={{width: "200px", height: "200px", marginTop: "20px", marginBottom: "20px", color: "#292929"}}/>
                                        </Grid>
                                    </Grid>
                            }
                        </Grid>
                }
            </Grid>
        );
    }
}

export default withRouter(EditAd)
