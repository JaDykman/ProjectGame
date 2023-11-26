window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowDown":
            // code for "down arrow" key press.
            playerTurn(0, -1);
        break;
        case "ArrowUp":
            // code for "up arrow" key press.
            playerTurn(0, 1);
        break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            playerTurn(-1, 0);
        break;
        case "ArrowRight":
            // code for "right arrow" key press.
            playerTurn(1, 0);
        break;
        default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
    
function playerTurn(x, y) { 
    //Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer(x,y);
    moveAll();
    setAllNextMove();
    displayMap(gameBoard);
    updatePlayerBar();
}
function updatePlayerBar() {
    let playerBar = document.getElementById('PlayerStatsBar');
    playerBar.innerHTML = player.name + " the " + player.pClass + "     Health: " + player.health;
}