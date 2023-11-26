class Player { 
    constructor(health, baseDMG, __sprite, pClass, posX, posY) { 
        this.health = health;
        this.baseDMG = baseDMG;
        this._sprite = __sprite;
        this.pClass = pClass;
        this.posX = posX;
        this.posY = posY;
    }
}
function makePlayer() {
    let playerName = prompt("Who dares to enter the caves? ");
    let playerClass = parseInt(prompt("What is your trade?(1:Knight, 2:Archer, 3:Barb, 4:Mage) "))
    let player = new Player();
    const classOne = {
        class: "Knight",
        _sprite: "|",
        health: 10,
        baseDMG: 3,
    };
    const classTwo = {
        class: "Archer",
        _sprite: "^",
        health: 7,
        baseDMG: 2,
    };
    const classThree = {
        class: "Barbarian",
        _sprite: "$",
        health: 20,
        baseDMG: 1,
    };
    const classFour = {
        class: "Mage",
        _sprite: "%",
        health: 7,
        baseDMG: 2,
    };
    if(playerClass == 1){
        player.health = classOne.health;
        player.baseDMG = classOne.baseDMG;
        player._sprite = classOne._sprite;
        player.pClass = classOne.class;
    } else if(playerClass == 2){
        player.health = classTwo.health;
        player.baseDMG = classTwo.baseDMG;
        player._sprite = classTwo._sprite;
        player.pClass = classTwo.class;
    } else if (playerClass == 3){
        player.health = classThree.health;
        player.baseDMG = classThree.baseDMG;
        player._sprite = classThree._sprite;
        player.pClass = classThree.class;
    } else if (playerClass == 4){
        player.health = classFour.health;
        player.baseDMG = classFour.baseDMG;
        player._sprite = classFour._sprite;
        player.pClass = classFour.class;
    } else{
        return alert(playerName+", that was not one of your options!");
    }
    alert("Ah, you are " + playerName + ", The " + player.pClass);
    return player;
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        let newY;
        let newX
        switch (event.key) {
          case "ArrowDown":
                // code for "down arrow" key press.
                newY = -1;
            break;
          case "ArrowUp":
            // code for "up arrow" key press.
                newY = +1;
            break;
          case "ArrowLeft":
            // code for "left arrow" key press.
                newX = -1;
            break;
          case "ArrowRight":
            // code for "right arrow" key press.
                newX = +1;
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }
      // Boundary checks for the game board
        if (newX < 0 || newY < 0 || newY >= gameBoard.length || newX >= gameBoard[0].length) {
            // Out of bounds, so don't move
            return;
        }
        if (gameBoard[newY][newX] === floor) {
            // Update the game state array for the old position
            gameBoard[this.posY][this.posX] = floor;
    
            // Update the game state array for the new position
            gameBoard[newY][newX] = this.id; // Store the NPC's ID or a unique identifier
    
            // Update the DOM
            let table = document.getElementById('gameBoard');
            const oldCell = table.rows[this.posY].cells[this.posX];
            oldCell.innerHTML = ''; // Clear the old position
    
            const newCell = table.rows[newY].cells[newX];
            newCell.innerHTML = `<img src="${playerClass._sprite}" alt="NPC">`; // Set the new position
    
            // Update the NPC's position properties
            this.posX = newX;
            this.posY = newY;
        }
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);
}
