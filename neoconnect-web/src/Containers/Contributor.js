import React from 'react';
import {Grid} from "@material-ui/core";

export default class Contributors extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            back: true,
        }
    }

    render() {
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={{height: "100%"}}>
                <div className="landing-page-mid-div" style={{borderRadius: "12px"}}>
                    <div style={{backgroundImage: "linear-gradient(65deg, rgb(144, 189, 113), #1C8FDC)", marginLeft: "5rem", marginRight: "5rem", marginTop: "-1.5rem", borderRadius: "8px"}}>
                        <h1 style={{color: "white"}}>Contributors</h1>
                    </div>
                </div>
            </Grid>
        );
    }
}
