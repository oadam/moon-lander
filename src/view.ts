/// <reference path="model.ts" />
/// <reference path="vec2.ts" />
/// <reference path="../bower_components/DefinitelyTyped/pixi/pixi.d.ts" />
module Game {
  export class View {
    private static height = 1000;
    private static rocketLength = 30;
    private static rocketWidth = 5;

    private size: Vec2.Vec2;
    private stage: PIXI.Stage;
    private renderer: PIXI.IPixiRenderer;
    private scale: number;
    private planets: {[id: string]: PIXI.Graphics} = {};
    private craft: PIXI.Graphics;

    constructor(private model: Game.ViewModel) {
      var modelSize = this.model.getSize();
      var width = View.height / modelSize.y * modelSize.x;
      this.size = new Vec2.Vec2(width, View.height);
      this.stage = new PIXI.Stage(0x600000);
      this.renderer = PIXI.autoDetectRenderer(width, View.height);
      this.scale = this.size.length() / modelSize.length();
      this.model.getPlanets().forEach((p) => {
          var planet = new PIXI.Graphics();
          planet.beginFill();
          //planet.lineColor = '000000';
          planet.drawCircle(0, 0, p.radius * this.scale);
          planet.endFill();
          this.stage.addChild(planet);
          this.planets[p.id] = planet;
      })
      this.craft = new PIXI.Graphics();
      this.craft.beginFill();
      this.craft.drawRect(
          -View.rocketLength / 2,
          -View.rocketWidth / 2,
          View.rocketLength,
          View.rocketWidth
      );
      this.craft.endFill();
      this.stage.addChild(this.craft);
      document.body.appendChild(this.renderer.view);
    }

    private updateCraft() {
      var modelCraft = this.model.getCraft();
      var pos = modelCraft.position.clone();
      pos.scale(this.scale);
      pos.y *= -1;
      pos.add(this.size.clone().scale(0.5));
      this.craft.position.x = pos.x;
      this.craft.position.y = pos.y;
      this.craft.rotation = -modelCraft.angle;
    }
    private updatePlanets() {
        this.model.getPlanets().forEach((p) => {
          var pos = p.position.clone();
          pos.scale(this.scale);
          pos.y *= -1;
          pos.add(this.size.clone().scale(0.5));
          this.planets[p.id].position.x = pos.x;
          this.planets[p.id].position.y = pos.y;
        });
    }


    render() {
      this.updatePlanets();
      this.updateCraft();
      this.renderer.render(this.stage);
    }
  }
}
