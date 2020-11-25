import React from 'react';
import { withRouter } from "react-router-dom"
import "../../index.css"
import Loader from "react-loader-spinner";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import noImages from "../../assets/noImages.jpg";
import { showNotif } from '../Utils.js';

class Ads extends React.Component {
    constructor(props) {
        super(props);
        localStorage.setItem('menuId', 2);
        if (!localStorage.getItem("Jwt"))
          this.props.history.push('/landing-page/login');
        if (localStorage.getItem("userType") === "shop")
          this.props.history.push('/page-not-found');
        this.state = {
            adsData: [],
            visible: false,
            actualAd: null,
            message: "",
            isLoading: true,
            modalMode: "",
            type:['', 'Mode', 'Cosmetique', 'Technologie', 'Nourriture', 'Jeux video', 'Sport/Fitness'],
            fb: "",
            validFb: true,
            ig: "",
            validIg: true,
            twitter: "",
            validTwitter: true,
            snap: "",
            validSnap: true,
            youtube: "",
            validYoutube: true,
            twitch: "",
            validTwitch: true,
            pinterest: "",
            validPinterest: true,
            tiktok: "",
            validTiktok: true,
            shareId: null
        };

    }

    getAppliedOffer = () => {
      if (localStorage.getItem("Jwt")) {

        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/inf/offer/applied/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          if (res.status === 200)
            return (res.json());
        })
        .then(res => this.setState({adsData: res, isLoading: false}))
        .catch(error => {
          this.setState({isLoading: false});
          showNotif(true,"Erreur", null);
        });
      }

    }

    componentDidMount = () => {
        this.getAppliedOffer();
    }

    handleSendMail = () => {
        let body = {
            "message": this.state.message,
        };
        body = JSON.stringify(body);
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/sendMail/${localStorage.getItem("userId")}`, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {res.json(); this.setState({adsData: res})})
        .catch(error => showNotif(true, "Erreur",null));
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    };

    handleDelete = (id) => {
      var thisTmp = this;
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/noapply/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => {
          res.json();
          if (res.status === 200) {
            thisTmp.getAppliedOffer();
          }
        })
        .catch(error => showNotif(true, "Erreur",null));
    };

    listAbonnement = () => {
        return (
          this.state.adsData.map(ad => (
            <Col className="mb-3" key={ad.id}>
              <Card className="cardlist mb-4">
                <Card.Img  style={{height: '190px', objectFit: 'cover'}} onClick={() => {this.props.history.push(`/dashboard/item?id=${ad.idOffer}`)}}
                  variant="top" className="pointerClick" src={!ad.productImg || ad.productImg.length === 0 ? noImages : ad.productImg[0].imageData} />
                <Card.Body>
                  <Row>
                    <h5 className="ml-2">{ad.productName}</h5>
                    <p className="ml-auto" style={{fontWeight: '300', fontSize: 12}}>{new Date(ad.createdAt).toLocaleDateString()}</p>
                  </Row>
                  <p style={{fontWeight: '300', fontSize: 12}}>{ad.brand}</p>
                  <p style={{fontWeight: '300', fontSize: 18}}>{ad.status  === "accepted" ? "Accepté" : (ad.status  === "pending" ? "En attente" : "Refusé")}</p>
                  <Row className="mt-4">
                    <Button className="btnInf" onClick={() => {this.handleDelete(ad.idOffer)}}>Annuler</Button>{' '}
                    {ad.status  === "accepted" && <Button className="btnInf ml-2" onClick={() => {this.setState({visible: true, shareId: ad.idOffer})}}>Confirmer</Button>}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        )
    }

    handleShareRes = async (res) => {
      if (res.status !== 200) {
        var msg = await res.json();
        showNotif(true, "Erreur", msg);
      }
      else {
        showNotif(false, "Envoyé", "Un email avec les lien de publications a été envoyé au marque");
        this.setState({visible: false})
      }
    }

    handleSendShare = () => {
      if (this.state.validFb && this.state.validIg && this.state.validPinterest && this.state.validSnap &&
        this.state.validTiktok && this.state.validTwitch && this.state.validTwitter && this.state.validYoutube && (
          this.state.fb || this.state.ig || this.state.youtube || this.state.pinterest || this.state.twitch ||
          this.state.twitter || this.state.tiktok || this.state.snapchat
        ))
        {
          let body = {
              "facebook": this.state.fb,
              "instagram": this.state.ig,
              "youtube": this.state.youtube,
              "pinterest": this.state.pinterest,
              "twitch": this.state.twitch,
              "twitter": this.state.twitter,
              "tiktok": this.state.tiktok,
              "snapchat": this.state.snapchat
          };
          body = JSON.stringify(body);

          fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/offer/sharePublication/${this.state.shareId}`,
            {
              method: 'POST',
              body: body,
              headers: {'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
            })
            .then(res => this.handleShareRes(res))
            .catch(error => showNotif(true, "Erreur",null));
        }
        else {
          showNotif(true, "Erreur", "Veuillez vérifier tout les champs.");
        }

    }

    onFbChange(e){
      this.setState({fb: e.target.value})
      let regx = /(?:(?:http|https):\/\/)?(?:www.|m.)?facebook.com\/(?!home.php)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]+)/
      if (regx.test(e.target.value)  || e.target.value === ''){
        this.setState({validFb: true})
      }else this.setState({validFb: false})
    }
    onIgChange(e){
      this.setState({ig: e.target.value})
      // let regx = /^\s*(http\:\/\/)?instagram\.com\/[a-z\d-_]{1,255}\s*$/i
      if (e.target.value.includes('instagram.com')  || e.target.value === ''){
        this.setState({validIg: true})
      }else this.setState({validIg: false})
    }
    onSnapchatChange(e){
      this.setState({snap: e.target.value})
      let regx = /^\s*(http\:\/\/)?snapchat\.com\/[a-z\d-_]{1,255}\s*$/i
      if (regx.test(e.target.value)  || e.target.value === ''){
        this.setState({validSnap: true})
      }else this.setState({validSnap: false})
    }
    onYoutubeChange(e){
      this.setState({youtube: e.target.value})
      let regx = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
      if (regx.test(e.target.value)  || e.target.value === ''){
        this.setState({validYoutube: true})
      }else this.setState({validYoutube: false})
    }
    onTwitterChange(e){
      this.setState({twitter: e.target.value})
      let regx = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
      if (regx.test(e.target.value)  || e.target.value === ''){
        this.setState({validTwitter: true})
      }else this.setState({validTwitter: false})
    }
    onTwitchChange(e){
      this.setState({twitch: e.target.value})
      if (e.target.value.includes('twitch.tv')  || e.target.value === ''){
        this.setState({validTwitch: true})
      }else{
        this.setState({validTwitch: false})
      }
    }
    onPinterestChange(e){
      this.setState({pinterest: e.target.value})
      let regx = /^\s*(http\:\/\/)?pinterest\.com\/[a-z\d-_]{1,255}\s*$/i
      if (regx.test(e.target.value)  || e.target.value === ''){
        this.setState({validPinterest: true})
      }else this.setState({validPinterest: false})
    }
    onTikTokChange(e){
      this.setState({tiktok: e.target.value})
      if (e.target.value.includes('tiktok.com') || e.target.value === ''){
        this.setState({validTiktok: true})

      }else{
        this.setState({validTiktok: false})
      }
    }

    render() {

        return (
            <div className="infBg">
              <Modal centered show={this.state.visible} onHide={() => {this.setState({visible: false})}}>
               <Modal.Header closeButton>
                 <Modal.Title>Liens de publication du produit concerné</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 <Form noValidate validated={this.state.validFb && this.state.validIg && this.state.validPinterest && this.state.validSnap && this.state.validTiktok && this.state.validTwitch && this.state.validTwitter && this.state.validYoutube}>
                 <Form.Row>
                  <Form.Group as={Col} controlId="formFb">
                    <Form.Label>Facebook</Form.Label>
                    <Form.Control isInvalid={!this.state.validFb} value={this.state.fb} onChange={(e) => this.onFbChange(e)}/>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formIg">
                    <Form.Label>Instagram</Form.Label>
                    <Form.Control isInvalid={!this.state.validIg} value={this.state.ig} onChange={(e) => this.onIgChange(e)}/>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group  as={Col} controlId="formBasicSnap">
                    <Form.Label>Snapchat</Form.Label>
                    <Form.Control isInvalid={!this.state.validSnap} value={this.state.snap} onChange={(e) => this.onSnapchatChange(e)}/>
                  </Form.Group>
                  <Form.Group  as={Col} controlId="formBasicYoutube">
                    <Form.Label>Youtube</Form.Label>
                    <Form.Control isInvalid={!this.state.validYoutube} value={this.state.youtube} onChange={(e) => this.onYoutubeChange(e)}/>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}  controlId="formBasicTwitter">
                    <Form.Label>Twitter</Form.Label>
                    <Form.Control isInvalid={!this.state.validTwitter} value={this.state.twitter} onChange={(e) => this.onTwitterChange(e)}/>
                  </Form.Group>
                  <Form.Group as={Col}  controlId="formBasicTwitch">
                    <Form.Label>Twitch</Form.Label>
                    <Form.Control isInvalid={!this.state.validTwitch} value={this.state.twitch} onChange={(e) => this.onTwitchChange(e)}/>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formBasicPinterest">
                    <Form.Label>Pinterest</Form.Label>
                    <Form.Control isInvalid={!this.state.validPinterest} value={this.state.pinterest} onChange={(e) => this.onPinterestChange(e)}/>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formBasicTikTok">
                    <Form.Label>Tiktok</Form.Label>
                    <Form.Control isInvalid={!this.state.validTiktok} value={this.state.tiktok} onChange={(e) => this.onTikTokChange(e)}/>
                  </Form.Group>
                </Form.Row>
              </Form>
               </Modal.Body>
               <Modal.Footer>
                 <Button className="btnCancel" onClick={() => {this.setState({visible: false})}}>
                   Annuler
                 </Button>
                 <Button className="btnInf" onClick={() => {this.handleSendShare()}}>
                   Envoyer
                 </Button>
               </Modal.Footer>
              </Modal>
                <Navbar expand="lg" style={{width: '100%', boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                  <Navbar.Brand style={{fontSize: '26px', fontWeight: '300', color: 'white'}}>Offre postulé</Navbar.Brand>
                </Navbar>
                {
                  this.state.isLoading &&
                    <Loader
                        type="Triangle"
                        color="#fff"
                        height={200}
                        width={200}
                        style={{marginTop: "14rem", marginLeft: '40%'}}
                    />
                  }
                  {
                    (this.state.adsData && this.state.adsData.length > 0) ?
                    <Row className="ml-3 mr-3 mt-3"  xs={1} md={2} lg={3} sm={2} xl={4}>
                       {this.listAbonnement()}
                    </Row> :
                    <p className="ml-2 mt-2 text-light">{!this.state.isLoading && 'Aucune offre postulé pour le moment.'}</p>
                }
            </div>
        );
    }
}

export default withRouter(Ads)
