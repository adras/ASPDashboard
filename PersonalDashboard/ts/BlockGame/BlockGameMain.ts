namespace BlockGame {

    let blockSizeX: number = 20;
    let blockSizeY: number = 20;

    let blockCountX: number = 10;
    let blockCountY: number = 30;

    let gameWidth: number = blockCountX * blockSizeX;
    let gameHeight: number = blockCountY * blockSizeY;

    let lastRender: number = 0;

    let keyboardInterval: number = 100;
    let gameSpeedInterval: number = 500;
    let gameSpeedTimer: UpdateTimer;
    let keyboardTimer: UpdateTimer;


    let blockArrays: number[][][][];

    let gameArea: number[][];

    let state = {
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

    let gameCanvas;
    let gameCanvasContext;
    let textScore;

    function randomRange(min: number, max: number) {
        // See: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        let result = Math.floor(Math.random() * (max - min + 1) + min);
        return result;
    }

    function validateBlockPosition(xPos: number = state.blockXPos, yPos: number = state.blockYPos) {
        let blockArray = getCurrentBlockArray();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let deltaX = xPos + i;
                let deltaY = yPos + j;
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

    function blockCollidesWithOtherBlocks(xPos: number = state.blockXPos, yPos: number = state.blockYPos) {

        let blockArray = getCurrentBlockArray();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let deltaX = xPos + i;
                let deltaY = yPos + j;

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
                if (validateBlockPosition(state.blockXPos - 1, state.blockYPos) && !blockCollidesWithOtherBlocks(state.blockXPos - 1, state.blockYPos)) {
                    state.blockXPos--;
                }
            }

            if (state.pressedKeys.right) {
                if (validateBlockPosition(state.blockXPos + 1, state.blockYPos) && !blockCollidesWithOtherBlocks(state.blockXPos + 1, state.blockYPos)) {
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
        let blockArray = getCurrentBlockArray();
        for (let i = 0; i < blockArray.length; i++) {
            for (let j = 0; j < blockArray[i].length; j++) {
                let deltaX = state.blockXPos + i;
                let deltaY = state.blockYPos + j;

                if (blockArray[i][j] === 1)
                    gameArea[deltaX][deltaY] = 1;
            }
        }
        createNewBlock();
        state.score += 100;

        removeCompleteLines();
    }

    function removeLine(yPos: number) {
        for (let j = yPos; j > 0; j--) {
            for (let i = 0; i < blockCountX; i++) {
                gameArea[i][j] = gameArea[i][j - 1];
            }
        }
    }

    function removeCompleteLines() {
        let removedLines = 0;
        for (let j = blockCountY - 1; j >= 0; j--) {
            let blockCount = 0;
            for (let i = 0; i < blockCountX; i++) {
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

    function drawBlock(colorString: string) {
        gameCanvasContext.fillStyle = colorString;

        let blockArray = getCurrentBlockArray();

        for (let i = 0; i < blockArray.length; i++) {
            for (let j = 0; j < blockArray[i].length; j++) {
                let xPos = (state.blockXPos + i) * blockSizeX;
                let yPos = (state.blockYPos + j) * blockSizeY;

                if (blockArray[i][j] === 1) {
                    gameCanvasContext.fillRect(xPos, yPos, blockSizeX, blockSizeY);
                }
            }
        }
    }

    function drawGameArea() {
        for (let i = 0; i < blockCountX; i++) {
            for (let j = 0; j < blockCountY; j++) {
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

    function drawSimpleBlock(colorString: string, xBlockPos: number, yBlockPos: number) {
        let xPos = xBlockPos * blockSizeX;
        let yPos = yBlockPos * blockSizeY;

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

    function loop(timestamp: number) {
        let progress = timestamp - lastRender;

        update(progress);
        draw();

        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    function keydown(event: any) {
        let key = keyMap[event.keyCode];
        state.pressedKeys[key] = true;
    }

    function keyup(event) {
        let key = keyMap[event.keyCode];
        state.pressedKeys[key] = false;
    }

    function initializeGameArea() {
        gameArea = new Array(blockCountX);

        for (let i = 0; i < gameArea.length; i++) {
            gameArea[i] = new Array(blockCountY);
            for (let j = 0; j < gameArea[i].length; j++) {
                gameArea[i][j] = 0;
            }
        }
    }

    function fillArray(array: number[]) {
        for (let i = 0; i < array.length; i++) {
            array[i]
        }
    }

    function initializeCanvas() {
        //gameCanvas = $("#canvasGameArea")[0];
        gameCanvas = document.getElementById("canvasGameArea");
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
        let newBlockNumber = randomRange(0, 6);

        state.currentBlockIndex = newBlockNumber;
    }

    function initializeScore() {
        //textScore = $("#textScore")[0];
        textScore = document.getElementById("textScore");
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


    let keyMap = {
        68: 'right',
        65: 'left',
        87: 'up',
        83: 'down',
        74: 'rotateLeft',
        75: 'rotateRight',
        79: 'newBlock',
        80: 'placeBlock'
    };

    //$(document).ready(initialize);
    window.onload = initialize;
}