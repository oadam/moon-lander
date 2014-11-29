/// <reference path="ticker.ts"/>
/// <reference path="../bower_components/DefinitelyTyped/jasmine/jasmine.d.ts"/>
module Ticker {
	describe("A Ticker", function() {
		it("ticks at a regular interval", function() {
			var ticker = new Ticker(30, 0);
			expect(ticker.ticks(100)).toBe(3);
			expect(ticker.ticks(121)).toBe(1);
		});
	});
}
