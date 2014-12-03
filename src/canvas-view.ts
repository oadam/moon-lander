/// <reference path="model.ts" />
/// <reference path="vec2.ts" />
module Game {
	export class CanvasView {
		private static height = 600;
		private ctx: CanvasRenderingContext2D;
		private size: Vec2.Vec2;
		constructor(private model: Game.ViewModel) {
			var modelSize = this.model.getSize();
			var width = CanvasView.height / modelSize.y * modelSize.x;
			this.size = new Vec2.Vec2(width, CanvasView.height);
			var canvas = document.createElement('canvas');
			canvas.width = this.size.x;
			canvas.height = this.size.y;
			document.body.appendChild(canvas);

			this.ctx = canvas.getContext('2d');
		}
		render() {
			this.ctx.fillStyle = "rgb(0, 0, 0)";
			this.ctx.fillRect(0, 0, this.size.x, this.size.y);
			var modelSize = this.model.getSize();
			var scale = this.size.length() / modelSize.length();
			this.ctx.fillStyle = "rgb(200, 0, 0)";
			this.model.getPlanets().forEach((p) => {
				var size = p.radius * scale * Math.SQRT1_2;
				var pos = p.position.clone();
				pos.y *= -1;//canvas coordinates are reversed
				pos.scale(scale);
				pos.add(this.size.clone().scale(0.5));
				this.ctx.save();
				this.ctx.translate(pos.x, pos.y);
				var SQUARE_COUNT = 6;
				for (var i = 0; i < SQUARE_COUNT; i++) {
					this.ctx.rotate(2*Math.PI/(SQUARE_COUNT + 1));
					this.ctx.fillRect(-size / 2, -size / 2, size, size);
				}
				this.ctx.restore();
			});
		}
	}
}
