import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import classes from "./ButtonList.module.css";

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("ButtonList.render() being invoked");

    return (
      <div className="text-center my-3">
        {this.createButtonList()}
      </div>
    );
  }

  createButtonList() {
    console.log("ButtonList.createButtonList being invoked");
    let items = [];

    for (let index = 0; index < this.props.buttonIds.length; ++index) {
      items.push(
        <Button
          size="lg"
          className="my-2 mx-2 btn-dark"
          key={index}
          id={this.props.buttonIds[index].text}
          onClick={() => {
            this.props.onButtonPress(index);
          }}
        >
          {this.props.buttonIds[index].text}
        </Button>
      );
    }

    return items;
  }
}
export default ButtonList;
