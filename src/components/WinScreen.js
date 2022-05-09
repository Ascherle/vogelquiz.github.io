import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ImageView from "./ImageView";

class WinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {

        return <div className="text-center">
            <div className="col-md-6 mx-auto">
                    <ImageView path="./images/ui_elements/Vogel.png" />
                </div>
            <h2>Du hast alle Vögel richtig erkannt!</h2>
            <Button
                onClick={() => { this.props.startNextLevel(); }}
                className="button btn-dark mx-2"
            >
                nächstes Level
            </Button>

            <Button
                onClick={() => { this.props.goToMenu(); }}
                className="button btn-dark mx-2"
            >
                Menü
            </Button>
        </div>;
    }

}
export default WinScreen;
