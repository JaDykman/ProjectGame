//The size of the game floor
let sizeY = 50;
let sizeX = 100;
//Create a canvas element
let canvas;
let fogCanvas;
let fogCtx;
let ctx;
const wall = 'sprites/wall.png';
const floor = 'sprites/floor.png';
const door = 'sprites/stairs.png';

let player;
let floorCount = 0;
////////////////////////////////////
// Variables created when the createGameBoard() function is called
let gameBoard = []; // This is the entire game board
let rooms = []; // This is a list of all the rooms in the game
let doorPosition = []; // Positions of the doors/staircases in the game
let noiseGrid;
let table = document.getElementById('gameBoard');

function createGameBoard() {
    fogCanvas = document.getElementById("fogCanvas");
    fogCanvas.width = sizeX * 15;
    fogCanvas.height = sizeY * 15;
    fogCtx = fogCanvas.getContext("2d");
    canvas = document.getElementById("canvas");
    canvas.width = sizeX * 15;
    canvas.height = sizeY * 15;
    ctx = canvas.getContext("2d");
    floorCount++;

    updatePlayerBar();
    make_noise_map(65); //Create the noise map. The number represents the density (%) of walls.
    cellular_automation(6); // Create the  cellular automaton. The number represents the iterations of the cellular automaton.
    defineRooms(); // Find and define the rooms.
    addBorder(); // Add a border around the the entire board.
    placePlayer(); // Place the player 
    displayMap(gameBoard); // Display the game board.
    for (let roomKey in rooms) { // Place a sheep in the center of each room
        let room = rooms[roomKey];
        let center = getCenter(room);
        if (center != doorPosition && center[0] != player.posX && center[1] != player.y) { //Make sure we aren't spawning an entity on top of the door
            let newEnemy = new AddNPC('sheep', center[0], center[1]);
        }
    }
}
function moveAll() {
    for (let npc of allEnemies) {
        npc.moveNext(gameBoard);
    }
}
function setAllNextMove() {
    for (let npc of allEnemies) {
        npc.setNextMove(gameBoard);
    }
}
function placePlayer() {
    let randomRoomIndex = Math.floor(Math.random() * rooms.length);
    let room = rooms[randomRoomIndex];
    let center = getCenter(room);
    table = document.getElementById('gameBoard');
    gameBoard[center[1]][center[0]] = player; // Store the player's ID
    player.posX = center[0];
    player.posY = center[1];
}
function displayMap(map) {
    console.time("displayMap Execution Time"); // Start timer
    let table = document.getElementById('gameBoard');
    let fragment = document.createDocumentFragment(); // Create a document fragment

    // Convert allEnemies to a Map for faster access
    let npcMap = new Map(allEnemies.map(npc => [npc.id, npc]));

    for (let y = 0; y < sizeY; y++) {
        let row = document.createElement('tr'); // Create a row
        for (let x = 0; x < sizeX; x++) {
            let cell = document.createElement('td'); // Create a cell

            if (typeof map[y][x] === 'number' && npcMap.has(map[y][x])) {
                let npc = npcMap.get(map[y][x]);
                cell.innerHTML = `<img src="${npc.sprite}" alt="NPC">`;
            } else if (map[y][x] === player) {
                cell.innerHTML = `<img src="${player.sprite}" alt="Player">`;
            } else {
                let imgSrc = (map[y][x] === floor) ? floor : 
                             (map[y][x] === wall) ? wall : 
                             (map[y][x] === door) ? door : null;
                if (imgSrc) {
                    cell.innerHTML = `<img src="${imgSrc}" alt="${imgSrc}">`;
                } else {
                    cell.textContent = map[y][x];
                }
            }
            row.appendChild(cell); // Append cell to row
        }
        fragment.appendChild(row); // Append row to fragment
    }

    table.innerHTML = ""; // Clear the table
    table.appendChild(fragment); // Append the fragment to the table
    console.timeEnd("displayMap Execution Time"); // End timer and log time

}

function make_noise_map(density) {
    noiseGrid = []; // Clear/Create the noise grid
    rooms = []; // Clear the list of rooms
    for (let y = 0; y < sizeY; y++) {
        noiseGrid[y] = [];
        for (let x = 0; x < sizeX; x++) {
            let random = Math.random() * 100 + 1;
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
                            continue;
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
        gameBoard[y][x] = floor; // Mark the current cell as part of the corridor
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
function drawLine(x1, y1, x2, y2, color, lineWidth = 1) {
    ctx.save(); // Save the current state

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth; // Set the line width
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore(); // Restore the original state
}
// Function to draw a line from a table cell to a point on the canvas
function drawLineFromCell(posX, posY, endX, endY, color, lineWidth) {
    let startPos = getCellScreenPosition(posX, posY);
    let endPos = getCellScreenPosition(endX, endY);

    // Adjust start position relative to the canvas if needed
    let canvasRect = canvas.getBoundingClientRect();
    startPos.x -= canvasRect.left + window.scrollX;
    startPos.y -= canvasRect.top + window.scrollY;
    endPos.x -= canvasRect.left + window.scrollX;
    endPos.y -= canvasRect.top + window.scrollY;


    drawLine(startPos.x, startPos.y, endPos.x, endPos.y, color, lineWidth);
}
function getCellScreenPosition(posX, posY) {
    let table = document.getElementById('gameBoard');
    if (!table) return null;

    let row = table.rows[posY];
    if (!row) return null;

    let cell = row.cells[posX];
    if (!cell) return null;

    let rect = cell.getBoundingClientRect();

    // Calculate the center of the cell
    let centerX = rect.left + rect.width / 2 + window.scrollX;
    let centerY = rect.top + rect.height / 2 + window.scrollY;

    return {
        x: centerX,
        y: centerY
    };
}