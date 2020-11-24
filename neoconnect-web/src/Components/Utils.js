import React from 'react';
import avatar from "../assets/noImageFindInf.jpg";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

export const displayComment = (item) => {
  return (
    <Row key={item.id} xs={2} md={2} lg={2} sm={2} xl={2}>
      <Col xs={2} md={2} lg={2} sm={2} xl={2}>
        <div className="centerBlock" align="center">
          <Image style={{width: '40px', height: '40px'}} src={!item.userPicture || item.userPicture.length === 0 ? avatar : item.userPicture[0].imageData} roundedCircle />
          <p style={{fontWeight: '200', color: 'white'}}>{item.pseudo}</p>
        </div>
      </Col>
      <Col>
        <p style={{color: "white", fontSize: "12px"}}>{`Posté le ${new Date(item.createdAt).toLocaleDateString()}`}</p>
        <p style={{color: "white", marginTop: "15px"}}>{item.comment}</p>
      </Col>
    </Row>
  );
}
