/*:
 * @target MZ
 * @plugindesc Tracks the last enemy that performed any action and provides functions to check states, add, remove, or transform states from that enemy, and force skills targeting a player.
 * @author Bloodkin
 *
 * @help EnemyActionOrderTracker.js
 *
 * This plugin tracks the actions of enemies during battle. It identifies the last enemy that performed any action
 * and provides functions to check for specific states, add or remove states, transform, and force the last enemy to use a specific skill targeting a player.
 *
 * Example usage:
 * Check if the last enemy has a specific state: $gameParty.isLastActionPerformerStateAffected(4); // Checks for state ID 4
 * Add a state: $gameParty.addStateToLastActionPerformer(365);
 * Remove a state: $gameParty.removeStateFromLastActionPerformer(365);
 * Transform the enemy: $gameParty.transformLastActionPerformer(10); // Where 10 is the new enemy ID
 * Force a skill on a player: $gameParty.forceSkillOnLastActionPerformer(45); // Where 45 is the skill ID
 * Check if last enemy has >1 HP: $gameParty.isLastActionPerformerHpGreaterThanOne(); // Returns true if HP > 1
 * Check if the index of the last action performer matches a given index: $gameParty.isLastActionPerformerIndex(2); // Returns true if index is 2
 */

(() => {
    // Hook into the action application to track the last enemy that performed an action
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);
        if (this.subject().isEnemy()) {
            $gameTemp.lastActionPerformer = this.subject();
            $gameTemp.lastActionPerformerIndex = $gameTroop.members().indexOf(this.subject());
        }
    };

    // Initialize the temporary storage for tracking the last action performer
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this.lastActionPerformer = null;
        this.lastActionPerformerIndex = -1; // Initialize with -1 indicating no action has been taken
    };

    // Function to add a state to the last action performer
    Game_Party.prototype.addStateToLastActionPerformer = function(stateId) {
        if ($gameTemp.lastActionPerformer) {
            $gameTemp.lastActionPerformer.addState(stateId);
        }
    };

    // Function to remove a state from the last action performer
    Game_Party.prototype.removeStateFromLastActionPerformer = function(stateId) {
        if ($gameTemp.lastActionPerformer && $gameTemp.lastActionPerformer.isStateAffected(stateId)) {
            $gameTemp.lastActionPerformer.removeState(stateId);
        }
    };

    // Function to transform the last action performer into a different enemy
    Game_Party.prototype.transformLastActionPerformer = function(newEnemyId) {
        if ($gameTemp.lastActionPerformer) {
            $gameTemp.lastActionPerformer.transform(newEnemyId);
            $gameTemp.lastActionPerformer.refresh();
        }
    };

    // Function to check if the last action performer has a specific state
    Game_Party.prototype.isLastActionPerformerStateAffected = function(stateId) {
        if ($gameTemp.lastActionPerformer) {
            return $gameTemp.lastActionPerformer.isStateAffected(stateId);
        }
        return false; // Return false if there is no last action performer or the state is not found
    };

    // Function to check if the last action performer has more than 1 HP
    Game_Party.prototype.isLastActionPerformerHpGreaterThanOne = function() {
        if ($gameTemp.lastActionPerformer && $gameTemp.lastActionPerformer.hp > 1) {
            return true;
        }
        return false;
    };

    // Function to check if the index of the last action performer matches a given index
    Game_Party.prototype.isLastActionPerformerIndex = function(index) {
        return $gameTemp.lastActionPerformerIndex === index;
    };

    // Function to force the last action performer to use a specific skill targeting a player
    Game_Party.prototype.forceSkillOnLastActionPerformer = function(skillId) {
        if ($gameTemp.lastActionPerformer) {
            const action = new Game_Action($gameTemp.lastActionPerformer);
            action.setSkill(skillId);
    
            // Set the target to a random player actor
            const target = $gameParty.members()[Math.floor(Math.random() * $gameParty.members().length)];
            action.setTarget($gameParty.members().indexOf(target));
    
            action.apply(target);
            target.performAction(action); // Make the target perform the action (animation)
            action.applyGlobal(); // Apply any global effects from the action
        }
    };
    

    // Function to show animation on the last action performer
    Game_Party.prototype.showAnimationOnLastActionPerformer = function(animationId) {
        if ($gameTemp.lastActionPerformer) {
            $gameTemp.lastActionPerformer.startAnimation(animationId);
        }
    };
})();
