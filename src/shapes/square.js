export default class Square {
    constructor (id, x, y, w, h, ctx) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.type = "Square";
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    PointIsInside(px, py) {
        return this.x <= px
            && this.y <= py
            && this.x + this.w >= px
            && this.y + this.h >= py;
    }
}
