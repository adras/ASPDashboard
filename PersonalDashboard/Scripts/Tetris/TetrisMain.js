var blockSizeX = 20;
var blockSizeY = 20;

var blockCountX = 8;
var blockCountY = 40;

var gameWidth = blockCountX * blockSizeX;
var gameHeight = blockCountY * blockSizeY;

// millisecond interval between updates
var gameSpeed = 100;

var lastRender = 0;
var lastUpdate = 0;

var blockArrays;

var gameArea;

var state = {
    currentBlockArray: 0,
    blockXPos: 0,
    blockYPos: 0,
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false,
        rotateLeft: false,
        rotateRight: false,
        newBlock: false
    }
};

var gameCanvas;
var gameCanvasContext;

var textDebug1;
var textDebug2;
var textDebug3;

function randomRange(min, max) {
    // See: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    var result = Math.floor(Math.random() * (max - min + 1) + min);
    textDebug2.innerHTML = result;
    return result;
}

function update(progress) {
    textDebug1.innerHTML = progress;

    lastUpdate += progress;
    if (lastUpdate < gameSpeed)
        return;

    lastUpdate = 0;

    if (state.pressedKeys.left) {
        state.blockXPos = Math.max(0, state.blockXPos - 1);
    }
    if (state.pressedKeys.right) {
        state.blockXPos = Math.min(blockCountX - 1, state.blockXPos + 1);
    }
    if (state.pressedKeys.up) {
        // No cheating!
        state.blockYPos = Math.max(0, state.blockYPos - 1);
    }
    if (state.pressedKeys.down) {
        state.blockYPos = Math.min(blockCountY - 1, state.blockYPos + 1);
    }

    if (state.pressedKeys.rotateLeft) {
        rotateLeft();
    }
    if (state.pressedKeys.rotateRight) {
        rotateRight();
    }

    if (state.pressedKeys.newBlock) {
        setCurrentBlockToRandom();
    }
}

function drawBlock() {
    gameCanvasContext.fillStyle = "#FFAA00";

    for (var i = 0; i < state.currentBlockArray.length; i++) {
        for (var j = 0; j < state.currentBlockArray[i].length; j++) {
            var xPos = (state.blockXPos + i) * blockSizeX;
            var yPos = (state.blockYPos + j) * blockSizeY;

            if (state.currentBlockArray[i][j] === 1) {
                gameCanvasContext.fillRect(xPos, yPos, blockSizeX, blockSizeY);
            }
        }
    }
}

function rotateBlockArrayRight(blockArray) {
    // See: https://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array
    var resultArray = new Array(4);

    for (var i = 0; i < 4; ++i) {
        resultArray[i] = new Array(4);
        for (var j = 0; j < 4; ++j) {
            resultArray[i][j] = blockArray[4 - j - 1][i];
        }
    }
    return resultArray;
}

function rotateBlockArrayLeft(blockArray) {
    var resultArray = new Array(4);

    for (var i = 0; i < 4; ++i) {
        resultArray[i] = new Array(4);
        for (var j = 0; j < 4; ++j) {
            resultArray[i][j] = blockArray[j][4 - i - 1];
        }
    }
    return resultArray;
}


function rotateLeft() {
    state.currentBlockArray = rotateBlockArrayLeft(state.currentBlockArray);
}

function rotateRight() {
    state.currentBlockArray = rotateBlockArrayRight(state.currentBlockArray);
}

function drawSimpleBlock() {
    var xPos = state.blockXPos * blockSizeX;
    var yPos = state.blockYPos * blockSizeY;

    gameCanvasContext.fillStyle = "#FFAA00";
    gameCanvasContext.fillRect(xPos, yPos, blockSizeX, blockSizeY);
}

function clearCanvas() {
    gameCanvasContext.fillStyle = "#AAAAAA";
    gameCanvasContext.fillRect(0, 0, gameWidth, gameHeight);
}

function draw() {
    clearCanvas();
    // Draw the state of the world
    //$"cvsGameArea"
    if (state.pressedKeys.left) {
        gameCanvasContext.fillStyle = "#FF00FF";
    }
    if (state.pressedKeys.right) {
        gameCanvasContext.fillStyle = "#00FFFF";
    }
    if (state.pressedKeys.up) {
        gameCanvasContext.fillStyle = "#FFFF00";
    }
    if (state.pressedKeys.down) {
        gameCanvasContext.fillStyle = "#00FF00";
    }

    drawBlock();
    //drawSimpleBlock();

}

function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

function keydown(event) {
    textDebug3.innerHTML = event.keyCode;

    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = true;
}

function keyup(event) {
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = false;
}

function initializeGameArea() {
    gameArea = new Array(blockCountX);
    for (var i = 0; i < gameArea.length; i++) {
        gameArea[i] = new Array(blockCountY);
        gameArea[i].fill(0);
    }
}

function initializeCanvas() {
    gameCanvas = $("#canvasGameArea")[0];
    gameCanvas.width = gameWidth;
    gameCanvas.height = gameHeight;
    gameCanvasContext = gameCanvas.getContext("2d");
}

function initializeEvents() {
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    window.requestAnimationFrame(loop);
}

function initializeBlocks() {
    blockArrays = new Array(6);

    blockArrays[0] = [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]];

    blockArrays[1] = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0]];

    blockArrays[2] = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0]];

    blockArrays[3] = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0]];

    blockArrays[4] = [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0]];

    blockArrays[5] = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0]];

    // Blocks above are defined rotated by 90 degrees, rotate them again so axis are not swapped
    for (var i = 0; i < 6; i++) {
        blockArrays[i] = rotateBlockArrayLeft(blockArrays[i]);
        //blockArrays[i] = rotateLeft(blockArrays[i]);
    }

    // set the first block to a random number
    setCurrentBlockToRandom();
}

function setCurrentBlockToRandom() {
    var newBlockNumber = randomRange(0, 5);
    var blockArray = blockArrays[newBlockNumber];
    state.currentBlockArray = blockArray;
}

function initialize() {
    textDebug1 = $("#textDebug1")[0];
    textDebug2 = $("#textDebug2")[0];
    textDebug3 = $("#textDebug3")[0];

    initializeCanvas();
    initializeBlocks();

    // This has to be called last since it starts the game
    initializeEvents();

    alert("Hello World");
}


var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down',
    74: 'rotateLeft',
    75: 'rotateRight',
    79: 'newBlock'
};

$(document).ready(initialize);




