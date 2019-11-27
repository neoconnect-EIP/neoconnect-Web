import React from 'react';
import { withRouter } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableRow, Modal, Fab, TextField, Grid }from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import "../../index.css"

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adsData: null,
            visible: false,
            acutalId: null,
            message: "",
        };
    }

    componentDidMount = () => {
        fetch(`http://168.63.65.106/offer/${localStorage.getItem("userId")}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => res.json())
            .then(res => this.setState({adsData: res}))
            .catch(error => console.error('Error:', error));
    }


    handleVisibleModal = () => {
        this.setState({visible: !this.state.visible})
    }

    handleSendMail = () => {
        let body = {
            "message": this.state.message,
        };
        body = JSON.stringify(body);
        fetch(`http://168.63.65.106/sendMail/${localStorage.getItem("userId")}/id`, {
            method: 'POST',
            body: body,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {res.json(); console.log("ads: ", res); this.setState({adsData: res})})
            .catch(error => console.error('Error:', error));
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    }

    render() {

        function createData(id: int, annoncer: string, item: string, startDate: string, endDate: string) {
            return { id, annoncer, item, startDate, endDate };
        }

        const rows = [
            createData(1,'Philip Perou', 't-shirt', "01/12/2019", "01/12/2019"),
            createData(2,'Amine Mojito', "Sweatshirt", "01/12/2019", "01/12/2019"),
            createData(3,'Louis Norris', "Sac banane", "01/12/2019", "01/12/2019"),
            createData(4,'Michael cohen', "Pantalon", "01/12/2019", "01/12/2019"),
            createData(5,'Amanda Tyler', "Sneakers", "01/12/2019", "01/12/2019"),
        ];

        return (
            <div style={{position: "relative", textAlign: "center"}}>
                <Modal
                    open={this.state.visible}
                    onClose={() => this.handleVisibleModal()}
                >
                    <Grid container style={{width: "800px", height: "350px", position: "relative", marginTop: "300px", marginLeft: "auto", marginRight: "auto", backgroundColor: "white", textAlign: "center"}}>
                        <Grid item xs={12} style={{backgroundImage: "linear-gradient(65deg, #712121, #982d2d, #ff4343, #982d2d, #712121)"}}>
                            <h2 style={{color: "white"}}>Contact candidat</h2>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows="8"
                                margin="normal"
                                variant="outlined"
                                style={{width: "700px", height: "160px"}}
                                value={this.state.message}
                                onChange={(value) => this.handleMessageChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} alignItems="center" justify="center">
                            <Fab class="posted-ad-send-button"
                                 onClick={() => this.handleSendMail()}
                            >
                                <EmailIcon style={{marginRight: "5px"}}/>
                                Send
                            </Fab>
                        </Grid>
                    </Grid>
                </Modal>
                <h1 style={{marginTop: "30px", marginBottom: "30px"}}>List of your posted ads</h1>
                <Table>
                    <TableHead style={{backgroundImage: "linear-gradient(65deg, #712121, #982d2d, #ff4343, #982d2d, #712121)"}}>
                        <TableRow>
                            <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Candidats</TableCell>
                            <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Item</TableCell>
                            <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>Start at</TableCell>
                            <TableCell style={{width: "5 rem", color: "white", borderRight: "solid"}}>End at</TableCell>
                            <TableCell style={{width: "5 rem", color: "white"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow style={{height: "2 rem"}}>
                                <TableCell align="center" style={{width: "5 rem"}}>{row.annoncer}</TableCell>
                                <TableCell align="center" style={{width: "5 rem"}}>{row.item}</TableCell>
                                <TableCell align="center" style={{width: "5 rem"}}>{row.startDate}</TableCell>
                                <TableCell align="center" style={{width: "5 rem"}}>{row.endDate}</TableCell>
                                <TableCell align="center" style={{width: "5 rem"}}>
                                    <Fab color="primary" aria-label="add" style={{margin: "5px"}} onClick={() => this.handleVisibleModal()}><ContactMailIcon /></Fab>
                                    <Fab color="secondary" aria-label="edit" style={{margin: "5px"}}><EditIcon /></Fab>
                                    <Fab aria-label="delete" style={{margin: "5px"}}><DeleteIcon /></Fab>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withRouter(Ads)
