var blockSizeX = 20;
var blockSizeY = 20;

var blockCountX = 10;
var blockCountY = 40;

var gameWidth = blockCountX * blockSizeX;
var gameHeight = blockCountY * blockSizeY;

var lastRender = 0;

var keyboardInterval = 100;
var gameSpeedInterval = 500;
var gameSpeedTimer;
var keyboardTimer;


var blockArrays;

var gameArea;

var state = {
    currentBlockIndex: 0,
    currentBlockRotation: 0,
    blockXPos: blockCountX / 2,
    blockYPos: 0,
    score: 0,
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false,
        rotateLeft: false,
        rotateRight: false,
        newBlock: false,
        placeBlock: false
    }
};

var gameCanvas;
var gameCanvasContext;
var textScore;

function randomRange(min, max) {
    // See: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    var result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
}

function validateBlockPosition(xPos, yPos) {
    if (typeof xPos === "undefined")
        xPos = state.blockXPos;
    if (typeof yPos === "undefined")
        yPos = state.blockYPos;

    var blockArray = getCurrentBlockArray();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var deltaX = xPos + i;
            var deltaY = yPos + j;
            if (blockArray[i][j] === 1 && deltaX < 0) {
                return false;
            }

            if (blockArray[i][j] === 1 && deltaY < 0) {
                return false;
            }

            if (blockArray[i][j] === 1 && deltaX >= blockCountX) {
                return false;
            }

            if (blockArray[i][j] === 1 && deltaY >= blockCountY) {
                return false;
            }
        }
    }
    return true;
}

function blockCollidesWithOtherBlocks(xPos, yPos) {
    if (typeof xPos === "undefined")
        xPos = state.blockXPos;
    if (typeof yPos === "undefined")
        yPos = state.blockYPos;

    var blockArray = getCurrentBlockArray();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var deltaX = xPos + i;
            var deltaY = yPos + j;

            // first check if the block is at the bottom which is considered a collision as well
            if (blockArray[i][j] === 1 && deltaY >= blockCountY) {
                return true;
            }

            if (blockArray[i][j] === 1 && gameArea[deltaX][deltaY] === 1) {
                return true;
            }

        }
    }
    return false;

}

function getCurrentBlockArray() {
    return blockArrays[state.currentBlockIndex][state.currentBlockRotation];
}

function update(progress) {
    //lastUpdate += progress;
    //if (lastUpdate < gameSpeed)
    //    return;

    gameSpeedTimer.update(progress);
    keyboardTimer.update(progress);

    if (gameSpeedTimer.isElapsed()) {
        if (!blockCollidesWithOtherBlocks(state.blockXPos, state.blockYPos + 1)) {
            state.blockYPos++;
        } else {
            placeCurrentBlock();
            return;
        }
    }


    if (keyboardTimer.isElapsed()) {
        if (state.pressedKeys.left) {
            if (validateBlockPosition(state.blockXPos - 1, state.blockYPos)) {
                state.blockXPos--;
            }
        }

        if (state.pressedKeys.right) {
            if (validateBlockPosition(state.blockXPos + 1, state.blockYPos)) {
                state.blockXPos++;
            }
        }

        if (state.pressedKeys.up) {
            // YES cheating!
            if (validateBlockPosition(state.blockXPos, state.blockYPos - 1)) {
                state.blockYPos -= 2;
            }
        }

        if (state.pressedKeys.down) {
            if (blockCollidesWithOtherBlocks(state.blockXPos, state.blockYPos + 1)) {
                placeCurrentBlock();
            }
            if (validateBlockPosition(state.blockXPos, state.blockYPos + 1)) {
                state.blockYPos++;
            }
        }
        if (state.pressedKeys.placeBlock) {
            placeCurrentBlock();
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


    updateScore();
}

function createNewBlock() {
    setCurrentBlockToRandom();
    state.blockXPos = blockCountX / 2;
    state.blockYPos = 0;
    if (blockCollidesWithOtherBlocks()) {
        alert("Game Over");
    }
}

function placeCurrentBlock() {
    var blockArray = getCurrentBlockArray();
    for (var i = 0; i < blockArray.length; i++) {
        for (var j = 0; j < blockArray[i].length; j++) {
            var deltaX = state.blockXPos + i;
            var deltaY = state.blockYPos + j;

            if (blockArray[i][j] === 1)
                gameArea[deltaX][deltaY] = 1;
        }
    }
    createNewBlock();
    state.score += 100;

    removeCompleteLines();
}

function removeLine(yPos) {
    for (var j = yPos; j > 0; j--) {
        for (var i = 0; i < blockCountX; i++) {
            gameArea[i][j] = gameArea[i][j - 1];
        }
    }
}

function removeCompleteLines() {
    var removedLines = 0;
    for (var j = blockCountY - 1; j >= 0; j--) {
        var blockCount = 0;
        for (var i = 0; i < blockCountX; i++) {
            if (gameArea[i][j] === 1) {
                blockCount++;
            }
        }
        if (blockCount === blockCountX) {
            removeLine(j);
            removedLines++;
            j++;
        }
        blockCount = 0;
    }

    if (removedLines > 0)
        state.score += Math.pow(removedLines + 1, 2) * 1000;
}

function drawBlock(colorString) {
    gameCanvasContext.fillStyle = colorString;

    var blockArray = getCurrentBlockArray();

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

function drawGameArea() {
    for (var i = 0; i < blockCountX; i++) {
        for (var j = 0; j < blockCountY; j++) {
            if (gameArea[i][j] === 1)
                drawSimpleBlock("#000000", i, j);
        }
    }
}

function rotateLeft() {
    state.currentBlockRotation++;
    if (state.currentBlockRotation > 3)
        state.currentBlockRotation = 0;

    // Check if the block is inside the game area, if not rotate it back
    if (!validateBlockPosition()) {
        rotateRight();
    }

    // If we get a collision with other blocks, also rotate it back
    if (blockCollidesWithOtherBlocks()) {
        rotateRight();
    }
}

function rotateRight() {
    state.currentBlockRotation--;
    if (state.currentBlockRotation < 0)
        state.currentBlockRotation = 3;

    // Check if the block is inside the game area, if not rotate it back
    if (!validateBlockPosition()) {
        rotateLeft();
    }

    // If we get a collision with other blocks, also rotate it back
    if (blockCollidesWithOtherBlocks()) {
        rotateLeft();
    }
}

function drawSimpleBlock(colorString, xBlockPos, yBlockPos) {
    var xPos = xBlockPos * blockSizeX;
    var yPos = yBlockPos * blockSizeY;

    gameCanvasContext.fillStyle = colorString;
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

    drawBlock("#FFAA00");
    drawGameArea();
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

function initializeScore() {
    textScore = $("#textScore")[0];
    updateScore();
}

function updateScore() {
    textScore.innerHTML = "Score: " + state.score;
}

function initialize() {
    initializeCanvas();
    initializeBlocks();
    initializeGameArea();

    gameSpeedTimer = new UpdateTimer(gameSpeedInterval);
    keyboardTimer = new UpdateTimer(keyboardInterval);

    initializeScore();

    // This has to be called last since it starts the game
    initializeEvents();
}


var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down',
    74: 'rotateLeft',
    75: 'rotateRight',
    79: 'newBlock',
    80: 'placeBlock'
};

$(document).ready(initialize);




