/*:
 * @target MZ
 * @plugindesc Prevents specific actors from using any items in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help DisableItemUsage.js
 *
 * This plugin prevents specific actors from using any items.
 *
 * @param actorIds
 * @text Actor IDs
 * @type string
 * @desc Comma-separated list of actor IDs to restrict from using items.
 * @default 4
 */

(() => {
    const parameters = PluginManager.parameters('DisableItemUsage');
    const restrictedActorIds = parameters['actorIds'].split(',').map(id => Number(id.trim()));

    const _Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
    Game_BattlerBase.prototype.canUse = function(item) {
        // Check if the user is an actor and the item is an actual item (not a skill)
        if (this.isActor() && restrictedActorIds.includes(this.actorId()) && DataManager.isItem(item)) {
            return false;  // Block item usage for the specified actors
        }

        return _Game_BattlerBase_canUse.call(this, item);
    };
})();
