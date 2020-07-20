import React from 'react';
import { withRouter } from "react-router-dom"
import {Table, TableBody, TableCell, TableHead, TableRow, Fab, TextField, Grid, Slide} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import "../../index.css"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Navbar from 'react-bootstrap/Navbar';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { store } from 'react-notifications-component';

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
            type:['', 'Mode', 'Cosmetique', 'Technologie', 'Nourriture', 'Jeux video', 'Sport/Fitness']
        };
    };

    componentDidMount = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/shop/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({adsData: res}))
            .catch(error => console.error('Error:', error));
    };


    handleVisibleModal = (ad) => {
        this.setState({visible: !this.state.visible, actualAd: ad})
    };

    handleEdit = (id) => {
        this.props.history.push(`/shop-dashboard/edit-ad?id=${id}`)
    }

    handleSendMail = () => {
        let body = {
            "message": this.state.message,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/sendMail/${localStorage.getItem("userId")}/id`, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.setState({adsData: res})})
            .catch(error => console.error('Error:', error));
    };

    handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.handleVisibleModal(null, "")})
            .catch(error => console.error('Error:', error));
    };

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    };

    handleClose = () => {
        this.setState({visible: false})
    }

    handleResponse = (res, choice, inf) => {
        console.log("RES ", res);
        if (res)
          store.addNotification({
            title: "Envoyé",
            message: "Nous avons pris en compte de votre acceptation. Une notification sera envoyé à " + inf ,
            type: "success",
            insert: "top",
            container: "top-right",
            pauseOnHover: true,
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 7000,
              onScreen: true,
              showIcon: true
            }
          });
        else
          store.addNotification({
            title: "Envoyé",
            message: "Nous avons bien pris en compte votre refus. Une notification sera envoyé à " + inf,
            type: "success",
            insert: "top",
            container: "top-right",
            pauseOnHover: true,
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 7000,
              onScreen: true,
              showIcon: true
            }
          });
    }

    acceptDeclineInf = (choice, inf) => {
      console.log("inf ", inf);
      let body = {
          "userId": inf.idUser,
          "idOffer": inf.idOffer,
          "choice": choice
      };

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/mooc/choiceApply`, {
          method: 'POST',
          body: body,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      }).then(res => this.handleResponse(res, choice, inf.idUser)) // TODO change to Name
        .catch(error => console.error('Error:', error));

    }

    listInf = (ad) => {
      console.log(ad.infs);
        if (ad.infs && ad.infs.length > 0) {  // TODO change idUser to Name
          return (
            ad.infs.map(inf => (
              <tr hidden={ad.show ? false : true}>
                <td>{inf.idUser}</td>
                <td><Button variant="outline-info" onClick={() => {this.props.history.push(`/shop-dashboard/influencer?id=${inf.idUser}`)}}>Voir profil</Button></td>
                <td><Button variant="outline-success" onClick={() => {this.acceptDeclineInf(true, inf)}}>Accepter</Button></td>
                <td><Button variant="outline-danger" onClick={() => {this.acceptDeclineInf(false, inf)}}>Refuser</Button></td>
                <td>Abonnée le {new Date(inf.createdAt).toLocaleDateString()}</td>
                <td></td>
                <td></td>
              </tr>
            ))
          )
        }
        else {
          return (
            <tr hidden={ad.show ? false : true}>
              <td></td>
              <td></td>
              <td></td>
              <td>Aucun abonnement pour le moment</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        }
    }

    listOffer = () => {
      return (
        this.state.adsData.map(ad => (
          <>
          <tr>
            <td>{ad.productName}</td>
            <td>{this.state.type[ad.productSubject]}</td>
            <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
            <td>{new Date(ad.updatedAt).toLocaleDateString()}</td>
            <td>{ad.average ? ad.productSubject : "Aucune note"}</td>
            <td>
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip>
                    Modifier
                  </Tooltip>
                }
              >
               <EditTwoToneIcon className="report" onClick={() => this.handleEdit(ad.id)}/>
              </OverlayTrigger>{' '}
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip>
                    Supprimer
                  </Tooltip>
                }
              >
               <DeleteTwoToneIcon className="report" onClick={() => this.handleVisibleModal(ad)}/>
              </OverlayTrigger>{' '}
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip>
                    Voir abonnement
                  </Tooltip>
                }
              >
               <ExpandMoreTwoToneIcon className="report" onClick={async () => {
                   ad.show = !ad.show;

                   var res = await fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/offer/${ad.id}`, {
                       method: 'GET',
                       headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
                   })
                   console.log("RES 2 ", res);
                   ad.infs = await res.json();
                   this.forceUpdate();
                 }} />
              </OverlayTrigger>{' '}
            </td>
          </tr>
          {this.listInf(ad)}
          </>
        ))
      )
    }

    render() {
      console.log("data ", this.state.adsData);
        return (
            <div container justify="center" className="shopBg" style={{height: '100vh'}}>
              <Modal centered show={this.state.visible} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Supression</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sur de vouloir supprimer cette offre ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Non
                  </Button>
                  <Button variant="danger" onClick={() => this.handleDelete(this.state.actualAd.id)}>
                    Oui
                  </Button>
                </Modal.Footer>
              </Modal>
              <Navbar style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Liste de vos annonces</Navbar.Brand>
              </Navbar>
              {this.state.adsData ?
                <Table className="mt-4 ml-4 table " style={{color: 'white'}}>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Date de création</th>
                      <th>Dernière Modification</th>
                      <th>Note</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.listOffer()}
                  </tbody>
                </Table> :
                <Loader
                   type="Triangle"
                   color="white"
                   height={200}
                   width={200}
                   style={{marginTop: "14rem"}}
               />
            }
          </div>
        );
      }
}

export default withRouter(Ads)

// <Modal
//     open={this.state.visible}
//     onClose={() => this.handleVisibleModal(null, "")}
// >
//     <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
//         {
//             this.state.modalMode === "edit" ?
//                 <Grid container justify="center" style={{width: "50rem", height: "auto", position: "relative", marginTop: "18.75rem", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "8px"}}>
//                     <Grid item xs={12} style={{backgroundColor: "#292929", height: "auto", marginLeft: "4rem", marginRight: "4rem", borderRadius: "8px", marginTop: "-1.8rem"}}>
//                         <h2 style={{color: "white", marginTop: "0.5rem", marginBottom: "0.5rem"}}>Modification de l'annonce ?</h2>
//                     </Grid>
//                     <Grid item style={{textAlign: "center"}}>
//                         <h3 style={{marginTop: "2rem"}}>{`Voulez vous modifier ${this.state.actualAd.productName} ?`}</h3>
//                     </Grid>
//                     <Grid item xs={12} justify="center" style={{marginBottom: "1.2rem"}}>
//                         <Fab class="posted-ad-send-button" onClick={() => this.handleVisibleModal(0, "")} style={{marginRight: "3rem", height: "3rem", fontSize: "1.2rem", color: 'white'}}>
//                             ANNULER
//                         </Fab>
//                         <Fab class="posted-ad-send-button" onClick={this.handleEdit} style={{backgroundImage: "none", marginRight: "3rem", height: "3rem", fontSize: "1.2rem", backgroundColor: "#4CB051"}}>
//                             CONFIRMER
//                         </Fab>
//                     </Grid>
//                 </Grid>
//                 :
//                 this.state.modalMode === "delete" ?
//                     <Grid container justify="center" style={{width: "50rem", height: "auto", position: "relative", marginTop: "18.75rem", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "8px"}}>
//                         <Grid item xs={12} style={{backgroundColor: "#292929", height: "auto", marginLeft: "4rem", marginRight: "4rem", borderRadius: "8px", marginTop: "-1.8rem"}}>
//                             <h2 style={{color: "white", marginTop: "0.5rem", marginBottom: "0.5rem"}}>Supprimer une annonce</h2>
//                         </Grid>
//                         <Grid item xs={12} justify="center" style={{marginBottom: "1.2rem"}}>
//                             <h3 style={{marginTop: "2rem"}}>{`Etes vous sur de vouloir supprimer ${ this.state.actualAd.productName} ?`}</h3>
//                             <Fab class="posted-ad-send-button" onClick={() => this.handleVisibleModal(null, "")} style={{marginRight: "3rem", height: "3rem", fontSize: "1.2rem"}}>
//                                 ANNULER
//                             </Fab>
//                             <Fab class="posted-ad-send-button" onClick={() => this.handleDelete(this.state.actualAd.id)} style={{backgroundImage: "none", marginRight: "3rem", height: "3rem", fontSize: "1.2rem", backgroundColor: "#4CB051"}}>
//                                 CONFIRMER
//                             </Fab>
//                         </Grid>
//                     </Grid>
//                     :
//                     <Grid container style={{width: "50rem", height: "auto", position: "relative", marginTop: "18.75rem", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "8px"}}>
//                         <Grid item xs={12} style={{backgroundImage: "linear-gradient(65deg, #E5DF24, #1C8FDC)", height: "auto", marginLeft: "4rem", marginRight: "4rem", borderRadius: "8px", marginTop: "-1.8rem"}}>
//                             <h2 style={{color: "white", marginTop: "0.5rem", marginBottom: "0.5rem"}}>Contact candidat</h2>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 id="outlined-multiline-static"
//                                 label="Message"
//                                 multiline
//                                 rows="8"
//                                 margin="normal"
//                                 variant="outlined"
//                                 style={{width: "43.75rem", height: "10rem", marginTop: "2rem"}}
//                                 value={this.state.message}
//                                 onChange={(value) => this.handleMessageChange(value)}
//                             />
//                         </Grid>
//                         <Grid item xs={12} alignItems="center" justify="center">
//                             <Fab class="posted-ad-send-button" onClick={() => this.handleSendMail()} style={{marginTop: "1.5rem", marginBottom: "1.5rem"}}>
//                                 <EmailIcon style={{marginRight: "5px"}}/>
//                                 Send
//                             </Fab>
//                         </Grid>
//                     </Grid>
//         }
//     </Slide>
// </Modal>
// <Grid container style={{padding: "1.5625rem", backgroundColor: "white"}} justify="center">
//     {
//         this.state.adsData ?
//             <Table>
//                 <TableHead style={{backgroundImage: "linear-gradient(65deg, #1C8FDC, #E5DF24, #1C8FDC)"}}>
//                     <TableRow>
//                         <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Nom</TableCell>
//                         <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Type</TableCell>
//                         <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Date de création</TableCell>
//                         <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Dernière modification</TableCell>
//                         <TableCell align="center" style={{width: "5 rem", color: "white"}}>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {
//                         this.state.adsData === "No offer" ?
//                             <h2 style={{textAlign: "center"}}>Aucune offre créé</h2>
//                             :
//                             this.state.adsData.map(ad => (
//                                 <TableRow style={{height: "2 rem"}}>
//                                     <TableCell align="center" style={{width: "5 rem"}}>{ad.productName}</TableCell>
//                                     <TableCell align="center" style={{width: "5 rem"}}>{ad.productSubject}</TableCell>
//                                     <TableCell align="center" style={{width: "5 rem"}}>{new Date(ad.createdAt).toLocaleDateString()}</TableCell>
//                                     <TableCell align="center" style={{width: "5 rem"}}>{new Date(ad.updatedAt).toLocaleDateString()}</TableCell>
//                                     <TableCell align="center" style={{width: "5 rem"}}>
//                                         {/*<Fab color="primary" aria-label="add" style={{margin: "5px"}}
//                                              onClick={() => this.handleVisibleModal(ad, "contact")}><ContactMailIcon/></Fab>*/}
//                                         <Fab color="secondary" aria-label="edit" style={{margin: "5px"}}
//                                              onClick={() => this.handleVisibleModal(ad, "edit")}><EditIcon/></Fab>
//                                         <Fab aria-label="delete" style={{margin: "5px"}}
//                                              onClick={() => this.handleVisibleModal(ad, "delete")}><DeleteIcon/></Fab>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                     }
//                 </TableBody>
//             </Table>
//             :
//             <Loader
//                 type="Triangle"
//                 color="#292929"
//                 height={200}
//                 width={200}
//                 style={{marginTop: "14rem"}}
//             />
//     }
// </Grid>
