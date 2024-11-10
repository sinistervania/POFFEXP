/*:
* @target MZ
* @plugindesc Sets the player's opacity to 255 when specified states are removed.
* @author Bloodkin
*
* @param stateIdsToRemoveOpacity
* @text State IDs for Opacity Change
* @type number[]
* @desc The IDs of the states that trigger opacity change when removed.
* @default []
*
* @help This plugin sets the player's opacity to 255 when the specified states are removed.
*/

(() => {
    const pluginName = 'BloodkinTakeCoverOpacity';
    const parameters = PluginManager.parameters(pluginName);
    const stateIdsToRemoveOpacity = JSON.parse(parameters['stateIdsToRemoveOpacity'] || '[]').map(Number);

    const _Game_Actor_removeState = Game_Actor.prototype.removeState;
    Game_Actor.prototype.removeState = function(stateId) {
        _Game_Actor_removeState.call(this, stateId);
        if (stateIdsToRemoveOpacity.includes(stateId)) {
            const character = this.character();
            if (character) {
                character.setOpacity(255);
            }
        }
    };

    Game_Actor.prototype.character = function() {
        return $gamePlayer.followers().follower(this.actorId() - 1) || $gamePlayer;
    };
})();
