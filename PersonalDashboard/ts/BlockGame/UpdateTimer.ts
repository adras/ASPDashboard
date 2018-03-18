namespace BlockGame {
    /**
     * Timer class which helps triggering based on an elapsed time in milliseconds
     */
    export class UpdateTimer {
        interval: number;
        lastUpdate: number = 0;

        /**
         * Constructs a new instance of this timer using the given interval
         * @param interval interval in milliseconds this timer triggers in
         */
        constructor(interval: number) {
            this.interval = interval;
        }

        /**
         * Used to update the timer, should be called each update loop
         * @param timeElapsed time elapsed since the last update of this timer
         */
        public update(timeElapsed: number) {
            this.lastUpdate += timeElapsed;
        }

        /**
         * returns true if the interval of this timer is elapsed and resets the timer
         */
        public isElapsed(): boolean {
            if (this.lastUpdate > this.interval) {
                this.lastUpdate = 0;
                return true;
            }
            return false;
        }

    }
}
