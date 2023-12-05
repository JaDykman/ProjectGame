let debounceTimeout;

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    // Clear the existing timeout
    clearTimeout(debounceTimeout);

    // Set a new timeout
    debounceTimeout = setTimeout(function() {
        switch (event.key) {
            case "ArrowDown":
                playerTurn(0, -1);
                break;
            case "ArrowUp":
                playerTurn(0, 1);
                break;
            case "ArrowLeft":
                playerTurn(-1, 0);
                break;
            case "ArrowRight":
                playerTurn(1, 0);
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    }, 10); // Debounce time

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

function playerTurn(x, y) {
    //Clear the canvas
    fogCtx.clearRect(0, 0, fogCtx.canvas.width, fogCtx.canvas.height);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    movePlayer(x, y);
    moveAll();
    setAllNextMove();
    displayMap(gameBoard);
    //let playerPosition = getCellScreenPosition(player.posX, player.posY);
    //drawCircleWithGradient(playerPosition.x, playerPosition.y, 75, 100);
    updatePlayerBar();
}
function updatePlayerBar() {
    let playerBar = document.getElementById('PlayerStatsBar');
    playerBar.innerHTML = player.name +
        " the " + player.pClass +
        " Health: " + player.health +
        " Floor: " + floorCount;
}
function drawCircleWithGradient(centerX, centerY, radius, distance) {
    // Create radial gradient
    const gradient = fogCtx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius + distance);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)'); // Start with transparent center
    gradient.addColorStop(.5, 'rgba(0, 0, 0, .5)'); // Start with transparent center
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Start with transparent center

    // Fill the rest of the canvas with black
    fogCtx.globalCompositeOperation = 'source-over';
    fogCtx.fillStyle = 'black';
    fogCtx.fillRect(0, 0, fogCtx.canvas.width, fogCtx.canvas.height);

    // Redraw the gradient circle to blend properly
    fogCtx.globalCompositeOperation = 'destination-out';
    fogCtx.beginPath();
    fogCtx.arc(centerX, centerY, radius + distance, 0, 5 * Math.PI);
    fogCtx.fillStyle = gradient;
    fogCtx.fill();

    // Reset the composite operation
    fogCtx.globalCompositeOperation = 'source-over';
}
function startGame() {
    player = makePlayer();
    createGameBoard();
    //let playerPosition = getCellScreenPosition(player.posX, player.posY);
    //drawCircleWithGradient(playerPosition.x, playerPosition.y, 75, 100); // Draw on canvas with id 'myCanvas'
}
