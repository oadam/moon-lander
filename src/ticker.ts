module Ticker {
    export class Ticker {
        constructor(
            private interval: number,
            private time: number) {
        }
        public ticks(newTime: number): number {
            if (newTime < this.time) {
                throw new Error('expected a time greater than ' + this.time + ' but received ' + newTime);
            }
            var result = Math.floor(newTime / this.interval) - Math.floor(this.time / this.interval);
            this.time = newTime;
            return result;
        }
        public getTime(): number {
            return this.time;
        }
    }
}
