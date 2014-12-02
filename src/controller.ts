/// <reference path="model.ts" />
/// <reference path="canvas-view.ts" />
module Game {

	var moon = {
		id: "moon",
		radius: 10 * 1700,
		semiMajorAxis: 384.0e3,
		eccentricity: 15 * 0.0549,
		majorAxisLongitude: 10 / 180 * Math.PI,
		startOffset: 0
	};

	var earthAttraction = 5.97219E24 * 6.673e-14;

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
				this.model = new Game.Model(earthAttraction, [moon], timestamp);
				this.view = new Game.CanvasView(this.model);
			}
			this.model.update(timestamp);
			this.view.render();
			window.requestAnimationFrame((t) => this.onFrame(t));
		}

	}
}
