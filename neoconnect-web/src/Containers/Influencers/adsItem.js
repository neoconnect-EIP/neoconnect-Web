import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {
    Grid,
    Modal,
    Button,
    Slide,
    Avatar,
    List,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItem,
    ListItemText,
    Input, InputAdornment
} from '@material-ui/core';
import {Rate} from "antd";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SendIcon from '@material-ui/icons/Send';
import noImages from "../../assets/noImages.jpg"
import avatar from "../../assets/avatar1.png";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Buttonx from 'react-bootstrap/Button';
import Modalx from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import { store } from 'react-notifications-component';


//TODO mettre au meme modal faire le signaler Button x et modal x

class adsItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            visible: false,
            adData: null,
            actualId: 0,
            fonction: "",
            mark: null,
            commentInput: "",
            signal: false,
            info: "",
            raison: "",
            commentData: null,
            urlId: parseInt(this.getUrlParams((window.location.search)).id, 10),
        };
    }

    componentDidMount = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({adData: res}))
            .catch(error => console.error('Error:', error));

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/me`, {method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({userData: res}))
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

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
        if (this.state.fonction) {
            this.setState({fonction: ""})
        } else {
            this.setState({fonction: fonction})
        }
    }

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleAnnonceSubsribe = (item) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/1`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal("")
        this.props.history.push("/dashboard/advertisements")
    }

    handleAnnonceNotation = (item) => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/mark/${id.id}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal("")
    }

    displayImage = (x) => {
      console.log("x = ", x);
        return (
            <Grid key={x.idLink} container style={{height: "100%", backgroundColor: "#ffffff"}} justify="center" alignItems="flex-start">
                <img src={x.imageData} style={{width: "600px", height: "800px", marginTop: "10px"}} alt="MISSING JPG"/>
            </Grid>
        )
    }

    handleSendMessage = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/comment/${id.id}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""})
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleAnnonceReport = () => {
      this.setState({clickedSignal: true})
      var name = this.state.adData.productName;
      if (this.state.raison) {
        let body = {
            "offerName": this.state.adData.productName,
            "subject": this.state.raison,
            "message": this.state.info,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/report/${this.state.adData.id}`, {method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              res.json();
              console.log("RES SIGNAL ", res);
              if (res.status == 200) {
                this.setState({signal: false, raison: "", info: ""});
                store.addNotification({
                  title: "Envoyé",
                  message: "Nous avons bien pris en compte votre signalement pour l'offre " + name,
                  type: "success",
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
            }).catch(error => console.error('Error:', error));
      }
    }

    handleComment = (x) => {
      console.log("x2 = ", x);
        return (
            <ListItem key={x.id} style={{height: "4.375rem", marginBottom: "2rem"}}>
                <ListItemAvatar style={{marginRight: "1rem"}}>
                    <Avatar src={x.avatar}/>
                    <p>{x.pseudo}</p>
                </ListItemAvatar>
                <ListItemText>
                    <p style={{color: "#5f5f5f", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
                    <p style={{color: "black", marginTop: "12px"}}>{x.comment}</p>
                </ListItemText>
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    handleOpen = () => {
      this.setState({signal: true})
    }

    handleClose = () => {
      this.setState({signal: false, raison: "", clickedSignal: false, info: ""})
    }

    render() {
      console.log("DATA ", this.state.adData);
        return (
            <Grid container justify="center" className="infBg">
                <Modal
                    open={this.state.visible}
                    onClose={() => this.handleModal(0)}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        {
                            this.state.fonction === "subscribe" ?
                                <div style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <h3 style={{color: "black"}}>S'abonner à cette offre ?</h3>
                                    <h4 style={{marginBottom: "30px", color: "black"}}>{this.state.adData.brand ? this.state.adData.brand : "No brand"}</h4>
                                    <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleModal("")}>ANNULER</Button>
                                    <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceSubsribe(this.state.adData)}>S'ABONNER</Button>
                                </div>
                                :
                                <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <Grid item xs={12}>
                                        <h3 style={{color: "black"}}>Notez cette offre !</h3>
                                    </Grid>
                                    <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                        <Rate onChange={(e) => this.handleMark(e)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceNotation(this.state.adData)}>NOTER</Button>
                                    </Grid>
                                </Grid>
                        }
                    </Slide>
                  </Modal>
                  <Modalx centered show={this.state.signal} onHide={this.handleClose}>
                   <Modalx.Header closeButton>
                     <Modalx.Title>Signaler cette offre</Modalx.Title>
                   </Modalx.Header>
                   <Modalx.Body>
                     <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Raison</Form.Label>
                        <Form.Control value={this.state.raison} onChange={(e) => {this.setState({raison: e.target.value})}}/>
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Information complémentaire</Form.Label>
                        <Form.Control value={this.state.info} onChange={(e) => {this.setState({info: e.target.value})}} placeholder="" />
                      </Form.Group>
                    </Form>
                   </Modalx.Body>
                   <Modalx.Footer>
                     {!this.state.raison && this.state.clickedSignal && <small className="text-danger">Veuillez informer une raison</small>}
                     <Buttonx className="btnCancel" onClick={this.handleClose}>
                       Annuler
                     </Buttonx>
                     <Buttonx className="btnInf" onClick={() => {this.handleAnnonceReport(this)}}>
                       Signaler
                     </Buttonx>
                   </Modalx.Footer>
                  </Modalx>
                {
                    this.state.adData ?
                        <Grid container style={{padding: "30px"}}>
                            <Grid item xs={12} md={7} style={{padding: "30px", height: "auto", borderRight: "2px solid #292929"}}>
                                <Carousel style={{height: "auto"}} showThumbs={false} infiniteLoop={true} centerSlidePercentage={80}>
                                    {
                                        this.state.adData.productImg ?
                                            this.state.adData.productImg.map(x => this.displayImage(x))
                                            :
                                            <Grid container style={{height: "auto", backgroundColor: "#ffffff"}} justify="center" alignItems="flex-start">
                                                <img src={noImages} style={{width: "200px", height: "800px", marginTop: "10px"}} alt="MISSING JPG"/>
                                            </Grid>
                                    }
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} md={5} style={{padding: "3.125rem", paddingLeft: "1.25rem"}}>
                                <h6 style={{color: 'white'}}>{this.state.adData.productType}</h6>
                                  <div style={{ textAlign:'left'}}>
                                    <h3 style={{marginTop: "2rem", color: 'white', display: "inline"}}>{this.state.adData.brand ? this.state.adData.brand : "Sans marque"}</h3>
                                    <PriorityHighRoundedIcon style={{width: '15px', height: '15px', color: 'red', display: "inline", marginLeft: '5px'}} onClick={() => {this.handleOpen()}} className="my-auto border border-danger rounded-circle report"/>
                                  </div>

                                <h3 style={{marginTop: "2rem", color: 'white'}}>{this.state.adData.productName ? this.state.adData.productName : "Sans nom"}</h3>
                                <h4 style={{marginTop: "2rem", marginBottom: "2rem", color: 'white'}}>{`Sex: ${this.state.adData.productSex}`}</h4>
                                <Buttonx onClick={() => this.handleModal( "subscribe")} className="btnInf">S'ABONNER</Buttonx>
                                <h4 style={{marginTop: "1rem", color: 'white'}}>{`Note: ${this.state.adData.average ? this.state.adData.average.toFixed(1) : "0"}/5`}</h4>
                                <Buttonx onClick={() => this.handleModal( "rate")}  className="btnInf">Noter</Buttonx>

                                <h5 style={{marginTop: "3rem", color: 'white'}}>{this.state.adData.productSubject ?  `Article: ${this.state.adData.productSubject}` : ""}</h5>
                                <h5 style={{marginTop: "3rem", color: 'white'}}>{`${this.state.adData.productDesc ? this.state.adData.productDesc : ""}`}</h5>
                            </Grid>
                            <Grid item xs={12} style={{marginRight: "12.5rem", marginLeft: "12.5rem", marginTop: "5rem"}}>
                                <h2 style={{textAlign: "center", color: 'white'}}>Avis</h2>
                                <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "3.5rem"}}>
                                    <ListItem style={{height: "4.375rem"}}>
                                        <ListItemAvatar style={{marginRight: "1rem"}}>
                                            <Avatar alt="Avatar not found" src={avatar} style={{width: "40px", height: "40px"}}/>
                                        </ListItemAvatar>
                                        <ListItemText style={{borderBottom: "1px solid #292929"}}>
                                            <Input
                                                id="standard-adornment"
                                                placeholder="Commenter"
                                                name="commentInput"
                                                value={this.state.commentInput}
                                                onChange={this.handleChange}
                                                style={{width: "100%"}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <Button
                                                            onClick={this.handleSendMessage}
                                                            style={{marginTop: "-1rem"}}
                                                        >
                                                            <SendIcon style={{color: "#292929", width: "2rem", height: "2rem"}}/>
                                                        </Button>
                                                    </InputAdornment>
                                                }
                                            />
                                        </ListItemText>
                                    </ListItem>
                                    <ListItemSecondaryAction>
                                    </ListItemSecondaryAction>
                                </List>
                                <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem"}}>
                                    {
                                        this.state.adData.comment.map(x => this.handleComment(x))
                                    }
                                </List>
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

export default withRouter(adsItem)
