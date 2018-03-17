var BlockGame;
(function (BlockGame) {
    class UpdateTimer {
        constructor(interval) {
            this.lastUpdate = 0;
            this.interval = interval;
        }
        update(timeElapsed) {
            this.lastUpdate += timeElapsed;
        }
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