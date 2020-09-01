import React from 'react';
import "./index.css"
import {Icon} from "antd";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import noAvatar from "../assets/noImageFindInf.jpg";
import SendIcon from '@material-ui/icons/Send';


// TODO shop: props.location.state.profile,

export default class Message extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            email: "",
            subject: "",
            message: "",
            userId: 2,
            to: "",
            shop: false,
            msg: "",
            index: 0,
            contact: [
              {pseudo: 'Martin', msg: "lorem Ipsum"},
              {pseudo: 'tata', msg: "Hello World"},
              {pseudo: 'maxime', msg: "bye bye"},
              {pseudo: 'manon', msg: "thank you"}
          ],
          messages: [{idUser: 1, msg: "Bonjour"},
          {idUser: 2, msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate lorem placerat nibh tincidunt, at vulputate sapien gravida. Maecenas sit amet nulla ut nibh consequat luctus"},
          {idUser: 1, msg: "Sed ornare, mi at iaculis euismod, nibh eros consectetur nisl, quis volutpat felis mi ut diam.r"},
          {idUser: 2, msg: "Curabitur non neque mauris. Ut et erat non leo faucibus sagittis at vitae libero. Fusce id cursus sapien. Aliquam tincidunt odio at erat aliquet ultricies. "},
          {idUser: 2, msg: "Au revoir"},
          ],
          userData: null
        };
    }

    handleSend = () => {
        var body = {
            "pseudo": this.state.pseudo,
            "email": this.state.email,
            "subject": this.state.subject,
            "message": this.state.message,
            "to": this.state.to,
        };
        body = JSON.stringify(body);
        fetch("http://168.63.65.106/user/contact", { method: 'POST', body: body,headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}})
            .then(res => { res.json(); this.handleResponse(res)})
            .catch(error => console.error('Error:', error));
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

    listContact = () => {
      return (
        this.state.contact.map((user, id) => (
          id == this.state.index ?
            <Row className="pl-2 messageUser messageUserOn" onClick={() => {this.setState({index: id})}}>
                <Image className="py-auto mb-2 mt-2" style={{width: '65px', height: '65px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}
                src={!this.state.userData || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle/>
                <p className="my-auto ml-4" style={{color: 'white'}}>{user.pseudo}</p>
            </Row> :

            <Row className="pl-2 messageUser" onClick={() => {this.setState({index: id})}}>
                <Image className="py-auto mb-2 mt-2" style={{width: '65px', height: '65px', objectFit: 'cover', boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.14)"}}
                src={!this.state.userData || this.state.userData.userPicture.length === 0 ? noAvatar : this.state.userData.userPicture[0].imageData} roundedCircle/>
                <p className="my-auto ml-4" style={{color: 'white'}}>{user.pseudo}</p>
            </Row>
        ))
      );
    }

    messageDetail = () => {
      return (
        this.state.messages.map(message =>
          message.idUser == this.state.userId ?
            <Row className="p-2 mt-2 mr-3 senderMsg  ml-auto">
              {message.msg}
            </Row> :
            <Row className="p-2 mt-2 ml-3 receiverMsg">
              {message.msg}
            </Row>

        )
      );
    }

    handleChange = (e) => {
      this.setState({msg: e.target.value});
    };

    handleSendMessage = () => {
      //TODO
    };

    render() {
        return (
          <div className={this.state.shop == true ? "shopBg" : "infBg"}>
            <Row>
              <Col md={3} className="ml-4 pl-4 mt-4" style={{boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)"}}>
                <h1 style={{color: 'white', fontWeight: '300'}} className="mb-4">Messagerie</h1>
                {this.listContact()}
              </Col>
              <Col md={8} className="ml-4 pl-4 mt-4" style={{boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.14)", height: '95vh'}}>
                <h1 style={{color: 'white', fontWeight: '300'}} className="mb-4">{this.state.contact[this.state.index].pseudo}</h1>
               <div style={{height: '80%'}}>
                {this.messageDetail()}
               </div>
               <Row className="mt-4 mb-4 align-items-end">
                 <Col md={10}>
                   <Form.Control onChange={this.handleChange} value={this.state.msg} className="inputComment" type="text" placeholder="Message" />
                 </Col>
                 <Col md={1} className="my-auto" type="submit">
                   <SendIcon onClick={this.handleSendMessage} style={{color: "#3E415E", width: "1.5rem", height: "1.5rem"}}/>
                 </Col>
               </Row>
              </Col>
            </Row>
          </div>
        );
    }
}
