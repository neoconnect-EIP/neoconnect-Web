import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { showNotif } from '../Utils.js';

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoading: false,
            visible: false,
            email: "",
            code: "",
            newPass: "",
            newPassSec: "",
            sent: false
        }
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlenewPass= (e) => {
        this.setState({newPass: e.target.value});
    }
    handlenewPassSec = (e) => {
        this.setState({newPassSec: e.target.value});
    }
    handleCode = (e) => {
        this.setState({code: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleResponse = (res) => {
        if (res.userType) {
            this.setState({isLoading: false})
            res.userType === "influencer" ? this.props.history.push('/dashboard/actuality') : this.props.history.push('/shop-dashboard/actuality')
        }
        else {
          showNotif(true, "Erreur", "L'utilisateur n'existe pas ou mot de passe incorrecte");
            this.setState({isLoading: false})
        }
    }

    forgotPassword = () => {
        this.props.history.push('/landing-page/forgot-password')
    }

    handleSubmit = () => {
      if (this.state.username && this.state.password) {
        let body = {
            "pseudo": this.state.username,
            "password": this.state.password,
        };
        body = JSON.stringify(body);
        this.setState({isLoading: true})
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/login`, { method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then(res => {
              return res.json()
            })
            .then(res => {
              localStorage.setItem('Jwt', res.token);
              localStorage.setItem('userId', res.userId);
              localStorage.setItem('userType', res.userType);
              localStorage.setItem('pseudo', this.state.username);
              localStorage.setItem('menuId', res.userType === 'shop' ? 7 : 0);
              this.handleResponse(res);
            })
            .catch(error => {this.setState({isLoading: false});showNotif(true, "Erreur",null)});
      }
      else {
        showNotif(true, "Erreur", "Veuillez fournir le nom d'utilisateur et le mot de passe.");
      }

    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.handleSubmit()
        }
    };

    handleForgotResponse = (res) => {
      if (res.status === 200) {
        this.setState({sent: true});
        showNotif(false, "Envoyé", "Nous avons envoyé un email à l'adresse fournis");
      }
    }

    handleForgotPass = () => {
      if (!this.state.email) {
        showNotif(true, "Erreur", "Veuillez fournir l'adresse email")
      }
      else {
        let body = {
            "email": this.state.email,
        };
        if (!this.state.email) {
          showNotif(true, "Erreur", "Veuillez indiquez votre adresse email");
        }
        else {
            body = JSON.stringify(body);
            fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/forgotPassword`, {
                method: 'POST',
                body: body,
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => { res.json(); this.handleForgotResponse(res)})
            .catch(error => showNotif(true, "Erreur",null));
        }
      }
    };

    handleResetPass = () => {
      if (this.state.newPass !== this.state.newPassSec || !this.state.code) {
        showNotif(true, "Erreur", "Veuillez remplir tout les champs et s'assurer que les mots de passe se correspondent.");
      }
      else {
        fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/resetPassword/${this.state.code}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
          .then(res => {
            if (res.status === 200) {

              var params = {
                    'email': this.state.email,
                    'resetPasswordToken':  this.state.code,
                    'password': this.state.newPass
                };

                var formBody = [];
                for (var property in params) {
                  var encodedKey = encodeURIComponent(property);
                  var encodedValue = encodeURIComponent(params[property]);
                  formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

              fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/updatePassword`, {
                  method: 'PUT', body: formBody, headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                  "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
                })
                .then(res => {
                  if (res.status === 400) {
                    showNotif(true, "Erreur", "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.");
                  }
                  else {
                    showNotif(false, "Réussis", "Votre mot de passe a été modifié avec succès");
                    this.setState({visible: false})
                  }
                })
                .catch(error => showNotif(true, "Erreur",null));
            }
          })
          .catch(error => showNotif(true, "Erreur",null));
      }


    };

    handleClose = () => {
      this.setState({visible: false, sent: false})
    }

    render() {

        return (
            <div className="infBg" style={{paddingTop:'200px', overflow: 'auto'}}>
              <Modal centered show={this.state.visible} onHide={this.handleClose}>
               <Modal.Header closeButton>
                 <Modal.Title>{this.state.sent ? "Rénitialisation du mot de passe" : "Mot de passe oublié"}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 {this.state.sent ? <div>
                    <Form.Label>Code*</Form.Label>
                    <Form.Control type="text" onChange={this.handleCode} value={this.state.code}/>
                    <Form.Label>Nouveau mot de passe*</Form.Label>
                    <Form.Control type="password" onChange={this.handlenewPass} value={this.state.newPass}/>
                    <Form.Label>Répétez le mot de passe*</Form.Label>
                    <Form.Control type="password" onChange={this.handlenewPassSec} value={this.state.newPassSec}/>
                  </div> :
                  <div>
                    <p>Veuillez entrer votre addrese email. Un code à fournir vous sera envoyé</p>
                    <Form.Label>Email*</Form.Label>
                    <Form.Control type="email" placeholder="exemple@exemple.fr" onChange={this.handleEmailChange} value={this.state.email}/>
                  </div>
                }
               </Modal.Body>
               <Modal.Footer>
                 {!this.state.sent &&
                   <Button className="btnInf" onClick={() => {
                         this.setState({sent: true})
                     }}>
                     Rentrer le code
                   </Button>}
                 <Button className="btnInf" onClick={() => {if (this.state.sent) this.handleResetPass(); else {this.handleForgotPass()}}}>
                   Envoyer
                 </Button>
               </Modal.Footer>
              </Modal>
                {
                  this.state.isLoading ?
                    <Loader
                        type="Triangle"
                        color="#fff"
                        height={200}
                        width={200}
                        style={{ marginLeft: "50vh"}}
                    />
                  :
                  <Row className="justify-content-center">
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{color: 'white', fontWeight: '600'}}>Pseudo</Form.Label>
                        <Form.Control type="email" onChange={this.handleUsernameChange} value={this.state.username}/>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{color: 'white', fontWeight: '600'}}>Mot de passe</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                        <Form.Text style={{color:'white'}} type="submit" onClick={() => {this.setState({visible: true})}}>
                           Mot de passe oublié
                         </Form.Text>
                      </Form.Group>
                      <Button className="btnShop mb-3" onClick={this.handleSubmit} disabled={this.state.isLoading}>
                        Se connecter
                      </Button>
                    </Form>
                  </Row>
                }
            </div>
        );
    }
}
