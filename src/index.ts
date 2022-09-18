import { Application } from 'pixi.js';
import { Game } from './game';
import { Model, STATES } from './model';
import { View } from './view';

const initialState: Model = {
  state: {
    currentResultIndex: 0,
    currentUserSelectedIndex: 0,
    currentState: STATES.STARTED,
    timeRemaining: 20000,
    score: 0,
  },
  ui: {
    roundResult: 'Click a circle to start!',
  },
  settings: {
    colours: [0x0000ff, 0x00ff00, 0xff0000, 0xffff00, 0xffa500],
  },
};
const gameModel: Model = {
  state: { ...initialState.state },
  ui: { ...initialState.ui },
  settings: { ...initialState.settings },
};

const app = new Application({
  width: 400,
  height: 600,
  backgroundColor: 0xdcdcdc,
});
document.body.appendChild(app.view);

const view = new View(app.stage, gameModel);
view.buildScene();

const game = new Game(gameModel);
view.on('click', (index: number) => {
  game.setSelected(index);
});

view.on('startClicked', () => {
  gameModel.state = { ...initialState.state };
  gameModel.ui = { ...initialState.ui };
});

let currentTime: number = -1;
const update = (timeStamp: number): void => {
  let delta = 0;
  if (currentTime < 0) {
    currentTime = timeStamp;
  } else {
    delta = timeStamp - currentTime;
    currentTime = timeStamp;
  }

  game.update(delta);
  view.update(delta);

  requestAnimationFrame(update);
};

requestAnimationFrame(update);
