import {Grid} from "./mazeDrawer.js"
import {Colors} from "./constants.js"

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCellsAround(grid, indexX, indexY) {
    const neighbors = [];
    const directions = [
        [0, -1], // haut
        [0, 1],  // bas
        [-1, 0], // gauche
        [1, 0]   // droite
    ];

    directions.forEach(([dx, dy]) => {
        const x = indexX + dx;
        const y = indexY + dy;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x] == 1) {
            // Vérifie que toutes les voisines de [x, y] (sauf la cellule d'origine) ne sont pas des chemins
            let safe = true;
            directions.forEach(([ndx, ndy]) => {
                const nx = x + ndx;
                const ny = y + ndy;
                // Ignore la cellule d'origine
                if (nx === indexX && ny === indexY) return;
                if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length && grid[ny][nx] === 0) {
                    safe = false;
                }
            });
            if (safe) {
                neighbors.push([x,y]);
            }
        }
    });

    return neighbors;
}

async function createDFS(grid) {
    var display = new Grid(grid[0].length, grid.length);

    var currentIndexX = 0;
    var currentIndexY = 0;

    var stack = [[currentIndexX, currentIndexY],];

    while (stack.length > 0) {
        var [currentIndexX, currentIndexY] = stack.pop();
        if (getCellsAround(grid, currentIndexX, currentIndexY).length === 0) {
            continue;
        } 
        grid[currentIndexY][currentIndexX] = 0;
        const neighbors = getCellsAround(grid, currentIndexX, currentIndexY);
        if (neighbors.length > 0) {
            shuffle(neighbors);
            stack.push(...neighbors);
        }
        display.draw(grid);
        await sleep(0.1);
    }
}

class Maze {
    static createFunctions = {
        "DFS": createDFS,
    }

    constructor (numberWidth, numberHeight) {
        this.defaultState = 1;
        this.grid = Array.from({length:numberHeight}, (_, y) => Array.from({length:numberWidth}, (_, x) => this.defaultState));
        this.numberWidth = numberWidth;
        this.numberHeight = numberHeight;
    }

    create(createFunction) {
        Maze.createFunctions[createFunction](this.grid);
    }
}

var maze = new Maze(200, 100);
maze.create("DFS");