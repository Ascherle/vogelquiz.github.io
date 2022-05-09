import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ImageView from "./ImageView";



class LoseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePath: "./images/ui_elements/Stopwatch.png",
            loseMessage: "Verloren"

        }

    }


    render() {

        return (
            <div className="container col-12 text-center">
                <div className="col-md-6 mx-auto">
                    <ImageView path={this.state.imagePath} />
                </div>
                <h2 className="text-center">{this.state.loseMessage}</h2>
                <div className="text-center">
                    <Button
                        onClick={() => { this.props.restartCurrentLevel(); }}
                        className="button mx-2 btn-dark"
                    >
                        Erneut versuchen
                    </Button>

                    <Button
                        onClick={() => { this.props.goToMenu(); }}
                        className="button mx-2 btn-dark"
                    >
                        Zurück zum Menü
                    </Button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        if (this.props.reasonForLoss == 0) {
            this.setState({
                loseMessage: "Du hast keine Zeit mehr.",
                imagePath: "./images/ui_elements/Stopwatch.png"
            });
        }
        else {
            this.setState({
                loseMessage: "Du hast keine Leben mehr.",
                imagePath: "./images/ui_elements/Heart_broken.png"
            });
        }
    }
}
export default LoseScreen;
