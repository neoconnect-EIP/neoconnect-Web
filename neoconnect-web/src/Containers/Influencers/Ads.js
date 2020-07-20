import React from 'react';
import { withRouter } from "react-router-dom"
import {TableBody, TableCell, TableHead, TableRow, Grid, Fab, Modal, TextField, Slide} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import "../../index.css"
import Loader from "react-loader-spinner";
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';

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

        console.log("USer id ", localStorage.getItem("userId"));
        console.log("toekn id ", localStorage.getItem("Jwt"));
    }

    componentDidMount = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/user/${localStorage.getItem("userId")}`, {
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
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/sendMail/${localStorage.getItem("userId")}`, {
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
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.handleVisibleModal(null, "")})
            .catch(error => console.error('Error:', error));
    };

    listAbonnement = () => {
      console.log("DATA = ", this.state.adsData);

      return (
        this.state.adsData.map(ad => (
          <tr>
            <td>{ad.productName}</td>
            <td>{this.state.type[ad.productSubject]}</td>
            <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
            <td>{ad.average ? ad.productSubject : "Aucune note"}</td>
          </tr>
        ))
      )
    }

    render() {

        return (
            <div className="infBg"  >
                <Navbar expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Annonce postulé</Navbar.Brand>
                </Navbar>
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
                      <div>
                          {
                            !this.state.adsData || this.state.adsData.length === 0 ?
                            <h1>Aucune annonce</h1> :
                            <Table className="mt-4 ml-4 table " style={{color: 'white'}}>
                              <thead>
                                <tr>
                                  <th>Nom</th>
                                  <th>Type</th>
                                  <th>Date d'abonnement</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.listAbonnement()}
                              </tbody>
                            </Table>
                          }
                      </div>
                }
            </div>
        );
    }
}

export default withRouter(Ads)

// <Grid container justify="center">
//     <Navbar bg="light" expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
//       <Navbar.Brand style={{fontSize: '26px', fontWeight: '300'}}>Annonce postulé</Navbar.Brand>
//     </Navbar>
//     <Modal open={this.state.visible}
//            onClose={() => this.handleVisibleModal(null, "")}
//            style={{width: "40rem", height: "auto", display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "22rem", backgroundColor: "transparent"}}
//     >
//         <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
//             {
//                 this.state.modalMode === "delete" ?
//                     <Grid container style={{width: "50rem", height: "auto", borderRadius: "8px", backgroundColor: "#0000006e", backdropFilter: "blur(8px)"}}>
//                         <Grid item xs={12} style={{marginTop: "-1.5rem", marginLeft: "3rem", marginRight: "3rem", textAlign: "center", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>>
//                             <h2 style={{color: "white", marginTop: "-1rem"}}>Désinscription</h2>
//                         </Grid>
//                         <Grid item xs={12} justify="center" style={{marginBottom: "1.2rem", paddingRight: "1rem", paddingLeft: "1rem"}}>
//                             <h4 style={{textAlign: "center", color: "white", marginTop: "2rem"}}>Etes vous sur de vouloir vous desinscrire de cette annonce :</h4>
//                             <h4 style={{textAlign: "center", color: "white", marginTop: "2rem"}}>"{this.state.actualAd.productName}"</h4>
//                         </Grid>
//                         <Grid item xs={6} style={{marginBottom: "3rem", textAlign: "center"}}>
//                             <Fab class="posted-ad-send-button" onClick={() => this.handleVisibleModal(null, "")} style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
//                                 ANNULER
//                             </Fab>
//                         </Grid>
//                         <Grid item xs={6} style={{ marginBottom: "3rem", textAlign: "center"}}>
//                             <Fab class="posted-ad-send-button" onClick={() => this.handleDelete(this.state.actualAd.idOffer)} style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
//                                 CONFIRMER
//                             </Fab>
//                         </Grid>
//                     </Grid>
//                     :
//                     this.state.modalMode === "contact" ?
//                         <Grid container style={{width: "50rem", height: "auto", borderRadius: "8px", backgroundColor: "rgba(161,161,161,0.43)", backdropFilter: "blur(8px)"}}>
//                                 <Grid item xs={12} style={{marginTop: "-1.5rem", marginLeft: "3rem", marginRight: "3rem", textAlign: "center", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>
//                                     <h2 style={{color: "white"}}>Contact Shop</h2>
//                                 </Grid>
//                                 <Grid item xs={12} style={{marginTop: "1rem", marginBottom: "1rem", textAlign: "center", color: "white"}}>
//                                     <TextField
//                                         id="outlined-multiline-static"
//                                         label="Message"
//                                         multiline
//                                         rows="8"
//                                         color="secondary"
//                                         margin="normal"
//                                         variant="outlined"
//                                         style={{width: "43.75rem", height: "10rem"}}
//                                         value={this.state.message}
//                                         onChange={(value) => this.handleMessageChange(value)}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}  style={{ marginBottom: "3rem", textAlign: "center"}}>
//                                     <Fab class="posted-ad-send-button"
//                                          onClick={() => this.handleSendMail()}
//                                          style={{height: "3rem", width: "10rem", fontSize: "1.3rem", borderRadius: "8px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}
//                                     >
//                                         <EmailIcon style={{marginRight: "0.3125rem", marginTop: "-0.3"}}/>
//                                         Send
//                                     </Fab>
//                                 </Grid>
//                             </Grid>
//                         :
//                         <Grid>
//
//                         </Grid>
//             }
//         </Slide>
//     </Modal>
//     {
//         this.state.isLoading ?
//             <Loader
//                 type="Triangle"
//                 color="#292929"
//                 height={200}
//                 width={200}
//                 style={{marginTop: "14rem"}}
//             />
//             :
//             <Grid container style={{padding: "1.5625rem"}}>
//                 {
//                     !this.state.adsData || this.state.adsData.length === 0 ?
//                         <h1>Aucune annonce</h1>
//                         :
//                         <Table>
//                             <TableHead style={{backgroundImage: "linear-gradient(65deg, #1C8FDC, #E5DF24, #1C8FDC)"}}>
//                                 <TableRow>
//                                     <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Annonceur</TableCell>
//                                     <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Article</TableCell>
//                                     <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Début</TableCell>
//                                     <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Mise à jour</TableCell>
//                                     <TableCell style={{width: "5 rem", color: "white"}}>Action</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {
//                                     this.state.adsData.map(row => (
//                                         <TableRow style={{height: "2 rem"}}>
//                                             <TableCell align="center" style={{width: "5 rem"}}>{row.brand ? row.brand : "Sans marque"}</TableCell>
//                                             <TableCell align="center" style={{width: "5 rem"}}>{row.productName}</TableCell>
//                                             <TableCell align="center" style={{width: "5 rem"}}>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
//                                             <TableCell align="center" style={{width: "5 rem"}}>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
//                                             <TableCell align="center" style={{width: "5 rem"}}>
//                                                 {/*<Fab color="primary" aria-label="add" style={{margin: "5px"}} onClick={() => this.handleVisibleModal(row, "edit")}><ContactMailIcon /></Fab>*/}
//                                                 {/*<Fab color="secondary" aria-label="edit" style={{margin: "5px"}}><EditIcon /></Fab>*/}
//                                                 <Fab aria-label="delete" style={{margin: "5px"}} onClick={() => this.handleVisibleModal(row, "delete")}><DeleteIcon /></Fab>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 }
//                             </TableBody>
//                         </Table>
//                 }
//             </Grid>
//     }
// </Grid>
