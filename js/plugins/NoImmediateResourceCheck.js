/*:
 * @target MZ
 * @plugindesc Allows actors to queue actions without checking MP/TP initially but checks upon action execution.
 * @author Bloodkin
 *
 * @help NoImmediateResourceCheck.js
 *
 * Allows actions (skills/items) to be queued even if the actor currently doesn't have enough MP/TP,
 * but checks for sufficient resources when the action is about to execute.
 */

(() => {
    // Directly modify the action execution process
    const _Game_Battler_executeAction = Game_Battler.prototype.executeAction;
    Game_Battler.prototype.executeAction = function(action) {
        if (action.isSkill()) {
            // Check for sufficient MP/TP at execution time
            if (this._mp < action.item().mpCost || this._tp < action.item().tpCost) {
                // Not enough resources; notify and skip the action
                if (this.isActor()) {
                    const missingResource = this._mp < action.item().mpCost ? 'MP' : 'TP';
                    $gameMessage.add(`${this.name()} does not have enough ${missingResource} for ${action.item().name}.`);
                }
                // Skipping the action by not calling the super method for execution
                return;
            }
        }
        // Proceed with the action execution if resources are sufficient or if it's not a skill
        _Game_Battler_executeAction.call(this, action);
    };
})();
