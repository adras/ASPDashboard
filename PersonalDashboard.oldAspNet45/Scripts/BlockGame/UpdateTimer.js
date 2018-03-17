var UpdateTimer = /** @class */ (function () {
    function UpdateTimer(interval) {
        this.lastUpdate = 0;
        this.interval = interval;
    }
    UpdateTimer.prototype.update = function (timeElapsed) {
        this.lastUpdate += timeElapsed;
    };
    UpdateTimer.prototype.isElapsed = function () {
        if (this.lastUpdate > this.interval) {
            this.lastUpdate = 0;
            return true;
        }
        return false;
    };
    return UpdateTimer;
}());
//let greeter = new Greeter("world"); 
//# sourceMappingURL=UpdateTimer.js.map