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
            urlId: parseInt(this.getUrlParams((window.location.search)).id, 10) - 1,
        };
    }

    componentDidMount = () => {
        console.log("urlId: ", this.state.urlId)
        fetch(`http://168.63.65.106/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({adData: res}))
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
                <img src={x} style={{width: "600px", height: "800px", marginTop: "10px"}} alt="MISSING JPG"/>
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
                    <IconButton edge="end" aria-label="delete" style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", width: "45px", height: "45px"}}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    render() {
        const fakeData = [
            {
                id: 1,
                productImg: [
                    "https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/ri1pr5ogghi8fejhfc9q/react-element-55-shoe-DRf8mz.jpg",
                ],
                productBrand : "Nike",
                productName : "Nike react element 55",
                productType : "Sneakers",
                productColor : "black/white",
                productSex : "Femme",
                productDesc : "La chaussure Nike React Element 55 pour Femme s'inspire des chaussures de running Nike classiques, telles que la Internationalist, en y ajoutant des motifs réfléchissants, et est dotée de la technologie Nike React.",
                mark : 3,
            },
            {
                id: 2,
                productImg: [
                    "http://mediaus.topshop.com/wcsstore/TopShopUS/images/catalog/TS12S28KBLK_Zoom_F_1.jpg",
                    "http://www.elettrolabtaranto.it/wp-content/uploads/2018/11/maglierie-e-pullover-adidas-originals-hoodie-felpa-cappuccio-dj2094-noir-donna_1.jpg",
                    "https://cdn02.plentymarkets.com/yvbkhg5h21rx/item/images/26294/full/Adidas-Originals-Herren-Sweater-TREFOIL-HOODIE-DT_3.jpg",
                ],
                productBrand : "Adidas",
                productName : "Hoodies original 215",
                productType : "Hoodies",
                productColor : "black/white",
                productSex : "Homme",
                productDesc : "Hoodies adidas original 100% coton ne vient pas de chine, on sait que les couture ne tiennent pas",
                mark : 4,
            },
            {
                id: 3,
                productImg: [
                    "https://images.ikrix.com/product_images/original/gucci-belts-gg-supreme-belt-00000093650f00s001.jpg",
                ],
                productBrand : "Gucci",
                productName : "Ceinture cuire basic",
                productType : "Belt",
                productColor : "Argent/marrons",
                productSex : "Homme",
                productDesc : "Cette ceinture de la premiere collection gucci 1990, fait en cuire de veau par les meilleur artisant de la maison Gucci, sera embelire votre tenu préférer",
                mark : 5,
            },
            {
                id: 4,
                productImg: [
                    "https://img0.etsystatic.com/056/0/8945940/il_570xN.707442774_i0aj.jpg",
                    "http://fr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-g%C3%A9ronimos-toile-damier-eb%C3%A8ne-sacs-homme--N51994_PM1_Interior%20view.jpg",
                    "http://www.encheres-expert.com/photos/OPTIM4/176573/IMG_2426.jpg",
                ],
                productBrand : "Louis Vuitton",
                productName : "Sac messenger capsule été 2018",
                productType : "Sac messenger",
                productColor : "Marron",
                productSex : "Uni",
                productDesc : "Item de la capsule été 2018, en colaboration avec Virgile Hablot, disponible en édition limité, faite en cuire de buffle, certie d'une boucle en or 18 carat, doublure en soie véritable",
                mark : 2,
            },
        ]
        const fakeComment = [
            {
              id: 1,
              avatar: "https://c.wallhere.com/photos/fe/71/women_model_face_profile_simple_background_rings_Demi_Lovato-267.jpg!d",
              comment: "ce produit est génial !",
            },
            {
                id: 2,
                avatar: "http://data2.1freewallpapers.com/download/colton-haynes-actor-face-profile.jpg",
                comment: "Je ne suis pas fan de cette item.",
            },
            {
                id: 3,
                avatar: "http://golem13.fr/wp-content/uploads/2013/06/profile.jpg",
                comment: "Impossible à assortir.",
            },
            {
                id: 3,
                avatar: "https://images.8tracks.com/avatar/i/010/095/145/aesthetic-anime-anime-boy-art-Favim.com-4459459-732.jpg?rect=15,0,570,570&q=98&fm=jpg&fit=max",
                comment: "moche.",
            },
        ]
        //console.log("fakeData[itemData]: ", fakeData[this.state.urlId - 1])
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
                                    <h4 style={{marginBottom: "30px", color: "black"}}>{fakeData.productBrand ? fakeData.productBrand : "No brand"}</h4>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleModal("")}>CANCEL</Button>
                                    <Button style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceSubsribe(this.state.adData)}>SUBSCRIBE</Button>
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
                                        <Button style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", margin: "10px", boxShadow: "0 0 10px"}} onClick={() => this.handleAnnonceNotation(this.state.adData)}>RATE</Button>
                                    </Grid>
                                </Grid>
                        }
                    </Slide>
                </Modal>
                {
                    fakeData[this.state.urlId] ?
                        <Grid container style={{padding: "30px"}}>
                            <Grid item xs={12} md={7} style={{padding: "30px", height: "auto", borderRight: "2px solid black"}}>
                                <Carousel style={{height: "auto"}} showThumbs={false} infiniteLoop={true} centerSlidePercentage={80}>
                                    {
                                        fakeData[this.state.urlId].productImg ?
                                            fakeData[this.state.urlId].productImg.map(x => this.displayImage(x))
                                            :
                                            <Grid container style={{height: "auto", backgroundColor: "#ffffff"}} justify="center" alignItems="flex-start">
                                                <img src={noImages} style={{width: "200px", height: "800px", marginTop: "10px"}} alt="MISSING JPG"/>
                                            </Grid>
                                    }
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} md={3} style={{padding: "50px", marginLeft: "20px"}}>
                                <h6>{fakeData[this.state.urlId].productType}</h6>
                                <h3>{fakeData[this.state.urlId].productBrand ? fakeData[this.state.urlId].productBrand : "No brand"}</h3>
                                <h3>{fakeData[this.state.urlId].productName ? fakeData[this.state.urlId].productName : "No name"}</h3>
                                <h4>{fakeData[this.state.urlId].productSex ? fakeData[this.state.urlId].productSex : "No sex"}</h4>
                                <Button onClick={() => this.handleModal( "subscribe")} style={{width: "100%",  backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)"}}>SUBSCRIBE</Button>
                                <Button onClick={() => this.handleModal( "rate")} style={{width: "100%", backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", marginTop: "10px"}}>RATE</Button>
                                <h6 style={{marginTop: "10px"}}>{`Article: ${fakeData[this.state.urlId].productName}`}</h6>
                                <h6 style={{marginTop: "30px"}}>{`${fakeData[this.state.urlId].productDesc}`}</h6>
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
                                            <IconButton edge="end" aria-label="delete" style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", width: "45px", height: "45px"}} onClick={this.handleSendMessage}>
                                                <SendIcon/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    {
                                        fakeComment.map(x => this.handleComment(x))
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
