let sizeY = Math.floor(Math.random() * 10)+ 5; //The size of the game floor
let sizeX = Math.floor(Math.random() * 10)+ 5;
const wall = "#";
const floor = ".";
const water = "~";

const table = document.createElement('table');

function tileGeneration() {
    //we can create and build the floor types here    
    for (let y = 1; y < sizeY - 1; y++) {
        //Make a new row
        const row = table.insertRow();
        for (let x = 1; x < sizeX - 1; x++) {
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
        }
    }
    console.log(table.rows.length);
}