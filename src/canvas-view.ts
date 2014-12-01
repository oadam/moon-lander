/// <reference path="model.ts" />
module Game {
	export class CanvasView {
		constructor(private model: Game.ViewModel) {
			var div = document.createElement('div');
			div.innerText = 'hello world';
			document.body.appendChild(div);
		}
		
	}
}
