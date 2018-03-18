var BlockGame;
(function (BlockGame) {
    /**
     * Timer class which helps triggering based on an elapsed time in milliseconds
     */
    class UpdateTimer {
        /**
         * Constructs a new instance of this timer using the given interval
         * @param interval interval in milliseconds this timer triggers in
         */
        constructor(interval) {
            this.lastUpdate = 0;
            this.interval = interval;
        }
        /**
         * Used to update the timer, should be called each update loop
         * @param timeElapsed time elapsed since the last update of this timer
         */
        update(timeElapsed) {
            this.lastUpdate += timeElapsed;
        }
        /**
         * returns true if the interval of this timer is elapsed and resets the timer
         */
        isElapsed() {
            if (this.lastUpdate > this.interval) {
                this.lastUpdate = 0;
                return true;
            }
            return false;
        }
    }
    BlockGame.UpdateTimer = UpdateTimer;
})(BlockGame || (BlockGame = {}));
//# sourceMappingURL=UpdateTimer.js.map