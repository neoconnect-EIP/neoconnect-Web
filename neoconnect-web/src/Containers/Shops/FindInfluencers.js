import React from 'react';
import { withRouter } from "react-router-dom"
import "../index.css"
import StarIcon from '@material-ui/icons/Star';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import noImageFindInf from "../../assets/noImageFindInf.jpg"
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import Alert from 'react-bootstrap/Alert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class FindInfluencers extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") !== "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            influencersData: null,
            search: "",
            show: false,
            back: false,
            tmpSearch: "",
            filter: [],
            mode: false,
            food: false,
            game: false,
            tech: false,
            cosmetic: false,
            sport: false,
            theme: ''
        };
    }

    getAllInfluencer = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/shop/listInf`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
          .then(res => res.json())
          .then(res => this.setState({influencersData: res}))
          .catch(error => console.error('Error:', error));
    }

    componentDidMount = () => {
      this.getAllInfluencer();
    };

    handleGlobalInf = (id) => {
        this.props.history.push(`/shop-dashboard/influencer?id=${id}`)
    }

    searchRes = async (res) => {
      if (res.status === 200){
        var influencer = await res.json();
        this.handleGlobalInf(influencer.id);
        // this.setState({influencersData: [influencer], back: true})
      }
      else {
        this.setState({show: true, influencersData: [], tmpSearch: this.state.search})
      }
    }

    handleSearch = () => {

      var encodedKey = encodeURIComponent("pseudo");
      var encodedValue = encodeURIComponent(this.state.search);
      var formBody = encodedKey + "=" + encodedValue;


      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/search`, {
          method: 'POST',
          body: formBody,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      }).then(res => this.searchRes(res))
        .catch(error => console.error('Error:', error));
    }

    cardInf = (inf) => {
        return (
          <div key={inf.id}>
            {
              this.state.back && this.state.influencersData.length === 1 && <Button variant="outline-dark" className="mt-4 ml-4" onClick={() => {this.setState({back: false, search: "", influencersData: []}); this.getAllInfluencer();}}>  <ArrowBackIosIcon style={{marginLeft: "10px"}}/></Button>
            }
          <Card className="cardlist" onClick={() => this.handleGlobalInf(inf.id)} style={{borderColor: 'transparent', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}>
            <Card.Img variant="top" src={!inf.userPicture || inf.userPicture.length === 0 ? noImageFindInf : inf.userPicture[0].imageData} />
            <Card.Body>
              <Card.Title>{inf.pseudo}</Card.Title>
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
            </Card.Body>
          </Card>
        </div>
        );
    }

    render() {
        return (
          <div justify="center" className="shopBg" style={{minHeight: "100vh"}}>
              <Navbar expand="lg" className="mb-4" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                <Navbar.Brand href="#home" style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Trouver un influenceur</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Exemple: David" className="mr-sm-2" value={this.state.search}
                      onChange={e => this.setState({ search: e.target.value })} />
                    <Button variant="outline-success" onClick={() => {this.handleSearch()}} disabled={this.state.search.length === 0}>Rechercher</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
              <div className="ml-3">
                <Badge pill className="report" style={{backgroundColor: this.state.theme === 'mode' ? '#C5D341' : '#6C757D', color: 'white'}} onClick={() => {this.setState({theme: this.state.theme !== 'mode' ? 'mode' : ''})}}>
                  Mode
                </Badge>{' '}
                <Badge pill className="report" style={{backgroundColor: this.state.theme === 'game' ? '#C5D341' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'game' ? 'game' : ''})}}>
                  Jeux vidéo
                </Badge>{' '}
                <Badge pill className="report" style={{backgroundColor: this.state.theme === 'tech' ? '#C5D341' : '#6C757D', color: 'white'}} variant="secondary" onClick={()=> {this.setState({theme: this.state.theme !== 'tech' ? 'tech' : ''})}}>
                  High Tech
                </Badge>{' '}
                <Badge pill className="report" style={{backgroundColor: this.state.theme === 'food' ? '#C5D341' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'food' ? 'food' : ''})}}>
                  Nourriture
                </Badge>{' '}
                <Badge pill className="report" style={{backgroundColor: this.state.theme === 'cosmetic' ? '#C5D341' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'cosmetic' ? 'cosmetic' : ''})}}>
                  Cosmétique
                </Badge>{' '}
                <Badge pill className="report" style={{backgroundColor: this.state.theme === 'sport' ? '#C5D341' : '#6C757D', color: 'white'}} variant="secondary" onClick={() => {this.setState({theme: this.state.theme !== 'sport' ? 'sport' : ''})}}>
                  Sport
                </Badge>{' '}
              </div>

              {
                this.state.influencersData ? this.state.influencersData.length > 0 ?
                  <CardColumns className="pt-4 pl-3 pr-2">
                    {
                        this.state.influencersData.filter((item) => (item.theme && item.theme.toLowerCase() === 'mode' && this.state.theme === 'mode') ||
                                                                    (item.theme && item.theme.toLowerCase() === 'high tech' && this.state.theme === 'tech') ||
                                                                    (item.theme && item.theme.toLowerCase() === 'jeux vidéo' && this.state.theme === 'game') ||
                                                                    (item.theme && item.theme.toLowerCase() === 'sport/fitness' && this.state.theme === 'sport') ||
                                                                    (item.theme && item.theme.toLowerCase() === 'food' && this.state.theme === 'food') ||
                                                                    (item.theme && item.theme.toLowerCase() === 'cosmétique' && this.state.theme === 'cosmetic') ||
                                                                  (!this.state.theme)).map(inf => this.cardInf(inf))
                    }
                  </CardColumns> :
                  <Alert variant="warning" className="mt-4" show={ this.state.show}
                    onClose={() => {this.setState({show: false, search: ""}); this.getAllInfluencer();}} dismissible>
                     <Alert.Heading>Essayez à nouveau</Alert.Heading>
                     <p>
                       Aucun influencer correspond à <strong>{this.state.tmpSearch}</strong>
                     </p>
                  </Alert>
                  :
                  <Loader
                      type="Triangle"
                      color="#FFFFF"
                      height={200}
                      width={200}
                      style={{marginTop: "14rem"}}
                  />
              }
            </div>
        );
    }
}

export default withRouter(FindInfluencers)
