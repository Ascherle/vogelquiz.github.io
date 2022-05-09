import React, { Component } from "react";
import ImageView from "./ImageView";
import Container from "react-bootstrap/Container";
import classes from "./GuessedBirdItem.module.css";
import "../App.css";

class GuessedBirdItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

  render() {
    return (
      <div className={classes.container}>
        <div className="col-md-12 mx-1 my-3 row align-middle">
          <div className="col-md-4 col-sm-4 col-xs-4" >
            <ImageView path={this.props.birdList[this.props.index].path}/>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-8 align-middle">
            <br></br>
            <p className="HandwrittenSm text-white align-middle">{this.props.birdList[this.props.index].text}</p>
          </div>
        </div>
      </div>
    );
  }


}
export default GuessedBirdItem;

//<img src="./images/ui_elements/Background_Website.jpg" className={classes.backgroundImage}/>