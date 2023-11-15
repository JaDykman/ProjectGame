let sizeY = 75; //The size of the game floor
let sizeX = 75;
const wall = "#";
const floor = " ";
const water = "~";
const door = "@";

let gameBoard = [];
let rooms = [];
let noiseGrid;
let doorPosition;
const table = document.createElement('table');

function displayMap(map) {
    table.innerHTML = "";
    //We can create and build the floor types here    
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
    noiseGrid = [];
    rooms = [];
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
    cellular_automation(5);
    return noiseGrid;
}
function cellular_automation(iterations) {
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
    console.log(rooms);
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

    while (room.length < 20) {
        randomRoomIndex = Math.floor(Math.random() * rooms.length); // Reassign a new random index
        room = rooms[randomRoomIndex]; // Update the room
    }

    const randomIndex = Math.floor(Math.random() * room.length);
    const [x, y] = room[randomIndex];

    // Place a door at this random cell
    gameBoard[y][x] = door;
    doorPosition = [x, y];
    displayMap(gameBoard);
}


