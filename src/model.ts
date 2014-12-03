/// <reference path="planet.ts" />
/// <reference path="vec2.ts" />
module Game {
  export interface ViewModelPlanet {
    id: string;
    radius: number;
    position: Vec2.Vec2;
  }
  export interface ViewModel {
    getCraft(): CraftViewModel;
    getPlanets(): ViewModelPlanet[];
    getSize(): Vec2.Vec2;
  }

  interface MainPlanetDef {
    mass: number;
    radius: number;
  }
  
  interface PlanetDef {
    id: string;
    mass: number;
    radius: number;
    semiMajorAxis: number;
    eccentricity: number;
    majorAxisLongitude: number;
    startOffset: number;
  }

  var G = 6.673e-11;
  export interface CraftViewModel {
    angle: number;
    position: Vec2.Vec2;
    engineOn: boolean;
  }

  export class Model implements ViewModel {
    private static INTERVAL = 10;//seconds
    private static ENGINE_ACCEL = 0.01 * 20;//m.s-2

    //time of last physics step
    private lastTick: number;
    private lastTime: number;
    private centralAttraction: number;
    private craftPosition: Vec2.Vec2;
    private prevCraftPosition: Vec2.Vec2;
    public craftAngle = 0;
    public engineOn = false;

    constructor(
        private mainPlanet: MainPlanetDef,
        private planets: PlanetDef[],
        craftInitPosition: Vec2.Vec2,
        craftInitSpeed: Vec2.Vec2,
        private startTime: number) {
      this.lastTick = this.startTime;
      this.lastTime = this.startTime;
      this.centralAttraction = G * this.mainPlanet.mass;
      this.craftPosition = craftInitPosition.clone();
      this.prevCraftPosition = this.craftPosition.clone().subtract(craftInitSpeed.clone().scale(Model.INTERVAL));
    }
    public getSize(): Vec2.Vec2 {
      var max = this.planets.reduce((max, p) => Math.max(p.semiMajorAxis * (1 + p.eccentricity), max), Number.MIN_VALUE);
      return new Vec2.Vec2(2.4 * max, 2.4 * max);
    }
    public update(newTime: number) {
      for (var time = this.lastTick + Model.INTERVAL; time <= newTime; time += Model.INTERVAL) {
        this.lastTick = time;
        //sum attractions
        var acceleration = new Vec2.Vec2(0, 0);
        this.addPlanetAttraction(acceleration, this.mainPlanet.mass, new Vec2.Vec2(0, 0));
        for (var i = 0; i < this.planets.length; i++) {
          var planet = this.planets[i];
          this.addPlanetAttraction(acceleration, planet.mass, this.getPlanetPosition(planet, time));
        }
        if (this.engineOn) {
          acceleration.add(new Vec2.Vec2(Model.ENGINE_ACCEL, 0).rotate(this.craftAngle));
        }

        //verlet integration http://en.wikipedia.org/wiki/Verlet_integration
        acceleration.scale(Math.pow(Model.INTERVAL, 2));
        var prev = this.prevCraftPosition.clone();
        this.prevCraftPosition = this.craftPosition.clone();
        this.craftPosition.scale(2).subtract(prev).add(acceleration);
      }
      this.lastTime = newTime;
    }

    private addPlanetAttraction(acceleration: Vec2.Vec2, mass: number, position: Vec2.Vec2) {
      var dist = this.craftPosition.clone().subtract(position);
      var scale = -G * mass / Math.pow(dist.length(), 3);
      dist.scale(scale);
      acceleration.add(dist);
    }

    private getPlanetPosition(planet: PlanetDef, time: number) {
      return Game.getPlanetPosition(planet, this.centralAttraction, time - this.startTime);
    }
    public getPlanets(): ViewModelPlanet[] {
      var main = {
        id: 'main',
        radius: this.mainPlanet.radius,
        position: new Vec2.Vec2(0, 0)
      };
      return [main].concat(this.planets.map(p => {
        return {
            id: p.id,
            radius: p.radius,
            position: this.getPlanetPosition(p, this.lastTime)
        };
      }));
    }
    public getCraft(): CraftViewModel {
      return {
        angle: this.craftAngle,
        position: this.craftPosition.clone(),
        engineOn: this.engineOn
      };
    }
  }
}
