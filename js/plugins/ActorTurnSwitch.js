/*:
 * @target MZ
 * @plugindesc Flips specific switches based on which actor is currently selecting commands in combat.
 * @author Bloodkin
 * @param actorSwitchPairs
 * @text Actor-Switch Pairs
 * @type struct<ActorSwitchPair>[]
 * @default []
 *
 * @help ActorTurnSwitch.js
 *
 * This plugin allows specific switches to be flipped during the actor command selection phase in combat.
 * Configure actor IDs and corresponding switch IDs in the parameters.
 *
 * Actor-Switch Pair structure:
 * - Actor ID: The database ID of the actor.
 * - Switch ID: The game switch ID to be flipped when the actor is selecting commands.
 */

/*~struct~ActorSwitchPair:
 * @param actorId
 * @text Actor ID
 * @type actor
 * @default 1
 * @desc The actor ID to watch for their command selection.
 *
 * @param switchId
 * @text Switch ID
 * @type switch
 * @default 1
 * @desc The switch ID to flip when the actor is selecting commands.
 */

(() => {
    const pluginName = 'ActorTurnSwitch';
    const parameters = PluginManager.parameters(pluginName);
    const actorSwitchPairs = JSON.parse(parameters['actorSwitchPairs']).map(e => JSON.parse(e));

    // Hook into the process of actor command selection
    const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function() {
        _Scene_Battle_changeInputWindow.call(this);
        if (this._actorCommandWindow.active) {
            let currentActor = BattleManager.actor();
            if (currentActor) {
                actorSwitchPairs.forEach(pair => {
                    const shouldSwitchBeOn = currentActor.actorId() === Number(pair.actorId);
                    $gameSwitches.setValue(Number(pair.switchId), shouldSwitchBeOn);
                });
            }
        } else {
            // Optionally reset switches when not in actor command mode
            actorSwitchPairs.forEach(pair => {
                $gameSwitches.setValue(Number(pair.switchId), false);
            });
        }
    };
})();
