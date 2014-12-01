/// <reference path="vec2.ts" />
/// <reference path="planet.ts" />
/// <reference path="../bower_components/DefinitelyTyped/jasmine/jasmine.d.ts"/>
module Game {
	function vecClose(a: Vec2.Vec2, b: Vec2.Vec2) {
		expect(a.x).toBeCloseTo(b.x, 4);
		expect(a.y).toBeCloseTo(b.y, 4);
	}
	describe('A circular orbit', function() {
		var semiMajorAxis = 32;
		var excentricity = 0;
		var majorAxisLongitude = 0;
		var startOffset = 0;
		var sunAttraction = 50;
		var period = 2 * Math.PI * semiMajorAxis * Math.sqrt(semiMajorAxis/sunAttraction);
		var planet = new Planet(semiMajorAxis, excentricity, majorAxisLongitude, startOffset, sunAttraction);

		it('works at time 0', function() {
			vecClose(planet.getPos(0), new Vec2.Vec2(32, 0));
		});
		it('works at period/2', function() {
			vecClose(planet.getPos(period/2), new Vec2.Vec2(-32, 0));
		});
	});
	describe('A circular orbit', function() {
		var semiMajorAxis = 50;
		var excentricity = 0.5;
		var majorAxisLongitude = 0.30 * Math.PI;
		var startOffset = 0;
		var sunAttraction = 10;
		var period = 2 * Math.PI * semiMajorAxis * Math.sqrt(semiMajorAxis/sunAttraction);
		var planet = new Planet(semiMajorAxis, excentricity, majorAxisLongitude, startOffset, sunAttraction);
		it('creates an ellipse of the right length', function() {
			var start = planet.getPos(0);
			var end = planet.getPos(period/2);

			var delta = end.clone().subtract(start);
			expect(delta.length()).toBeCloseTo(semiMajorAxis*2, 4);

		});
		it('starts at the given longitude', function() {
			var start = planet.getPos(0);
			expect(Math.atan(start.y/start.x)).toBeCloseTo(majorAxisLongitude, 4);
		});
	});
}
