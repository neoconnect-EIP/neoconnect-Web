import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import StarIcon from '@material-ui/icons/Star';
import noShop from "../../assets/noImageFindInf.jpg"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { showNotif } from '../Utils.js';
import { displayLoad } from '../../Components/Utils.js';

class FindShop extends React.Component{
  constructor(props) {
    super(props);
    localStorage.setItem('menuId', 4);
    if (!localStorage.getItem("Jwt"))
    this.props.history.push('/landing-page/login');
    if (localStorage.getItem("userType") === "shop")
    this.props.history.push('/page-not-found');
    this.state = {
      shopList: [],
      search: "",
      show: false,
      back: false,
      tmpSearch: "",
      popular: null,
      bestMark: null,
      tendance: null,
      visible: false,
      item: null,
      suggestions: [],
      loadShop: true,
      loadSugg: true,
      filter: [],
      theme: ''
    };
  }

  getAllShop = () => {
    fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/listShop`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {
        if (res.status === 200)
        return (res.json());
        this.setState({loadShop: false});
      })
      .then(res => this.setState({shopList: res, loadShop: false}))
      .catch(error => {
        showNotif(true, "Erreur",null);
        this.setState({loadShop: false});
      });
    }

    getSuggestions() {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/suggestion/`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
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

    componentDidMount() {
      this.getAllShop();
      this.getSuggestions();
    }

    searchRes = async (res) => {
      if (res.status === 200){
        var shops = await res.json();
        this.handleGlobalAnnonce(shops.id);
      }
      else {
        showNotif(true, "Non trouvé", "Aucune marque correspond à " + this.state.search);
      }
    }

    handleSearch = () => {
      var encodedKey = encodeURIComponent("pseudo");
      var encodedValue = encodeURIComponent(this.state.search);
      var formBody = encodedKey + "=" + encodedValue;

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/search`, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        }).then(res => this.searchRes(res))
        .catch(error => showNotif(true, "Erreur",null));
      }

      handleGlobalAnnonce = (item) => {
        this.props.history.push({pathname: `/dashboard/shop/${item.id}`, state: item.follow});
      }

      handleClose = () => {
        this.setState({visible: false})
      }

      handleOpen = (item) => {
        this.setState({visible: true, item: item})
      }

      handleFollow = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/follow/${this.state.item.id}`,
          { method: 'PUT',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
          })
          .then(res => {
            if (res.status === 200) {
              this.getAllShop();
              this.setState({visible: false});
              showNotif(false, "Abonné", "Vous êtes bien abonné");
            }
            else {
              showNotif(true, "Erreur", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
            }
          })
          .catch(error => showNotif(true,  "Erreur",null));
          this.handleClose();
        }

        handleUnfollow = (id) => {
          fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/unfollow/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
          .then(res => {
            if (res.status === 200) {
              this.getAllShop();
              showNotif(false, "Désabonné", "Vous êtes bien désabonné");
            }
            else {
              showNotif(true, "Erreur", "Un erreur s'est produit. Veuillez essayer ultérieurement.");
            }
          })
          .catch(error => showNotif(true,  "Erreur",null));
        }

        handleCard = (item, sugg) => {
          let elem = item;
          if  (sugg === true)
            elem = this.state.shopList.find(elem => elem.id == item.id);
          return (
            <Col className="mb-3" key={item.id}>
              {
                this.state.back && this.state.shopList.length === 1 && <Button variant="outline-dark" className="mt-4 ml-4" onClick={() => {this.setState({back: false, search: "", shopList: []}); this.getAllShop();}}>  <ArrowBackIosIcon style={{marginLeft: "10px"}}/></Button>
            }
            <Card className="mt-4 ml-2 cardlist" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
              <Card.Img className="card" style={{height: '190px', objectFit: 'cover'}}  onClick={() => this.handleGlobalAnnonce(item)} variant="top" src={item.userPicture === null || item.userPicture.length === 0 ? noShop : item.userPicture[0].imageData} alt="MISSING JPG"/>
              <Card.Body>
                <Card.Title>
                  <p className="mr-auto">{` ${item.pseudo ? item.pseudo : "Sans marque"}`}</p>
                </Card.Title>
                <Row className="ml-1">
                  {
                    elem.follow ===  true ?
                    <Button variant="outline-secondary" className="mr-auto" onClick={() => {this.handleUnfollow(item.id)}}>Désabonner</Button> :
                      <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleOpen(item)}}>S'abonner</Button>
                    }
                    <p>{item.average ? item.average.toFixed(1) + '/5' : "Aucune note"}</p>
                    {item.average && <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold", marginLeft: '10px'}}/>}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        }

        render() {
          return (
            <div className="infBg">
              <Navbar expand="lg" className="mb-4" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Trouver une marque</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Exemple: Levis" className="mr-sm-2" value={this.state.search}
                      onChange={e => this.setState({ search: e.target.value })} />
                    <Button variant="outline-success" disabled={this.state.loadShop || this.state.search.length === 0} onClick={() => {this.handleSearch()}}>Rechercher</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
              {
                (this.state.loadSugg || this.state.loadShop) ?
                displayLoad()
                :
                <div>
                  <div className="ml-3">
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
                  <Row className="pl-4 mt-4 mr-0 mx-0">
                    <h4 className="ml-2" style={{color: 'white', fontWeight: '400'}}>Suggestion de marques</h4>
                  </Row>
                  <Row className="mt-3 mx-0" xs={1} md={2} lg={3} sm={2} xl={4}>
                    {
                      (this.state.suggestions && typeof(this.state.suggestions) === 'object' && this.state.suggestions.length > 0) ? this.state.suggestions.map(item => this.handleCard(item, true)) :
                      <p className="ml-4 mt-2 text-light">Aucune suggestion pour le moment</p>

                    }
                  </Row>
                  <Row className="pl-4 mt-4 mr-0 mx-0">
                    <h4 className="ml-2" style={{color: 'white', fontWeight: '400'}}>Tout les marques</h4>
                  </Row>
                  <Row className="mt-3 mx-0" xs={1} md={2} lg={3} sm={2} xl={4}>
                    {
                      (typeof(this.state.shopList) === 'object' && this.state.shopList.length > 0) ?
                      this.state.shopList.filter((item) => (item.theme === this.state.theme) || (item.theme === this.state.theme) ||
                      (item.theme === this.state.theme) || (item.theme === this.state.theme) ||
                      (item.theme === this.state.theme) || (item.theme === this.state.theme) ||
                      (!this.state.theme)).map(shop => this.handleCard(shop, false)) :
                      <p className="ml-4 mt-2 text-light">Aucune marque pour le moment</p>
                    }
                  </Row>
                </div>
              }
              <Modal centered show={this.state.visible} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{"S'abonner à la marque " + (this.state.item ? this.state.item.pseudo : '') + " ?"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {
                    "En vous abonnant à la marque, vous recevrez des emails de leur nouveauté."
                  }
                </Modal.Body>
                <Modal.Footer>
                  <Button className="btnCancel" onClick={this.handleClose}>
                    Annuler
                  </Button>
                  <Button className="btnInf" onClick={this.handleFollow}>
                    S'abonner
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          );
        }
      }

      export default withRouter(FindShop)
