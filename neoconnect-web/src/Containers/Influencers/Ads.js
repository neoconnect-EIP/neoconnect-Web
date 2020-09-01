import React from 'react';
import { withRouter } from "react-router-dom"
import {TableBody, TableCell, TableHead, TableRow, Grid, Fab, Modal, TextField, Slide} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import "../../index.css"
import Loader from "react-loader-spinner";
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';

// adsData: [{productName: "Nike Blazer", productSubject: 1, createdAt: "2020-07-16T08:25:25.985Z"}],  //TODO en attendant que la requete marche j'ai mis des data en dur


class Ads extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") == "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            adsData: [],
            visible: false,
            actualAd: null,
            message: "",
            isLoading: true,
            modalMode: "",
            type:['', 'Mode', 'Cosmetique', 'Technologie', 'Nourriture', 'Jeux video', 'Sport/Fitness']
        };

    }

    getAplliedOffer = () => {
      if (localStorage.getItem("Jwt")) {

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/offer/applied/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {
              if (res.status >= 400)
                throw res;
              return res.json()
            })
            .then(res => this.setState({adsData: res, isLoading: false}))
            .catch(error => {
              this.setState({isLoading: false});
              store.addNotification({
                title: "Erreur, Veuillez essayer ultérieurement",
                message: error.statusText,
                type: "danger",
                insert: "top",
                container: "top-right",
                pauseOnHover: true,
                isMobile: true,
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 7000,
                  onScreen: true,
                  showIcon: true
                }
              });
            });
      }

    }

    componentDidMount = () => {
        this.getAplliedOffer();
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
      var thisTmp = this;
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {
              res.json();
              if (res.status == 200) {
                thisTmp.getAplliedOffer();
              }
            })
            .catch(error => console.error('Error:', error));
    };

    listAbonnement = () => {
      console.log("List = ", this.state.adsData);
      if (this.state.adsData && this.state.adsData.length > 0)
        return (
          this.state.adsData.map(ad => (
            <tr key={ad.idOffer}>
              <td>{ad.productName}</td>
              <td>{this.state.type[ad.productSubject]}</td>
              <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
              <td>{ad.status == "pending" ? "En attente" : (ad.status == "refused" ? "Refusé" : "Accepté")}</td>
              <td>
                <Button className="btnInf" onClick={() => {this.handleDelete(ad.idOffer)}}>Désabonner</Button>{' '}
                <Button className="btnInf" onClick={() => {this.props.history.push(`/dashboard/item?id=${ad.idOffer}`)}}>Détail</Button>
              </td>
            </tr>
          ))
        )
    }

    render() {

        return (
            <div className="infBg"  >
                <Navbar expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Offre postulé</Navbar.Brand>
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

                            <Table className="mt-4 ml-4 table " style={{color: 'white'}}>
                              <thead>
                                <tr>
                                  <th>Nom</th>
                                  <th>Type</th>
                                  <th>Date d'abonnement</th>
                                  <th>Status</th>
                                  <th>Actions</th>
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
