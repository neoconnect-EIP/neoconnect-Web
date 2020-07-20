import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import {Grid}from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarIcon from '@material-ui/icons/Star';
import noImages from "../../assets/noImages.jpg"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { store } from 'react-notifications-component';

class Advertisements extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            actualId: null,
            adsData: null,
            adsSaver: null,
            item: null,
            searchForm: null,
            sort: 'Order (ASC)'
        };

        console.log("TOEKN ", localStorage.getItem("Jwt"));
    }

    componentDidMount = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/list`, { method: 'GET', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => res.json())
            .then(res => {
              this.setState({adsSaver: res, adsData: res.sort((a, b) => {
                if (typeof a.productName == 'string' && typeof b.productName == 'string'){
                  if (a.productName.length && b.productName.length){
                    if (a.productName[0] > b.productName[0]) return 1
                    else if (a.productName[0] < b.productName[0]) return -1
                    else return 0
                  }else return 0
                }else return 0
              })})
              this.setState({adsData: res, adsSaver: res})

            })
            .catch(error => console.error('Error:', error));
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push(`/dashboard/item?id=${id}`)
    }

    handleModal = (item) => {
        this.setState({visible: true})
    }

    handleAnnonceSubsribe = () => {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/apply/${this.state.item.id}`, { method: 'PUT', headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => {
              if (res.status == 200) {
                this.setState({visible: false});
                store.addNotification({
                  title: "Abonné",
                  message: "Nous avons bien pris en compte votre abonnement",
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
              }
              else {
                store.addNotification({
                  title: "Erreur",
                  message: "Un erreur s'est produit lors de l'abonnement. Veuillez essayer ultérieurement.",
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
              console.log("start res: ", res);

            })
            .catch(error => console.error('Error:', error));
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
      // fetch(`http://http://168.63.65.106:8080/offer/list`)
      let adsData = this.state.adsSaver
      this.setState({adsData: null})

      adsData = adsData.filter(val => {
        let searchFactor = 0
        if(
          val.productDesc.toLowerCase().includes(kwd) ||
          val.productName.toLowerCase().includes(kwd) ||
          val.productSex.toLowerCase().includes(kwd) ||
          val.productSubject.toLowerCase().includes(kwd)
          ) searchFactor++
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
      })

      this.setState({adsData: adsData})

    }
    handleSort = (event) => {
      const el = event.target
      const filterText = el.innerText
      document.getElementsByClassName('active')[0].classList.remove('active')
      el.classList.add('active')
      this.setState({sort: filterText})
      if (filterText == 'Marque') {
        this.setState({adsData: this.state.adsData.sort((a, b) => {
          if (typeof a.brand == 'string' && typeof b.brand == 'string'){
            if (a.brand.length && b.brand.length){
              if (a.brand[0] > b.brand[0]) return 1
              else if (a.brand[0] < b.brand[0]) return -1
              else return 0
            }else return 0
          }else return 0
        })})
      }else if (filterText == 'Couleur') {
        this.setState({adsData: this.state.adsData.sort((a, b) => {
          if (typeof a.color == 'string' && typeof b.color == 'string'){
            if (a.color.length && b.color.length){
              if (a.color[0] > b.color[0]) return 1
              else if (a.color[0] < b.color[0]) return -1
              else return 0
            }else return 0
          }else return 0
        })})
      }else if (filterText == 'Order (ASC)') {
        this.setState({adsData: this.state.adsData.sort((a, b) => {
          if (typeof a.productName == 'string' && typeof b.productName == 'string'){
            if (a.productName.length && b.productName.length){
              if (a.productName[0] > b.productName[0]) return 1
              else if (a.productName[0] < b.productName[0]) return -1
              else return 0
            }else return 0
          }else return 0
        })})
      }else if (filterText == 'Order (DESC)') {
        this.setState({adsData: this.state.adsData.sort((a, b) => {
          if (typeof a.productName == 'string' && typeof b.productName == 'string'){
            if (a.productName.length && b.productName.length){
              if (a.productName[0] > b.productName[0]) return 1
              else if (a.productName[0] < b.productName[0]) return -1
              else return 0
            }else return 0
          }else return 0
        }).reverse()})
      }
      // document.getElementsByClassName('active').classList.remove('active')

    }
    handleCard = (item) => {
      console.log("item = ", item);
        return (
            <div key={item.id}>
                <Card className="mt-4 ml-2 report" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                  <Card.Img className="card" onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData}  alt="MISSING JPG"/>
                  <Card.Body>
                    <Card.Title>{`${item.productType ? item.productType : ""} ${item.brand ? item.brand : "Sans marque"}`}</Card.Title>
                    <Card.Text>
                      {`${item.productColor ? item.productColor : ""}`}
                    </Card.Text>
                    <Row className="ml-1">
                      <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleOpen(item)}}>S'abonner</Button>
                      <h6>{item.average ? item.average.toFixed(1) : "0"}/5</h6>
                      <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                    </Row>
                  </Card.Body>
                </Card>
            </div>
        );
    }

    render() {
        console.log("adsData: ", this.state.adsData);
        return (
            <div justify="center" className="infBg"  >
              <Navbar expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Liste des annonces</Navbar.Brand>
              </Navbar>
              <InputGroup className="mb-3" style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: "1rem" }}>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Sort by"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item onClick={this.handleSort} href="#">Marque</Dropdown.Item>
                <Dropdown.Item onClick={this.handleSort} href="#">Couleur</Dropdown.Item>
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
                {/* <InputGroup.Append>
                  <Button
                  variant="outline-success"
                  onClick={() => this.handleSearch()}>Search</Button>
                </InputGroup.Append> */}
              </InputGroup>
                {
                    this.state.adsData ?
                      <CardColumns className="pl-2">
                            {

                                this.state.adsData.map(item => this.handleCard(item))
                            }
                        </CardColumns>
                        :
                        <Loader
                            type="Triangle"
                            color="#292929"
                            height={200}
                            width={200}
                            style={{marginTop: "14rem"}}
                        />
                }
                <Modal centered show={this.state.visible} onHide={this.handleClose}>
                 <Modal.Header closeButton>
                   <Modal.Title>S'abonner à cette annonce ?</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                   {
                     (this.state.item && this.state.item.productBrand) ? this.state.item.productBrand : "Sans marque"
                   }
                 </Modal.Body>
                 <Modal.Footer>
                   <Button variant="secondary" onClick={this.handleClose}>
                     Annuler
                   </Button>
                   <Button variant="success" onClick={this.handleAnnonceSubsribe}>
                     S'abonner
                   </Button>
                 </Modal.Footer>
               </Modal>
            </div>
        );
    }
}

export default withRouter(Advertisements)

// <Card style={{height: "auto", boxShadow: "#807e7e 8px 8px 20px -4px", margin: "50px", borderRadius: "6px", backgroundColor: "#292929"}}>
//     <CardActionArea onClick={() => this.handleGlobalAnnonce(item.id)}>
//         <CardMedia>
//             <img src={item.productImg === null || item.productImg.length === 0 ? noImages : item.productImg[0].imageData} style={{width: "100%", height: "500px"}} alt="MISSING JPG"/>
//         </CardMedia>
//     </CardActionArea>
//     <CardContent style={{width: "100%", height: "100px"}}>
//         <h6 style={{color: "#fff"}}>{`${item.productType ? item.productType : ""} ${item.productBrand ? item.productBrand : "Sans marque"}`}</h6>
//         <h6 style={{color: "#fff", marginTop: "2rem"}}>{`${item.productColor ? item.productColor : ""}`}</h6>
//     </CardContent>
//     <CardActions style={{justifyContent: "center"}}>
//         <Button onClick={() => this.handleModal(item.id)} style={{width: "9.375rem", height: "2.6rem", fontSize: "1.2rem", marginBottom: "0.5rem", marginLeft: "5rem", borderRadius: "10px", backgroundColor: "transparent", border: "1px solid white"}}>S'abonner</Button>
//         <h6 style={{marginLeft: "3rem", marginBottom: "10px", color: "#fff"}}>{item.average ? item.average.toFixed(1) : "0"}/5</h6>
//         <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
//     </CardActions>
// </Card>

// <Modal
//     open={this.state.visible && item.id === this.state.actualId}
//     onClose={() => this.handleModal(0)}
// >
//     <Slide direction="down" in={this.state.visible} mountOnEnter unmountOnExit>
//         <div style={{width: "400px", height: "auto", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center", borderRadius: "12px"}}>
//             <div style={{marginRight: "1.5rem", marginLeft: "1.5rem", backgroundColor: "#292929", borderRadius: "10px"}}>
//                 <h3 style={{color: "white"}}>S'abonner à cette annonce ?</h3>
//             </div>
//             <h4 style={{marginBottom: "30px", color: "black"}}>{item.productBrand ? item.productBrand : "Sans marque"}</h4>
//             <Button style={{backgroundColor: "#292929", fontSize: "1.3rem", borderRadius: "10px", boxShadow: "0 0 10px", marginBottom: "1rem", marginLeft: "1.5rem"}} onClick={() => this.handleModal(0)}>Annuler</Button>
//             <Button style={{backgroundColor: "#292929", fontSize: "1.3rem", borderRadius: "10px", boxShadow: "0 0 10px", marginBottom: "1rem", marginLeft: "1.5rem"}} onClick={() => this.handleAnnonceSubsribe(item)}>S'abonner</Button>
//         </div>
//     </Slide>
// </Modal>
