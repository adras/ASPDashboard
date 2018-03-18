var BlockGame;
(function (BlockGame) {
    /**
     * Factory to create arrays for the blocks in the game, first dimension indicates the rotation of the block, the other two the xy-coordinates
     * size of arrays is 4x4x4
     */
    class BlockFactory {
        constructor() {
        }
        /**
         * Returns the array for the straight long block
         */
        static createLongBlock() {
            let blockArray = [
                [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0]
                ]
            ];
            return blockArray;
        }
        /**
         * Returns the array for the block which looks like an L pointing left
         */
        static createLeftLBlock() {
            let blockArray = [
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 1, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 1, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ]
            ];
            return blockArray;
        }
        /**
         * Returns the array for the block which looks like an L pointing right
         */
        static createRightLBlock() {
            let blockArray = [
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [1, 0, 0, 0]
                ],
                [
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0]
                ]
            ];
            return blockArray;
        }
        /**
         * Returns the array for the simple 4x4 block
         */
        static createCubeBlock() {
            let blockArray = [
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ]
            ];
            return blockArray;
        }
        /**
         * Returns the array for the block which looks like a small t
         */
        static createTBlock() {
            let blockArray = [
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0]
                ]
            ];
            return blockArray;
        }
        /**
         * Return the array for the block which looks like a z pointing left
         */
        static createZBlockLeft() {
            let blockArray = [
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0]
                ]
            ];
            return blockArray;
        }
        /**
         * Return the array for the block which looks like a z pointing right
         */
        static createZBlockRight() {
            let blockArray = [
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [1, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [1, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 0]
                ]
            ];
            return blockArray;
        }
    }
    BlockGame.BlockFactory = BlockFactory;
})(BlockGame || (BlockGame = {}));
//# sourceMappingURL=BlockFactory.js.map