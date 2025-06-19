import {Colors, sleep} from "./constants.js"
import {Grid} from "./mazeDrawer.js"

function availableCells(grid, indexX, indexY) {
    const neighbors = [];
    const directions = [
        [0, -1], // haut
        [0, 1],  // bas
        [-1, 0], // gauche
        [1, 0]   // droite
    ];

    for (let i = 0; i < directions.length; i++) {
        const [dx, dy] = directions[i];
        const x = indexX + dx;
        const y = indexY + dy;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
            if (grid[y][x] === 0) {
                neighbors.push([x, y]);
            }
            else if (grid[y][x] === 3) {
                console.log(grid[y][x]);
                return "Win";
            }
        }
    }

    return neighbors;
}

export class Solver {
    constructor (grid) {
        this.grid = grid;

        this.startX = -1;
        this.startY = -1;

        var stop = false;
        this.grid.forEach((line, y) => {
            if (stop) {return};
            line.forEach((cell, x) => {
                if (stop) {return};
                if (cell === 2) {
                    this.startX = x;
                    this.startY = y;
                    stop = true;
                }
            });
        });
    }

    async dfs() {
        // Deep First Search
        var currentX = this.startX;
        var currentY = this.startY;
        var display = new Grid(this.grid[0].length, this.grid.length);
        var neighbors = [];

        var stack = [[currentX, currentY],];
        var pathIndexs = [];
        
        while (stack.length != 0) {
            var [currentX, currentY] = stack.pop();
            this.grid[currentY][currentX] = 4;
            neighbors = availableCells(this.grid, currentX, currentY);
            if (neighbors == "Win") {
                break;
            }

            if (neighbors.length > 1) {
                pathIndexs.push([currentX, currentY]);
            }
            else if (neighbors.length == 0) {
                pathIndexs.pop();
            }
            stack.push(...neighbors);

            display.draw(this.grid);
            await sleep(1.5);
        }

        pathIndexs.forEach(pos => {
            this.grid[pos[1]][pos[0]] = 5;
        });
        display.draw(this.grid);
    }
}