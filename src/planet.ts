/// <reference path="vec2.ts"/>
module Game {
    export interface GetPlanetPositionArg {
        semiMajorAxis: number;
        eccentricity: number;
        majorAxisLongitude: number;
        startOffset: number;
    }

    //this function is based on https://github.com/arashaghevli/orbit/blob/master/orbit.js
    export function getPlanetPosition(
        arg: GetPlanetPositionArg,
        sunAttraction: number,
        time: number): Vec2.Vec2 {
        var a = arg.semiMajorAxis;
        var e = arg.eccentricity;
        var period = 2 * Math.PI * a * Math.sqrt(a / sunAttraction);
        var inPeriod = (time/period) % 1;
        var M = arg.startOffset + 2 * Math.PI * inPeriod;

        // Compute the eccentric anomaly E from the mean anomaly M and from the eccentricity e (E and M in degrees):
        var E = M + e * Math.sin(M) * (1.0 + e * Math.cos(M));
        var error = 1;
        var count = 0;
        while (error > 0.005) {
            count++;
            if (count > 100) {
                throw new Error('infinite loop');
            }
            var E1 = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
            error = Math.abs(E - E1);
            E = E1;
        }

        // Then compute the Body's distance r and its true anomaly v from:
        var x = a * (Math.cos(E) - e);
        var y = a * (Math.sqrt(1.0 - e * e) * Math.sin(E));
        return new Vec2.Vec2(x, y).rotate(arg.majorAxisLongitude);
    }
}
