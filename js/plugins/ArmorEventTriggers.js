/*:
 * @target MZ
 * @plugindesc Triggers specific common events based on the equipped or unequipped armors.
 * @author Bloodkin
 *
 * @help ArmorEventTrigger.js
 *
 * This plugin allows you to trigger specific common events when certain armors
 * are equipped or unequipped.
 */

(() => {
    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        const oldArmor = this.equips()[slotId];
        _Game_Actor_changeEquip.call(this, slotId, item);

        const newArmor = this.equips()[slotId];
        checkAndTriggerEvents(oldArmor, newArmor);
    };

    function checkAndTriggerEvents(oldArmor, newArmor) {
        if (oldArmor !== newArmor) {
            // Common Event ID when unequipping Armor ID 114 or 119
            if ((oldArmor && oldArmor.id === 114) || (oldArmor && oldArmor.id === 119)) {
                $gameTemp.reserveCommonEvent(162);
            }

            // Common Event IDs when equipping specific Armors
            if (newArmor && newArmor.id === 114) {
                $gameTemp.reserveCommonEvent(161);
            } else if (newArmor && newArmor.id === 119) {
                $gameTemp.reserveCommonEvent(160);
            }
        }
    }
})();