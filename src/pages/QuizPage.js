import React, { Component } from "react";
import {  BrowserRouter,
          Routes,
          Route 
          } from "react-router-dom";
import "../App.css";
import LevelBuilder from "../components/LevelBuilder";
import LoseScreen from "../components/LoseScreen";
import WinScreen from "../components/WinScreen";
import Menu from "../components/Menu";
import QuizDataService from "../components/quiz.service";

var birdsLevel1; //in json

var birdsLevel2;

var birdsLevel3;  // in db

var numberOfTotalLevels = 3;

function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}


class QuizPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      birdList: [],

      guessedBirdsList: [],

      level1ErrorMessage: "",
      level2ErrorMessage: "",
      level3ErrorMessage: "",

      currentLevel: 0,
      playerOutOfHearts: false,
      playerOutOfTime: false,
      reasonForLoss: 0,
      playerGuessedAllBirds: false,

      lreason : "",
      appTitle: "Vogelquiz",
    };
  }

  render() {
    console.log("App.render() being invoked");

    if (
      this.state.currentLevel > 0 &&
      this.state.playerOutOfHearts == false &&
      this.state.playerGuessedAllBirds == false
    ) {
      return (
        <div>
          <h1 id="appTitle">{this.props.title}</h1>

          <LevelBuilder
            currentBirdList={this.state.birdList}
            currentLevel={this.state.currentLevel}
            //notifyLoss={() => this.playerRanOutOfHearts()}
             //notifyLossOfTimeout={() => this.playerRanOutOfTime()}
            setReasonForLoss = {this.setLossData.bind(this)}
            notifyWin={() => this.playerHasWon()}
            goToMenu={() => this.currentLevelToZero()}
          />
        </div>
      );
    }
    if (this.state.currentLevel > 0 && this.state.playerOutOfHearts == true && this.state.playerGuessedAllBirds != true) {
      return (
        <div>

          <h1 id="appTitle">{this.props.title}</h1>

          <LoseScreen
            currentLevel={this.state.currentLevel}
            restartCurrentLevel={() => this.restartLevel()}
            goToMenu={() => this.currentLevelToZero()}
            reasonForLoss={this.state.reasonForLoss}
          />

        </div>
      );
    }
    if (
      this.state.currentLevel > 0 &&
      this.state.playerGuessedAllBirds == true
    ) {
      return (
        <div>
          <h1 id="appTitle">{this.props.title}</h1>

          <WinScreen
            currentLevel={this.state.currentLevel}
            startNextLevel={() =>
              this.setCurrentLevel(parseInt(this.state.currentLevel) + 1)
            }
            goToMenu={() => this.currentLevelToZero()}
          />
        </div>
      );
    } else {
      return (


        <div>
          <Menu
            errorMessage1={this.state.level1ErrorMessage}
            errorMessage2={this.state.level2ErrorMessage}
            errorMessage3={this.state.level3ErrorMessage}
            appTitle={this.state.appTitle}
            onButtonPress={(chosenLevel) => this.setCurrentLevel(chosenLevel)}
          />
        </div>


      );
    }
  }

setLossData(lossReason){

  if(lossReason=="Out of Time"){
    this.setState({
      reasonForLoss: 0
    })
  }
  else{
    this.setState({
      reasonForLoss: 1
    }) 
  }
  this.setState({
    playerOutOfHearts: true,
  });
}

  playerRanOutOfHearts(myreasonForLoss) {
    if(myreasonForLoss=="Timeout"){
      this.setState({
        reasonForLoss: 0
      })
    }
    else{
      this.setState({
        reasonForLoss: 1
      })  
    }
    this.setState({
      playerOutOfHearts: true,
    });
  }
  playerHasWon() {
    this.setState({
      playerGuessedAllBirds: true,
    });
  }

  setCurrentLevel(levelNum) {
    var myBirdList = [];
    if (levelNum == 1) {
      myBirdList = birdsLevel1;
    }
    if (levelNum == 2) {
      myBirdList = birdsLevel2;
    }
    if (levelNum == 3) {
      myBirdList = birdsLevel3;
    }
    if (levelNum > 3) {
      myBirdList = birdsLevel1;
      levelNum = 0;
    }

    this.fillLevel(myBirdList, levelNum);
  }

  restartLevel() {
    this.fillLevel(this.state.birdList, this.state.currentLevel);
  }

  startNextLevel() {
    let thisLevel = this.state.currentLevel;
    let maxLevel = numberOfTotalLevels;
    if (thisLevel < maxLevel) {
      this.setCurrentLevel(parseInt(thisLevel) + 1);
    }
  }

  fillLevel(contentForBirdList, numberOfLevel) {
    this.setState({
      birdList: contentForBirdList,
    });

    this.setState({
      currentLevel: numberOfLevel,
    });

    this.setState({
      playerOutOfHearts: false,
    });
    this.setState({
      playerGuessedAllBirds: false,
    });
  }

  currentLevelToZero() {
    this.setState({
      currentLevel: 0,
    });
  }

  /***************************************************************************************************************
   *   Being invoked before this component has been mounted.
   ***************************************************************************************************************/
  componentWillMount() {
    console.log("JSON File einlesen:");

    loadJSON(
      "levelOne.json",
      function (
        text // in text zurück
      ) {
        console.log("JSON:" + text);
        birdsLevel1 = JSON.parse(text); // text -> object quizfragen
        console.log(birdsLevel1);
      }
    );

    loadJSON(
      "levelTwo.json",
      function (
        text // in text zurück
      ) {
        birdsLevel2 = JSON.parse(text); // text -> object quizfragen
        console.log(birdsLevel2);
      }
    );

    // now filled by db
    /*
    loadJSON(
      "levelThree.json",
      function (
        text // in text zurück
      ) {
        birdsLevel3 = JSON.parse(text);
      }
    );
    */
  }

  /***************************************************************************************************************
   *   Being invoked after this component has been mounted.
   ***************************************************************************************************************/
  componentDidMount() {
    console.log("App.componentDidMount) being invoked");

      // load birdsLevel3 fron db
      QuizDataService.getAll()
      .then(response => {
        console.log(response.data);
        birdsLevel3 = response.data;
      })
      .catch(e => {
        console.log(e);
        this.setState({
          level3ErrorMessage: "DB Service not available"
        });

      });
  }

  
  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("App.componentWillUpdate() being invoked");
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log("App.componentWillReceiveProps() being invoked");
  }

  componentDidUpdate() {
    console.log("App.componentDidUpdate() being invoked");
  }

  componentWillUnmount() {
    console.log("App.componentWillUnmount() being invoked");
  }
}
export default QuizPage;