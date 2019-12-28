import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"
import {Grid} from "@material-ui/core";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



class FindInfluencers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            influencersData: null,
        };
    }

    render() {
        return (
            <Grid container justify="center">
                <Loader
                    type="Triangle"
                    color="#292929"
                    height={200}
                    width={200}
                    style={{marginTop: "14rem"}}
                />
            </Grid>
        );
    }
}

export default withRouter(FindInfluencers)