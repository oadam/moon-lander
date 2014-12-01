/// <reference path="vec2.ts"/>
module Game {
	export class Planet {
		constructor(
			private semiMajorAxis: number,
			private excentricity: number,
			private majorAxisLongitude: number,
			private startOffset: number,
			private sunAttraction: number) {
			}
		getPos(time: number): Vec2.Vec2 {
			//this function is based on https://github.com/arashaghevli/orbit/blob/master/orbit.js
			var a = this.semiMajorAxis;
			var e = this.excentricity;
			var period = 2 * Math.PI * a* Math.sqrt(a/this.sunAttraction);
			var M = this.startOffset + 2 * Math.PI * time / period;

			// Compute the eccentric anomaly E from the mean anomaly M and from the eccentricity e (E and M in degrees):
			var E = M + e * Math.sin(M) * (1.0 + e * Math.cos(M));
			var error = 1;
			while (error > 0.005) {
			var E1 = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
			error = Math.abs(E - E1);
			E = E1;
			}

			// Then compute the Body's distance r and its true anomaly v from:
			var x = a * (Math.cos(E) - e);
			var y = a * (Math.sqrt(1.0 - e*e) * Math.sin(E));
			return new Vec2.Vec2(x, y).rotate(this.majorAxisLongitude);
		}
	}
}
