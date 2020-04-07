import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import {Card, Grid, CardMedia, CardContent, CardActionArea} from "@material-ui/core";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



class InfluencerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infData: null,
        };
    }

    componentDidMount = () => {
        let id = this.getUrlParams((window.location.search));

        fetch(`http://168.63.65.106/inf/${id.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({infData: res}))
            .catch(error => console.error('Error:', error));
    };

    getUrlParams = (search) => {
        if (search === "")
            return null;
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, {[key]: decodeURIComponent(val)})
        }, {})
    }

    render() {
        return (
            <Grid container justify="center">
                {
                    this.state.infData ?
                        <Grid contaiener justify="center">
                        </Grid>
                        :
                        <Loader
                            type="Triangle"
                            color="#292929"
                            height={200}
                            width={200}
                            style={{marginTop: "14rem"}}
                        />
                }
            </Grid>
        );
    }
}

export default withRouter(InfluencerProfile)