import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Button,
    Grid,
    Modal,
    Slide,
    Avatar,
    List,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItem,
    IconButton,
    ListItemText,
    TextareaAutosize,
    Input
} from '@material-ui/core';
import {Rate} from "antd";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import noImages from "../../assets/noImages.jpg"
import avatar from "../../assets/avatar1.png";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


class adsItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            visible: false,
            adData: null,
            actualId: 0,
            fonction: "",
            mark: "",
            comment: null,
            commentInput: "",
            commentData: null,
            urlId: parseInt(this.getUrlParams((window.location.search)).id, 10),
        };
    }

    componentDidMount = () => {
        fetch(`http://168.63.65.106/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({adData: res}))
            .catch(error => console.error('Error:', error));

        fetch(`http://168.63.65.106/user/comment/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({commentData: res}))
            .catch(error => console.error('Error:', error));

        fetch("http://168.63.65.106/inf/me", {method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
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
        fetch(`http://168.63.65.106/offer/apply/1`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal("")
        this.props.history.push("/dashboard/advertisements")
    }

    handleAnnonceNotation = (item) => {
        fetch(`http://168.63.65.106/offer/mark/1`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {console.log("start res: ", res.json())})
            .catch(error => console.error('Error:', error));
        this.handleModal("")
    }

    displayImage = (x) => {
        return (
            <Grid container style={{height: "100%", backgroundColor: "#ffffff"}} justify="center" alignItems="flex-start">
                <img src={x.imageData} style={{width: "600px", height: "800px", marginTop: "10px"}} alt="MISSING JPG"/>
            </Grid>
        )
    }

    handleSendMessage = () => {
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/offer/comment/1`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""})
    }

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleComment = (x) => {
        return (
            <ListItem style={{height: "70px", borderTop: "1px solid black"}}>
                <ListItemAvatar>
                    <Avatar src={x.avatar}/>
                </ListItemAvatar>
                <p style={{color: "black", marginTop: "15px"}}>{x.comment}</p>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" style={{backgroundColor: "#292929", width: "45px", height: "45px"}}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    render() {
        console.log("comment", this.state.commentData)
        return (
            <Grid container justify="center">
                <Modal
                    open={this.state.visible}
                    onClose={() => this.handleModal(0)}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        {
                            this.state.fonction === "subscribe" ?
                                <div style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <h3 style={{color: "black"}}>Subscribe to this annonce ?</h3>
                                    <h4 style={{marginBottom: "30px", color: "black"}}>{this.state.userData.productBrand ? this.state.userData.productBrand : "No brand"}</h4>
                                    <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleModal("")}>CANCEL</Button>
                                    <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceSubsribe(this.state.adData)}>SUBSCRIBE</Button>
                                </div>
                                :
                                <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                    <Grid item xs={12}>
                                        <h3 style={{color: "black"}}>Notez cette annonce !</h3>
                                    </Grid>
                                    <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                        <Rate onChange={(e) => this.handleMark(e)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceNotation(this.state.adData)}>RATE</Button>
                                    </Grid>
                                </Grid>
                        }
                    </Slide>
                </Modal>
                {
                    this.state.adData && this.state.commentData ?
                        <Grid container style={{padding: "30px"}}>
                            <Grid item xs={12} md={7} style={{padding: "30px", height: "auto", borderRight: "2px solid black"}}>
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
                            <Grid item xs={12} md={3} style={{padding: "50px", marginLeft: "20px"}}>
                                <h6>{this.state.adData.productType}</h6>
                                <h3>{this.state.adData.productBrand ? this.state.adData.productBrand : "No brand"}</h3>
                                <h3>{this.state.adData.productName ? this.state.adData.productName : "No name"}</h3>
                                <h4>{`Sex: ${this.state.adData.productSex}`}</h4>
                                <Button onClick={() => this.handleModal( "subscribe")} style={{width: "100%",  backgroundColor: "#292929"}}>SUBSCRIBE</Button>
                                <Button onClick={() => this.handleModal( "rate")} style={{width: "100%", backgroundColor: "#292929", marginTop: "10px"}}>RATE</Button>
                                <h6 style={{marginTop: "10px"}}>{`Article: ${this.state.adData.productSubject}`}</h6>
                                <h6 style={{marginTop: "30px"}}>{`${this.state.adData.productDesc}`}</h6>
                            </Grid>
                            <Grid item xs={12} style={{marginRight: "200px", marginLeft: "200px", marginTop: "50px"}}>
                                <h2 style={{textAlign: "center"}}>Avis</h2>
                                <List style={{paddingLeft: "10px", paddingRight: "10px"}}>
                                    <Grid container style={{height: "70px", paddingTop: "8px"}}>
                                        <Grid item xs={1} style={{paddingLeft: "15px"}}>
                                            <Avatar alt="Avatar not found" src={avatar} style={{width: "40px", height: "40px"}}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextareaAutosize aria-label="empty textarea"
                                                              name="commentInput"
                                                              placeholder="Commentaire"
                                                              value={this.state.commentInput}
                                                              onChange={this.handleChange}
                                                              style={{width: "90%", backgroundColor: "white", marginRight: "40px", marginLeft: "40px"}}
                                            />
                                        </Grid>
                                        <Grid item xs={1} style={{paddingLeft: "25px"}}>
                                            <IconButton edge="end" aria-label="delete" style={{backgroundColor: "#292929", width: "45px", height: "45px"}} onClick={this.handleSendMessage}>
                                                <SendIcon/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    {
                                        this.state.commentData.map(x => this.handleComment(x))
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
