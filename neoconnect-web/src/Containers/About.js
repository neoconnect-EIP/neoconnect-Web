import React from 'react';
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
            <div className="about">
                <div className="landing-page-mid-div">
                    <div className="about-faq">
                        <h1 style={{textAlign: "center"}}>Neolink</h1>
                        <br/>
                        <h2 style={{textAlign: "center"}}>FAQ</h2>
                        <br/>
                        <h4>Qui somme nous ?</h4>
                        <p> Neoconnect est une plateforme de mise en relation entre les influenceurs et les marques.
                            Nous permettons à nos utilisateurs d'évoluer ensemble.<br/>
                            Le principe est qu'un influenceur voit une offre qui l'intéresse,
                            nous l'aidons à entrer en contact avec la marque de l'offre, la marque lui envoie le produit,
                            l'influenceur le partage sur ses réseaux.
                        </p>
                        <br/>
                        <h4>Qu'est-ce qu'un "neo" influenceurs ?</h4>
                        <p> Est considérer comme neo influenceurs toute personnes éyant au minimum 10.000 followers sur un des reseaux sociaux suivant: <br/>
                            - Instagram <br/> - Twitter <br/> - Facebook <br/> - Snapchat <br/> - Youtube <br/> - Twitch
                        </p>
                        <br/>
                        <h4>Est-ce gratuit ?</h4>
                        <p> Si vous êtes un influenceur, oui c'est totalement gratuit !<br/>
                            Si vous êtes une marque ou une boutique, vous aurez un abonnement à payer
                        </p>
                        <br/>
                        <h4>Pourquoi utiliser Neoconnect ?</h4>
                        <p> En tant qu'influenceur, utiliser Neoconnect peut vous permettre de gagner
                            en visibilité (et donc en followers) ainsi que gagner un produit qui peut vous intéresser.<br/>
                            Et tout ça juste en publiant sur vos réseaux sociaux favoris !<br/>
                            En tant que marque, utiliser Neoconnect peut vous permettre de gagner en visiblité sans passer par
                            une agence de commiunication et donc de dépenser une fortune !<br/>
                            Vous pourrez ainsi grandir et évoluer ensemble en collaborant !
                        </p>
                        <br/>
                        <h4>Pourquoi nous et pas quelque chose d'autre ?</h4>
                        <p> Notre platforme contrairement aux autres services de mise en relation influenceurs/commerces, s'adresse à une clientel plus accessible.<br/>
                            Si vous débutez en tant qu'influenceurs ou en tant que commercants notre platforme est la mieu adapter a vos objectifs.
                        </p>
                        <br/>
                        <h4>Quel sont les marques qui travail avec vous ?</h4>
                        <p>L'ensemble de nos collaborateurs se trouve dans la rubrique "Nos collaborateurs"</p>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

