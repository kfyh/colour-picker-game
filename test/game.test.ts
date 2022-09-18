import { Game } from "../src/game";
import { Model, STATES } from "../src/model";

describe('game', () => {
    test('when game started, selection will start game', () => {
        const model: Partial<Model> = {
            state: {
                currentResultIndex: -1,
                currentUserSelectedIndex: -1,
                currentState: STATES.STARTED,
                timeRemaining: -1,
                score: -1
            },
            ui: {
                roundResult: ''
            }
        };
        const game = new Game(model as Model);
        game.setSelected(2);
        expect(model.state?.currentResultIndex).not.toBe(-1);
        expect(model.state?.currentUserSelectedIndex).toBe(2);
        expect(model.state?.currentState).toBe(STATES.CYCLING);
    });
});