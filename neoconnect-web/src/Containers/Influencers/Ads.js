import React from 'react';
import { withRouter } from "react-router-dom"
import {Table, TableBody, TableCell, TableHead, TableRow, Grid, Fab, Modal, TextField, Slide} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EmailIcon from '@material-ui/icons/Email';

import "../../index.css"
import backgroundStatus from "../../assets/backgroundStatus.jpg";
import Loader from "react-loader-spinner";

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adsData: null,
            visible: false,
            acutalId: null,
            message: "",

        };
    }

    componentDidMount = () => {
        fetch(`http://168.63.65.106/offer/apply/user/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({adsData: res}))
            .catch(error => console.error('Error:', error));
    }

    handleVisibleModal = () => {
        this.setState({visible: !this.state.visible})
    }

    handleSendMail = () => {
        let body = {
            "message": this.state.message,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/sendMail/${localStorage.getItem("userId")}`, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); console.log("ads: ", res); this.setState({adsData: res})})
            .catch(error => console.error('Error:', error));
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    }

    render() {

        function createData(annoncer: string, item: string, startDate: string, lastUpdate: string) {
            return { annoncer, item, startDate, lastUpdate };
        }

       console.log("PostAdsData: ", this.state.adsData)
        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 -3px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>annonces postulées</h1>
                </Grid>
                <Modal
                    open={this.state.visible}
                    onClose={() => this.handleVisibleModal()}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        <Grid container style={{width: "800px", height: "auto", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", padding: "25px", borderRadius: "8px"}}>
                            <Grid item xs={12} style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", boxShadow: "0 2px 10px", marginTop: "-3.5rem", borderRadius: "10px"}}>
                                <h2 style={{color: "white", marginTop: "0.9rem"}}>Contact Shop</h2>
                            </Grid>
                            <Grid item xs={12} style={{marginTop: "1rem", marginBottom: "1rem"}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Message"
                                    multiline
                                    rows="8"
                                    margin="normal"
                                    variant="outlined"
                                    style={{width: "700px", height: "160px"}}
                                    value={this.state.message}
                                    onChange={(value) => this.handleMessageChange(value)}
                                />
                            </Grid>
                            <Grid item xs={12} alignItems="center" justify="center">
                                <Fab class="posted-ad-send-button"
                                     onClick={() => this.handleSendMail()}
                                >
                                    <EmailIcon style={{marginRight: "0.3125rem", marginTop: "-0.3"}}/>
                                    Send
                                </Fab>
                            </Grid>
                        </Grid>
                    </Slide>
                </Modal>
                <Grid container style={{marginTop: "8.125rem", padding: "1.5625rem"}}>
                    <Table>
                        <TableHead style={{backgroundImage: "linear-gradient(65deg, #1C8FDC, #E5DF24, #1C8FDC)"}}>
                            <TableRow>
                                <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Annonceur</TableCell>
                                <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Article</TableCell>
                                <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Début</TableCell>
                                <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Mise à jour</TableCell>
                                <TableCell style={{width: "5 rem", color: "white"}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.adsData ?
                                    this.state.adsData.map(row => (
                                        <TableRow style={{height: "2 rem"}}>
                                            <TableCell align="center" style={{width: "5 rem"}}>{row.annoncer}</TableCell>
                                            <TableCell align="center" style={{width: "5 rem"}}>{row.item}</TableCell>
                                            <TableCell align="center" style={{width: "5 rem"}}>{row.createdAt}</TableCell>
                                            <TableCell align="center" style={{width: "5 rem"}}>{row.updatedAt}</TableCell>
                                            <TableCell align="center" style={{width: "5 rem"}}>
                                                <Fab color="primary" aria-label="add" style={{margin: "5px"}} onClick={() => this.handleVisibleModal()}><ContactMailIcon /></Fab>
                                                {/*<Fab color="secondary" aria-label="edit" style={{margin: "5px"}}><EditIcon /></Fab>*/}
                                                <Fab aria-label="delete" style={{margin: "5px"}}><DeleteIcon /></Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <Loader
                                        type="Triangle"
                                        color="#292929"
                                        height={200}
                                        width={200}
                                        style={{marginTop: "14rem"}}
                                    />
                            }
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Ads)
