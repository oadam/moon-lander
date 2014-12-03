/// <reference path="ticker.ts" />
/// <reference path="planet.ts" />
/// <reference path="vec2.ts" />
module Game {
  export interface ViewModelPlanet {
    id: string;
    radius: number;
    position: Vec2.Vec2;
  }
  export interface ViewModel {
    getPlanets(): ViewModelPlanet[];
    getSize(): Vec2.Vec2;
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
    private static INTERVAL = 20;

    private ticker: Ticker.Ticker;
    private centerOfMassAttraction: number;

    constructor(
        private planets: PlanetDef[],
        private startTime: number) {
      this.ticker = new Ticker.Ticker(Model.INTERVAL, startTime);
      this.centerOfMassAttraction = G * this.planets.reduce((sum, p) => sum + p.mass, 0);
    }
    public getSize(): Vec2.Vec2 {
      var max = this.planets.reduce((max, p) => Math.max(p.semiMajorAxis * (1 + p.eccentricity), max), Number.MIN_VALUE);
      return new Vec2.Vec2(2.4 * max, 2.4 * max);
    }
    public update(newTime: number) {
      this.ticker.ticks(newTime);
    }
    public getPlanets(): ViewModelPlanet[] {
      var time = this.ticker.getTime();
      return this.planets.map(p => {
        return {
            id: p.id,
            radius: p.radius,
            position: Game.getPlanetPosition(p, this.centerOfMassAttraction, time)
        };
      });
    }
  }
}
