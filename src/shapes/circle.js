export default class Circle {
    constructor (id, x, y, radius, ctx) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.type = "Circle";
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    PointIsInside(px, py) {
        let dx = px - this.x;
        let dy = py - this.y;
        return dx*dx + dy*dy <= this.radius*this.radius;
    }
}

