/// <reference path="ticker.ts" />
module Game {
	export interface Vec2 {
		x: number;
		y: number;
	}
	export interface ViewModelPlanet {
		id: string;
		radius: number;
		pos: Vec2;
	}
	export interface ViewModel {
		getPlanets(): ViewModelPlanet[];
		getSize(): Vec2;
	}

	export interface Model {
		update(newTime: number);
	}

	interface PlanetDef {
		id: string;
		radius: number;
		semiMajorAxis: number;
		excentricity: number;
		majorAxisLongitude: number;
		startOffset: number;
	}


	/*export class ModelImpl implements ViewModel, Model {
		
	}*/
}
