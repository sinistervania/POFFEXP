(() => {
    const prowlerStateId = 77; // Prowler state ID
    const prowlerSwitchId = 76; // Prowler switch ID

    const _Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function() {
        _Game_Actor_refresh.call(this);
        // Check if the actor has the Prowler state
        if (this.isStateAffected(prowlerStateId)) {
            $gameSwitches.setValue(prowlerSwitchId, true); // Turn on the switch
        } else {
            $gameSwitches.setValue(prowlerSwitchId, false); // Turn off the switch
        }
    };
})();
