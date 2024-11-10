class BattleCountdownTimer {
    constructor(durationInSeconds, onCompleteEventId) {
        this.durationInSeconds = durationInSeconds;
        this.onCompleteEventId = onCompleteEventId;
        this.timerSwitches = [516, 517, 518, 519]; // Switch IDs in reverse order for countdown
        this.currentTimerIndex = 0;
        this.isTimerActive = false;
    }

    start() {
        this.resetTimerSwitches();
        this.currentTimerIndex = this.timerSwitches.length - 1; // Start from the last switch
        this.isTimerActive = true;
        this.update();
    }

    update() {
        if (!this.isTimerActive) return;

        if (this.currentTimerIndex >= 0) {
            // Turn on the current timer switch
            $gameSwitches.setValue(this.timerSwitches[this.currentTimerIndex], true);
            this.waitForNextTick();
        } else {
            this.complete();
        }
    }

    waitForNextTick() {
        setTimeout(() => {
            // Turn off the current timer switch after 1 second
            $gameSwitches.setValue(this.timerSwitches[this.currentTimerIndex], false);
            this.currentTimerIndex--;
            this.update();
        }, 1000);
    }

    complete() {
        this.isTimerActive = false;
        // Trigger the common event when the countdown completes
        $gameTemp.reserveCommonEvent(this.onCompleteEventId);
    }

    resetTimerSwitches() {
        // Make sure all timer switches are OFF at the start
        this.timerSwitches.forEach(switchId => {
            $gameSwitches.setValue(switchId, false);
        });
    }
}

// Usage:
// To start a 4 second countdown that triggers common event 430 at the end:
// var battleTimer = new BattleCountdownTimer(4, 430);
// battleTimer.start();
