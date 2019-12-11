import React from 'react';
import { withRouter } from "react-router-dom"
import { Button, Fab, Grid} from '@material-ui/core/';
import { Steps, message} from 'antd';
import "../index.css"

const { Step } = Steps;

const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];


class PostAd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productImg: null,
            productName: "",
            productSex: "",
            productDesc: "",
            productSubject: "",
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    handleSubmit = () => {
        let body = {
            "productImg": this.state.productImg,
            "productName": this.state.productName,
            "productSex": this.state.productSex,
            "productDesc": this.state.productDesc,
            "productSubject": this.state.productSubject,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/offer/insert`, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); this.setState({adsData: res})})
            .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid container style={{backgroundColor: "white", width: "100%", height: "120px", position: "fixed", zIndex: "10", boxShadow: "0 0px 12px"}}>
                    <h1 style={{marginTop: "30px", marginBottom: "30px", color: "black", position: "relative", marginLeft: "auto", marginRight: "auto"}}>Création d'une annonce</h1>
                </Grid>
                <Grid container style={{marginTop: "130px", padding: "25px"}}>
                    <Steps current={this.state.current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <Grid item className="steps-content" xs={12}>{steps[this.state.current].content}</Grid>
                    <Grid container className="steps-action" xs={12} justify="center">
                        <Grid item xs={6}>
                            <Button disable={this.state.current > 1} style={{backgroundColor: "red"}} onClick={() => this.prev()}>
                                Previous
                            </Button>
                            <Button style={{backgroundColor: "red"}} onClick={() => this.next()}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(PostAd)