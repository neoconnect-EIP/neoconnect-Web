import React from 'react';
import { withRouter } from "react-router-dom"
import {Table, TableBody, TableCell, TableHead, TableRow, Modal, Fab, TextField, Grid, Slide} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import "../../index.css"
import {Spin} from "antd";

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adsData: null,
            visible: false,
            actualAd: null,
            message: "",
            modalMode: "",

            productImg: "",
            productName: "",
            productSex: "",
            productDesc: "",
            productSubject: "",
            createdAt: "",
            updatedAt: "",
        };
    };

    componentDidMount = () => {
        fetch(`http://168.63.65.106/offer/shop/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({adsData: res}))
            .catch(error => console.error('Error:', error));
    };


    handleVisibleModal = (ad, mode) => {
        this.setState({visible: !this.state.visible, actualAd: ad, modalMode: mode})
    };

    handleEdit = () => {
        this.props.history.push(`/shop-dashboard/edit-ad?id=${this.state.actualAd.id}`)
    }

    handleSendMail = () => {
        let body = {
            "message": this.state.message,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/sendMail/${localStorage.getItem("userId")}/id`, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); console.log("ads: ", res); this.setState({adsData: res})})
            .catch(error => console.error('Error:', error));
    };

    handleDelete = (id) => {
        fetch(`http://168.63.65.106/offer/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.handleVisibleModal(null, "")})
            .catch(error => console.error('Error:', error));
    };

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    };

    render() {

        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Liste de vos annonces</h1>
                </Grid>
                <Modal
                    open={this.state.visible}
                    onClose={() => this.handleVisibleModal(null, "")}
                >
                    <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
                        {
                            this.state.modalMode === "edit" ?
                                <Grid container justify="center" style={{width: "50rem", height: "auto", position: "relative", marginTop: "18.75rem", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "8px"}}>
                                    <Grid item xs={12} style={{backgroundImage: "linear-gradient(65deg, #d64f4f, #d64f4f, #e86868, #d64f4f, #d64f4f)", height: "auto", marginLeft: "4rem", marginRight: "4rem", borderRadius: "8px", marginTop: "-2.5rem"}}>
                                        <h2 style={{color: "white", marginTop: "1rem"}}>Modification de l'annonce ?</h2>
                                    </Grid>
                                    <Grid item style={{textAlign: "center"}}>
                                        <h1>{`Voulez vous modifier ${this.state.actualAd.productName} ?`}</h1>
                                    </Grid>
                                    <Grid item xs={12} justify="center" style={{marginBottom: "1.2rem"}}>
                                        <Fab class="posted-ad-send-button" onClick={() => this.handleVisibleModal(0, "")} style={{marginRight: "3rem", height: "3rem", fontSize: "1.2rem"}}>
                                            ANNULER
                                        </Fab>
                                        <Fab class="posted-ad-send-button" onClick={this.handleEdit} style={{backgroundImage: "none", marginRight: "3rem", height: "3rem", fontSize: "1.2rem", backgroundColor: "#4CB051"}}>
                                            CONFIRMER
                                        </Fab>
                                    </Grid>
                                </Grid>
                                :
                                this.state.modalMode === "delete" ?
                                    <Grid container justify="center" style={{width: "50rem", height: "auto", position: "relative", marginTop: "18.75rem", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "8px"}}>
                                        <Grid item xs={12} style={{backgroundImage: "linear-gradient(65deg, #d64f4f, #d64f4f, #e86868, #d64f4f, #d64f4f)", height: "5rem", marginLeft: "4rem", marginRight: "4rem", borderRadius: "8px", marginTop: "-2.5rem"}}>
                                            <h2 style={{color: "white", marginTop: "1rem"}}>{`Supprimer une annonce`}</h2>
                                        </Grid>
                                        <Grid item xs={12} justify="center" style={{marginBottom: "1.2rem"}}>
                                            <h4 style={{marginTop: "2rem"}}>{`Etes vous sur de vouloir supprimer ${ this.state.actualAd.productName} ?`}</h4>
                                            <Fab class="posted-ad-send-button" onClick={() => this.handleVisibleModal(null, "")} style={{marginRight: "3rem", height: "3rem", fontSize: "1.2rem"}}>
                                                ANNULER
                                            </Fab>
                                            <Fab class="posted-ad-send-button" onClick={() => this.handleDelete(this.state.actualAd.id)} style={{backgroundImage: "none", marginRight: "3rem", height: "3rem", fontSize: "1.2rem", backgroundColor: "#4CB051"}}>
                                                CONFIRMER
                                            </Fab>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container style={{width: "800px", height: "350px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center"}}>
                                        <Grid item xs={12} style={{backgroundImage: "linear-gradient(65deg, #d64f4f, #d64f4f, #e86868, #d64f4f, #d64f4f)"}}>
                                            <h2 style={{color: "white"}}>Contact candidat</h2>
                                        </Grid>
                                        <Grid item xs={12}>
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
                                            <Fab class="posted-ad-send-button" onClick={() => this.handleSendMail()}>
                                                <EmailIcon style={{marginRight: "5px"}}/>
                                                Send
                                            </Fab>
                                        </Grid>
                                    </Grid>
                        }
                    </Slide>
                </Modal>
                <Grid container style={{marginTop: "130px", padding: "25px", backgroundColor: "white"}} justify="center">
                    {
                        this.state.adsData ?
                            <Table>
                                <TableHead style={{backgroundImage: "linear-gradient(65deg, #712121, #982d2d, #ff4343, #982d2d, #712121)"}}>
                                    <TableRow>
                                        <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Name</TableCell>
                                        <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Type</TableCell>
                                        <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>create at</TableCell>
                                        <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>last update</TableCell>
                                        <TableCell align="center" style={{width: "5 rem", color: "white"}}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.adsData.map(ad => (
                                            <TableRow style={{height: "2 rem"}}>
                                                <TableCell align="center" style={{width: "5 rem"}}>{ad.productName}</TableCell>
                                                <TableCell align="center" style={{width: "5 rem"}}>{ad.productSubject}</TableCell>
                                                <TableCell align="center" style={{width: "5 rem"}}>{new Date(ad.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell align="center" style={{width: "5 rem"}}>{new Date(ad.updatedAt).toLocaleDateString()}</TableCell>
                                                <TableCell align="center" style={{width: "5 rem"}}>
                                                    <Fab color="primary" aria-label="add" style={{margin: "5px"}}
                                                         onClick={() => this.handleVisibleModal(ad, "contact")}><ContactMailIcon/></Fab>
                                                    <Fab color="secondary" aria-label="edit" style={{margin: "5px"}}
                                                         onClick={() => this.handleVisibleModal(ad, "edit")}><EditIcon/></Fab>
                                                    <Fab aria-label="delete" style={{margin: "5px"}}
                                                         onClick={() => this.handleVisibleModal(ad, "delete")}><DeleteIcon/></Fab>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            :
                            <div style={{textAlign: "center", marginTop: "18.75rem"}}>
                                <Spin size={"large"}/>
                            </div>
                    }
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Ads)
