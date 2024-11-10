/*:
* @target MZ
* @plugindesc Disables player movement when a specified state is applied.
* @author Bloodkin
*
* @param stateIdForNoMove
* @text State ID for No Movement
* @type number
* @desc The ID of the state that disables player movement.
* @default 1
*
* @help This plugin disables player movement when the player has the specified state.
*/

(() => {
    const pluginName = 'BloodkinNoMoveState';
    const parameters = PluginManager.parameters(pluginName);
    const stateIdForNoMove = Number(parameters['stateIdForNoMove'] || 1);

    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        const actor = $gameParty.leader();
        if (actor && actor.isStateAffected(stateIdForNoMove)) {
            return false;
        }
        return _Game_Player_canMove.call(this);
    };
})();
