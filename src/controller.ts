/// <reference path="model.ts" />
/// <reference path="canvas-view.ts" />
/// <reference path="vec2.ts" />
module Game {

  var moon = {
    id: "moon",
    mass: 7.348e22,
    radius: 1 * 1737.0e3,
    semiMajorAxis: 384.0e6,
    eccentricity: 1 * 0.0549,
    majorAxisLongitude: 5 / 180 * Math.PI,
    startOffset: 0
  };
  var earth = {
    mass: 5.972e24,
    radius: 1 * 6400.0e3
  };
  var craftInitSpeed = () => new Vec2.Vec2(-360, 1000);
  var craftInitPosition = () => new Vec2.Vec2(384.0e6, 0);//10000 km

  var monthDuration = 100;//seconds
  var timescale = 31*24*3600 / monthDuration;

  export class Controller {
    private static TURNING_SPEED = Math.PI / 2;//rad per seconds

    private view: Game.CanvasView;
    private model: Game.Model;
    private lastTimestamp: number;
    private turning = 0;
    constructor() {
    }
    public start() {
      window.requestAnimationFrame((t) => this.onFrame(t));
      window.onkeydown = (event) => {
        var keycode = event.charCode || event.keyCode;
        switch(keycode) {
          case 38:
            this.model.engineOn = true;
            break;
          case 37:
            this.turning = 1;
            break;
          case 39:
            this.turning = -1;
            break;
        }
      }
      window.onkeyup = (event) => {
        var keycode = event.charCode || event.keyCode;
        switch(keycode) {
          case 38:
            this.model.engineOn = false;
            break;
          case 37:
          case 39:
            this.turning = 0;
            break;
        }
      }
    }
    private onFrame(timestamp: number) {
      var timestampSecond = timestamp / 1.0e3 * timescale;
      if (this.model == null) {
        //first call
        this.lastTimestamp = timestamp;
        this.model = new Game.Model(earth, [moon], craftInitPosition(), craftInitSpeed(), timestampSecond);
        this.view = new Game.CanvasView(this.model);
      }
      this.model.craftAngle += this.turning * Controller.TURNING_SPEED * (timestamp - this.lastTimestamp) / 1000;
      this.model.update(timestampSecond);
      this.view.render();
      this.lastTimestamp = timestamp;
      window.requestAnimationFrame((t) => this.onFrame(t));
    }

  }
}
