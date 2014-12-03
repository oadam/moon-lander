/// <reference path="model.ts" />
/// <reference path="canvas-view.ts" />
module Game {

  var moon = {
    id: "moon",
    mass: 7.348e22,
    radius: 10 * 1737.0e3,
    semiMajorAxis: 384.0e6,
    eccentricity: 5 * 0.0549,
    majorAxisLongitude: 45 / 180 * Math.PI,
    startOffset: 0
  };
  var earth = {
    mass: 5.972e24,
    radius: 10 * 6400.0e3
  };

  var monthDuration = 10;//seconds
  var timescale = 31*24*3600 / monthDuration;

  export class Controller {
    private view: Game.CanvasView;
    private model: Game.Model;
    constructor() {
    }
    public start() {
      window.requestAnimationFrame((t) => this.onFrame(t));
    }
    private onFrame(timestamp: number) {
      var timestampSecond = timestamp / 1.0e3 * timescale;
      if (this.model == null) {
        //first call
        this.model = new Game.Model(earth, [moon], timestampSecond);
        this.view = new Game.CanvasView(this.model);
      }
      this.model.update(timestampSecond);
      this.view.render();
      window.requestAnimationFrame((t) => this.onFrame(t));
    }

  }
}
