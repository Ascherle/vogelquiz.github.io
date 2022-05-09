import React, { Component } from "react";

import classes from "./LifeDisplay.module.css";

const heartImages = [];

class LifeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: "images/ui_elements/Heart.png",
    };
  }

  render() {
    return (
      <div  className="container mt-1 mb-2">
        {this.fillDivWithHearts(this.props.lifeCounter)}
      </div>
    );
  }

  fillDivWithHearts(numberOfHearts) {
    let heartImgs = [];
    for (let i = 1; i <= numberOfHearts; ++i) {
      heartImgs.push(<img key={i} src={this.state.imagePath} alt="heart" className="col-2 col-sm-2 col-md-2 col-lg-1"/>);
    }

    return heartImgs;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("App.componentWillUpdate() being invoked");
    this.fillDivWithHearts(this.props.lifeCounter);
  }
}
export default LifeDisplay;

//className={classes.hearts}
