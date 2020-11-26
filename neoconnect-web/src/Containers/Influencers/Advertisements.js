import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import noImages from "../../assets/noImages.jpg";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { showNotif } from '../Utils.js';

class Advertisements extends React.Component{
    constructor(props) {
        super(props);
        localStorage.setItem('menuId', 3);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            visible: false,
            actualId: null,
            adsData: null,
            adsSaver: null,
            item: null,
            searchForm: "",
            sort: 'Order (ASC)',
            popular: null,
            bestMark: null,
            tendance: null,
            suggestions: null,
            loadOffer: true,
            loadSugg: true,
            filter: [],
            theme: ''
        };
    }

    getOffer = (filter) => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/list?${filter ? filter : 'popularity=desc'}`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => res.json())
          .then(res => {
            this.setState({adsData: res, adsSaver: res, loadOffer: false})
          })
          .catch(error => {
            showNotif(true, "Erreur",null);
            this.setState({loadOffer: false});
          });
    }

    getSuggestions() {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/suggestion/`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status === 200)
              return (res.json());
            this.setState({loadSugg: false});
          })
          .then(res => {
            if (typeof(res) == 'object')
              this.setState({suggestions: res, loadSugg: false});
            else {
              this.setState({loadSugg: false});
            }
          })
          .catch(error => {
            showNotif(true, "Erreur", null);
            this.setState({loadSugg: false});
          });
    }

    componentDidMount = () => {
      if (localStorage.getItem("Jwt")) {
        this.getOffer(null);
        this.getSuggestions();
      }
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push({pathname: `/dashboard/item/${id}`});
    }

    handleModal = (item) => {
        this.setState({visible: true})
    }

    handleAnnonceSubsribe = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${this.state.item.id}`,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => {
            if (res.status === 200)
              return (res.json());
          })
          .then(res => {
            this.getOffer(null);
            this.getSuggestions();
            showNotif(false, "Réussi", "Vous avez bien postulé à l'annonce");
          })
          .catch(error => {
            showNotif(true, "Erreur", null);
          });
        this.handleClose();
    }

    handleClose = () => {
      this.setState({visible: false})
    }

    handleOpen = (item) => {
      this.setState({visible: true, item: item})
    }

    handleSearchBarChange = event => {
      this.setState({searchForm: event.target.value})
      if (!event.target.value.length){
        this.setState({adsData: this.state.adsSaver})
      }else{
        this.handleSearch()
      }
    }

    handleSearch = () => {
      const kwd = this.state.searchForm
      let adsData = this.state.adsSaver
      this.setState({adsData: null})

      if (adsData) {
        adsData = adsData.filter(val => {
          let searchFactor = 0
          if(
            (val.productDesc && val.productDesc.toLowerCase().includes(kwd)) ||
            (val.productName && val.productName.toLowerCase().includes(kwd))) searchFactor++
            if (val.brand){
              if (val.brand.toLowerCase().includes(kwd)) searchFactor++
            }
            if (val.color){
              if (val.color.toLowerCase().includes(kwd)) searchFactor++
            }
            val.comment.forEach(comment => {
              if (
                comment.comment.toLowerCase().includes(kwd) ||
                comment.pseudo.toLowerCase().includes(kwd)
              ) searchFactor++
            })
            if (searchFactor) return val
            else return false
        });
        this.setState({adsData: adsData});
      }
    }

    handleSort = (event) => {
      const el = event.target
      const filterText = el.innerText
      if (document.getElementsByClassName('active').length > 0)
        document.getElementsByClassName('active')[0].classList.remove('active');
      el.classList.add('active')
      this.setState({sort: filterText})
      if (filterText === 'Homme') {
        this.getOffer('productSex=Homme');
      }else if (filterText === "Femme") {
        this.getOffer('productSex=Femme');
      }else if (filterText === "Unisexe") {
        this.getOffer('productSex=Unisexe');
      }else if (filterText === "Date d'ajout croissant") {
        this.getOffer('order=asc');
      }else if (filterText === "Popularité") {
        this.getOffer(null);
      }else if (filterText === "Date d'ajout décroissant") {
        this.getOffer('order=desc');
      }
    }

    handleCard = (item) => {
        return (
          <Col className="mb-3" key={item.id}>
            <Card className="mt-4 ml-2 pointerClick" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
              <Card.Img style={{height: '190px', objectFit: 'cover'}} className="card" onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData}  alt="MISSING JPG"/>
              <Card.Body>
                <Row className="mx-1">
                  <h5 className="mr-auto">{`${item.productType ? item.productType : ""} ${item.productName ? item.productName : "Sans nom"}`}</h5>
                  <p className="ml-auto">{item.brand}</p>
                </Row>
                <Row className="mx-1">
                  <p className="mr-auto">{item.productSubject}</p>
                  <p className="ml-auto" style={{fontWeight: '300'}}>{new Date(item.updatedAt).toLocaleDateString('fr-FR', {dateStyle: 'short'}) + ' ' + new Date(item.updatedAt).toLocaleTimeString('fr-FR', {timeStyle: 'short'})}</p>
                </Row>
                <Row className="ml-1">
                  {
                    !item.status && <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleOpen(item)}}>Postuler</Button>
                  }
                  {
                    item.status && item.status === "pending" && <Button variant="outline-secondary" className="mr-auto" onClick={() => {this.handleDelete(item.id)}}>Annuler</Button>

                  }
                  {
                      item.status && item.status === "refused" &&
                      <p>Demande refusé</p>
                  }
                  {
                      item.status && item.status === "accepted" &&
                      <p>Demande accepté</p>
                  }
                </Row>
              </Card.Body>
            </Card>
          </Col>
        );
    }

    handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          if (res.status === 200)
            return (res.json());
        })
        .then(res => {
          this.getOffer(null);
          this.getSuggestions();
          showNotif(false, "Réussi", "l'annulation est bien prise en compte");
        })
        .catch(error => {
          showNotif(true, "Erreur", null);
        });
    };

    render() {
      return (
          <div justify="center" className="infBg"  >
            <Navbar expand="lg" className="mb-4" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
              <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Liste des offres</Navbar.Brand>
            </Navbar>
            <InputGroup className="mb-3" style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: "1rem" }}>
              {(this.state.theme === "Mode" || this.state.theme === "Cosmétique") ?
                <DropdownButton
                  disabled={this.state.loadSugg || this.state.loadOffer}
                  as={InputGroup.Prepend}
                  variant="outline-light"
                  title="Trier"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item onClick={this.handleSort}>Homme</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleSort}>Femme</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleSort}>Unisexe</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleSort} active={true} href="#">Popularité</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.handleSort}>Date d'ajout croissant</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleSort}>Date d'ajout décroissant</Dropdown.Item>
                </DropdownButton> :
                <DropdownButton
                  disabled={this.state.loadSugg || this.state.loadOffer}
                  as={InputGroup.Prepend}
                  variant="outline-light"
                  title="Trier"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item onClick={this.handleSort} active={true} href="#">Popularité</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.handleSort}>Date d'ajout croissant</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleSort}>Date d'ajout décroissant</Dropdown.Item>
                </DropdownButton>
              }
              <FormControl
                placeholder="Rechercher"
                aria-describedby="basic-addon2"
                value={this.state.searchForm}
                onChange={this.handleSearchBarChange}
              />
            </InputGroup>
            {
              (this.state.loadSugg || this.state.loadOffer) ?
              <Loader
                  type="Triangle"
                  color="#fff"
                  height={200}
                  width={200}
                  style={{marginTop: "2rem", marginLeft: '40%'}}
              />
            :
            <div>
              <div className="pl-4 ml-3">
                <Badge pill className="pointerClick" style={{backgroundColor: this.state.theme === 'Mode' ? '#4AA1B1' : '#6C757D', color: 'white'}} onClick={() => {this.setState({theme: this.state.theme !== 'Mode' ? 'Mode' : ''})}}>
                  Mode
                </Badge>{' '}
                <Badge pill className="pointerClick" style={{backgroundColor: this.state.theme === 'Jeux Vidéo' ? '#4AA1B1' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'Jeux Vidéo' ? 'Jeux Vidéo' : ''})}}>
                  Jeux vidéo
                </Badge>{' '}
                <Badge pill className="pointerClick" style={{backgroundColor: this.state.theme === 'High tech' ? '#4AA1B1' : '#6C757D', color: 'white'}} variant="secondary" onClick={()=> {this.setState({theme: this.state.theme !== 'High tech' ? 'High tech' : ''})}}>
                  High Tech
                </Badge>{' '}
                <Badge pill className="pointerClick" style={{backgroundColor: this.state.theme === 'Nourriture' ? '#4AA1B1' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'Nourriture' ? 'Nourriture' : ''})}}>
                  Nourriture
                </Badge>{' '}
                <Badge pill className="pointerClick" style={{backgroundColor: this.state.theme === 'Cosmétique' ? '#4AA1B1' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'Cosmétique' ? 'Cosmétique' : ''})}}>
                  Cosmétique
                </Badge>{' '}
                <Badge pill className="pointerClick" style={{backgroundColor: this.state.theme === 'Sport/Fitness' ? '#4AA1B1' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'Sport/Fitness' ? 'Sport/Fitness' : ''})}}>
                  Sport
                </Badge>{' '}
              </div>
              <Row className="pl-4 mt-4 mr-0 ml-0">
                <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Suggestion d'offre</h4>
              </Row>
              <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                {
                    this.state.suggestions ? this.state.suggestions.map(item => this.handleCard(item)) :
                    <p className="ml-4 mt-2 text-light">Aucune suggestion pour le moment</p>
                }
              </Row>
              <Row className="pl-4 mt-4 mr-0 ml-0">
                <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Tout les offres</h4>
              </Row>
              <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={4}>
                {
                    (this.state.adsData && this.state.adsData.length > 0) ?
                    this.state.adsData.filter((item) => (item.productSubject === this.state.theme) || (item.productSubject === this.state.theme) ||
                                                          (item.productSubject === this.state.theme) || (item.productSubject === this.state.theme) ||
                                                          (item.productSubject === this.state.theme) || (item.productSubject === this.state.theme) ||
                                                          (!this.state.theme)).map(offer => this.handleCard(offer)) :
                    <p className="ml-4 mt-2 text-light">Aucune offre pour le moment</p>
                }
              </Row>
            </div>
            }
            <Modal centered show={this.state.visible} onHide={this.handleClose}>
             <Modal.Header closeButton>
               <Modal.Title>Postuler à cette offre ?</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               {
                 (this.state.item && this.state.item.productName) ? this.state.item.productName : "Sans nom"
               }
             </Modal.Body>
             <Modal.Footer>
               <Button className="btnCancel" onClick={this.handleClose}>
                 Annuler
               </Button>
               <Button className="btnInf" onClick={this.handleAnnonceSubsribe}>
                 Postuler
               </Button>
             </Modal.Footer>
           </Modal>
        </div>
      );
    }
}

export default withRouter(Advertisements)
