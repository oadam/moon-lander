/// <reference path="vec2.ts" />
/// <reference path="planet.ts" />
/// <reference path="../bower_components/DefinitelyTyped/jasmine/jasmine.d.ts"/>
module Game {
	describe('A planet', function() {
		function vecClose(a: Vec2.Vec2, b: Vec2.Vec2) {
			expect(a.x).toBeCloseTo(b.x, 4);
			expect(a.y).toBeCloseTo(b.y, 4);
		}

		it('predicts simple circular orbit', function() {
			var semiMajorAxis = 32;
			var excentricity = 0;
			var majorAxisLongitude = 0;
			var startOffset = 0;
			var sunAttraction = 50;
			var period = 2 * Math.PI * semiMajorAxis * Math.sqrt(semiMajorAxis/sunAttraction);
			var planet = new Planet(semiMajorAxis, excentricity, majorAxisLongitude, startOffset, sunAttraction);
			vecClose(planet.getPos(0), new Vec2.Vec2(32, 0));
			vecClose(planet.getPos(period/2), new Vec2.Vec2(-32, 0));
		});
		it('predicts complicated orbits', function() {
			var semiMajorAxis = 50;
			var excentricity = 0.5;
			var majorAxisLongitude = Math.PI / 4;
			var startOffset = majorAxisLongitude;
			var sunAttraction = 10;
			var period = 2 * Math.PI * semiMajorAxis * Math.sqrt(semiMajorAxis/sunAttraction);
			var planet = new Planet(semiMajorAxis, excentricity, majorAxisLongitude, startOffset, sunAttraction);
			var start = planet.getPos(0);
			var end = planet.getPos(period/2);

			var delta = end.clone().subtract(start);
			//expect(delta.length()).toBeCloseTo(semiMajorAxis*2, 4);

		});
	});
}
