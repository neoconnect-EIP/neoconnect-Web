import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {
    Button,
    Grid,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    Slide,
    Modal,
    ListItemText,
    InputAdornment,
    Input,
} from '@material-ui/core';
import { Rate } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultShopProfilePic from "../../assets/defaultShopProfilePic.jpg"
import SendIcon from '@material-ui/icons/Send';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg";

class shopProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shopData: [],
            userData: null,
            activeIndex: 0,
            visible: false,
            commentData: null,
            markData: null,
            commentInput: "",
            mark: null
        };
    }

    componentDidMount = () => {
        let id = this.getUrlParams((window.location.search));

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/${id.id}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({shopData: res}))
            .catch(error => console.error('Error:', error));

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
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

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
    };

    handleSendMessage = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/comment/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""});
    };

    handleSendMark = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/mark/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({visible: false})
    };

    handleComment = (x) => {
        return (
            <ListItem style={{height: "4.375rem", marginBottom: "2rem"}} key={x.id}>
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

    handleMark = (e) => {
        this.setState({mark: e})
    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.handleSendMessage()
        }
    };

    consultShop = (web) => {
        window.open(web, '_blank');
    }

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.shopData && this.state.userData ?
                        <Grid container>
                            <Modal open={this.state.visible} onClose={this.handleModal}>
                                <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                                    <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                        <Grid item xs={12}>
                                            <h3 style={{color: "black"}}>Notez cette boutique !</h3>
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
                                <Avatar alt="Avatar not found" src={(!this.state.shopData.userPicture || this.state.shopData.userPicture.length == 0) ? noShop : this.state.shopData.userPicture[0].imageData} style={{width: "250px", height: "250px", position: "absolute", backgroundColor: "white", marginTop: "24rem", zIndex: "10", boxShadow: "0 0 10px"}}/>
                            </Grid>
                            <Grid item style={{backgroundImage: `url(${this.state.shopData.shopBanner ? this.state.shopData.shopBanner : defaultShopProfilePic})`, backgroundSize: "cover", backgroundPosition: "center center", width: "100%", height: "500px", position: "fixed"}}>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "19rem", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}}>
                                <Grid item xs={12} style={{marginTop: "14rem", height: "auto", cursor: "pointer"}} onClick={() => this.consultShop(this.state.shopData.website)}>
                                    <h1 style={{textAlign: "center"}}>{this.state.shopData.pseudo}</h1>
                                </Grid>
                                <Grid item xs={12} md={5} style={{marginTop: "5rem", marginLeft: "4rem"}}>
                                    <h1>Déscription</h1>
                                    <h4 style={{marginTop: "2rem"}}>{this.state.shopData.userDescription}</h4>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem", textAlign: "center"}}>
                                    <h1 style={{textAlign: "center"}}>Note</h1>
                                    <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`${this.state.shopData.average ? this.state.shopData.average.toFixed(1) : "0" }/5`}</h1>
                                    <Button style={{height: "30px", backgroundColor: "black"}} onClick={this.handleModal}>Notez cette boutique</Button>
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
                                            !this.state.shopData.comment || this.state.shopData.comment.length === 0 ?
                                                ""
                                                :
                                                this.state.shopData.comment.map(x => this.handleComment(x))
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

export default withRouter(shopProfile)
