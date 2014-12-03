/// <reference path="planet.ts" />
/// <reference path="vec2.ts" />
module Game {
  export interface ViewModelPlanet {
    id: string;
    radius: number;
    position: Vec2.Vec2;
  }
  export interface ViewModel {
    getCraft(): Vec2.Vec2;
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

  var G = 6.673e-14;

  export class Model implements ViewModel {
    private static INTERVAL = 3600;//seconds

    //time of last physics step
    private lastTick: number;
    private lastTime: number;
    private centralAttraction: number;
    //private INITIAL_SPEED = new Vec2.Vec2(0, 9000);
    private craftSpeed = new Vec2.Vec2(0, 40);
    private craftPosition = new Vec2.Vec2(100.0e6, 0);//10000 km
    //private prevCraftPosition = this.craftPosition.clone().subtract(this.INITIAL_SPEED.clone().scale(1 / Model.INTERVAL));

    constructor(
        private mainPlanet: MainPlanetDef,
        private planets: PlanetDef[],
        private startTime: number) {
      this.lastTick = startTime;
      this.lastTime = startTime;
      this.centralAttraction = G * this.mainPlanet.mass;
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

        acceleration.scale(Model.INTERVAL);
        this.craftSpeed.add(acceleration);
        this.craftPosition.add(this.craftSpeed.clone().scale(Model.INTERVAL));
        //verlet integration http://en.wikipedia.org/wiki/Verlet_integration
        //acceleration.scale(Math.pow(Model.INTERVAL, 2));
        //this.craftPosition.scale(2).subtract(this.prevCraftPosition).add(acceleration);
        //this.prevCraftPosition = this.craftPosition.clone();
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
      return Game.getPlanetPosition(planet, this.centralAttraction, time);
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
    public getCraft(): Vec2.Vec2 {
      return this.craftPosition.clone();
    }
  }
}
