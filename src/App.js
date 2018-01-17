import React from 'react';
import Circle from './shapes/circle';
import Square from './shapes/square';

class App extends React.Component {
    constructor() {
        super();
        this.mouse_x = null;
        this.mouse_y = null;
        this.mouse_button_down = false; // is dragging
        this.selected = null; // selected shape
        this.shapes = []; // all shapes
    }

    componentDidMount() {
        this.canvas = document.getElementById("main_canvas"); // canvas object
        this.ctx = this.canvas.getContext("2d");
        let _this = this; // parent scope for click events

        this.canvas.addEventListener('mousedown', (e) => {
            if (!e) {
                let e = window.event;
            }

            // calculate mouse pos in canvas
            let rect = _this.canvas.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            if (e.button === 0) {

                for (let i = _this.shapes.length - 1; i >= 0; i--) {

                    if (_this.shapes[i].PointIsInside(x, y)) {
                        _this.selected = _this.shapes[i];
                        // put selected object to end of queue, so that it is drawn last and is on top of other objects
                        let tmp = _this.shapes[i];
                        _this.shapes.splice(i, 1);
                        _this.shapes.push(tmp);
                        break;
                    }
                }

                _this.mouse_button_down = true;
            }
        }, false);


        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse_x = e.movementX;
            this.mouse_y = e.movementY;

            if (_this.selected) {
                _this.selected.x += e.movementX;
                _this.selected.y += e.movementY;
            }
        }, false);

        this.canvas.addEventListener('mouseup', (e) => {
            if (!e) {
                let e = window.event;
            }

            if (e.button === 0) {
                _this.selected = null;
                _this.mouse_button_down = false;
            }
        }, false);

        window.setInterval(this.redraw.bind(this), 1000 / 60);
    }


    AddSquare() {
        this.shapes.push(new Square(this.shapes.length, 32, 32, 35, 35, this.ctx));
    }

    AddCircle() {
        this.shapes.push(new Circle(this.shapes.length, 32, 32, 15, this.ctx));
    }

    redraw() {
        // Draw
        let ctx = this.ctx;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears screen

        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].draw();
        }
    }

    save() {
        let obj = [];

        this.shapes.forEach((entry) => {
            obj.push({
                id: entry.id,
                type: entry.type,
                x: entry.x,
                y: entry.y
            });
        });

        fetch('endpoint', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then((response) => {
                // ...
            })
            .catch((error) => {
                console.error(error);
            });

        console.info(JSON.stringify(obj));
    }


    render() {
        return (
            <div>
                <canvas id="main_canvas" width="500px" height="500px">
                    Canvas not supported!
                </canvas>

                <button onClick={
                    () => {
                        this.AddSquare()
                    }
                }>
                    Add Square
                </button>

                <button onClick={
                    () => {
                        this.AddCircle()
                    }
                }>
                    Add Circle
                </button>

                <button onClick={
                    () => {
                        this.save()
                    }
                }>
                    Save
                </button>
            </div>
        );
    }
}

export default App;
