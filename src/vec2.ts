module Vec2 {
  export class Vec2 {
    constructor(public x: number, public y: number) {}
    public clone(): Vec2 {
      return new Vec2(this.x, this.y);
    }
    public subtract(other: Vec2): Vec2 {
      this.x -= other.x;
      this.y -= other.y;
      return this;
    }
    public add(other: Vec2): Vec2 {
      this.x += other.x;
      this.y += other.y;
      return this;
    }
    public scale(scale: number): Vec2 {
      this.x *= scale;
      this.y *= scale;
      return this;
    }
    public length(): number {
      return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    public rotate(theta: number): Vec2 {
      var c = Math.cos(theta);
      var s = Math.sin(theta);
      var px = this.x;
      var py = this.y;
      this.x = c * px - s * py;
      this.y = s * px + c * py;
      return this;
    }

  }
}
