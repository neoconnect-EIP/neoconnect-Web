import React from 'react';
import { withRouter } from "react-router-dom"
import { Fab } from '@material-ui/core/';
import "../index.css"
import StarIcon from '@material-ui/icons/Star';
import {Grid, CardMedia, CardContent, CardActionArea} from "@material-ui/core";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noImageFindInf from "../../assets/noImageFindInf.jpg"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

class FindInfluencers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            influencersData: null,
        };
    }

    componentDidMount = () => {
        fetch(`http://168.63.65.106/shop/listInf`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({influencersData: res}))
            .catch(error => console.error('Error:', error));
    };

    handleGlobalInf = (id) => {
        this.props.history.push(`/shop-dashboard/influencer?id=${id}`)
    }

    cardInf = (inf) => {
        return (
          <Card className="card" onClick={() => this.handleGlobalInf(inf.id)} style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
            <Card.Img variant="top" src={!inf.userPicture || inf.userPicture.length === 0 ? noImageFindInf : inf.userPicture[0].imageData} />
            <Card.Body>
              <Card.Title>{inf.pseudo}</Card.Title>
              <Card.Text>
                {inf.email &&
                  <Row>
                    <EmailIcon style={{float: "left", color: "#5BA8A0", marginLeft: "10px", marginRight: '10px'}}/>
                    <p>{inf.email}</p>
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
                  <p>{`note: ${inf.average ? inf.average.toFixed(1) : "0" }/5`}</p>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        );
    }

    render() {
        return (
          <Grid container justify="center">
              <Navbar bg="light" expand="lg" style={{width: '100%'}}>
                <Navbar.Brand href="#home" style={{fontSize: '26px', fontWeight: '300'}}>Trouver un influenceur</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Exemple: David" className="mr-sm-2" />
                    <Button variant="outline-success">Rechercher</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
                {
                  this.state.influencersData ?
                    <CardColumns className="pt-4 pl-3">
                      {
                          this.state.influencersData.map(inf => this.cardInf(inf))
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
            </Grid>
        );
    }
}

export default withRouter(FindInfluencers)



// <Grid container justify="center">
//     {
//         this.state.influencersData ?
//             <Grid container justify="center">
//                 {
//                     this.state.influencersData.map(inf => this.cardInf(inf))
//                 }
//             </Grid>
//             :
//             <Loader
//                 type="Triangle"
//                 color="#292929"
//                 height={200}
//                 width={200}
//                 style={{marginTop: "14rem"}}
//             />
//     }
// </Grid>
//
//
// <Grid item xs={12} md={6} style={{padding: "5rem", paddingRight: "12rem", height: "auto", marginBottom: "10rem"}}>
//     <Card style={{width: "30rem", height: "36rem"}}>
//         <CardActionArea onClick={() => this.handleGlobalInf(inf.id)}>
//             <CardMedia>
//                 <img src={!inf.userPicture || inf.userPicture.length === 0 ? noImageFindInf : inf.userPicture[0].imageData} style={{width: "30rem", height: "36rem", backgroundPosition: "center"}} alt="MISSING JPG"/>
//             </CardMedia>
//         </CardActionArea>
//     </Card>
//     <div style={{width: "15rem", height: "auto", backgroundColor: "#292929", marginTop: "-25rem", position: "relative", marginLeft: "24rem", borderRadius: "10px",
//         borderRight: "2px solid #292929", borderTop: "2px solid #292929", borderBottom: "2px solid #292929", padding: "0.5rem"}}>
//         <h1 style={{color: "white", paddingBottom: "1rem", marginBottom: "2rem", textDecoration: "underline"}}>{inf.pseudo}</h1>
//         <h5 style={{color: "white"}}>{inf.email}</h5>
//         <h5 style={{color: "white"}}>{inf.phone}</h5>
//         <h5 style={{color: "white"}}>{inf.theme}</h5>
//         <h5 style={{color: "white"}}>{`note: ${inf.average ? inf.average.toFixed(1) : "0" }/5`}</h5>
//     </div>
// </Grid>
