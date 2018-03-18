namespace BlockGame {
    /**
     * Factory to create arrays for the blocks in the game, first dimension indicates the rotation of the block, the other two the xy-coordinates
     * size of arrays is 4x4x4
     */
    export class BlockFactory {
        constructor() {

        }

        /**
         * Returns the array for the straight long block
         */
        static createLongBlock(): number[][][] {
            let blockArray: number[][][] = [
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
        static createLeftLBlock(): number[][][] {
            let blockArray: number[][][] = [
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
        static createRightLBlock(): number[][][] {
            let blockArray: number[][][] = [
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
        static createCubeBlock(): number[][][] {
            let blockArray: number[][][] = [
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
        static createTBlock(): number[][][] {
            let blockArray: number[][][] = [
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
        static createZBlockLeft(): number[][][] {
            let blockArray: number[][][] = [
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
        static createZBlockRight(): number[][][] {
            let blockArray: number[][][] = [
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
}