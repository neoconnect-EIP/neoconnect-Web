import React from 'react';

export default class Contributors extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            back: true,
        }
    }

    render() {
        return (
            <div>
                <div className="landing-page-mid-div">
                    <div style={{textAlign: "center", paddingTop: "30px"}}>
                        <h1>Contributors</h1>
                    </div>
                </div>
            </div>
        );
    }
}
