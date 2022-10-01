import { Game } from '../src/game';
import { Model, STATES } from '../src/model';

describe('game', () => {
  test('when game started, selection will start game', (done) => {
    const origFetch = global.fetch;
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: () => ({ data: [123] }) });
    const model: Partial<Model> = {
      state: {
        currentResultIndex: -1,
        currentUserSelectedIndex: -1,
        currentState: STATES.STARTED,
        timeRemaining: -1,
        score: -1,
      },
      ui: {
        roundResult: '',
      },
    };
    const game = new Game(model as Model);
    game.setSelected(2);
    const checkState = (): void => {
      if (
        model.state?.currentState !== STATES.CYCLING ||
        model.state?.currentResultIndex < 0
      ) {
        setInterval(checkState, 10);
      } else {
        expect(model.state?.currentResultIndex).not.toBe(-1);
        expect(model.state?.currentUserSelectedIndex).toBe(2);
        expect(model.state?.currentState).toBe(STATES.CYCLING);
        global.fetch = origFetch;
        done();
      }
    };

    checkState();
  });

  test('after game started, when time is up then game will end', () => {
    const model: Model = {
      state: {
        currentResultIndex: 3,
        currentUserSelectedIndex: 0,
        currentState: STATES.CYCLING,
        timeRemaining: 20000,
        score: -1,
      },
      ui: {
        roundResult: '',
      },
      settings: {
        colours: [0x0000ff, 0x00ff00, 0xff0000, 0xffff00, 0xffa500],
      },
    };
    const game = new Game(model);
    game.update(2000);
    expect(model.state.currentState).toBe(STATES.SELECTING);

    game.update(8000);
    expect(model.state.currentState).toBe(STATES.SELECTING);

    game.update(10000);
    expect(model.state.currentState).toBe(STATES.ENDED);
    expect(model.ui).toMatchSnapshot();
  });

  test('when cycling colour, after 2 seconds result is shown - win', () => {
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
    const game = new Game(model);
    game.update(2000);
    expect(model.state.score).toBe(1);
    expect(model.ui).toMatchSnapshot();
  });

  test('when cycling colour, after 2 seconds result is shown - loss', () => {
    const model: Model = {
      state: {
        currentResultIndex: 2,
        currentUserSelectedIndex: 4,
        currentState: STATES.CYCLING,
        timeRemaining: 20000,
        score: 5,
      },
      ui: {
        roundResult: '',
      },
      settings: {
        colours: [0x0000ff, 0x00ff00, 0xff0000, 0xffff00, 0xffa500],
      },
    };
    const game = new Game(model);
    game.update(2000);
    expect(model.state.score).toBe(5);
    expect(model.ui).toMatchSnapshot();
  });
});
