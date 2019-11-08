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
                        <h1>Neolink</h1>
                        <br/>
                        <h2>FAQ</h2>
                        <br/>
                        <h3>Qui somme nous ?</h3>
                        <p> Neolink est une platform de mise en relation entre les nouvelles marques et les "neo" influenceurs</p>
                        <br/>
                        <h3>Qu'est-ce qu'un "neo" influenceurs ?</h3>
                        <p>Est considérer comme neo influenceurs toute personnes éyant au minimum 10.000 followers sur un des reseaux sociaux suivant: <br/>
                            instagram <br/> twitter <br/> facebook </p>
                        <br/>
                        <h3>Quel sont les marques qui travail avec vous ?</h3>
                        <p>L'ensemble de nos collaborateurs se trouve dans la rubrique "Nos collaborateurs"</p>
                    </div>
                </div>
            </div>
        );
    }
}

