/// <reference path="model.ts" />
/// <reference path="vec2.ts" />
module Game {
  export class CanvasView {
    private static height = 1000;
    private static rocketLength = 30;
    private static rocketWidth = 5;

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
    private drawCircle(radius: number) {
      var size = radius * Math.SQRT1_2;
      var SQUARE_COUNT = 6;
      for (var i = 0; i < SQUARE_COUNT; i++) {
        this.ctx.rotate(2*Math.PI/(SQUARE_COUNT + 1));
        this.ctx.fillRect(-size / 2, -size / 2, size, size);
      }
    }

    render() {
      this.ctx.fillStyle = "rgb(0, 0, 0)";
      this.ctx.fillRect(0, 0, this.size.x, this.size.y);
      var modelSize = this.model.getSize();
      var scale = this.size.length() / modelSize.length();
      this.ctx.fillStyle = "rgb(200, 0, 0)";
      this.model.getPlanets().forEach((p) => {
        var pos = p.position.clone();
        pos.y *= -1;//canvas coordinates are reversed
        pos.scale(scale);
        pos.add(this.size.clone().scale(0.5));
        this.ctx.save();
        this.ctx.translate(pos.x, pos.y);
        this.drawCircle(p.radius * scale);
        this.ctx.restore();
      });
      this.ctx.fillStyle = "rgb(0, 200, 0)";
      var craft = this.model.getCraft();
      var pos = craft.position.clone();
      pos.y *= -1;//canvas coordinates are reversed
      pos.scale(scale);
      pos.add(this.size.clone().scale(0.5));
      this.ctx.save();
      this.ctx.translate(pos.x, pos.y);
      this.ctx.rotate(-craft.angle);
      this.ctx.fillRect(
          -CanvasView.rocketLength / 2,
          -CanvasView.rocketWidth / 2,
          CanvasView.rocketLength,
          CanvasView.rocketWidth
      );
      this.ctx.fillStyle = "rgb(0, 20, 255)";
      this.ctx.fillRect(
          CanvasView.rocketLength * 4 / 10,
          -CanvasView.rocketWidth / 2,
          CanvasView.rocketLength / 10,
          CanvasView.rocketWidth
      );
      if (craft.engineOn) {
        this.ctx.fillStyle = "rgb(255, 20, 0)";
        this.ctx.fillRect(
            -CanvasView.rocketLength / 2,
            -CanvasView.rocketWidth / 2,
            CanvasView.rocketLength / 10,
            CanvasView.rocketWidth
        );
      }

      this.ctx.restore();
    }
  }
}
