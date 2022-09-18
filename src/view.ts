import { Container, Graphics, Text } from 'pixi.js';
import { Model, STATES } from './model';
import { randomInt } from './utils/randomInt';
import { EventEmitter } from 'eventemitter3';

export class View {
  private readonly stage: Container;
  private readonly model: Model;

  private chosenColour: Graphics;
  private selectionButtons: Graphics[];
  private debugText: Text;
  private winText: Text;

  private timeRandomColour = 0;

  private readonly eventEmitter = new EventEmitter<string, any>();

  constructor(stage: Container, model: Model) {
    this.stage = stage;
    this.model = model;
    this.debugText = new Text();
    this.winText = new Text();
    this.chosenColour = new Graphics();
    this.selectionButtons = [];
  }

  public buildScene(): void {
    this.debugText.text = this.model.state.currentState;
    this.stage.addChild(this.debugText);

    this.winText.y = 20;
    this.stage.addChild(this.winText);

    this.chosenColour.beginFill(0xffffff).drawCircle(0, 0, 100).endFill();
    this.chosenColour.x = 200;
    this.chosenColour.y = 300;
    this.chosenColour.tint =
      this.model.settings.colours[this.model.state.currentResultIndex];
    this.stage.addChild(this.chosenColour);

    for (let i = 0; i < this.model.settings.colours.length; i++) {
      const colour = this.model.settings.colours[i];
      const button = new Graphics();
      button.beginFill(colour).drawCircle(0, 0, 30).endFill();
      button.x = 50 + 75 * i;
      button.y = 550;
      button.interactive = true;
      button.on('click', () => this.onButtonClicked(i));
      this.selectionButtons[i] = button;
      this.stage.addChild(button);
    }
  }

  public update(delta: number): void {
    this.debugText.text = this.model.state.currentState;

    if (this.model.state.currentState === STATES.CYCLING) {
      this.timeRandomColour += delta;
      if (this.timeRandomColour >= 200) {
        const randomColour = randomInt(0, 4);
        this.chosenColour.tint = this.model.settings.colours[randomColour];
        this.timeRandomColour = 0;
      }
    }

    if (this.model.state.currentState === STATES.SHOWRESULT) {
        const result = this.model.state.currentResultIndex;
        const selected = this.model.state.currentUserSelectedIndex;
        console.log(`${result} === ${selected} : ${String(result == selected)}`);
        if (result == selected) {
            this.winText.text = 'You Won!!';
        } else {
            this.winText.text = 'Better Luck Next Time!!';
        }
      this.chosenColour.tint =
        this.model.settings.colours[this.model.state.currentResultIndex];
    }
  }

  public on(
    event: string,
    listener: (...args: any[]) => void,
    context?: any
  ): void {
    this.eventEmitter.on(event, listener, context);
  }

  public off(event: string, listener: (...args: any[]) => void): void {
    this.eventEmitter.off(event, listener);
  }

  private onButtonClicked(index: number): void {
    console.log(`button clicked ${index}`);
    this.eventEmitter.emit('click', [index]);
  }
}
