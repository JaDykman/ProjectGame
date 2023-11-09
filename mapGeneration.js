let sizeY = Math.floor(Math.random() * 10)+ 5; //The size of the game floor
let sizeX = Math.floor(Math.random() * 10)+ 5;
const wall = "#";
const floor = ".";
const water = "~";

let gameBoard = [];

const table = document.createElement('table');

function tileGeneration() {

    // Initialize the gameBoard with the right dimensions
    for (let y = 0; y < sizeY; y++) {
        gameBoard[y] = [];
    }
    
    //we can create and build the floor types here    
    for (let y = 0; y < sizeY; y++) {
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
    table.style.width = sizeX * 100 + "%";
    console.log(gameBoard);
}