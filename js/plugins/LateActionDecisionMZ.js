/*:
 * @target MZ
 * @plugindesc Allows enemy actions to be decided just before their turn, while still respecting forced actions.
 * @author Bloodkin
 *
 * @help ...
 */

(() => {
    const _Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
    Game_Enemy.prototype.makeActions = function() {
        // Clear existing actions to ensure fresh decision making.
        this.clearActions();
        if ($gameSwitches.value(76)) {
            // If switch 76 is ON, decide actions based on the enemy's action patterns.
            console.log("Switch 76 is ON, enemy will decide action based on action patterns.");
            _Game_Enemy_makeActions.call(this);
        } else {
            // If switch 76 is OFF, don't override default behavior.
            console.log("Switch 76 is OFF, following default action pattern behavior.");
            _Game_Enemy_makeActions.call(this);
        }
    };

    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        // If there's a forced action pending, let the base system handle it.
        if (this._actionForcedBattlerId != null) {
            console.log("Forced action detected, proceeding with forced action.");
            _BattleManager_startAction.apply(this, arguments);
            return;
        }
        
        // If it's an enemy's turn, check if switch 76 is ON and the enemy can act.
        if (this._subject && this._subject.isEnemy() && this._subject.canMove()) {
            console.log("Enemy's turn. Checking switch 76 for action decision.");
            if ($gameSwitches.value(76)) {
                // Force action pattern decision if switch 76 is ON.
                this._subject.makeActions();
            }
        }
        
        // Call the original startAction method to proceed with the turn.
        _BattleManager_startAction.apply(this, arguments);
    };
})();