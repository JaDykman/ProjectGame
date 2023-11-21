// Enumerator object to define the types of enemies and their properties
const Enumerator  = {
    sheep: {
        health: 1, 
        damage: 0, 
        sprite: 'sheep.png' // Path to the image used for the sheep NPC
    },
    // Add more enemy types with their properties here as needed
};

// Global array to keep track of all enemy NPCs
let allEnemies = [];

/**
 * Function to add an enemy NPC to the game.
 * @param {string} type - The type of enemy to add, which must be a key in the Enumerator.
 * @param {number} posX - The x-coordinate where the enemy will be placed.
 * @param {number} posY - The y-coordinate where the enemy will be placed.
 */
function addEnemy(type, posX, posY) {
    // Log the action for debugging purposes
    console.log("Adding enemy. Type:", type, "posX:", posX, "posY:", posY);

    // Check if the provided type exists in the Enumerator
    if (!Enumerator[type]) {
        console.error(`Enemy type ${type} not found in Enumerator.`);
        return;
    }

    // Create a new NPC with properties from the Enumerator and the provided positions
    let newNPC = new NPC(
        allEnemies.length, // Unique ID based on the length of the allEnemies array
        Enumerator[type].health,
        Enumerator[type].damage,
        Enumerator[type].sprite,
        posX,
        posY
    );

    // Add the new NPC to the allEnemies array for tracking
    allEnemies.push(newNPC);

    // Draw the new NPC on the game board by fetching the table and calling the draw method
    let table = document.getElementById('gameBoard');
    newNPC.draw(table);
}

// NPC class to create enemy NPC instances
class NPC {
    // Constructor to initialize an NPC with provided properties
    constructor(id, health, damage, sprite, posX, posY) {
        this.id = id;        // Unique identifier for the NPC
        this.health = health;// Health points of the NPC
        this.damage = damage;// Damage the NPC can inflict
        this.sprite = sprite;// Image source for the NPC sprite
        this.posX = posX;    // X-coordinate position on the game board
        this.posY = posY;    // Y-coordinate position on the game board
    }

    // Method to draw the NPC on the game board
    draw(table) {
        // Check if the NPC's position is undefined and log error if so
        if (this.posY === undefined || this.posX === undefined) {
            console.error("NPC position is undefined. posX:", this.posX, "posY:", this.posY);
            return;
        }

        // Check if the NPC's position is outside the table bounds and log error if so
        if (this.posY >= table.rows.length || this.posX >= table.rows[0].cells.length) {
            console.error("NPC position is out of the table bounds. posX:", this.posX, "posY:", this.posY);
            return;
        }

        // Retrieve the cell at the NPC's position and insert the NPC sprite as an image
        const cell = table.rows[this.posY].cells[this.posX];
        cell.innerHTML = `<img src="${this.sprite}" alt="NPC">`; // Set the inner HTML to an image tag with the sprite
    }
}
