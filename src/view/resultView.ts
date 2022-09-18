import { Container, Text } from 'pixi.js';
import { Model } from '../model';
import { EventEmitter } from 'eventemitter3';

export class ResultView {
  private readonly stage: Container;
  private readonly model: Model;

  private infoText: Text;
  private startText: Text;

  private readonly eventEmitter = new EventEmitter<string, any>();

  constructor(stage: Container, model: Model) {
    this.stage = stage;
    this.model = model;
    this.infoText = new Text();
    this.startText = new Text();
  }

  public buildScene(): void {
    this.infoText.text = this.model.state.currentState;
    this.stage.addChild(this.infoText);

    this.startText.y = 400;
    this.startText.text = 'Click to Play Again';
    this.startText.interactive = true;
    this.startText.on('click', () => this.onButtonClicked());
    this.stage.addChild(this.startText);
  }

  public update(delta: number): void {
    const score = this.model.state.score;
    this.infoText.text = `Game Over!
    You Scored ${score}`;
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

  private onButtonClicked(): void {
    this.eventEmitter.emit('startClicked');
  }
}
