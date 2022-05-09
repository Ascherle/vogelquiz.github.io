import React, { Component } from "react";

import "../App.css";

class FeedbackLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mt-3">
        <p className="BiggerText">{this.props.feedbackText}</p>
      </div>
    );
  }
}
export default FeedbackLine;
