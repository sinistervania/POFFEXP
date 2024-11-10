/*:
 * @target MZ
 * @plugindesc Allows locking targeting to enemies affected by specific states. Useful for taunt abilities.
 * @author Bloodkin
 *
 * @param Lock States
 * @text Lock States
 * @type number[]
 * @desc List of State IDs that can lock targeting. Separate multiple IDs with commas (e.g., 241,242).
 * @default [241]
 *
 * @help UpdatedGrappleLock.js
 *
 * This plugin restricts the player to only target enemies that are affected by specific states.
 * You can specify multiple states in the plugin parameters. If an enemy is affected by any of the specified states,
 * then the player can only target those enemies. If no enemy is affected by the specified states, targeting is unrestricted.
 *
 * There are no plugin commands for this plugin.
 */

(() => {
    const pluginName = 'UpdatedGrappleLock';
    const parameters = PluginManager.parameters(pluginName);
    const lockStates = JSON.parse(parameters['Lock States']).map(Number); // Convert the parameter string to an array of numbers

    // Override the method that gets targets for opponents
    const _Game_Action_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
    Game_Action.prototype.targetsForOpponents = function() {
        const subject = this.subject();
        if (subject.isActor()) { // Check if the subject is an actor (player)
            // Filter enemies that are affected by any of the specified lock states
            const targetsWithState = $gameTroop.members().filter(enemy => lockStates.some(stateId => enemy.isStateAffected(stateId)));
            if (targetsWithState.length > 0) { // If there are any enemies with the specified states, restrict to those targets
                return this.repeatTargets(targetsWithState);
            }
        }
        // Default behavior if no enemies have the specified states or the subject is not an actor
        return _Game_Action_targetsForOpponents.call(this);
    };
})();
