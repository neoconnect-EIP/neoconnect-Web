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
            <Grid className="about-faq" className="shopBgX" container style={{backdropFilter: "blur(8px) brightness(50%)"}}>
                <Grid item xs={12} style={{marginBottom: "50px"}}>
                    <h2 style={{textAlign: "center", color: "white"}}>FAQ</h2>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Qu’est-ce que Neoconnect ?</h4>
                    <p style={{color: "white"}}>
                      Neoconnect est une plateforme de mise en relation entre les influenceurs et les marques.<br/>
                      Nous privilégions une évolution coopérative pour nos utilisateurs. Le principe sera qu’un influenceur aura accès à une liste de d’offres auxquelles il pourra postuler.
                      Si la marque accepte sa candidature, elle devra lui envoyer le produit que l’influenceur devra partager sur ses réseaux sociaux.
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                  <h4 style={{color: "white"}}>Pourquoi utiliser Neoconnect ?</h4>
                  <p style={{color: "white"}}> En tant qu’influenceur, utiliser Neoconnect vous permettra de gagner en visibilité et donc gagner des abonnés. De plus vous gagnerez un produit qui devra être partager sur vos réseaux sociaux.
                    En tant que marque, utiliser Neoconnect vous permettra de gagner en visibilité et donc avoir plus de clientèles sans passer par une agence de communication.
                  </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Est-ce gratuit ?</h4>
                    <p style={{color: "white"}}> Oui, Neoconnect est entièrement gratuite pour les influenceurs mais un abonnement sera obligatoire pour les marques.
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                  <h4 style={{color: "white"}}>Sur quels appareils est disponible l’application ? </h4>
                  <p style={{color: "white"}}>
                    Pour l’application mobile Android, il faut un appareil avec Android 8.0 minimum.
                    Pour l’application mobile iOS, il faut un appareil avec iOS 13 minimum.
                  </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Pourquoi nous et pas un autre service qui nous ressemble ? </h4>
                    <p style={{color: "white"}}>
                      Avec nous, n’importe votre domaine, que ce soit High Tech, Mode, Cosmétique, Sport, Jeu Vidéo ou Food, vous trouverez des offres ou des influenceurs qui vous conviendront.
                    </p>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: "50px", paddingRight: "50px", marginBottom: "30px"}}>
                    <h4 style={{color: "white"}}>Quels langages seront disponibles ? </h4>
                    <p style={{color: "white"}}>L’application et le site seront disponibles uniquement en français pour commencer. </p>
                </Grid>
            </Grid>
        );
    }
}
