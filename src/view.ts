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
    private craft: PIXI.DisplayObjectContainer;
    private craftFire: PIXI.Sprite;

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
      });

      this.craft = new PIXI.DisplayObjectContainer();
      this.craft.scale.x = 0.3;
      this.craft.scale.y = 0.3;

      var fireTexture = PIXI.Texture.fromImage("fire.png");
      this.craftFire = new PIXI.Sprite(fireTexture);
      this.craftFire.anchor.x = 0.5;
      this.craftFire.anchor.y = 0.5;
      this.craftFire.position.x = -120;
      this.craft.addChild(this.craftFire);

      var craftTexture = PIXI.Texture.fromImage("rocket.png");
      var craftBody = new PIXI.Sprite(craftTexture);
      craftBody.anchor.x = 0.5;
      craftBody.anchor.y = 0.5;
      this.craft.addChild(craftBody);

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
      this.craftFire.visible = modelCraft.engineOn;
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
