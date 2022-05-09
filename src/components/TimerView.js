import React, { Component } from "react";

import { observer } from "mobx-react";
import TimerLogic from "../background/TimerLogic";

var intId = 0;

const myTimer = new TimerLogic();
//myTimer.secondsPassed = 300;
myTimer.startDecTimer();
// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const MyTimerView = observer(({ timerV }) => (
  <span>Verbleibende Zeit: {timerV.secondsPassed}</span>
));

class TimerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outOfTime: false,
    };
  }


  setTimer(newSeconds) {
    myTimer.secondsPassed = newSeconds;
  }


  render() {
    return (
      <div>
        <MyTimerView timerV={myTimer} />
      </div>
    );
  }


  checkTimerDone() {
    if (myTimer.secondsPassed <= 0) {
      this.setState({
        outOfTime: true,

      });
      // also update LevelBuilder
      this.props.notifyTimeout();
      clearInterval(intId);
    }
  }


  componentDidMount() {
    console.log("TimerView.componentDidMount() being invoked");

    this.setTimer(this.props.secondsPassed);

    // timer to check mobx timer
    intId = setInterval(() => {
      this.checkTimerDone()
    }, 1000)

  }

  compontentDidUpdate() {
    console.log("TimerView.componentDidUpdate() being invoked");

  }


}
export default TimerView;