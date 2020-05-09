import React from 'react';
import { withRouter } from "react-router-dom"
import {Table, TableBody, TableCell, TableHead, TableRow, Grid, Fab, Modal, TextField, Slide} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EmailIcon from '@material-ui/icons/Email';
import "../../index.css"
import Loader from "react-loader-spinner";

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adsData: [],
            visible: false,
            actualAd: null,
            message: "",
            isLoading: true,
            modalMode: "",
        };
    }

    componentDidMount = () => {
        fetch(`http://168.63.65.106/offer/apply/user/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({adsData: res, isLoading: false}))
            .catch(error => console.error('Error:', error));
    }

    handleVisibleModal = (row, mode) => {
        this.setState({visible: !this.state.visible, actualAd: row, modalMode: mode})
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
            .then(res => {res.json(); this.setState({adsData: res})})
            .catch(error => console.error('Error:', error));
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    };

    handleDelete = (id) => {
        fetch(`http://168.63.65.106/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.handleVisibleModal(null, "")})
            .catch(error => console.error('Error:', error));
    };

    render() {
       /* function createData(annoncer: string, item: string, startDate: string, lastUpdate: string) {
            return { annoncer, item, startDate, lastUpdate };
        }*/
        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 -3px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>annonces postulées</h1>
                </Grid>
                <Modal open={this.state.visible}
                       onClose={() => this.handleVisibleModal(null, "")}
                       style={{width: "40rem", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "22rem", backgroundColor: "transparent"}}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        {
                            this.state.modalMode === "delete" ?
                                <Grid container style={{width: "50rem", height: "auto", borderRadius: "8px", backgroundColor: "#0000006e", backdropFilter: "blur(8px)"}}>
                                    <Grid item xs={12} style={{marginTop: "-1.5rem", marginLeft: "3rem", marginRight: "3rem", textAlign: "center", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>>
                                        <h2 style={{color: "white", marginTop: "-1rem"}}>Désinscription</h2>
                                    </Grid>
                                    <Grid item xs={12} justify="center" style={{marginBottom: "1.2rem", paddingRight: "1rem", paddingLeft: "1rem"}}>
                                        <h4 style={{textAlign: "center", color: "white", marginTop: "2rem"}}>Etes vous sur de vouloir vous desinscrire de cette annonce :</h4>
                                        <h4 style={{textAlign: "center", color: "white", marginTop: "2rem"}}>"{this.state.actualAd.productName}"</h4>
                                    </Grid>
                                    <Grid item xs={6} style={{marginBottom: "3rem", textAlign: "center"}}>
                                        <Fab class="posted-ad-send-button" onClick={() => this.handleVisibleModal(null, "")} style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
                                            ANNULER
                                        </Fab>
                                    </Grid>
                                    <Grid item xs={6} style={{ marginBottom: "3rem", textAlign: "center"}}>
                                        <Fab class="posted-ad-send-button" onClick={() => this.handleDelete(this.state.actualAd.idOffer)} style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
                                            CONFIRMER
                                        </Fab>
                                    </Grid>
                                </Grid>
                                :
                                this.state.modalMode === "contact" ?
                                    <Grid container style={{width: "50rem", height: "auto", borderRadius: "8px", backgroundColor: "rgba(161,161,161,0.43)", backdropFilter: "blur(8px)"}}>
                                            <Grid item xs={12} style={{marginTop: "-1.5rem", marginLeft: "3rem", marginRight: "3rem", textAlign: "center", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
                                                <h2 style={{color: "white"}}>Contact Shop</h2>
                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: "1rem", marginBottom: "1rem", textAlign: "center", color: "white"}}>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Message"
                                                    multiline
                                                    rows="8"
                                                    color="secondary"
                                                    margin="normal"
                                                    variant="outlined"
                                                    style={{width: "43.75rem", height: "10rem"}}
                                                    value={this.state.message}
                                                    onChange={(value) => this.handleMessageChange(value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}  style={{ marginBottom: "3rem", textAlign: "center"}}>
                                                <Fab class="posted-ad-send-button"
                                                     onClick={() => this.handleSendMail()}
                                                     style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}
                                                >
                                                    <EmailIcon style={{marginRight: "0.3125rem", marginTop: "-0.3"}}/>
                                                    Send
                                                </Fab>
                                            </Grid>
                                        </Grid>
                                    :
                                    <Grid>

                                    </Grid>
                        }
                    </Slide>
                </Modal>
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
                        <Grid container style={{marginTop: "8.125rem", padding: "1.5625rem"}}>
                            {
                                !this.state.adsData || this.state.adsData.length === 0 ?
                                    <h1>Aucune annonce</h1>
                                    :
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
                                                this.state.adsData.map(row => (
                                                    <TableRow style={{height: "2 rem"}}>
                                                        <TableCell align="center" style={{width: "5 rem"}}>{row.brand ? row.brand : "Sans marque"}</TableCell>
                                                        <TableCell align="center" style={{width: "5 rem"}}>{row.productName}</TableCell>
                                                        <TableCell align="center" style={{width: "5 rem"}}>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                                                        <TableCell align="center" style={{width: "5 rem"}}>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
                                                        <TableCell align="center" style={{width: "5 rem"}}>
                                                            {/*<Fab color="primary" aria-label="add" style={{margin: "5px"}} onClick={() => this.handleVisibleModal(row, "edit")}><ContactMailIcon /></Fab>*/}
                                                            {/*<Fab color="secondary" aria-label="edit" style={{margin: "5px"}}><EditIcon /></Fab>*/}
                                                            <Fab aria-label="delete" style={{margin: "5px"}} onClick={() => this.handleVisibleModal(row, "delete")}><DeleteIcon /></Fab>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                            }
                        </Grid>
                }
            </Grid>
        );
    }
}

export default withRouter(Ads)
