class UpdateTimer {
    interval: number;
    lastUpdate: number = 0;

    constructor(interval: number) {
        this.interval = interval;
    }

    public update(timeElapsed: number) {
        this.lastUpdate += timeElapsed;
    }

    public isElapsed(): boolean {
        if (this.lastUpdate > this.interval) {
            this.lastUpdate = 0;
            return true;
        }
        return false;
    }

}

//let greeter = new Greeter("world");