import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab } from '@material-ui/core/';
import "../index.css"

class FindShop extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shopList: null,
        };
    }

    componentDidMount() {
        fetch("http://168.63.65.106/inf/listShop", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({shopList: res}))
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default withRouter(FindShop)
