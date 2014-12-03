/// <reference path="model.ts" />
/// <reference path="canvas-view.ts" />
module Game {

  var moon = {
    id: "moon",
    mass: 7.348e22,
    radius: 10 * 1700,
    semiMajorAxis: 384.0e3,
    eccentricity: 5 * 0.0549,
    majorAxisLongitude: 45 / 180 * Math.PI,
    startOffset: 0
  };
  var earth = {
    id: "earth",
    mass: 5.972e24,
    radius: 10 * 6400,
    semiMajorAxis: 1e-5,
    eccentricity: 0,
    majorAxisLongitude: 0,
    startOffset: 0
  };


  export class Controller {
    private view: Game.CanvasView;
    private model: Game.Model;
    constructor() {
    }
    public start() {
      window.requestAnimationFrame((t) => this.onFrame(t));
    }
    private onFrame(timestamp: number) {
      if (this.model == null) {
        //first call
        this.model = new Game.Model([earth, moon], timestamp);
        this.view = new Game.CanvasView(this.model);
      }
      this.model.update(timestamp);
      this.view.render();
      window.requestAnimationFrame((t) => this.onFrame(t));
    }

  }
}
