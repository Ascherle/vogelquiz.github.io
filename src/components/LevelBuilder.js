import React, { Component } from "react";
import "../App.css";
import LifeDisplay from "./LifeDisplay";
import Images from "./Images";
import SkipButton from "./SkipButton";
import FeedbackLine from "./FeedbackLine";
import ButtonList from "./ButtonList";
import GuessedBirds from "./GuessedBirds";
import Button from "react-bootstrap/Button";

//  mobx Timer Zeug
import { observer } from "mobx-react"
import TimerView from "./TimerView";




var emptyList = [];

var livesAtStart = 6;

class LevelBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      birdList: [],

      guessedBirdsList: [],

      currentImageIndex: 0,
      numberOfLives: 5,
      currentLevel: 1,
      userFeedback: "Welcher Vogel ist hier dargestellt?",
      reasonForLoss: "No Hearts",

      secondsOnTimer: 300,
    };
  }

  render() {
    console.log("LevelBuilder.render() being invoked");

    return (
      <div className="text-center">

        <br></br>
        <p className="Handwritten">Level {this.props.currentLevel}</p>

        <div>
          <TimerView
            secondsPassed={this.state.secondsOnTimer}
            notifyTimeout={() => this.triggerTimeout()}
          />
        </div>

        <div className="container col-6">
          <LifeDisplay lifeCounter={this.state.numberOfLives} />
        </div>

        <div className="container col-12 text-center">
          <SkipButton
            indexToSkip={this.state.currentImageIndex}
            onButtonPress={() => this.chooseNewRandomImage()}
          />

          <Button
            onClick={() => { this.props.goToMenu(); }}
            className="btn-dark btn-sm mx-2"
          >
            Level abbrechen
          </Button>

          <FeedbackLine
            className="col-2"
            feedbackText={this.state.userFeedback} />
        </div>
        <div className="container col-md-6 col-lg-6 col-xl-6 mx-auto">
          <Images
            imageIndex={this.state.currentImageIndex}
            imageList={this.state.birdList}
          />
        </div>


        <ButtonList
          onButtonPress={(buttonIndex) => this.checkAnswer(buttonIndex)}
          buttonIds={this.state.birdList}
        />

        <GuessedBirds birdList={this.state.guessedBirdsList} />
      </div>
    );
  }



  checkAnswer(theButtonIndex) {

    if (theButtonIndex === this.state.currentImageIndex) {
      //anser correct
      this.addObjectToGuessedBirdsList(this.state.birdList[theButtonIndex]);
      this.removeObjectFromBirdList(theButtonIndex);
      this.chooseNewRandomImage();
      this.state.userFeedback = this.state.birdList[theButtonIndex].text + " war Richtig! Und weiter geht's ...";
    } //answer wrong
    else {
      this.subtractOneLife();
      this.state.userFeedback = "Falsch! Dieser Vogel ist kein(e) " + this.state.birdList[theButtonIndex].text + "!";
    }

  }

  endLevel(reason) {
    this.props.setReasonForLoss(reason);
  }

  subtractOneLife() {
    let newNumber = this.state.numberOfLives - 1;
    if (newNumber >= 0) {
      this.setState({
        numberOfLives: newNumber,
      });
    }
    if (this.state.numberOfLives <= 1) {
      this.setState({
        reasonForLoss: "Out of Hearts"
      })
      this.endLevel("Out of Hearts");
    }
  }

  setLivesToZero() {
    this.setState({
      numberOfLives: 0,
    });
    //this.props.setReasonForLoss("Timeout");
  }

  triggerTimeout() {
    this.setState({
      reasonForLoss: "Out of Time",
    });
    this.endLevel("Out of Time");
  }



  chooseNewRandomImage() {
    let maxIndex = this.state.birdList.length - 1;
    let randomNum = this.randomIntInc(0, maxIndex) - 1;
    if (randomNum > maxIndex || randomNum < 0) {
      randomNum = 0;
    }
    this.setState({
      currentImageIndex: randomNum,
    });
  }

  chooseNewRandomImageExclude(excludedNum) {
    let maxIndex = this.state.birdList.length - 1;
    let randomNum = this.randomIntInc(0, maxIndex) - 1;
    if (randomNum > maxIndex || randomNum < 0 || randomNum == excludedNum) {
      randomNum = 0;
    }
    this.setState({
      currentImageIndex: randomNum,
    });
  }

  randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

  removeObjectFromBirdList(theButtonIndex) {
    // copy original array
    let newbirdList = this.state.birdList.slice();
    newbirdList.splice(theButtonIndex, 1);

    // set new state forcing the component to re-render
    this.setState({
      birdList: newbirdList,
    });
  }

  addObjectToGuessedBirdsList(birdObject) {
    let newGuessedBirdsList = this.state.guessedBirdsList.slice();
    newGuessedBirdsList.push(birdObject);
    this.setState({
      guessedBirdsList: newGuessedBirdsList,
    });
  }

  fillLevel(contentForBirdList, numberOfHearts) {
    console.log("App.componentWillMount() being invoked");

    this.setState({
      birdList: contentForBirdList,
    });

    this.setState({
      numberOfLives: numberOfHearts,
    });
    var newGuessedBirdsList = emptyList.slice();
    this.setState({
      guessedBirdsList: newGuessedBirdsList,
    });
  }

  componentWillMount() {
    var numberOfLives = livesAtStart;
    var myList = this.props.currentBirdList;

    this.fillLevel(myList, numberOfLives);


  }

  componentDidMount() {
    console.log("App.componentDidMount() being invoked");

  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("App.componentWillUpdate() being invoked");
  }

  componentDidUpdate() {
    console.log("App.componentDidUpdate() being invoked");
    if (this.state.numberOfLives == 0) {
      //this.props.notifyLoss();
    }
    if (this.state.birdList.length == 0) {
      this.props.notifyWin();
    }
  }
}
export default LevelBuilder;
