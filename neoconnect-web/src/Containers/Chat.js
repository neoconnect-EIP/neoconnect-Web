import React from 'react';
import {Grid, List, ListItem, ListItemAvatar, Avatar, TextField} from "@material-ui/core";
import "./index.css"

import ImageIcon from '@material-ui/icons/Image';

export default class About extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            contacts: [{id: 1}],
            convId: 0,
        };
    }

    componentDidMount = () => {
        fetch("http://168.63.65.106/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({contacts: res}))
            .catch(error => console.error('Error:', error));
    }

    changeConv = (id) => {
        this.setState({convId: id})
    }

    listItem = (item) => {
      return (
          <ListItem onClick={() => this.changeConv(item.id)}>
              <ListItemAvatar>
                  <Avatar>
                      <ImageIcon />
                  </Avatar>
              </ListItemAvatar>
              <Grid container>
                  <Grid item xs={12}>
                      <p style={{fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0", paddingTop: "0.5rem"}}>persone 1</p>
                  </Grid>
                  <Grid item xs={12}>
                      <p style={{fontSize: "0.80rem", color: "#292929"}}>last message</p>
                  </Grid>
              </Grid>
          </ListItem>
      );
    };

    render() {
        return (
            <Grid container>
                <Grid xs={3} style={{borderRight: "1px solid #292929", height: "100vh"}}>
                    <List>
                        {
                            this.state.contacts ?
                                this.state.contacts.map(item => (
                                    this.listItem(item)
                                    )
                                )
                                :
                                <h5 style={{color: "#797979", textAlign: "center", marginTop: "49vh"}}>Aucuns contact pour le moment</h5>
                        }
                    </List>
                </Grid>
                <Grid item xs={9} style={{height: "100vh"}}>
                    <div style={{height: "90vh", width: "100%"}}>

                    </div>
                    <TextField style={{marginLeft: "2rem", backgroundColor: "#d9d9d9", borderRadius: "8px", width: "90%"}} multiline rowsMax="4" placeholder="écrivez un message..."/>
                </Grid>
            </Grid>
        );
    }
}

