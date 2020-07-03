import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import {Button, Grid, Modal, Slide, List, ListItem, ListItemAvatar, Avatar, ListItemText, Input, InputAdornment, ListItemSecondaryAction} from "@material-ui/core";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {Rate} from "antd";
import SendIcon from '@material-ui/icons/Send';

class InfluencerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infData: null,
            userData: null,
            visible: false,
            commentInput: "",
        };
    }

    componentDidMount = () => {
        let id = this.getUrlParams((window.location.search));

        fetch(`http://168.63.65.106:8080/inf/${id.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({infData: res}))
            .catch(error => console.error('Error:', error));

        fetch("http://168.63.65.106:8080/shop/me", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({userData: res}))
            .catch(error => console.error('Error:', error));
    };

    getUrlParams = (search) => {
        if (search === "")
            return null;
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, {[key]: decodeURIComponent(val)})
        }, {})
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
    };

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleSendMark = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106:8080/user/mark/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({visible: false})
    };


    handleSendMessage = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106:8080/user/comment/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""});
    };

    handleComment = (x) => {
        return (
            <ListItem style={{height: "4.375rem", marginBottom: "2rem"}}>
                <ListItemAvatar style={{marginRight: "1rem"}}>
                    <Avatar src={x.avatar}/>
                    <p>{x.pseudo}</p>
                </ListItemAvatar>
                <ListItemText>
                    <p style={{color: "#5f5f5f", fontSize: "12px"}}>{`Posté le ${new Date(x.createdAt).toLocaleDateString()}`}</p>
                    <p style={{color: "black", marginTop: "15px"}}>{x.comment}</p>
                </ListItemText>
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
            </ListItem>
        )
    };

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.infData && this.state.userData ?
                        <Grid container>
                            <Modal open={this.state.visible} onClose={this.handleModal}>
                                <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                                    <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                        <Grid item xs={12}>
                                            <h3 style={{color: "black"}}>Notez cette influcenceur !</h3>
                                        </Grid>
                                        <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                            <Rate onChange={(e) => this.handleMark(e)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleSendMark}>Noter</Button>
                                        </Grid>
                                    </Grid>
                                </Slide>
                            </Modal>
                            <Grid container justify="center" alignItems="center">
                                <Avatar alt="Avatar not found" src={!this.state.infData.userPicture || this.state.infData.userPicture.length === 0 ? "" : this.state.infData.userPicture[0].imageData} style={{width: "250px", height: "250px", position: "absolute", backgroundColor: "white", marginTop: "24rem", zIndex: "10", boxShadow: "0 0 10px"}}/>
                            </Grid>
                            <Grid item xs={12} style={{backgroundImage: `url(${!this.state.infData.userPicture || this.state.infData.userPicture.length === 0 ? "#292929" : this.state.infData.userPicture[0].imageData})`, backgroundSize: "cover", filter: "blur(8px)", backgroundPosition: "center", width: "100%", height: "500px", position: "fixed"}}>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "350px", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}}>
                                <Grid item style={{marginTop: "12rem", height: "auto", cursor: "pointer"}} xs={12}>
                                    <h1 style={{textAlign: "center"}}>{this.state.infData.pseudo}</h1>
                                </Grid>
                                <Grid item xs={12} style={{marginTop: "4rem", textAlign: "center"}}>

                                </Grid>
                                <Grid item xs={12} md={5} style={{marginTop: "5rem", marginLeft: "4rem", textAlign: "center"}}>
                                    <h1>Déscription</h1>
                                    <h4 style={{marginTop: "2rem"}}>{this.state.infData.userDescription}</h4>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem", textAlign: "center"}}>
                                    <h1 style={{textAlign: "center"}}>Note</h1>
                                    <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`${this.state.infData.average ? this.state.infData.average.toFixed(1) : "0" }/5`}</h1>
                                    <Button style={{height: "30px", backgroundColor: "black"}} onClick={this.handleModal}>Notez cette influenceur</Button>
                                </Grid>
                                <Grid item xs={12} style={{marginRight: "12.5rem", marginLeft: "12.5rem", marginTop: "5rem"}}>
                                    <h2 style={{textAlign: "center"}}>Avis</h2>
                                    <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "3.5rem"}}>
                                        <ListItem style={{height: "4.375rem"}}>
                                            <ListItemAvatar style={{marginRight: "1rem"}}>
                                                <Avatar alt="Avatar not found" src={!this.state.userData.userPicture || this.state.userData.userPicture.length === 0 ? "" : this.state.userData.userPicture[0].imageData} style={{width: "40px", height: "40px"}}/>
                                            </ListItemAvatar>
                                            <ListItemText style={{borderBottom: "1px solid #292929"}}>
                                                <Input
                                                    id="standard-adornment"
                                                    placeholder="Commenter"
                                                    name="commentInput"
                                                    value={this.state.commentInput}
                                                    onChange={this.handleChange}
                                                    style={{width: "100%"}}
                                                    onKeyPress={this.handleKeyPress}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <Button
                                                                simple
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
                                            this.state.infData.comment === null || this.state.infData.comment.length === 0 ?
                                                ""
                                                :
                                                this.state.infData.comment.map(x => this.handleComment(x))
                                        }
                                    </List>
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

export default withRouter(InfluencerProfile)