import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import StarIcon from '@material-ui/icons/Star';
import noImageFindInf from "../../assets/noImageFindInf.jpg"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import heart from "../../assets/heart.svg";
import fire from "../../assets/fire.svg";
import star from "../../assets/star.svg";
import { showNotif } from '../Utils.js';
import { displayLoad } from '../../Components/Utils.js';

class Actuality extends React.Component {
  constructor(props) {
    super(props);
    localStorage.setItem('menuId', 7);
    if (!localStorage.getItem("Jwt"))
      this.props.history.push('/landing-page/login');
    if (localStorage.getItem("userType") !== "shop")
      this.props.history.push('/page-not-found');
    this.state = {
      influencersData: null,
      show: false,
      back: false,
      tmpSearch: "",
      moment: null,
      bestMark: null,
      popular: null,
      loading: true,
    };
  }

  componentDidMount = () => {
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
        this.setState({moment: res.listInfTendance, popular: res.listInfPopulaire, bestMark: res.listInfNotes, loading: false});
      })
      .catch(err => showNotif(true, "Erreur", null))
    };

    handleGlobalInf = (id) => {
      this.props.history.push(`/shop-dashboard/influencer?id=${id}`)
    }

    cardInf = (inf) => {
      return (
        <Col key={inf.id} className="mb-3">
          <Card className="cardlist" onClick={() => this.handleGlobalInf(inf.id)} style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
            <Card.Img variant="top"  style={{height: '190px', objectFit: 'cover'}} src={!inf.userPicture || inf.userPicture.length === 0 ? noImageFindInf : inf.userPicture[0].imageData} />
            <Card.Body>
              <Card.Title>{inf.pseudo}</Card.Title>
              {inf.email &&
                <Row>
                  <EmailIcon style={{float: "left", color: "#5BA8A0", marginLeft: "10px", marginRight: '10px'}}/>
                  <p style={{overflowX: 'auto'}}>{inf.email}</p>
                </Row>
              }
              {inf.phone &&
                <Row>
                  <PhoneAndroidIcon style={{float: "left", color: "#5BA8A0", marginLeft: "10px", marginRight: '10px'}}/>
                  <p>{inf.phone}</p>
                </Row>
              }
              {inf.theme &&
                <Row>
                  <BubbleChartIcon style={{float: "left", color: "#5BA8A0", marginLeft: "10px", marginRight: '10px'}}/>
                  <p>{inf.theme}</p>
                </Row>
              }
              <Row className="pl-2">
                <StarIcon style={{width: "25px", height: "25px", color: "gold"}}/>
                <p>note: {inf.average != null ? (inf.average.toFixed(1) + '/5') : "Aucune note"}</p>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    manageInfCard = (icon, title, infs) => {
      return (
        <>
        <Row className="pl-4 mt-4 mr-0 ml-0">
          <Image src={icon}/>
          <h4 className="ml-4" style={{color: 'white', fontWeight: '400'}}>{title}</h4>
        </Row>
        <Row className="ml-3 mr-3 mt-3" xs={1} md={2} lg={3} sm={2} xl={3}>
          {
            (infs && infs.length > 0) ? infs.map(inf => this.cardInf(inf)) :
            <p className="ml-4 mt-2 text-light">Aucun influenceur pour le moment</p>
          }
        </Row>
        </>
    )
  }

  render() {
    return (
      <div justify="center" className="shopBg" style={{minHeight: "100vh"}}>
        <Navbar expand="lg" className="mb-4" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
          <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Actualité</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
        </Navbar>
        {
          this.state.loading ?
          displayLoad()
          :
          <div>
            {this.manageInfCard(heart, "Influenceurs du moment", this.state.moment)}
            {this.manageInfCard(fire, "Influenceurs populaires", this.state.popular)}
            {this.manageInfCard(star, "Influenceurs les mieux notés", this.state.bestMark)}
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Actuality)
