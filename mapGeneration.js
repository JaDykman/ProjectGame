let sizeY = 100; //The size of the game floor
let sizeX = 100;
const wall = "#";
const floor = ".";
const water = "~";
let iterations = 0;

let gameBoard = [];
let noiseGrid;
const table = document.createElement('table');

function displayMap(map) {
    table.innerHTML = "";
    //We can create and build the floor types here    
    for (let y = 0; y < sizeY; y++) {
        const row = table.insertRow(); //Make a new row
        for (let x = 0; x < sizeX; x++) {
            const cell = row.insertCell(); //Create cell 
            
            cell.textContent = map[y][x]; //Edit the cell's content
        }
    }
    document.body.appendChild(table);
}

function make_noise_map(density) {
    noiseGrid = [];
    iterations = 0;
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
                            (currentMap[checkY][checkX] !== wall)) {
                            surroundingWalls = surroundingWalls;
                        } else {
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


function tileGeneration(map) {
    let mapHtml = map.map(row => row.join(" ")).join("<br>");
    document.getElementById("map").innerHTML = mapHtml;
}

// Define a function to find room
// Functions that finds distance between rooms
// If there is no rooms, return -1