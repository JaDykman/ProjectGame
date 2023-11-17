
//The size of the game floor
let sizeY = 50; 
let sizeX = 100;

const wall = "#";
const floor = "";
const water = "~";
const door = "@";

////////////////////////////////////
// Variables created when the createGameBoard() function is called
let gameBoard = []; // This is the entire game board
let rooms = []; // This is a list of all the rooms in the game
let doorPosition = []; // Positions of the doors/staircases in the game

let noiseGrid;
////////////////////////////////////

function createGameBoard() { 
    make_noise_map(65); //Create the noise map. The number represents the density (%) of walls.
    cellular_automation(6); // Create the cellular automaton. The number represents the iterations of the cellular automaton.
    defineRooms(); // Find and define the rooms.
    addBorder(); // Add a border around the the entire board.
    displayMap(gameBoard); // Display the game board.
    for (let roomKey in rooms) { // Place a sheep in the center of each room
        let room = rooms[roomKey];
        let center = getCenter(room);
        addEnemy('sheep', center[0], center[1]);
    }
}

function displayMap(map) {
    const table = document.getElementById('gameBoard'); // Get the table element
    table.innerHTML = ""; // Clear the table
    for (let y = 0; y < sizeY; y++) {
        const row = table.insertRow(); //Make a new row
        for (let x = 0; x < sizeX; x++) {
            const cell = row.insertCell(); //Create cell 
            cell.textContent = map[y][x];
        }
    }
    document.body.appendChild(table);
}
function make_noise_map(density) {
    noiseGrid = []; // Clear/Create the noise grid
    rooms = []; // Clear the list of rooms
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
    cellular_automation(5);
    return noiseGrid;
}
function cellular_automation(iterations) {
    // Every iteration of the cellular automaton makes the game board smoother.
    let currentMap = noiseGrid; // Create a copy of the currentMap aka the game board
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

                newGrid[y][x] = surroundingWalls > 4 ? wall : floor; // If it has more than 4 surrounding walls, set the cell to a wall
            }
        }

        currentMap = newGrid;
    }

    gameBoard = currentMap;
    return currentMap;
}
function defineRooms() {
    rooms = [];
    const visited = new Set();

    for (let y = 0; y < gameBoard.length; y++) {
        for (let x = 0; x < gameBoard[y].length; x++) {
            if (gameBoard[y][x] === floor && !visited.has(`${x},${y}`)) {
                const newRoom = performFloodFill(gameBoard, x, y, visited);
                rooms.push(newRoom);
            }
        }
    }
    connectRooms(); 
    createDoor();
    return rooms;
}
function performFloodFill(gameBoard, startX, startY, visited) {
    const room = [];
    const stack = [[startX, startY]];

    while (stack.length > 0) {
        const [x, y] = stack.pop();

        // Corrected to match the definition of a floor cell
        if (x >= 0 && y >= 0 && y < gameBoard.length && x < gameBoard[y].length && gameBoard[y][x] === floor && !visited.has(`${x},${y}`)) {
            room.push([x, y]);
            visited.add(`${x},${y}`);

            // Add adjacent tiles to the stack
            stack.push([x + 1, y]);
            stack.push([x - 1, y]);
            stack.push([x, y + 1]);
            stack.push([x, y - 1]);
        }
    }

    return room;
}
function createDoor() {
    let randomRoomIndex = Math.floor(Math.random() * rooms.length);
    let room = rooms[randomRoomIndex];

    while (room.length < 20) { // If the room is too small, create a new one
        randomRoomIndex = Math.floor(Math.random() * rooms.length); // Reassign a new random index
        room = rooms[randomRoomIndex]; // Update the room
    }

    const randomIndex = Math.floor(Math.random() * room.length);
    const [x, y] = room[randomIndex];

    // Place a door at this random cell
    gameBoard[y][x] = door;
}
function connectRooms() {
    rooms.sort((a, b) => {
    if (a.x < b.x) {
        return -1;
    } else if (a.x > b.x) {
        return 1;
    } else {
        return 0;
    }
    });
    for (let i = 0; i < rooms.length - 1; i++) {
        const start = getCenter(rooms[i]);
        const end = getCenter(rooms[i + 1]);

        createDrunkardsWalkCorridor(start, end);
    }
}
function getCenter(room) {
    // Calculate the center of a room
    // Assuming room is an array of [x, y] pairs
    let sumX = 0, sumY = 0;
    for (const [x, y] of room) {
        sumX += x;
        sumY += y;
    }
    return [Math.floor(sumX / room.length), Math.floor(sumY / room.length)];
}
function createDrunkardsWalkCorridor(start, end) {
    // Create a drunkards walk corridor between two rooms
    // Assuming start and end are arrays of [x, y] pairs
    let [x, y] = start;
    while (x !== end[0] || y !== end[1]) {
        gameBoard[y][x] = ""; // Mark the current cell as part of the corridor
        // Randomly decide whether to move in x or y direction
        if (Math.random() < 0.5) {
            // Move in x direction
            x += (x <= end[0]) ? 1 : -1;
        } else {
            // Move in y direction
            y += (y <= end[1]) ? 1 : -1;
        }
    }
}
function addBorder() {
    // Adding a border at the top and bottom
    for (let x = 0; x < sizeX; x++) {
        gameBoard[0][x] = wall; // Top border
        gameBoard[sizeY - 1][x] = wall; // Bottom border
    }

    // Adding a border on the left and right
    for (let y = 0; y < sizeY; y++) {
        gameBoard[y][0] = wall; // Left border
        gameBoard[y][sizeX - 1] = wall; // Right border
    }
}

//TODO add floor types.