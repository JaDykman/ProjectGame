function makePlayer(){
    let playerName = prompt("Who dares to enter the caves? ");
    let playerClass = parseInt(prompt("What is your trade?(1:Knight, 2:Archer, 3:Barb, 4:Mage) "))
    const classOne = {
        class: "Knight",
        health: 10,
        baseDMG: 3,
    };
    const classTwo = {
        class: "Archer",
        health: 7,
        baseDMG: 2,
    };
    const classThree = {
        class: "Barbarian",
        health: 20,
        baseDMG: 1,
    };
    const classFour = {
        class: "Mage",
        health: 7,
        baseDMG: 2,
    };
    if(playerClass == 1){
        playerClass = classOne;
    } else if(playerClass == 2){
        playerClass = classTwo;
    } else if (playerClass == 3){
        playerClass = classThree;
    } else if (playerClass == 4){
        playerClass = classFour;
    } else{
        return alert(playerName+", that was not one of your options!");
    }
    alert("Ah, you are " + playerName + ", The " + playerClass.class);
    createGameBoard();
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
            newCell.innerHTML = `<img src="${playerClass.sprite}" alt="NPC">`; // Set the new position
    
            // Update the NPC's position properties
            this.posX = newX;
            this.posY = newY;
        }
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);
}
