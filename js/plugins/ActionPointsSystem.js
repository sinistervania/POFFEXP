/*:
 * @target MZ
 * @plugindesc Manages Action Points based on "Action Times +" traits. Updates and consumes action points during combat.
 * @author Bloodkin
 *
 * @help This plugin calculates "Action Times +" traits as Action Points at the start of each turn,
 * and decrements these points when an action is confirmed in combat.
 */

(() => {
    // Alias the startTurn method of BattleManager to update Action Points at the start of each turn
    const _BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        _BattleManager_startTurn.call(this);
        // Loop through all active party members to update their Action Points
        $gameParty.members().forEach(actor => {
            const totalActionTimesPlus = getTotalActionTimesPlus(actor);
            // Update the Action Points variable (#343) with the total "Action Times +" traits
            $gameVariables.setValue(343, totalActionTimesPlus);
        });
    };

    // Function to calculate total "Action Times +" traits for an actor
    function getTotalActionTimesPlus(actor) {
        return actor.traitsSum(Game_BattlerBase.TRAIT_ACTION_PLUS);
    }

    // Alias the useItem method of Game_Battler to decrement Action Points when an action is confirmed
    const _Game_Battler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        _Game_Battler_useItem.call(this, item);
        // Ensure the action decrement is applied only to actors (not enemies)
        if (this.isActor()) {
            const currentActionPoints = $gameVariables.value(343);
            // Decrement the Action Points variable by 1
            $gameVariables.setValue(343, currentActionPoints - 1);
        }
    };
})();
