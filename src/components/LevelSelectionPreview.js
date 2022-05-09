import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import ImageView from "./ImageView";


class LevelSelectionPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: ""
    };

  }



  render() {
    return (

      <div class="mb-5">


        <div class="mb-3">
          <ImageView
            path={this.props.imagePath} />
        </div>


        <div className="pull-left">

          <p className="pull-left">{this.props.description}</p>
        </div>

        <div>
          <Button
            onClick={() => {
              this.props.onButtonPress(this.props.levelNumber);
            }}
            className="button btn-dark col-4" disabled={this.props.errorMessage.length>0}
          >
            Level {this.props.levelNumber} 
          </Button>
            <p className="small text-danger">{this.props.errorMessage}</p>
        </div>

      </div>

    );
  }




}
export default LevelSelectionPreview;
