import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import { Grid } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noShop from "../../assets/noShop.jpg"
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class FindShop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shopList: null,
            search: "",
            show: false,
            back: false,
            tmpSearch: ""
        };
    }

    getAllShop = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/listShop`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
          .then(res => res.json())
          .then(res => this.setState({shopList: res}))
          .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.getAllShop();
    }

    searchRes = async (res) => {
      if (res.status === 200){
        var shops = await res.json();
        this.setState({shopList: [shops], back: true})
      }
      else {
        this.setState({show: true, shopList: [], tmpSearch: this.state.search})
      }
    }

    handleSearch = () => {
      console.log("res ", this.state.search);
      console.log("TOKEN", localStorage.getItem("Jwt"));

      var encodedKey = encodeURIComponent("pseudo");
      var encodedValue = encodeURIComponent(this.state.search);
      var formBody = encodedKey + "=" + encodedValue;

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/user/search`, {
          method: 'POST',
          body: formBody,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      }).then(res => this.searchRes(res))
        .catch(error => console.error('Error:', error));
    }

    handleGlobalAnnonce = (id) => {
        this.props.history.push(`/dashboard/shop?id=${id}`)
    }

    handleCard = (item) => {
        return (
              <div key={item.id}>
                {
                  this.state.back && this.state.shopList.length == 1 && <Button variant="outline-dark" className="mt-4 ml-4" onClick={() => {this.setState({back: false, search: "", shopList: []}); this.getAllShop();}}>  <ArrowBackIosIcon style={{marginLeft: "10px"}}/></Button>
                }
                <Card className="mt-4 ml-2 cardlist" style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
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
          <div className="infBg"  >
                <Navbar expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand href="#home" style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Trouver une boutique</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline className="ml-auto">
                      <FormControl type="text" placeholder="Exemple: Levis" className="mr-sm-2" value={this.state.search}
                        onChange={e => this.setState({ search: e.target.value })} />
                      <Button variant="outline-success" onClick={() => {this.handleSearch()}} disabled={this.state.search.length == 0}>Rechercher</Button>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
                {
                    this.state.shopList ? this.state.shopList.length > 0 ?
                      <CardColumns className="pl-2 mr-2 pr-2">
                            {
                                this.state.shopList.map(item => this.handleCard(item))
                            }
                        </CardColumns> :
                        <Alert variant="warning" className="mt-4" show={ this.state.show}
                          onClose={() => {this.setState({show: false, search: ""}); this.getAllShop();}} dismissible>
                           <Alert.Heading>Essayez à nouveau</Alert.Heading>
                           <p>
                             Aucune boutique correspond à <strong>{this.state.tmpSearch}</strong>
                           </p>
                        </Alert>
                        :
                          <Loader
                              type="Triangle"
                              color="#292929"
                              height={200}
                              width={200}
                              style={{marginTop: "14rem"}}
                          />
                }
            </div>
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
