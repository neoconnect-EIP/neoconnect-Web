import React from 'react';
import { withRouter } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableRow, Grid, Fab }from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "../../index.css"

class Ads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            adsData: null,
        };
    }

    componentDidMount = () => {
        fetch("http://168.63.65.106/inf/me", {
            method: 'GET',
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
        })
            .then(res => {
                res.json();
                this.setState({userData: res})
            })
            .catch(error => console.error('Error:', error));

        if (this.state.userData) {
            fetch(`http://168.63.65.106/offer/${this.userData.id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("Jwt")}`}
            })
                .then(res => {res.json(); console.log("ads: ", res); this.setState({adsData: res})})
                .catch(error => console.error('Error:', error));
        }
    }

    render() {

        function createData(annoncer: string, item: string, startDate: string, endDate: string) {
            return { annoncer, item, startDate, endDate };
        }

        const rows = [
            createData('Gucci', 't-shirt', "01/12/2019", "01/12/2019"),
            createData('Champion', "Sweatshirt", "01/12/2019", "01/12/2019"),
            createData('Louis Vuitton', "Sac banane", "01/12/2019", "01/12/2019"),
            createData('Mike Amiri', "Pantalon", "01/12/2019", "01/12/2019"),
            createData('Dior', "Sneakers", "01/12/2019", "01/12/2019"),
        ];

        console.log("ads: ", this.state.adsData)
        return (
            <div style={{position: "relative", textAlign: "center"}}>
                <h1 style={{marginTop: "30px", marginBottom: "30px"}}>List of your registered ads</h1>
                    <Table>
                        <TableHead style={{backgroundImage: "linear-gradient(65deg, #712121, #982d2d, #ff4343, #982d2d, #712121)"}}>
                            <TableRow>
                                <TableCell align="center" style={{width: "5 rem", color: "white", borderRight: "solid"}}>Annoncer</TableCell>
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
                                        <Fab color="primary" aria-label="add" style={{margin: "5px"}}><AddIcon /></Fab>
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
