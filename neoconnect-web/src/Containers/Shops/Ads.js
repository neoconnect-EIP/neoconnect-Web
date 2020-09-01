import React from 'react';
import { withRouter } from "react-router-dom"
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import "../../index.css"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { store } from 'react-notifications-component';

class Ads extends React.Component {
    constructor(props) {
        super(props);

        // console.log("JWT ", localStorage.getItem("userId"));
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');
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
            type:['', 'Mode', 'Cosmetique', 'Technologie', 'Nourriture', 'Jeux video', 'Sport/Fitness'],
            errMsg: {
              "Bad Request, please Put idUser, idOffer and status in body": "Veuillez fournir l'idUser, l'idOffer et le status",
              "Bad Request, Only for Shop": "Vous devrez être une boutique pour effectuer cette action",
              "Bad Request, Bad field status": "mauvais type de status",
              "Bad Request, No apply": "L'offre a déjà étais accepté ou refusé ou supprimé.",
              "Bad Request, No authorized": "non authorisé",
            },
        };
    };

    getOffers = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/shop/${localStorage.getItem("userId")}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
          .then(res => {
            if (res.status === 200) {
              return (res.json());
            }
            else {
              throw res;
            }
          })
          .then(res => this.setState({adsData: res}))
          .catch(error => {
            store.addNotification({
              title: "Erreur",
              message: "Erreur provenant du serveur: " + error.statusText,
              type: "danger",
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
          });
    }

    componentDidMount = () => {
        this.getOffers();
    };


    handleVisibleModal = (ad) => {
        this.setState({visible: !this.state.visible, actualAd: ad});
        this.getOffers();
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
            .then(res => {res.json();this.setState({adsData: res})})
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

    handleResponse = async (res, choice, inf) => {
      console.log("RES ", res);
      var msg = await res.json();

      if (res.status === 200) {
        if (choice)
          store.addNotification({
            title: "Envoyé",
            message: "Nous avons pris en compte de votre acceptation. Une notification sera envoyé à " + inf.pseudoUser ,
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
            message: "Nous avons bien pris en compte votre refus. Une notification sera envoyé à " + inf.pseudoUser,
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
      else {
        store.addNotification({
          title: "Erreur",
          message: "Une erreur s'est produite, veuillez essayer ultérieurement: " + this.state.errMsg[msg],
          type: "danger",
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

    }

    acceptDeclineInf = (choice, inf) => {

      var body = {
            'idUser': inf.idUser,
            'idOffer':  inf.idOffer,
            'status': choice
        };

        body = JSON.stringify(body);


      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/choiceApply`, {
          method: 'POST',
          body: body,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      }).then(res => this.handleResponse(res, choice, inf))
        .catch(error => console.error('Error:', error));

    }

    listInf = (ad) => {
        if (ad.infs && ad.infs.length > 0) {
          return (
            ad.infs.map((inf, id) => (
              <tr hidden={ad.show ? false : true} key={id}>
                <td>{inf.pseudoUser}</td>
                <td><Button className="btnShop" onClick={() => {this.props.history.push(`/shop-dashboard/influencer?id=${inf.idUser}`)}}>Voir profil</Button></td>
                <td><Button className="btnInf" onClick={() => {this.acceptDeclineInf(true, inf)}}>Accepter</Button></td>
                <td><Button className="btnInfDelete" onClick={() => {this.acceptDeclineInf(false, inf)}}>Refuser</Button></td>
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

    detailOffer = (ad) => {
      console.log("AD ", ad);
    }

    listOffer = () => {
      if (this.state.adsData) {
        return (
          this.state.adsData.map((ad, id) => (
            <>
            <tr className="report">
              <td onClick={() => {this.detailOffer(ad)}}>{ad.productName}</td>
              <td onClick={() => {this.detailOffer(ad)}}>{this.state.type[ad.productSubject]}</td>
              <td onClick={() => {this.detailOffer(ad)}}>{new Date(ad.createdAt).toLocaleDateString()}</td>
              <td onClick={() => {this.detailOffer(ad)}}>{new Date(ad.updatedAt).toLocaleDateString()}</td>
              <td onClick={() => {this.detailOffer(ad)}}>{ad.average ? ad.productSubject : "Aucune note"}</td>
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

                     var res = await fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${ad.id}`, {
                         method: 'GET',
                         headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
                     })
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
      else {
        return (
          <></>
        );
      }

    }

    render() {
        return (
            <div justify="center" className="shopBg" style={{height: '100vh'}}>
              <Modal centered show={this.state.visible} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sur de vouloir supprimer cette offre ?</Modal.Body>
                <Modal.Footer>
                  <Button className="btnCancel" onClick={this.handleClose}>
                    Non
                  </Button>
                  <Button className="btnInfDelete" onClick={() => this.handleDelete(this.state.actualAd.id)}>
                    Oui
                  </Button>
                </Modal.Footer>
              </Modal>
              <Navbar style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Liste de vos offres</Navbar.Brand>
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
