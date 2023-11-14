let sizeY = 75; //The size of the game floor
let sizeX = 75;
const wall = "#";
const floor = ".";
const water = "~";
let iterations = 0;

let gameBoard = [];
let noiseGrid;
const table = document.createElement('table');

function tileGeneration() {
  
    //We can create and build the floor types here    
    for (let y = 0; y < sizeY; y++) {
        gameBoard[y] = []; //Initialize the game board
        //Make a new row
        const row = table.insertRow();
        for (let x = 0; x < sizeX; x++) {
            // Create cells for 
            const cell = row.insertCell();
            // Edit the cell's content
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    cell.textContent = floor;
                    break;
                case 1:
                    cell.textContent = wall;
                    break;
                case 2:
                    cell.textContent = water;
                    break;
            }
            //print the rows content to the console
            gameBoard[y][x] = cell.textContent;
        }
    }
    console.log(gameBoard);
}

function make_noise_map(density) {
    noiseGrid = [];
    for (let y = 0; y < sizeY; y++) {
        noiseGrid[y] = [];
        for (let x = 0; x < sizeX; x++) {
            let random = Math.random()*100 + 1;
            if (random > density) {
                noiseGrid[y][x] = floor;
            }
            else {
                noiseGrid[y][x] = wall;
            }
        }
    }
    displayMap(noiseGrid);
    return noiseGrid;
}

function cellular_automation() {
    let currentMap = noiseGrid;
    iterations++;
    for (let iter = 0; iter < iterations; iter++) {
        let newGrid = Array.from(Array(sizeY), () => new Array(sizeX));

        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                let surroundingWalls = 0;

                // Check surrounding cells
                for (let offsetY = -1; offsetY <= 1; offsetY++) {
                    for (let offsetX = -1; offsetX <= 1; offsetX++) {
                        if (offsetY === 0 && offsetX === 0) continue;
                        let checkX = x + offsetX;
                        let checkY = y + offsetY;

                        if (checkX >= 0 && checkX < sizeX && checkY >= 0 && checkY < sizeY && 
                            (currentMap[checkY][checkX] === wall || currentMap[checkY][checkX] === null)) {
                            surroundingWalls++;
                        }
                    }
                }

                newGrid[y][x] = surroundingWalls > 4 ? wall : floor;
            }
        }

        currentMap = newGrid;
    }

    displayMap(currentMap); // Ensure this function is defined elsewhere
    return currentMap;
}


function displayMap(map) {
    let mapHtml = map.map(row => row.join(" ")).join("<br>");
    document.getElementById("map").innerHTML = mapHtml;
}