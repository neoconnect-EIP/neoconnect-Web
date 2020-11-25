import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarIcon from '@material-ui/icons/Star';
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
        };
    }

    getOffer = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/list`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => res.json())
          .then(res => {
            this.setState({adsSaver: res, loadOffer: false, adsData: res.sort((a, b) => {
              if (typeof a.productName === 'string' && typeof b.productName === 'string'){
                if (a.productName.length && b.productName.length){
                  if (a.productName[0] > b.productName[0]) return 1
                  else if (a.productName[0] < b.productName[0]) return -1
                  else return 0
                }else return 0
              }else return 0
            })});
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
        this.getOffer();
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
            this.getOffer();
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
      document.getElementsByClassName('active')[0].classList.remove('active')
      el.classList.add('active')
      this.setState({sort: filterText})
      if (filterText === 'Marque') {
        this.setState({adsData: this.state.adsData.sort((a, b) => {
          if (typeof a.brand === 'string' && typeof b.brand === 'string'){
            if (a.brand.length && b.brand.length){
              if (a.brand[0] > b.brand[0]) return 1
              else if (a.brand[0] < b.brand[0]) return -1
              else return 0
            }else return 0
          }else return 0
        })})
      }else if (filterText === 'Order (ASC)') {
        this.setState({adsData: this.state.adsData.sort((a, b) => {
          if (typeof a.productName === 'string' && typeof b.productName === 'string'){
            if (a.productName.length && b.productName.length){
              if (a.productName[0] > b.productName[0]) return 1
              else if (a.productName[0] < b.productName[0]) return -1
              else return 0
            }else return 0
          }else return 0
        })})
      }else if (filterText === 'Order (DESC)') {
        this.setState({adsData: this.state.adsData.sort((a, b) => {
          if (typeof a.productName === 'string' && typeof b.productName === 'string'){
            if (a.productName.length && b.productName.length){
              if (a.productName[0] > b.productName[0]) return 1
              else if (a.productName[0] < b.productName[0]) return -1
              else return 0
            }else return 0
          }else return 0
        }).reverse()})
      }
    }

    handleCard = (item) => {
        return (
          <Col className="mb-3" key={item.id}>
            <Card className="mt-4 ml-2 pointerClick" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
              <Card.Img style={{height: '190px', objectFit: 'cover'}} className="card" onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData}  alt="MISSING JPG"/>
              <Card.Body>
                <Card.Title>{`${item.productType ? item.productType : ""} ${item.productName ? item.productName : "Sans nom"}`}</Card.Title>
                <Row className="ml-1">
                  {
                    item.status ?
                    <Button variant="outline-secondary" className="mr-auto" onClick={() => {this.handleDelete(item.id)}}>Annuler</Button>
                    :
                    <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleOpen(item)}}>Postuler</Button>
                  }
                  <p>{item.average ? item.average.toFixed(1) + '/5' : "Aucune note"}</p>
                  {item.average && <StarIcon style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold", marginLeft: '10px'}}/>}
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
          this.getOffer();
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
              <DropdownButton
                disabled={this.state.loadSugg || this.state.loadOffer}
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Sort by"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item onClick={this.handleSort} href="#">Marque</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.handleSort} href="#" className="active">Order (ASC)</Dropdown.Item>
                <Dropdown.Item onClick={this.handleSort} href="#">Order (DESC)</Dropdown.Item>
              </DropdownButton>
              <FormControl
                placeholder="Search"
                aria-label="Enter your keyword"
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
                    (this.state.adsData && this.state.adsData.length > 0) ? this.state.adsData.map(item => this.handleCard(item)) :
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
