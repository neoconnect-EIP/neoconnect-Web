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
    Avatar,
    CircularProgress,
    List,
    TextField,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    Slide,
    Modal,
} from '@material-ui/core';
import { Rate } from 'antd';
import {LineChart, XAxis, YAxis, Line, CartesianGrid, Pie, PieChart, Cell} from 'recharts'
import {Spin} from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultShopProfilePic from "../../assets/defaultShopProfilePic.jpg"
import defaultBoutiqueLogo from "../../assets/defaultBoutiqueLogo.jpg"
import adidasLogo from "../../assets/superthumb.jpg"
import StarIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import avatar from "../../assets/avatar1.png";

class shopProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shopData: "",
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

        fetch(`http://168.63.65.106/shop/${id.id}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({shopData: res}))
            .catch(error => console.error('Error:', error));

        fetch(`http://168.63.65.106/user/comment/${id.id}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({commentData: res}))
            .catch(error => console.error('Error:', error));

        fetch(`http://168.63.65.106/user/mark/${id.id}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => this.setState({markData: res}))
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
    }

    handleModal = (fonction) => {
        this.setState({visible: !this.state.visible})
    }

    handleSendMessage = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "comment": this.state.commentInput,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/user/comment/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""})
    }

    handleSendMark = () => {
        let id = this.getUrlParams((window.location.search));
        let body = {
            "mark": this.state.mark,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/user/mark/${id.id}`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
        this.setState({ commentInput: ""})
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    handleComment = (x) => {
        return (
            <ListItem style={{height: "70px", borderTop: "1px solid #c4c4c4"}}>
                <ListItemAvatar>
                    <Avatar src={x.avatar}/>
                </ListItemAvatar>
                <p style={{color: "black", marginTop: "15px"}}>{x.comment}</p>
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
            </ListItem>
        )
    };

    handleMark = (e) => {
        this.setState({mark: e})
    };

    render() {
        const data = [
            {
                name: 'Annonce 1', uv: 4000, pv: 2400, amt: 2400,
            },
            {
                name: 'Annonce 2', uv: 3000, pv: 1398, amt: 2210,
            },
            {
                name: 'Annonce 3', uv: 2000, pv: 9800, amt: 2290,
            },
            {
                name: 'Annonce 4', uv: 2780, pv: 3908, amt: 2000,
            },
            {
                name: 'Annonce 5', uv: 1890, pv: 4800, amt: 2181,
            },
            {
                name: 'Annonce 6', uv: 2390, pv: 3800, amt: 2500,
            },
            {
                name: 'Annonce 7', uv: 3490, pv: 4300, amt: 2100,
            },
        ];

        const pieData = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
        ];
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index,}) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };
        const fakeData = [
            {
                id: 1,
                shopBanner: [
                    "https://www.eestairs.com/html/filesystem/storeFolder/347/1500-1500/force/png/Nike-Store-Utrecht-1-1-.jpg",
                ],
                shopLogo: "https://1000logos.net/wp-content/uploads/2017/03/Nike-SB-logo.jpg",
                shopBrand : "Nike",
                shopSlogan : "just do it",
                shopType : "Sport fitness",
                shopDesc : "Nike ranked No. 89 in the 2018 Fortune 500 list of the largest United States corporations by total revenue. The company was founded on January 25, 1964, as Blue Ribbon Sports, by Bill Bowerman and Phil Knight, and officially became Nike, Inc. on May 30, 1971.",
                mark : 3,
            },
            {
                id: 2,
                    shopBanner: [
                "https://images.taubman.com/www.shopdolphinmall.com/asset_cache/1538584596Adidas-2368x1056.jpg",
            ],
                shopLogo: "https://www.logolynx.com/images/logolynx/0a/0adce4c4df059a9c1dfe8a955b27f7fc.png",
                shopBrand : "Adidas",
                shopSlogan : "La marque a 3 bandes",
                shopType : "Sport/fitness",
                shopDesc : "adidas has its roots in Germany but we are a truly global company. Around the world we employ over 57,000 people. Employees from about 100 nations are working at our global HQ in Herzogenaurach, Germany – the ‘World of Sports’. Every year we produce over 900 million sports and sports lifestyle products with independent manufacturing partners worldwide. In 2018 we generated sales of € 21.915 billion. These numbers alone can easily suggest that adidas is quite a large and also multifaceted organization. True. But we keep things simple, lean and fast. And we will use this approach now to give an overview of what our company is all about. ",
                mark : 4,
            },
            {
                id: 3,
                    shopBanner: [
                "http://legattolifestyle.com/wp-content/uploads/2013/09/gucci-store-on-google-maps.jpg",
            ],
                shopLogo: "https://1000logos.net/wp-content/uploads/2017/01/Gucci-Logo-history.jpg",
                shopBrand : "Gucci",
                shopSlogan : "Redifining Modern luxury fashon",
                shopType : "Mode",
                shopDesc : "Influential, innovative and progressive, Gucci is reinventing a wholly modern approach to fashion. Under the new vision of creative director Alessandro Michele, the House has redefined luxury for the 21st century, further reinforcing its position as one of the world’s most desirable fashion houses. Eclectic, contemporary, romantic—Gucci products represent the pinnacle of Italian craftsmanship and are unsurpassed for their quality and attention to detail. Gucci is part of the Kering Group. A global Luxury group, Kering manages the development of a series of renowned Houses in Fashion, Leather Goods, Jewelry and Watches.",
                mark : 5,
            },
            {
                id: 4,
                    shopBanner: [
                "http://www.artlistparis.com/uploads/m_artlist-set-design-jmstudio-portfolio-store-louis-vuitton-fw-2016-champs-elysees-5b3a139d4e2c967018090470250afdf7b1b7b0ce68e9937af639aed12f32ec3b.jpg",
            ],
                shopLogo: "https://www.logolynx.com/images/logolynx/e2/e218fe463a9c6b7f64e52b0ca8bc6b6d.jpeg",
                shopBrand : "Louis Vuitton",
                shopSlogan : "French luxury",
                shopType : "Mode",
                shopDesc : "Item de la capsule été 2018, en colaboration avec Virgile Hablot, disponible en édition limité, faite en cuire de buffle, certie d'une boucle en or 18 carat, doublure en soie véritable",
                mark : 4,
            },
        ];
        const fakeComment = [
            {
                id: 1,
                avatar: "https://c.wallhere.com/photos/fe/71/women_model_face_profile_simple_background_rings_Demi_Lovato-267.jpg!d",
                comment: "cette boutique est génial !",
            },
            {
                id: 2,
                avatar: "http://data2.1freewallpapers.com/download/colton-haynes-actor-face-profile.jpg",
                comment: "Je suis fan de ce shop !",
            },
            {
                id: 3,
                avatar: "http://golem13.fr/wp-content/uploads/2013/06/profile.jpg",
                comment: "J'adore leurs items.",
            },
            {
                id: 3,
                avatar: "https://images.8tracks.com/avatar/i/010/095/145/aesthetic-anime-anime-boy-art-Favim.com-4459459-732.jpg?rect=15,0,570,570&q=98&fm=jpg&fit=max",
                comment: "Nul.",
            },
        ]

        console.log("comment: ", this.state.commentData)
        console.log("mark: ", this.state.markData)
        return (
            <Grid container justify="center">
                {
                    fakeData ?
                        <Grid container>
                            <Modal
                                open={this.state.visible}
                                onClose={this.handleModal}
                            >
                                <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                                    <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                        <Grid item xs={12}>
                                            <h3 style={{color: "black"}}>Notez cette annonce !</h3>
                                        </Grid>
                                        <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                            <Rate onChange={(e) => this.handleMark(e)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{backgroundImage: "linear-gradient(65deg, #e86868, #d64f4f, #d64f4f)", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleSendMark}>Rate</Button>
                                        </Grid>
                                    </Grid>
                                </Slide>
                            </Modal>
                            <Grid item style={{backgroundImage: `url(${fakeData[0].shopBanner ? fakeData[0].shopBanner : defaultShopProfilePic})`, backgroundSize: "cover", backgroundPosition: "center center", width: "100%", height: "500px", position: "fixed"}}>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "350px", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}}>
                                <Grid item style={{marginTop: "13.75rem", height: "auto"}} xs={12}>
                                    <h1 style={{textAlign: "center"}}>{fakeData[0].shopBrand}</h1>
                                </Grid>
                                <Grid item xs={12} md={7} style={{marginTop: "1.1rem", paddingLeft: "5rem"}}>
                                    <h1>Dernières annonces</h1>
                                    <LineChart width={700} height={300} data={data}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                                    </LineChart>
                                </Grid>
                                <Grid item xs={7} md={5} style={{padding: "1.25rem", marginTop: "20px"}}>
                                    <h1>Déscription</h1>
                                    <h6>{fakeData[0].shopDesc}</h6>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem", textAlign: "center"}}>
                                    <h3 style={{textAlign: "center"}}>Note</h3>
                                    <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`${fakeData[0].mark}/5`}</h1>
                                    <Button style={{height: "30px", backgroundColor: "black"}} onClick={this.handleModal}>Notez cette boutique</Button>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem"}}>
                                    <h3 style={{textAlign: "center"}}>Souscription aux annonces</h3>
                                    <div style={{marginLeft: "3rem", marginTop: "-5.625rem"}}>
                                        <PieChart width={400} height={400}>
                                            <Pie
                                                data={pieData}
                                                cx={200}
                                                cy={200}
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {
                                                    pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                                }
                                            </Pie>
                                        </PieChart>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem"}}>
                                    <h3 style={{textAlign: "center"}}>Taux de réponse aux post</h3>
                                    <h1 style={{marginTop: "2rem", textAlign: "center", fontSize: "6.25rem", color: "black"}}>73%</h1>
                                </Grid>
                                <Grid item xs={12} style={{marginRight: "200px", marginLeft: "200px", marginTop: "50px"}}>
                                    <h2 style={{textAlign: "center"}}>Avis</h2>
                                    <List style={{paddingLeft: "10px", paddingRight: "10px"}}>
                                        <Grid container style={{height: "auto", paddingTop: "8px", marginBottom: "10px"}}>
                                            <Grid item xs={1} style={{paddingLeft: "15px"}}>
                                                <Avatar alt="Avatar not found" src={avatar} style={{width: "40px", height: "40px"}}/>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows="3"
                                                    variant="outlined"
                                                    name="commentInput"
                                                    placeholder="Commentaire"
                                                    value={this.state.commentInput}
                                                    onChange={this.handleChange}
                                                    style={{width: "90%", backgroundColor: "white", marginRight: "40px", marginLeft: "40px"}}
                                                />
                                            </Grid>
                                            <Grid item xs={1} style={{paddingLeft: "25px"}}>
                                                <IconButton edge="end" aria-label="delete" style={{backgroundImage: "linear-gradient(45deg, #e86868, #d64f4f, #d64f4f)", width: "45px", height: "45px"}} onClick={this.handleSendMessage}>
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
                            <Grid container justify="center" style={{marginTop: "-101.6rem"}}>
                                <Avatar alt="Avatar not found" src={fakeData[0].shopLogo} style={{width: "250px", height: "250px", position: "relative", backgroundColor: "white", boxShadow: "0 0 12px"}}/>
                            </Grid>
                        </Grid>
                        :
                        <div style={{marginTop: "35rem"}}>
                            <Spin size={"large"}/>
                        </div>
                }
            </Grid>
        );
    }
}

export default withRouter(shopProfile)
