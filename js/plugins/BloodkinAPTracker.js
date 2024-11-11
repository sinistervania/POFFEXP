/*:
 * @target MZ
 * @plugindesc Updates action counts for each party member during battle when an enemy or ally is selected as the target for an action, updating only when counts change.
 * @author Bloodkin
 * @help This plugin sets variables to store the number of actions each party member has during battle, updating when an enemy or ally is selected.
 *
 * Plugin Name: BloodkinAPTracker
 *
 * Variables used:
 * - Variable 592: First party member's action count
 * - Variable 593: Second party member's action count
 * - Variable 594: Third party member's action count
 * - Variable 595: Fourth party member's action count
 */

(() => {
    const pluginName = "BloodkinAPTracker";

    // Keep track of the last known action counts
    let lastActionCounts = [];

    const updatePartyActionCounts = () => {
        if ($gameParty.inBattle()) {
            const partyMembers = $gameParty.members();

            // Ensure `lastActionCounts` matches the current party size
            if (lastActionCounts.length !== partyMembers.length) {
                lastActionCounts = new Array(partyMembers.length).fill(0);
            }

            // Loop through each party member and update variable only if the action count has changed
            partyMembers.forEach((member, index) => {
                const currentActionCount = member?._actions.length || 0;

                if (currentActionCount !== lastActionCounts[index]) {
                    // Set the variable corresponding to the party member's action count
                    $gameVariables.setValue(592 + index, currentActionCount);

                    // Update the last known action count
                    lastActionCounts[index] = currentActionCount;
                }
            });
        }
    };

    // Override Scene_Battle's onEnemyOk to include updating action counts
    const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        _Scene_Battle_onEnemyOk.call(this);
        updatePartyActionCounts();
    };

    // Override Scene_Battle's onActorOk to include updating action counts
    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        _Scene_Battle_onActorOk.call(this);
        updatePartyActionCounts();
    };
})();
