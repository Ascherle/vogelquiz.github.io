import React, { Component } from "react";

import GuessedBirdItem from "./GuessedBirdItem";

import Container from "react-bootstrap/Container";

class GuessedBirds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="row">{this.createListOfGuessedBirds()}</div>;
  }

  createListOfGuessedBirds() {
    let items = [];
    let itemsReversed = [];

    for (let index = 0; index < this.props.birdList.length; ++index) {
      items.push(
        <GuessedBirdItem
          key={this.props.birdList.index}
          birdList={this.props.birdList}
          index={index}
        ></GuessedBirdItem>
      );
    }
    items.reverse();

    return items;
  }
}
export default GuessedBirds;
