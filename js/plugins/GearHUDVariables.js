/*:
 * @target MZ
 * @plugindesc Sets the value of variables to the icon ID of equipped items in specific slots.
 * @author Bloodkin
 * @help This plugin sets the value of specified variables to the icon ID of the items equipped in specific slots. If no item is equipped, the variable is set to 0.
 *
 * @param Slot02Variable
 * @text Variable for Slot 02
 * @type variable
 * @desc The variable that will store the icon ID of the armor in equipment slot 02.
 * @default 0
 *
 * @param Slot03Variable
 * @text Variable for Slot 03
 * @type variable
 * @desc The variable that will store the icon ID of the accessory in equipment slot 03.
 * @default 0
 *
 * @param Slot04Variable
 * @text Variable for Slot 04
 * @type variable
 * @desc The variable that will store the icon ID of the accessory in equipment slot 04.
 * @default 0
 *
 * @param Slot05Variable
 * @text Variable for Slot 05
 * @type variable
 * @desc The variable that will store the icon ID of the accessory in equipment slot 05.
 * @default 0
 *
 * @param Slot06Variable
 * @text Variable for Slot 06
 * @type variable
 * @desc The variable that will store the icon ID of the relic in equipment slot 06.
 * @default 0
 */

(() => {
    const parameters = PluginManager.parameters('GearHUDVariables');
    const slot02Var = Number(parameters['Slot02Variable'] || 0);
    const slot03Var = Number(parameters['Slot03Variable'] || 0);
    const slot04Var = Number(parameters['Slot04Variable'] || 0);
    const slot05Var = Number(parameters['Slot05Variable'] || 0);
    const slot06Var = Number(parameters['Slot06Variable'] || 0);

    const updateIconVariables = () => {
        const actor = $gameParty.leader();
        if (!actor) return;

        const slots = [2, 3, 4, 5, 6];
        const variables = [slot02Var, slot03Var, slot04Var, slot05Var, slot06Var];

        slots.forEach((slot, index) => {
            const variableId = variables[index];
            if (variableId > 0) {
                const item = actor.equips()[slot - 1];
                const iconId = item ? item.iconIndex : 0;
                $gameVariables.setValue(variableId, iconId);
            }
        });
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        updateIconVariables();
    };
})();
