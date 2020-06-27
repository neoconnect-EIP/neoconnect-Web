import React from 'react';
import { withRouter } from "react-router-dom"
import { Fab } from '@material-ui/core/';
import "../index.css"
import {CardActionArea, CardActions, CardContent, CardMedia, Grid, Modal, Slide} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';

class FindShop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shopList: null,
        };
    }

    componentDidMount() {
        fetch("http://168.63.65.106:8080/inf/listShop", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({shopList: res}))
            .catch(error => console.error('Error:', error));
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push(`/dashboard/shop?id=${id}`)
    }

    handleCard = (item) => {
      console.log("item = ", item);
        return (
              <div key={item.id}>
                <Card className="mt-4 ml-2" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
                  <Card.Img className="card" onClick={() => this.handleGlobalAnnonce(item.id)} variant="top" src={item.userPicture === null || item.userPicture.length === 0 ? noShop : item.userPicture[0].imageData} alt="MISSING JPG"/>
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

    render() {

        return (
          <Grid container justify="center">
                <Navbar bg="light" expand="lg" style={{width: '100%'}}>
                  <Navbar.Brand href="#home" style={{fontSize: '26px', fontWeight: '300'}}>Trouver une boutique</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline className="ml-auto">
                      <FormControl type="text" placeholder="Exemple: Levis" className="mr-sm-2" />
                      <Button variant="outline-success">Rechercher</Button>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
                {
                    this.state.shopList ?
                      <CardColumns className="pl-2 mr-2 pr-2">
                            {
                                this.state.shopList.map(item => this.handleCard(item))
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

export default withRouter(FindShop)

// <Card className="findShopCard">
//     <CardActionArea onClick={() => this.handleGlobalAnnonce(item.id)}>
//         <CardMedia>
//             <img src={item.userPicture === null || item.userPicture.length === 0 ? noShop : item.userPicture[0].imageData} style={{width: "100%", height: "21.875rem"}} alt="MISSING JPG"/>
//         </CardMedia>
//     </CardActionArea>
//     <CardContent style={{width: "100%", height: "auto"}}>
//         <Grid container>
//             <Grid item xs={10}>
//                 <h1>{` ${item.pseudo ? item.pseudo : "No brand"}`}</h1>
//             </Grid>
//             <Grid item xs={2}>
//                 <h2 style={{marginBottom: "10px", marginLeft: "20px"}}>{item.average ? item.average.toFixed(1) : "0"}/5</h2>
//                 <StarIcon  style={{width: "30px", height: "30px", transform: "translateY(-6px)", color: "gold"}}/>
//             </Grid>
//         </Grid>
//     </CardContent>
// </Card>
