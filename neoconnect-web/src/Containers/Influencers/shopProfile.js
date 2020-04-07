import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {
    Button,
    Grid,
    Avatar,
    List,
    TextField,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    Slide,
    Modal,
    ListItemText,
    InputAdornment,
    IconButton,
    Input,
    InputLabel
} from '@material-ui/core';
import { Rate } from 'antd';
import {LineChart, XAxis, YAxis, Line, CartesianGrid, Pie, PieChart, Cell} from 'recharts'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultShopProfilePic from "../../assets/defaultShopProfilePic.jpg"
import defaultBoutiqueLogo from "../../assets/defaultBoutiqueLogo.jpg"
import adidasLogo from "../../assets/superthumb.jpg"
import StarIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import avatar from "../../assets/avatar1.png";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


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
            .then(res => console.log("res", res))
            .then(res => this.setState({markData: res.mark}))
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
        this.setState({visible: false})
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    handleComment = (x) => {
        return (
            <ListItem style={{height: "4.375rem"}}>
                <ListItemAvatar style={{marginRight: "1rem"}}>
                    <Avatar src={x.avatar}/>
                </ListItemAvatar>
                <ListItemText style={{borderBottom: "1px solid #292929"}}>
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
    }

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

        console.log("mark", this.state.markData)
        return (
            <Grid container justify="center">
                {
                    this.state.shopData ?
                        <Grid container>
                            <Modal
                                open={this.state.visible}
                                onClose={this.handleModal}
                            >
                                <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                                    <Grid container style={{width: "400px", height: "150px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
                                        <Grid item xs={12}>
                                            <h3 style={{color: "black"}}>Notez cette boutique !</h3>
                                        </Grid>
                                        <Grid item style={{position: "relative", marginRight: "auto", marginLeft: "auto"}}>
                                            <Rate onChange={(e) => this.handleMark(e)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{backgroundColor: "#292929", margin: "10px", boxShadow: "0 0 10px"}} onClick={this.handleSendMark}>Rate</Button>
                                        </Grid>
                                    </Grid>
                                </Slide>
                            </Modal>
                            <Grid item style={{backgroundImage: `url(${this.state.shopData.shopBanner ? this.state.shopData.shopBanner : defaultShopProfilePic})`, backgroundSize: "cover", backgroundPosition: "center center", width: "100%", height: "500px", position: "fixed"}}>
                            </Grid>
                            <Grid container style={{width: "100%" ,height: "auto", position: "relative", backgroundColor: "white", marginTop: "350px", clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0 100%)"}}>
                                <Grid item style={{marginTop: "13.75rem", height: "auto"}} xs={12}>
                                    <h1 style={{textAlign: "center"}}>{this.state.shopData.shopBrand}</h1>
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
                                    <h6>{this.state.shopData.shopDesc}</h6>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} style={{marginTop: "5rem", textAlign: "center"}}>
                                    <h3 style={{textAlign: "center"}}>Note</h3>
                                    <h1 style={{marginTop: "2rem", fontSize: "6.25rem", color: "black"}}>{`0/5`}</h1>
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
                                <Grid item xs={12} style={{marginRight: "12.5rem", marginLeft: "12.5rem", marginTop: "3.125rem"}}>
                                    <h2 style={{textAlign: "center"}}>Avis</h2>
                                    <List style={{paddingLeft: "0.625rem", paddingRight: "0.625rem", marginTop: "5rem"}}>
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
                                            this.state.commentData.map(x => this.handleComment(x))
                                        }
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid container justify="center" style={{marginTop: "-104.3rem"}}>
                                <Avatar alt="Avatar not found" src={this.state.shopData.shopLogo} style={{width: "250px", height: "250px", position: "relative", backgroundColor: "white", boxShadow: "0 0 12px"}}/>
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
