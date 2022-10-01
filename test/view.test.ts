import { View } from '../src/view';
import { Model, STATES } from '../src/model';
import { Container } from 'pixi.js';
import * as random from '../src/utils/randomInt';

describe('view', () => {
  const model: Model = {
    state: {
      currentResultIndex: 2,
      currentUserSelectedIndex: 2,
      currentState: STATES.CYCLING,
      timeRemaining: 20000,
      score: 0,
    },
    ui: {
      roundResult: '',
    },
    settings: {
      colours: [0x0000ff, 0x00ff00, 0xff0000, 0xffff00, 0xffa500],
    },
  };
  const stage = new Container();
  const view = new View(stage, model);
  view.buildScene();

  beforeEach(() => {
    model.state = {
      currentResultIndex: 2,
      currentUserSelectedIndex: 2,
      currentState: STATES.CYCLING,
      timeRemaining: 20000,
      score: 0,
    };
    model.ui = {
      roundResult: '',
    };
    view.update(0);
  });

  test('if state not ended then show game', () => {
    view.update(0);

    expect(stage.getChildByName('game').visible).toBeTruthy();
    expect(stage.getChildByName('result').visible).toBeFalsy();
    expect(stage).toMatchSnapshot();
  });

  test('if state selecting then show result colour', () => {
    model.state.currentState = STATES.SELECTING;
    view.update(0);

    expect(stage).toMatchSnapshot();
  });

  test('if state cycling then show random colour', () => {
    model.state.currentState = STATES.CYCLING;
    const spy = jest.spyOn(random, 'randomIntLocal').mockReturnValue(2);
    view.update(100);

    expect(spy).toHaveBeenCalled();
    expect(stage).toMatchSnapshot();
  })

  test('if state is ended then show result', () => {
    model.state.currentState = STATES.ENDED;
    model.state.score = 5;

    view.update(0);

    expect(stage.getChildByName('game').visible).toBeFalsy();
    expect(stage.getChildByName('result').visible).toBeTruthy();
    expect(stage).toMatchSnapshot();
  });
});
