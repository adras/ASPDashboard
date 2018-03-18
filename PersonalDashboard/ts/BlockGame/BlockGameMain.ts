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

    let gameCanvas;
    let gameCanvasContext;
    let textScore;

    /**
     * Gets a random integer number between min and max
     * @param min minimum number (inclusive)
     * @param max maximum number (inclusive)
     */
    function randomRange(min: number, max: number) {
        // See: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        let result = Math.floor(Math.random() * (max - min + 1) + min);
        return result;
    }

    /**
     * Validates if the current block is within the game area
     * @param xPos x-position of the block defaults to the current position in game state
     * @param yPos y-position of the block defaults to the current position in game state
     */
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

    /**
     * returns true if the current block collides with other blocks in the game area
     * @param xPos x-position of the block defaults to the current position in game state
     * @param yPos y-position of the block defaults to the current position in game state
     */
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

    /**
     * Gets the 2d array of the current block
     */
    function getCurrentBlockArray() {
        return blockArrays[state.currentBlockIndex][state.currentBlockRotation];
    }

    /**
     * Main update loop
     * @param progress
     */
    function update(progress) {
        // Update timers
        gameSpeedTimer.update(progress);
        keyboardTimer.update(progress);

        // Move block down if the gamespeed timer is elapsed, place block if it collides with blocks below
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

            // Used for debugging, places the block at the current position
            //if (state.pressedKeys.placeBlock) {
            //    placeCurrentBlock();
            //}

            if (state.pressedKeys.rotateLeft) {
                rotateLeft();
            }

            if (state.pressedKeys.rotateRight) {
                rotateRight();
            }

            // Used for debugging Replaces the current block with a new random block
            //if (state.pressedKeys.newBlock) {
            //    setCurrentBlockToRandom();
            //}

        }


        updateScore();
    }

    /**
     * Creates a new block, used after a block was placed
     */
    function createNewBlock() {
        setCurrentBlockToRandom();
        state.blockXPos = blockCountX / 2;
        state.blockYPos = 0;
        if (blockCollidesWithOtherBlocks()) {
            // Currently an endless loop
            // TODO: Add restart button
            alert("Game Over");
        }
    }

    /**
     * Places the current block in the game area and removes lines if necessary
     */
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
        // Get a new block for the player
        createNewBlock();

        // add some score for placing the block
        state.score += 100;

        // remove lines which are now complete
        removeCompleteLines();
    }

    /**
     * Removes a single line from the game area and moves all lines on top one line down
     * @param yPos position to remove line from
     */
    function removeLine(yPos: number) {
        for (let j = yPos; j > 0; j--) {
            for (let i = 0; i < blockCountX; i++) {
                gameArea[i][j] = gameArea[i][j - 1];
            }
        }
    }

    /**
     * Removes all the complete lines from the game area
     */
    function removeCompleteLines() {
        // for each line count the blocks in x direction, if it the same as the game with, the line is complete and can
        // be removed
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

        // Add some score using the formula (l+1)^2 * 1000 to give exponentially more points the more lines were removed
        if (removedLines > 0)
            state.score += Math.pow(removedLines + 1, 2) * 1000;
    }

    /**
     * Draws a complete game block using the given color
     * @param colorString html color string to use
     */
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

    /**
     * Draws the entire game area - all the blocks currently placed
     */
    function drawGameArea() {
        for (let i = 0; i < blockCountX; i++) {
            for (let j = 0; j < blockCountY; j++) {
                if (gameArea[i][j] === 1)
                    drawSimpleBlock("#000000", i, j);
            }
        }
    }

    /**
     * Rotates the current block left
     */
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

    /**
     * Rotates the current block right
     */
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

    /**
     * Draws a block part using the given color at the given position
     * @param colorString html-color-string to use
     * @param xBlockPos position to draw block at
     * @param yBlockPos position to draw block at
     */
    function drawSimpleBlock(colorString: string, xBlockPos: number, yBlockPos: number) {
        let xPos = xBlockPos * blockSizeX;
        let yPos = yBlockPos * blockSizeY;

        gameCanvasContext.fillStyle = colorString;
        gameCanvasContext.fillRect(xPos, yPos, blockSizeX, blockSizeY);
    }

    /**
     * Clears the canvas
     */
    function clearCanvas() {
        gameCanvasContext.fillStyle = "#AAAAAA";
        gameCanvasContext.fillRect(0, 0, gameWidth, gameHeight);
    }

    /**
     * Draws the hole game
     */
    function draw() {
        // clear canvas
        clearCanvas();

        // Draw the current block of the player
        drawBlock("#FFAA00");

        // Draw all the blocks already placed
        drawGameArea();
    }

    /**
     * Main game loop to trigger update and draw
     * @param timestamp
     */
    function loop(timestamp: number) {
        let progress = timestamp - lastRender;

        update(progress);
        draw();

        lastRender = timestamp;
        window.requestAnimationFrame(loop);
    }

    /**
     * Handler for key down event
     * @param event
     */
    function keydown(event: any) {
        let key = keyMap[event.keyCode];
        state.pressedKeys[key] = true;
    }

    /**
     * Handler for key up event
     * @param event
     */
    function keyup(event) {
        let key = keyMap[event.keyCode];
        state.pressedKeys[key] = false;
    }

    /**
     * Initializes the game area by clearing the gameArea array
     */
    function initializeGameArea() {
        gameArea = new Array(blockCountX);

        for (let i = 0; i < gameArea.length; i++) {
            gameArea[i] = new Array(blockCountY);
            for (let j = 0; j < gameArea[i].length; j++) {
                gameArea[i][j] = 0;
            }
        }
    }

    /**
     * Initializes the canvas element by setting it's size, also initializes the canvasContext
     */
    function initializeCanvas() {
        gameCanvas = document.getElementById("canvasGameArea");
        gameCanvas.width = gameWidth;
        gameCanvas.height = gameHeight;
        gameCanvasContext = gameCanvas.getContext("2d");
    }

    /**
     * Registers the events for keydown, keyup and the main update loop
     */
    function initializeEvents() {
        window.addEventListener("keydown", keydown, false);
        window.addEventListener("keyup", keyup, false);
        window.requestAnimationFrame(loop);
    }

    /**
     * Initializues the block arrays
     */
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

    /**
     * Sets the current block to a new random block
     */
    function setCurrentBlockToRandom() {
        let newBlockNumber = randomRange(0, 6);

        state.currentBlockIndex = newBlockNumber;
    }

    /**
     * Initializes the score html-element and sets score to 0
     */
    function initializeScore() {
        //textScore = $("#textScore")[0];
        textScore = document.getElementById("textScore");
        updateScore();
    }

    /**
     * Sets the content of the score element to the current score
     */
    function updateScore() {
        textScore.innerHTML = "Score: " + state.score;
    }

    /**
     * Initializes the game
     */
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

    //$(document).ready(initialize);
    window.onload = initialize;
}