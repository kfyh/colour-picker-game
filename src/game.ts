import { Model, STATES } from "./model";
import { randomInt } from "./utils/randomInt";

export class Game {
    private readonly model: Model;
    private time: number;
    constructor(model: Model) {
        this.model = model;
        this.time = 0;
    }

    public update(delta: number): void {
        this.time += delta;
        if (this.model.state.currentState === STATES.STARTED) {
            if (this.time >= 1000) {
                this.model.state.currentState = STATES.SELECTING;
            }

        }

        if (this.model.state.currentState === STATES.SELECTING) {
            if (this.time >= 1000) {
                this.model.state.currentResultIndex = randomInt(0, 4);
                this.model.state.currentState = STATES.CYCLING;
                this.time = 0;
            }
        }

        if (this.model.state.currentState === STATES.CYCLING) {
            if (this.time >= 2000) {
                this.model.state.currentState = STATES.SHOWRESULT;
                this.time = 0;
            }
        }
        
        if (this.model.state.currentState === STATES.SHOWRESULT) {
            if (this.time >= 1000) {
                this.model.state.currentState = STATES.SELECTING;
                this.time = 0;
            }
        }
    }
}