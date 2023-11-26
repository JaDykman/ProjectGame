window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowDown":
            // code for "down arrow" key press.
            console.log("Moving Down");
            playerTurn(0, -1);
        break;
        case "ArrowUp":
            // code for "up arrow" key press.
            console.log("Moving Up");
            playerTurn(0, 1);
        break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            console.log("Moving Left");
            playerTurn(-1, 0);
        break;
        case "ArrowRight":
            // code for "right arrow" key press.
            console.log("Moving Right");
            playerTurn(1, 0);
        break;
        default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
    
function playerTurn(x, y) { 
    movePlayer(x,y);
    moveAll();
    setAllNextMove();
    displayMap(gameBoard);
}