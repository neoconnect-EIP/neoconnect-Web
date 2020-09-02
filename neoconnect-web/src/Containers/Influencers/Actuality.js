import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import StarIcon from '@material-ui/icons/Star';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg"
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import fire from "../../assets/fire.svg";
import star from "../../assets/star.svg";
import heart from "../../assets/heart.svg";
import noImages from "../../assets/noImages.jpg"

class Actuality extends React.Component{
    constructor(props) {
        super(props);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            show: false,
            back: false,
            popular: null,
            bestMark: null,
            tendance: null,
            popularOffer: null,
            bestMarkOffer: null,
            tendanceOffer: null,
        };

    }

    getAllShop = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/actuality`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {
        return (res.json());
      })
      .then(res => {
        this.setState({popular: res.listShopPopulaire, bestMark: res.listShopTendance, tendance: res.listShopTendance,
        popularOffer: res.listOfferPopulaire, bestMarkOffer: res.listOfferTendance, tendanceOffer: res.listOfferTendance})
      })
    }

    componentDidMount() {
        this.getAllShop();
    }

    handleGlobalShop = (id) => {
        this.props.history.push(`/dashboard/shop?id=${id}`)
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push(`/dashboard/item?id=${id}`)
    }

    handleCard = (item) => {
        return (
              <div key={item.id}>
                <Card className="mt-4 ml-2 cardlist" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                  <Card.Img className="card" onClick={() => this.handleGlobalShop(item.id)} variant="top" src={item.userPicture === null || item.userPicture.length === 0 ? noShop : item.userPicture[0].imageData} alt="MISSING JPG"/>
                  <Card.Body>
                    <Card.Title>
                      <Row>
                        <p className="mr-auto">{` ${item.pseudo ? item.pseudo : "Sans marque"}`}</p>
                        <p style={{marginBottom: "10px", marginLeft: "20px"}}>{item.average ? item.average.toFixed(1) : "0"}/5</p>
                        <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                      </Row>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
        );
    }

    handleCardOffer = (item) => {
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
                      <Button variant="outline-dark" className="mr-auto" onClick={() => {this.handleOpen(item)}}>Postuler</Button>
                      <h6>{item.average ? item.average.toFixed(1) : "0"}/5</h6>
                      <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
                    </Row>
                  </Card.Body>
                </Card>
            </div>
        );
    }

    render() {

        return (
          <div className="infBg"  >
                <Navbar expand="lg" className="mb-4" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand href="#home" style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Actualité</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  </Navbar.Collapse>
                </Navbar>
                <Row className="pl-4">
                  <Image src={heart}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Boutiques du moment</h4>
                </Row>
                <CardColumns className="pt-4 pl-3 pr-2">
                  {
                      this.state.tendance && this.state.tendance.map(inf => this.handleCard(inf))
                  }
              </CardColumns>
                <Row className="pl-4">
                  <Image src={fire}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Boutiques populaires</h4>
                </Row>
                <CardColumns className="pt-4 pl-3 pr-2">
                  {
                      this.state.popular && this.state.popular.map(inf => this.handleCard(inf))
                  }
              </CardColumns>
                <Row className="pl-4 mt-4">
                  <Image src={star}/>
                  <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Boutiques les mieux notés</h4>
                </Row>
                <CardColumns className="pt-4 pl-3 pr-2">
                  {
                      this.state.bestMark && this.state.bestMark.map(inf => this.handleCard(inf))
                  }
              </CardColumns>
              <CardColumns className="pt-4 pl-3 pr-2">
                {
                    this.state.tendanceOffer && this.state.tendanceOffer.map(inf => this.handleCardOffer(inf))
                }
            </CardColumns>
              <Row className="pl-4">
                <Image src={fire}/>
                <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Offres populaires</h4>
              </Row>
              <CardColumns className="pt-4 pl-3 pr-2">
                {
                    this.state.popularOffer && this.state.popularOffer.map(inf => this.handleCardOffer(inf))
                }
            </CardColumns>
              <Row className="pl-4 mt-4">
                <Image src={star}/>
                <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>Offres les mieux notés</h4>
              </Row>
              <CardColumns className="pt-4 pl-3 pr-2">
                {
                    this.state.bestMarkOffer && this.state.bestMarkOffer.map(inf => this.handleCardOffer(inf))
                }
            </CardColumns>
            </div>
        );
    }
}

export default withRouter(Actuality)
