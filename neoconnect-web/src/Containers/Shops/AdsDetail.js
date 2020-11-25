import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import LoadingOverlay from 'react-loading-overlay';
import { showNotif } from '../Utils.js';
import { displayComment } from '../../Components/Utils.js';
import Loader from 'react-loader-spinner';

class adsDetail extends React.Component{
    constructor(props) {
        super(props);

        console.log("HELLO");
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            visible: false,
            adData: null,
            isActive: true,
            urlId: localStorage.getItem("Jwt") ? parseInt(this.props.match.params.id) : 0,
        };
    }

    getDetailOffer = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${this.state.urlId}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {return (res.json())})
          .then(res => this.setState({adData: res, isActive: false}))
          .catch(error => {showNotif(true, "Erreur",null); this.setState({isActive: false});});
    }

    componentDidMount = () => {
      if (localStorage.getItem("Jwt"))
        this.getDetailOffer();
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

  displayImage = (item, id) => {
    return (
      <Carousel.Item key={id} style={{maxHeight: '400px'}}>
        <img
          style={{objectFit: "contain", maxHeight: '350px'}}
          className="d-block"
          src={item.imageData}
          alt="product img"
        />
      </Carousel.Item>
    )
  }

  handleDelete = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/${this.state.urlId}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {if (res.status === 200) this.props.history.push('/shop-dashboard/ads')})
      .catch(error => showNotif(true, "Erreur",null));
  };


    render() {
        return (
          <LoadingOverlay
            active={this.state.isActive}
            spinner
            text='Chargement...'
            >
            <div justify="center" className="shopBg">
                {
                  this.state.adData ?
                  <>
                  <Row className="p-4 mx-0">
                    <Col md={6}>
                      <Carousel controls={true} style={{height: '400px'}}>
                        {
                          this.state.adData.productImg ?
                          this.state.adData.productImg.map((item, id) => this.displayImage(item, id)) :
                          <p>No image</p>
                        }
                      </Carousel>
                    </Col>
                    <Col md={6}>
                      <h6 style={{color: 'white'}}>{this.state.adData.productType}</h6>
                        <div style={{ textAlign:'left'}}>
                          <h3 style={{marginTop: "1rem", color: 'white', fontWeight: '300', display: "inline"}}>{this.state.adData.productName ? this.state.adData.productName : "Sans nom"}</h3>
                        </div>
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{`${this.state.adData.productDesc ? this.state.adData.productDesc : ""}`}</h5>
                        {
                          (this.state.adData.productSubject === 'Mode' || this.state.adData.productSubject === 'Cosmétique') &&
                          <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{ this.state.adData.productSex}</h5>
                        }
                        <h5 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>{this.state.adData.productSubject}</h5>
                        <Row className="m-0 p-0">
                          <h4 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>Note: {this.state.adData.average ? (this.state.adData.average.toFixed(1) + '/5') : "Aucune note"}</h4>
                        </Row>
                        <h4 style={{marginTop: "1rem", color: 'white', fontWeight: '300'}}>Créé le {new Date(this.state.adData.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                        <Button onClick={() => {this.props.history.push(`/shop-dashboard/edit-ad?id=${this.state.urlId}`)}} className="btnShop mt-2">Modifier</Button>
                        <Button onClick={() => {this.setState({visible: true})}} className="btnDelete mt-2 ml-2">Supprimer</Button>
                    </Col>
                  </Row>
                  <Row className=" pb-4 mx-0">
                    <Col md={8} className="mt-4">
                      <h2 style={{fontWeight: '300', color: 'white'}} className="ml-4" >Avis</h2>
                      {
                        (this.state.adData && this.state.adData.comment && this.state.adData.comment.length > 0) ? this.state.adData.comment.map(x => displayComment(x)) :
                        <p className="ml-4 mt-2 text-light">Aucun avis pour le moment</p>
                      }
                    </Col>
                  </Row>
                </> :
                <Loader
                    type="Triangle"
                    color="white"
                    height={200}
                    width={200}
                    style={{paddingTop: "14rem", marginLeft: '40%'}}

                />
                }
            </div>
            <Modal centered show={this.state.visible} onHide={() => { this.setState({visible: false})}}>
              <Modal.Header closeButton>
                <Modal.Title>Suppression d'offre</Modal.Title>
              </Modal.Header>
              <Modal.Body>Êtes-vous sur de vouloir supprimer votre offre ?</Modal.Body>
              <Modal.Footer>
                <Button className="btnCancel" onClick={() => { this.setState({visible: false})}}>
                  Non
                </Button>
                <Button className="btnDelete" onClick={this.handleDelete}>
                  Oui
                </Button>
              </Modal.Footer>
            </Modal>
          </LoadingOverlay>
        );
    }
}

export default withRouter(adsDetail);
