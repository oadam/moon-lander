/// <reference path="model.ts" />
/// <reference path="canvas-view.ts" />
module Game {

	var moon = {
		id: "moon",
		radius: 1700,
		semiMajorAxis: 384.0e3,
		eccentricity: 5 * 0.0549,
		majorAxisLongitude: 10 / 180 * Math.PI,
		startOffset: 0
	};

	var earthAttraction = 5.97219E24 * 6.673e-14;

	export class Controller {
		private view: Game.CanvasView;
		private model: Game.Model;
		constructor() {
		}
		start() {
			this.model = new Game.ModelImpl(earthAttraction, [moon], 0);
			this.view = new Game.CanvasView(this.model);
		}

	}
}
