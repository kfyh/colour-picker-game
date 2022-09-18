import { Application, Sprite } from "pixi.js";

const app = new Application();
document.body.appendChild(app.view);

let sprite = Sprite.from('res/logo.png');
sprite.x = 100;
sprite.y = 200;
app.stage.addChild(sprite);
