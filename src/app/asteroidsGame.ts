import P5 from "p5";
import { sketch } from "./p5-sketch";

export class AsteroidsGame {
  _shipHeading: number = 0;
  _rotDelta:number=0;

  constructor() {
    new P5((p5) => sketch(p5, this.setup));
  }

  public setup = (p5: P5) => {
    // Creating and positioning the canvas
    const scr_reduction = 0.8;
    const canvas = p5.createCanvas(
      p5.windowWidth * scr_reduction,
      p5.windowHeight * scr_reduction
    );
    canvas.parent("app");

    p5.draw = () => this.gameLoop(p5);
    p5.keyPressed = () => this.keyPressed(p5);
    p5.keyReleased=()=>this.keyReleased(p5);
  };

  public keyPressed = (p5: P5) => {
    const rotAmnt=p5.PI / 70;
    if (p5.keyCode == p5.RIGHT_ARROW) this._rotDelta= rotAmnt;
    if (p5.keyCode == p5.LEFT_ARROW) this._rotDelta = -rotAmnt;
  };

  public keyReleased=(p5:P5)=> {
    this._rotDelta=0;
  }

  public gameLoop = (p5: P5) => {
    p5.background(0);

    //advance rotation angle
    this._shipHeading += this._rotDelta;

    //Draw the spaceship
    p5.noFill();
    p5.stroke("white");
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(this._shipHeading);
    p5.scale(2);

    p5.beginShape();
    p5.vertex(0, -10);
    p5.vertex(8, 10);
    p5.vertex(4, 6);
    p5.vertex(-4, 6);
    p5.vertex(-8, 10);
    p5.endShape(p5.CLOSE);
  };
}
