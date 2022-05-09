import { makeAutoObservable } from "mobx";

class TimerLogic {
  secondsPassed = 0;
  outOfTime = false;
  testNumer= 2;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }

  decreaseTimer() {
    this.secondsPassed -= 1;
    if(this.secondsPassed<=20){
      this.outOfTime = true;
      this.testNumber = 5;
    }
  }

  startIncTimer() {
    setInterval(() => {
      this.increaseTimer();
    }, 1000);
  }

  startDecTimer() {
    setInterval(() => {
      this.decreaseTimer();
    }, 1000);
  }
}

export default TimerLogic;