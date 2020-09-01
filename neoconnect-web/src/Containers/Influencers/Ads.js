import React from 'react';
import { withRouter } from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import "../../index.css"
import Loader from "react-loader-spinner";
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';

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
            type:['', 'Mode', 'Cosmetique', 'Technologie', 'Nourriture', 'Jeux video', 'Sport/Fitness'],
            fb: "",
            ig: "",
            twitter: "",
            snap: "",
            youtube: "",
            twitch: "",
            pinterest: "",
            tiktok: "",
            shareId: null
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
                <Button className="btnInf" onClick={() => {this.props.history.push(`/dashboard/item?id=${ad.idOffer}`)}}>Détail</Button>{' '}
                <Button className="btnInf" onClick={() => {this.setState({visible: true, shareId: ad.idOffer})}}>Confirmer</Button>
              </td>
            </tr>
          ))
        )
    }

    handleShareRes = async (res) => {
      console.log(res);
      if (res.status != 200) {
        var msg = await res.json();
        store.addNotification({
          title: "Erreur",
          message: msg,
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
      }
      else {
        store.addNotification({
          title: "Envoyé",
          message: "Un email avec les lien de publications a été envoyé au boutique",
          type: "success",
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
        this.setState({visible: false})
      }
    }

    handleSendShare = () => {
      let body = {
          "facebook": this.state.fb,
          "instagram": this.state.ig,
          "youtube": this.state.youtube,
          "pinterest": this.state.pinterest,
          "twitch": this.state.twitch,
          "twitter": this.state.twitter,
          "tiktok": this.state.tiktok,
          "snapchat": this.state.snapchat
      };
      body = JSON.stringify(body);

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/sharePublication/${this.state.shareId}`,
        {
          method: 'POST',
          body: body,
          headers: {'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => this.handleShareRes(res))
        .catch(error => console.error('Error:', error));

    }

    render() {

        return (
            <div className="infBg">
              <Modal centered show={this.state.visible} onHide={() => {this.setState({visible: false})}}>
               <Modal.Header closeButton>
                 <Modal.Title>Liens de publication du produit concerné</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 <Form>
                   <Form.Row>
                    <Form.Group as={Col} controlId="formFb">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control value={this.state.fb} onChange={(e) => {this.setState({fb: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formIg">
                      <Form.Label>Instagram</Form.Label>
                      <Form.Control value={this.state.ig} onChange={(e) => {this.setState({ig: e.target.value})}}/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group  as={Col} controlId="formBasicSnap">
                      <Form.Label>Snapchat</Form.Label>
                      <Form.Control value={this.state.snap} onChange={(e) => {this.setState({snap: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group  as={Col} controlId="formBasicYoutube">
                      <Form.Label>Youtube</Form.Label>
                      <Form.Control value={this.state.youtube} onChange={(e) => {this.setState({youtube: e.target.value})}}/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}  controlId="formBasicTwitter">
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control value={this.state.twitter} onChange={(e) => {this.setState({twitter: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group as={Col}  controlId="formBasicTwitch">
                      <Form.Label>Twitch</Form.Label>
                      <Form.Control value={this.state.twitch} onChange={(e) => {this.setState({twitch: e.target.value})}}/>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formBasicPinterest">
                      <Form.Label>Pinterest</Form.Label>
                      <Form.Control value={this.state.pinterest} onChange={(e) => {this.setState({pinterest: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicTikTok">
                      <Form.Label>Tiktok</Form.Label>
                      <Form.Control value={this.state.tiktok} onChange={(e) => {this.setState({tiktok: e.target.value})}}/>
                    </Form.Group>
                  </Form.Row>
                </Form>
               </Modal.Body>
               <Modal.Footer>
                 <Button className="btnCancel" onClick={() => {this.setState({visible: false})}}>
                   Annuler
                 </Button>
                 <Button className="btnInf" onClick={() => {this.handleSendShare()}}>
                   Envoyer
                 </Button>
               </Modal.Footer>
              </Modal>
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
