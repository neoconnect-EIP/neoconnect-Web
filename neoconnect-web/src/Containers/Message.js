import React from 'react';
import "./index.css"
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import noAvatar from "../assets/noImageFindInf.jpg";
import SendIcon from '@material-ui/icons/Send';
import { store } from 'react-notifications-component';

export default class Message extends React.Component{
    constructor(props) {
        super(props);
        localStorage.setItem('menuId', 5);
        this.state = {
            userId: parseInt(localStorage.getItem("userId")),
            channels: null,
            shop: false,
            msg: "",
            index: -1,
            client: localStorage.getItem("userType"),
            currentDest: "",
            messages: null,
            chanelDetail: null,
            userData: null
          };
    }

    handleGetMsg = async (res) => {
      var msg;
      if (res.status === 200) {
        msg = await res.json();
        console.log("msg ", msg);
        this.setState({channels: msg})
        return msg;
      }
      else {
        msg = await res.json();
        console.log("error", msg);
        throw msg;
      }
    }

    getChannels = () => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/message`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => {
        this.handleGetMsg(res);
      })
      .catch(error => {
        store.addNotification({
          title: "Erreur",
          message: "Erreur provenant du serveur: " + error.statusText,
          type: "danger",
          insert: "top",
          container: "top-right",
          pauseOnHover: true,
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 7000,
            onScreen: true,
            showIcon: true
          }
        });
      });
    }

    componentDidMount = () => {
        this.getChannels();
    };

    handleResponse = (res) => {
        if (res.status === 200)
            this.setState({pseudo: "", email: "email", subject: "", message: "", to: ""})
    };

    handleChange = (e) => {
        let change = {}

        change[e.target.name] = e.target.value
        this.setState(change)
    };

    handleDetailRes = async (res) => {
      var msg;
      if (res.status === 200) {
        msg = await res.json();
        this.setState({messages: msg.data, chanelDetail: msg})
        return msg;
      }
      else {
        msg = await res.json();
        console.log("error", msg);
        throw msg;
      }
    }

    detailMsg = (chanId, id, pseudo) => {
      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/message/${chanId}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
      })
      .then(res => this.handleDetailRes(res))
      .catch(error => {
        store.addNotification({
          title: "Erreur",
          message: "Erreur provenant du serveur: " + error.statusText,
          type: "danger",
          insert: "top",
          container: "top-right",
          pauseOnHover: true,
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 7000,
            onScreen: true,
            showIcon: true
          }
        });
      });
      this.setState({currentDest: pseudo, index: id});
    }

    handleChange = (e) => {
      this.setState({msg: e.target.value});
    };

    handleMsgRes = async (res, dest) => {
      var msg;
      if (res.status === 200) {
        msg = await res.json();
        this.setState({msg: ""});
        this.detailMsg(this.state.chanelDetail.id, this.state.index, this.state.currentDest)
      }
      else {
        msg = await res.json();

        store.addNotification({
          title: "Erreur",
          message: "Une erreur s'est produite, veuillez essayer ultérieurement: " + (msg ? msg : res.statusText),
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
    }

    handleSendMessage = () => {
      let dest = (this.state.chanelDetail.user_1 === this.state.userId.toString() ? this.state.chanelDetail.user_2 : this.state.chanelDetail.user_1);
      let body = {
          'message': this.state.msg,
          'userId': dest,
      };
      body = JSON.stringify(body);

      fetch(`${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}/message`,
        {
          method: 'POST',
          body: body,
          headers: {'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
        .then(res => this.handleMsgRes(res, dest))
        .catch(error => console.error('Error:', error));
    };

    listContact = () => {
      return (
        this.state.channels.map((user, id) => (
          id === this.state.index ?
            <Row key={user.id} className="pl-2 mr-2 messageUser messageUserOn" onClick={() => {this.detailMsg(user.id, id, user.pseudo)}}>
                <Image className="py-auto mb-2 mt-2" style={{width: '65px', height: '65px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}
                src={!user.userPicture || user.userPicture.length === 0 ? noAvatar : user.userPicture[0].imageData} roundedCircle/>
                <p className="my-auto ml-4" style={{color: 'white'}}>{user.pseudo ? user.pseudo : user.id}</p>
            </Row> :

            <Row  key={user.id} className="pl-2 mr-2 messageUser" onClick={() => {this.detailMsg(user.id, id, user.pseudo)}}>
                <Image className="py-auto mb-2 mt-2" style={{width: '65px', height: '65px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}
                src={!this.state.userData || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle/>
              <p className="my-auto ml-4" style={{color: 'white'}}>{user.pseudo ? user.pseudo : user.id}</p>
            </Row>
        ))
      );
    }

    messageDetail = () => {
      return (
        this.state.messages.map(message =>
          message.userId === this.state.userId ?
          <div key={message.date}>
            <Row className="p-2 mt-2 mr-3 senderMsg ml-auto" style={{backgroundColor: this.state.client !== "shop" ? '#3E415E' : '#7FB780'}}>
              {message.message}
            </Row>
            <Row className="mr-3 msgDate ml-auto">
              {new Date(message.date).toLocaleDateString() + " " + new Date(message.date).getHours() + ":" + new Date(message.date).getMinutes()}
            </Row>
          </div> :
          <div key={message.date}>
            <Row key={message.date} className="p-2 mt-2 ml-3 receiverMsg">
              {message.message}
            </Row>
            <Row className="msgDate ml-3">
              {new Date(message.date).toLocaleDateString() + " " + new Date(message.date).getHours() + ":" + new Date(message.date).getMinutes()}
            </Row>
          </div>
        )
      );
    }

    render() {

        return (
          <div className={this.state.client === 'shop' ? 'shopBg' : 'infBg'}>
            <Row>
              <Col md={3} className="ml-4 pl-4 mt-4" style={{boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)", height: '95vh'}}>
                <h1 style={{color: 'white', fontWeight: '300'}} className="mb-4">Messagerie</h1>
                {this.state.channels && this.listContact()}
              </Col>
              {this.state.index !== -1 ? <Col md={8} className="ml-4 pl-4 mt-4" style={{boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)", height: '95vh'}}>
              <h1 style={{color: 'white', fontWeight: '300'}} className="mb-4">{this.state.currentDest}</h1>
               <div style={{height: '80%',  overflow: 'scroll'}}>
                {this.state.messages && this.messageDetail()}
               </div>
                <Row className="mt-4 mb-4 align-items-end">
                 <Col md={10}>
                   <Form.Control onChange={this.handleChange} value={this.state.msg} className="inputComment" type="text" placeholder="Message" />
                 </Col>
                 <Col md={1} className="my-auto" type="submit">
                   <SendIcon onClick={this.handleSendMessage} style={{color: "#3E415E", width: "1.5rem", height: "1.5rem"}}/>
                 </Col>
               </Row>
             </Col> :
             <Col md={8} className="ml-4 pl-4 mt-4">
             <h3 style={{color: 'white', fontWeight: '300'}}>Auncun message sélectionné </h3>
            </Col>}
           </Row>
          </div>
        );
    }
}
