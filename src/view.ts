import { Container } from 'pixi.js';
import { Model, STATES } from './model';
import { GameView } from './view/gameView';
import { ResultView } from './view/resultView';

export class View {
  private readonly stage: Container;
  private readonly model: Model;

  private readonly gameContainer: Container;
  private readonly gameView: GameView;
  private readonly resultContainer: Container;
  private readonly resultView: ResultView;

  constructor(stage: Container, model: Model) {
    this.stage = stage;
    this.model = model;

    this.gameContainer = new Container();
    this.gameContainer.name = 'game';
    this.gameView = new GameView(this.gameContainer, this.model);

    this.resultContainer = new Container();
    this.resultContainer.name = 'result';
    this.resultView = new ResultView(this.resultContainer, this.model);
  }

  public buildScene(): void {
    this.gameView.buildScene();
    this.resultView.buildScene();

    this.resultContainer.visible = false;
    this.gameContainer.visible = true;

    this.stage.addChild(this.gameContainer);
    this.stage.addChild(this.resultContainer);
  }

  public update(delta: number): void {
    if (this.model.state.currentState === STATES.ENDED) {
      this.resultContainer.visible = true;
      this.gameContainer.visible = false;
      this.resultView.update(delta);
    } else {
      this.resultContainer.visible = false;
      this.gameContainer.visible = true;
      this.gameView.update(delta);
    }
  }

  public on(
    event: string,
    listener: (...args: any[]) => void,
    context?: any
  ): void {
    this.gameView.on(event, listener, context);
    this.resultView.on(event, listener, context);
  }

  public off(event: string, listener: (...args: any[]) => void): void {
    this.gameView.off(event, listener);
    this.resultView.off(event, listener);
  }
}
