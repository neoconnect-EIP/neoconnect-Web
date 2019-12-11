import React from 'react';
import {Grid} from "@material-ui/core";
import "./index.css"

export default class About extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    render() {
        return (
            <Grid className="about-faq" container>
                <Grid item xs={12} style={{marginBottom: "50px"}}>
                    <h1 style={{textAlign: "center", color: "white", marginBottom: "20px"}}>Neoconnect</h1>
                    <h2 style={{textAlign: "center", color: "white"}}>FAQ</h2>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Qui somme nous ?</h4>
                    <p> Neoconnect est une plateforme de mise en relation entre les influenceurs et les marques.
                        Nous permettons à nos utilisateurs d'évoluer ensemble.<br/>
                        Le principe est qu'un influenceur voit une offre qui l'intéresse,
                        nous l'aidons à entrer en contact avec la marque de l'offre, la marque lui envoie le produit,
                        l'influenceur le partage sur ses réseaux.
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Qu'est-ce qu'un "neo" influenceurs ?</h4>
                    <p> Est considérer comme neo influenceurs toute personnes éyant au minimum 10.000 followers sur un des reseaux sociaux suivant: <br/>
                    <ul>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>Sanpchat</li>
                        <li>Youtube</li>
                        <li>Twitch</li>
                    </ul>
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Est-ce gratuit ?</h4>
                    <p> Si vous êtes un influenceur, oui c'est totalement gratuit !<br/>
                        Si vous êtes une marque ou une boutique, vous aurez un abonnement à payer
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Pourquoi utiliser Neoconnect ?</h4>
                    <p> En tant qu'influenceur, utiliser Neoconnect peut vous permettre de gagner
                        en visibilité (et donc en followers) ainsi que gagner un produit qui peut vous intéresser.<br/>
                        Et tout ça juste en publiant sur vos réseaux sociaux favoris !<br/>
                        En tant que marque, utiliser Neoconnect peut vous permettre de gagner en visiblité sans passer par
                        une agence de commiunication et donc de dépenser une fortune !<br/>
                        Vous pourrez ainsi grandir et évoluer ensemble en collaborant !
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Pourquoi nous et pas une autre platforme ?</h4>
                    <p> Notre platforme contrairement aux autres services de mise en relation influenceurs/commerces, s'adresse à une clientel plus accessible.<br/>
                        Si vous débutez en tant qu'influenceurs ou en tant que commercants notre platforme est la mieu adapter a vos objectifs.
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Quel sont les marques qui travail avec vous ?</h4>
                    <p>L'ensemble de nos collaborateurs se trouve dans la rubrique "Nos collaborateurs"</p>
                </Grid>
            </Grid>
        );
    }
}

