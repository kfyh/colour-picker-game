import { Model, STATES } from './model';
import { randomInt } from './utils/randomInt';

export class Game {
  private readonly model: Model;
  private time: number;
  constructor(model: Model) {
    this.model = model;
    this.time = 0;
  }

  public setSelected(index: number): void {
    if (
      this.model.state.currentState === STATES.SELECTING ||
      this.model.state.currentState === STATES.STARTED
    ) {
      this.model.state.currentUserSelectedIndex = index;

      this.model.state.currentResultIndex = -1
      this.model.state.currentState = STATES.CYCLING;
      this.model.ui.roundResult = '';
      this.time = 0;

      randomInt(0,4)
        .then((result) => {
          this.model.state.currentResultIndex = result;
        }, null);
    }
  }

  public update(delta: number): void {
    this.time += delta;
    if (
      this.model.state.currentState !== STATES.STARTED &&
      this.model.state.currentState !== STATES.ENDED
    ) {
      this.model.state.timeRemaining -= delta;
      if (this.model.state.timeRemaining <= 0) {
        this.model.ui.roundResult = "Time's Up!";
        this.model.state.currentState = STATES.ENDED;
      }
    }

    if (this.model.state.currentState === STATES.CYCLING) {
      if (this.time >= 2000 && this.model.state.currentResultIndex >= 0) {
        this.model.state.currentState = STATES.SHOWRESULT;
        this.time = 0;
      }
    }

    if (this.model.state.currentState === STATES.SHOWRESULT) {
      const result = this.model.state.currentResultIndex;
      const selected = this.model.state.currentUserSelectedIndex;
      if (result === selected) {
        this.model.state.score++;
        this.model.ui.roundResult = 'You Won!!';
      } else {
        this.model.ui.roundResult = 'Better Luck Next Time!!';
      }

      this.model.state.currentState = STATES.SELECTING;
      this.time = 0;
    }
  }
}
