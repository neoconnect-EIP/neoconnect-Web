import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { store } from 'react-notifications-component';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

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
            store.addNotification({
              title: "Erreur",
              message: "L'utilisateur n'existe pas ou mot de passe incorrecte",
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
                showIcon: true,
                pauseOnHover: true
              }
            });
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
            .then(res => {return res.json()})
            .then(res => {localStorage.setItem('Jwt', res.token); localStorage.setItem('userId', res.userId); localStorage.setItem('userType', res.userType); localStorage.setItem('pseudo', this.state.username); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
      }
      else {
        store.addNotification({
          title: "Erreur",
          message: "Veuillez fournir le nom d'utilisateur et le mot de passe.",
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
            showIcon: true,
            pauseOnHover: true
          }
        });
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
        store.addNotification({
          title: "Envoyé",
          message: "Nous avons envoyé un email à l'adresse fournis",
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
            showIcon: true,
            pauseOnHover: true
          }
        });
      }

    }

    handleForgotPass = () => {
        let body = {
            "email": this.state.email,
        };
        if (!this.state.email) {
          store.addNotification({
            title: "Erreur",
            message: "Veuillez indiquez votre adresse email",
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
              showIcon: true,
              pauseOnHover: true
            }
          });
        }
        else {
            body = JSON.stringify(body);
            fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/forgotPassword`, {
                method: 'POST',
                body: body,
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => { res.json(); this.handleForgotResponse(res)})
                .catch(error => console.error('Error:', error));
        }
    };

    handleResetPass = () => {
      if (this.state.newPass !== this.state.newPassSec) {
        store.addNotification({
          title: "Erreur",
          message: "Les mots de passe ne se correspondent pas",
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
            showIcon: true,
            pauseOnHover: true
          }
        });
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
                      store.addNotification({
                        title: "Erreur",
                        message: "Mot de passe invalide, il doit contenir au moins une lettre majuscule, une lettre minuscule, 1 chiffre et doit etre de 4 à 12 caractères.",
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
                          showIcon: true,
                          pauseOnHover: true
                        }
                      });
                    }
                    else {
                      store.addNotification({
                        title: "Success",
                        message: "Mot de passe a été modifié avec succès",
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
                          showIcon: true,
                          pauseOnHover: true
                        }
                      });
                      this.setState({visible: false})
                    }
                  })
            }
          })
      }


    };

    handleClose = () => {
      this.setState({visible: false, sent: false})
    }

    render() {

        return (
            <div className="infBg" style={{paddingTop:'200px'}}>
              <Modal centered show={this.state.visible} onHide={this.handleClose}>
               <Modal.Header closeButton>
                 <Modal.Title>{this.state.sent ? "Rénitialisation du mot de passe" : "Mot de passe oublié"}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 {this.state.sent ? <div>
                    <Form.Label>Code</Form.Label>
                    <Form.Control type="text" onChange={this.handleCode} value={this.state.code}/>
                    <Form.Label>Nouveau mot de passe</Form.Label>
                    <Form.Control type="password" onChange={this.handlenewPass} value={this.state.newPass}/>
                    <Form.Label>Répétez le mot de passe</Form.Label>
                    <Form.Control type="password" onChange={this.handlenewPassSec} value={this.state.newPassSec}/>
                  </div> :
                  <div>
                    <p>Veuillez entrer votre addrese email. Un code à fournir vous sera envoyé</p>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="exemple@exemple.fr" onChange={this.handleEmailChange} value={this.state.email}/>
                  </div>
                }
               </Modal.Body>
               <Modal.Footer>
                 {!this.state.sent &&
                   <Button className="btnInf" onClick={() => {

                       if (!this.state.email)
                       {
                         store.addNotification({
                           title: "Erreur",
                           message: "Veuillez indiquez votre addresse email",
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
                             showIcon: true,
                             pauseOnHover: true
                           }
                         });
                       }
                       else
                       {
                         this.setState({sent: true})
                       }
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
                          style={{marginTop: "2rem", marginBottom: "2rem"}}
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
                          <Button className="btnShop" onClick={this.handleSubmit} disabled={this.state.isLoading}>
                            Se connecter
                          </Button>
                        </Form>
                      </Row>
                }
            </div>
        );
    }
}

//
// <Form onSubmit={this.handleSubmit} style={{paddingTop: "50px", textAlign: "center"}}>
//     <div style={{backgroundImage: "linear-gradient(65deg, #000, #292929)", marginLeft: "5rem", marginRight: "5rem", marginTop: "-4.5rem", borderRadius: "8px", height: "3rem"}}>
//         <h2 style={{marginBottom: "4rem", color: "white"}}>Connexion</h2>
//     </div>
//     <div className="input-form" style={{marginTop: "2rem"}}>
//         <Icon type="user" style={{ color: '#fff', marginRight: "8px"}} />
//         <Input
//             style={{color: "#fff"}}
//             type="text"
//             name="email"
//             placeholder="Pseudo"
//             value={this.state.username}
//             onChange={this.handleUsernameChange}
//         />
//     </div>
//     <div className="input-form">
//         <Icon type="lock" style={{ color: '#fff', marginRight: "8px" }} />
//         <Input
//             style={{color: "#fff"}}
//             type="password"
//             name="password"
//             placeholder="Mot de passe"
//             value={this.state.password}
//             onChange={this.handlePasswordChange}
//             onKeyPress={this.handleKeyPress}
//         />
//     </div>
//     <Grid container style={{marginTop: "50px", paddingBottom: "30px"}}>
//         <Grid item xs={12}>
//             <Button onClick={this.handleSubmit} disabled={this.state.isLoading} style={{color: 'white', width: "9.375rem", height: "2.1875rem", borderRadius: "10px", backgroundImage: "linear-gradient(65deg, #000, #292929)"}}>Connexion</Button>
//         </Grid>
//         <Grid item xs={12}>
//             <p style={{color: "#fff", marginTop: "0.2", marginBottom: "0rem"}}>-ou-</p>
//             <a style={{color: "#fff"}} onClick={this.forgotPassword}>Mot de passe oublié</a>
//         </Grid>
//     </Grid>
// </Form>
