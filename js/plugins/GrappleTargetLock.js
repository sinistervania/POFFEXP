/*:
 * @target MZ
 * @plugindesc Locks targeting to enemies affected by the Grapple state (State ID #0241).
 * @author Bloodkin
 *
 * @help GrappleTargetLock.js
 *
 * This plugin restricts the player to only target enemies that are affected by a specific state.
 * If an enemy is affected by state #0241 (Grapple), then the player can only target that enemy.
 * If no enemy is affected by the Grapple state, targeting is unrestricted.
 *
 * There are no plugin commands or parameters for this plugin.
 */

(() => {
    const grappleStateId = 241; // The ID of the Grapple state

    // Override the method that gets targets for opponents
    const _Game_Action_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
    Game_Action.prototype.targetsForOpponents = function() {
        const subject = this.subject();
        if (subject.isActor()) { // Check if the subject is an actor (player)
            const targetsWithState = $gameTroop.members().filter(enemy => enemy.isStateAffected(grappleStateId));
            if (targetsWithState.length > 0) { // If there are any enemies with the Grapple state, restrict to those targets
                return this.repeatTargets(targetsWithState);
            }
        }
        // Default behavior if no enemies have the Grapple state or the subject is not an actor
        return _Game_Action_targetsForOpponents.call(this);
    };
})();
