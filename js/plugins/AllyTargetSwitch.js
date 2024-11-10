/*:
 * @target MZ
 * @plugindesc Flips a switch if an ally is hovering over actor 1 or actor 4.
 * @author Bloodkin
 * @param switchActor1
 * @text Switch for Actor 1
 * @type switch
 * @desc The switch to flip if an ally is hovering over actor 1.
 * @default 1
 *
 * @param switchActor4
 * @text Switch for Actor 4
 * @type switch
 * @desc The switch to flip if an ally is hovering over actor 4.
 * @default 2
 *
 * @help
 * This plugin flips a switch if an ally is hovering over actor 1 or actor 4.
 */

(() => {
    const parameters = PluginManager.parameters('AllyTargetSwitch');
    const switchActor1 = Number(parameters['switchActor1'] || 1);
    const switchActor4 = Number(parameters['switchActor4'] || 2);

    // Function to update switches based on actor hover
    const updateSwitches = function() {
        const actor1Hovered = isActorHovered(1);
        const actor4Hovered = isActorHovered(4);
        $gameSwitches.setValue(switchActor1, actor1Hovered);
        $gameSwitches.setValue(switchActor4, actor4Hovered);
        console.log(`Switch for Actor 1: ${actor1Hovered}`);
        console.log(`Switch for Actor 4: ${actor4Hovered}`);
    };

    // Function to check if an actor is hovered by allies
    const isActorHovered = function(actorId) {
        const actor = $gameActors.actor(actorId);
        if (!actor) return false;
        const followers = $gamePlayer.followers()._data;
        for (const follower of followers) {
            if (follower && follower.isVisible() && follower.isGathering() && follower.actor() === actor) {
                return true;
            }
        }
        return false;
    };

    // Update switches on scene change
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if ($gamePlayer) {
            updateSwitches();
        }
    };
})();
