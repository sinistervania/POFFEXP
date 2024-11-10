/*:
 * @target MZ
 * @plugindesc Triggers specific common events based on the equipped or unequipped armors.
 * @author Bloodkin
 *
 * @param Equip Events
 * @type struct<ArmorEvent>[]
 * @desc Define common events to trigger when armors are equipped.
 * 
 * @param Unequip Events
 * @type struct<ArmorEvent>[]
 * @desc Define common events to trigger when armors are unequipped.
 *
 * @help ArmorEventTriggerUpdated.js
 *
 * This plugin allows you to trigger specific common events when certain armors
 * are equipped or unequipped.
 */

/*~struct~ArmorEvent:
 * @param Armor ID
 * @type armor
 * @desc The ID of the armor.
 *
 * @param Common Event ID
 * @type common_event
 * @desc The ID of the common event to trigger.
 */

(() => {
    const pluginName = 'ArmorEventTriggerUpdated';
    const parameters = PluginManager.parameters(pluginName);
    const equipEvents = JSON.parse(parameters['Equip Events'] || '[]').map(e => JSON.parse(e));
    const unequipEvents = JSON.parse(parameters['Unequip Events'] || '[]').map(e => JSON.parse(e));

    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        const oldArmor = this.equips()[slotId];
        _Game_Actor_changeEquip.call(this, slotId, item);

        const newArmor = this.equips()[slotId];
        checkAndTriggerEvents(oldArmor, newArmor);
    };

    function checkAndTriggerEvents(oldArmor, newArmor) {
        if (oldArmor !== newArmor) {
            if (oldArmor) {
                const unequipEvent = unequipEvents.find(e => parseInt(e['Armor ID']) === oldArmor.id);
                if (unequipEvent) {
                    $gameTemp.reserveCommonEvent(parseInt(unequipEvent['Common Event ID']));
                }
            }

            if (newArmor) {
                const equipEvent = equipEvents.find(e => parseInt(e['Armor ID']) === newArmor.id);
                if (equipEvent) {
                    $gameTemp.reserveCommonEvent(parseInt(equipEvent['Common Event ID']));
                }
            }
        }
    }
})();
