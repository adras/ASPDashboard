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
    currentBlockIndex: 0,
    currentBlockRotation: 0,
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

    var blockArray = blockArrays[state.currentBlockIndex][state.currentBlockRotation];

    for (var i = 0; i < blockArray.length; i++) {
        for (var j = 0; j < blockArray[i].length; j++) {
            var xPos = (state.blockXPos + i) * blockSizeX;
            var yPos = (state.blockYPos + j) * blockSizeY;

            if (blockArray[i][j] === 1) {
                gameCanvasContext.fillRect(xPos, yPos, blockSizeX, blockSizeY);
            }
        }
    }
}

function rotateLeft() {
    state.currentBlockRotation++;
    if (state.currentBlockRotation > 3)
        state.currentBlockRotation = 0;
}

function rotateRight() {
    state.currentBlockRotation--;
    if (state.currentBlockRotation < 0)
        state.currentBlockRotation = 3;
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
    blockArrays = new Array(7);
    blockArrays[0] = BlockFactory.createCubeBlock();
    blockArrays[1] = BlockFactory.createLeftLBlock();
    blockArrays[2] = BlockFactory.createLongBlock();
    blockArrays[3] = BlockFactory.createRightLBlock();
    blockArrays[4] = BlockFactory.createTBlock();
    blockArrays[5] = BlockFactory.createZBlockLeft();
    blockArrays[6] = BlockFactory.createZBlockRight();
}

function setCurrentBlockToRandom() {
    var newBlockNumber = randomRange(0, 6);

    state.currentBlockIndex = newBlockNumber;
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




