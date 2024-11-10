const prowlerStateId = 77; // Prowler state ID

const _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
    // Store the current state turns for Prowler state
    let prowlerStateTurns = this._statesTurns[prowlerStateId];

    _Game_Battler_onTurnEnd.call(this);

    // If not in battle, restore the Prowler state turns
    if (!SceneManager._scene instanceof Scene_Battle && prowlerStateTurns) {
        this._statesTurns[prowlerStateId] = prowlerStateTurns;
    }
};
