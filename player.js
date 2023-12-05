class Player {
    constructor(health, baseDMG, sprite, pClass, posX, posY) {
        this.health = health;
        this.baseDMG = baseDMG;
        this.sprite = sprite;
        this.pClass = pClass;
        this.posX = posX;
        this.posY = posY;
        this.name;
    }
}
function makePlayer() {
    let player = new Player();
    player.name = prompt("Who dares to enter the caves? ");
    let playerClass = parseInt(prompt("What is your trade?(1:Knight, 2:Archer, 3:Barb, 4:Mage) "))
    const classOne = {
        class: "Knight",
        sprite: 'knight.png',
        health: 10,
        baseDMG: 3,
    };
    const classTwo = {
        class: "Archer",
        sprite: 'archer.png',
        health: 7,
        baseDMG: 2,
    };
    const classThree = {
        class: "Barbarian",
        sprite: 'barb.png',
        health: 20,
        baseDMG: 1,
    };
    const classFour = {
        class: "Mage",
        sprite: 'mage.png',
        health: 7,
        baseDMG: 2,
    };
    switch (playerClass) {
        case 1:
            player.health = classOne.health;
            player.baseDMG = classOne.baseDMG;
            player.sprite = classOne.sprite;
            player.pClass = classOne.class;
            break;
        case 2:
            player.health = classTwo.health;
            player.baseDMG = classTwo.baseDMG;
            player.sprite = classTwo.sprite;
            player.pClass = classTwo.class;
            break;
        case 3:
            player.health = classThree.health;
            player.baseDMG = classThree.baseDMG;
            player.sprite = classThree.sprite;
            player.pClass = classThree.class;
            break;
        case 4:
            player.health = classFour.health;
            player.baseDMG = classFour.baseDMG;
            player.sprite = classFour.sprite;
            player.pClass = classFour.class;
            break;
        default:
            //restart function
            alert(player.name + ", that was not one of your options!");
            return makePlayer();
    }
    alert("Ah, you are " + player.name + ", The " + player.pClass);
    return player;
}
function movePlayer(x, y) {
    // Calculate the new position
    let newX = player.posX + x;
    let newY = player.posY - y;

    if (newY >= 0 && newY < gameBoard.length && newX >= 0 && newX < gameBoard[newY].length) {
        switch (gameBoard[newY][newX]) {
            case floor:
                // Update the game state array for the old position
                gameBoard[player.posY][player.posX] = floor;
                // Check if the new position is within the bounds of the game board
                // Clear the old position in the DOM
                let table = document.getElementById('gameBoard');
                const oldCell = table.rows[player.posY].cells[player.posX];
                oldCell.innerHTML = `<img src="${floor}" alt="Floor">`;

                // Update the player's position
                player.posX = newX;
                player.posY = newY;

                gameBoard[newY][newX] = player;
                break;
            case wall:
                break;
            case door:
                createGameBoard();
                break;
            default:
                console.error("Invalid player position:", newX, newY);
        }
    }
}