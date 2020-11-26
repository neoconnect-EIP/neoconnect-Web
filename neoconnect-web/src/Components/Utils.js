import React from 'react';
import avatar from "../assets/noImageFindInf.jpg";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { Line } from 'react-chartjs-2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const displayComment = (item) => {
  return (
    <Row key={item.id} xs={2} md={2} lg={2} sm={2} xl={2}>
      <Col xs={2} md={2} lg={2} sm={2} xl={2}>
        <div className="centerBlock" align="center">
          <Image style={{width: '40px', height: '40px'}} src={!item.userPicture || item.userPicture.length === 0 ? avatar : item.userPicture[0].imageData} roundedCircle />
          <p style={{fontWeight: '200', color: item.color ? 'black' : 'white'}}>{item.pseudo}</p>
        </div>
      </Col>
      <Col>
        <p style={{color: item.color ? 'black' : 'white', fontSize: "12px"}}>{`Posté le ${new Date(item.createdAt).toLocaleDateString()}`}</p>
        <p style={{color: item.color ? 'black' : 'white', marginTop: "15px"}}>{item.comment}</p>
      </Col>
    </Row>
  );
}

export const displaySocialMed = (socialM , srcImg) => {
  if (socialM) {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            {socialM}
          </Tooltip>
        }
        >
        <Image className="iconProfileSocial" src={srcImg}/>
      </OverlayTrigger>
    )
  }
}

function getData(socialMedia, followers, name, color, legend) {
  let data = {
    labels: (legend && legend[0]) ? legend : [],
    datasets: [
      {
        label: name,
        backgroundColor: 'transparent',
        borderColor: color,
        borderWidth: 2,
        hoverBackgroundColor: color,
        hoverBorderColor: color,
        data: followers ? followers : []
      }
    ]
  };
  return data;
}

export const displayLoad = () => {
  return (
    <Loader
      type="Triangle"
      color="#fff"
      height={200}
      width={200}
      style={{ position: 'absolute', top: "45%", left: '45%'}}
      />
  );
}

export const displayGraph = (item) => {

  const graphOpt = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        }
      }]
    }
  }

  return (
    <div className="ml-4">
      <h2 className="mb-4" style={{color: 'white', fontWeight: '300'}}>Avancées</h2>
      <Row className="ml-4 mt-4 mx-0 pb-3">
        <Col>
          <div>
            <Line
              data={getData(item.youtube, item.youtubeNb, 'Youtube', '#EA3323', item.youtubeUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
        <Col>
          <div>
            <Line
              data={getData(item.twitch, item.twitchNb, 'Twitch', '#603DB0', item.twitchUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
      </Row>
      <Row className="ml-4 mt-4 mx-0 pb-3">
        <Col>
          <div>
            <Line
              data={getData(item.twitter, item.twitterNb, 'Twitter', '#68A8EB', item.twitterUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
        <Col>
          <div>
            <Line
              data={getData(item.instagram, item.instagramNb, 'Instagram', '#D94179', item.instagramUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
      </Row>
      <Row className="ml-4 mt-4 mx-0 pb-3">
        <Col>
          <div>
            <Line
              data={getData(item.facebook, item.facebookNb, 'Facebook', '#3876EA', item.facebookUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
        <Col>
          <div>
            <Line
              data={getData(item.pinterest, item.pinterestNb, 'Pinterest', '#E70022', item.pinterestUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
      </Row>
      <Row className="ml-4 mt-4 mx-0 pb-3">
        <Col>
          <div>
            <Line
              data={getData(item.tiktok, item.tiktokNb, 'Tiktok', '#000000', item.tiktokUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
        <Col>
          <div>
            <Line
              data={getData(item.snapchat, item.snapchatNb, 'Snapchat', '#FCEC60', item.snapchatUpdateDate)}
              width={200}
              height={250}
              options={graphOpt}
              />
          </div>
        </Col>
      </Row>
    </div>
  );
}
