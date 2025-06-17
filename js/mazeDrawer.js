import {Colors} from "./constants.js"

export class Grid {
    constructor(numberWidth, numberHeight, padding = 0) {
        this.numberWidth = numberWidth;
        this.numberHeight = numberHeight;
        this.padding = padding;

        this.canvas = document.getElementById("grid");
        this.context = this.canvas.getContext("2d");

        this.setupCanvas();

        window.addEventListener("resize", () => {
            this.setupCanvas();
            this.drawBlank();
        });
        
        this.lineColor = Colors.lineColor;
        this.fillColorPath = Colors.pathColor;
    }

    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";

        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;

        this.context.setTransform(1, 0, 0, 1, 0, 0); // Reset any transform
        this.context.scale(dpr, dpr);

        this.cellWidth = width / this.numberWidth;
        this.cellHeight = height / this.numberHeight;
    }

    drawBlank() {
        const ctx = this.context;
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = this.lineColor;

        for (let i = 0; i <= this.numberWidth; i++) {
            const x = this.padding + i * this.cellWidth;
            ctx.beginPath();
            ctx.moveTo(x, this.padding);
            ctx.lineTo(x, height - this.padding);
            ctx.stroke();
        }

        for (let j = 0; j <= this.numberHeight; j++) {
            const y = this.padding + j * this.cellHeight;
            ctx.beginPath();
            ctx.moveTo(this.padding, y);
            ctx.lineTo(width - this.padding, y);
            ctx.stroke();
        }
    }

    draw(grid) {
        console.log("test");
        grid.forEach((line, y) => {
            line.forEach((state, x) => {
                this.fillCell(x, y, Colors.colors[state]);
            });
        });
    }

    fillCell(i, j, color) {
        const x = this.padding + i * this.cellWidth;
        const y = this.padding + j * this.cellHeight;

        this.context.fillStyle = color;
        this.context.fillRect(x, y, this.cellWidth, this.cellHeight);
    }
}