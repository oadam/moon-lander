/// <reference path="vec2.ts" />
/// <reference path="planet.ts" />
/// <reference path="../bower_components/DefinitelyTyped/jasmine/jasmine.d.ts"/>
module Game {
    function vecClose(a: Vec2.Vec2, b: Vec2.Vec2) {
  expect(a.x).toBeCloseTo(b.x, 4);
  expect(a.y).toBeCloseTo(b.y, 4);
    }
    describe('A circular orbit', function() {
  var sunAttraction = 50;
  var arg = {
      semiMajorAxis: 32,
      eccentricity: 0,
      majorAxisLongitude: 0,
      startOffset: 0
  };
  var period = 2 * Math.PI * arg.semiMajorAxis * Math.sqrt(arg.semiMajorAxis / sunAttraction);

  it('works at time 0', function() {
      vecClose(Game.getPlanetPosition(arg, sunAttraction, 0), new Vec2.Vec2(32, 0));
  });
  it('works at period/2', function() {
      vecClose(Game.getPlanetPosition(arg, sunAttraction, period / 2), new Vec2.Vec2(-32, 0));
  });
    });
    describe('A complex orbit', function() {
  var sunAttraction = 40;
  var arg = {
      semiMajorAxis: 50,
      eccentricity: 0.5,
      majorAxisLongitude: 0.30 * Math.PI,
      startOffset: 0
  };
  var period = 2 * Math.PI * arg.semiMajorAxis * Math.sqrt(arg.semiMajorAxis / sunAttraction);
  it('starts at the given longitude', function() {
      var start = Game.getPlanetPosition(arg, sunAttraction, 0);
      expect(Math.atan(start.y / start.x)).toBeCloseTo(arg.majorAxisLongitude, 4);
  });
  it('creates an ellipse of the right length', function() {
      var start = Game.getPlanetPosition(arg, sunAttraction, 0);
      var end = Game.getPlanetPosition(arg, sunAttraction, period / 2);

      var delta = end.clone().subtract(start);
      expect(delta.length()).toBeCloseTo(arg.semiMajorAxis * 2, 4);
  });
    });
}
