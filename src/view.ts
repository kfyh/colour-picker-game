import { Container, Graphics, Text } from 'pixi.js';
import { Model, STATES } from './model';
import { randomInt } from './utils/randomInt';

export class View {
    private readonly stage: Container;
    private readonly model: Model;

    private chosenColour: Graphics;
    private selectionButtons: Graphics[];
    private debugText: Text;

    private timeRandomColour = 0;

    constructor(stage: Container, model: Model) {
        this.stage = stage;
        this.model = model;
        this.debugText = new Text();
        this.chosenColour = new Graphics();
        this.selectionButtons = [];
    }

    public buildScene(): void {
        this.debugText.text = this.model.state.currentState;
        this.stage.addChild(this.debugText);

        this.chosenColour
            .beginFill(0xffffff)
            .drawCircle(0,0,100)
            .endFill();
        this.chosenColour.x = 200;
        this.chosenColour.y = 300;
        this.chosenColour.tint = this.model.settings.colours[this.model.state.currentResultIndex];
        this.stage.addChild(this.chosenColour);

        for (let i = 0; i < this.model.settings.colours.length; i++) {
            const colour = this.model.settings.colours[i];
            const button = new Graphics();
            button
                .beginFill(colour)
                .drawCircle(0,0,30)
                .endFill();
            button.x = 50 + 75*i;
            button.y = 550;
            this.selectionButtons[i] = button;
            this.stage.addChild(button);
        }
    }

    public update(delta: number): void {
        this.debugText.text = this.model.state.currentState;

        if (this.model.state.currentState === STATES.CYCLING) {
            this.timeRandomColour += delta;
            if (this.timeRandomColour >= 200) {
                const randomColour = randomInt(0,4);
                this.chosenColour.tint = this.model.settings.colours[randomColour];
                this.timeRandomColour = 0;
            }
        }

        if (this.model.state.currentState === STATES.SHOWRESULT) {
            this.chosenColour.tint = this.model.settings.colours[this.model.state.currentResultIndex];
        }
        
    }
}