/*:
 * @target MZ
 * @plugindesc Flips specified switches when hovering over party members during targeting, and resets switches when not hovering.
 * @help This plugin flips designated switches when hovering over specific party members
 * during the target selection phase in battle, based on their position in the lineup.
 * The switches turn off automatically when no party member is hovered over or when the targeting phase ends.
 * 
 * @param MemberSwitchMapping
 * @text Party Member-Switch Mapping
 * @type struct<MemberSwitch>[]
 * @desc Define which switches to activate for each party member position during targeting.
 */

/*~struct~MemberSwitch:
 * @param memberPosition
 * @text Party Member Position
 * @type number
 * @min 1
 * @desc The position of the party member (1 for first, 2 for second, etc.).
 *
 * @param switchId
 * @text Switch ID
 * @type switch
 * @desc The switch to activate when hovering over this party member during targeting.
 */

(() => {
    const parameters = PluginManager.parameters('PartyTargetingSwitch');
    const memberSwitchMapping = JSON.parse(parameters.MemberSwitchMapping || '[]').map(entry => JSON.parse(entry));

    const originalSelectActor = Window_BattleActor.prototype.select;
    const originalHideActorWindow = Window_BattleActor.prototype.hide;

    Window_BattleActor.prototype.select = function(index) {
        // Turn off all specified switches first
        memberSwitchMapping.forEach(mapping => {
            const switchId = Number(mapping.switchId);
            $gameSwitches.setValue(switchId, false);
        });

        originalSelectActor.call(this, index);

        // Activate switch for the selected party member position if mapping exists
        if (index >= 0 && index < $gameParty.battleMembers().length) {
            const memberPosition = index + 1; // Convert to 1-based position
            const mapping = memberSwitchMapping.find(mapping => Number(mapping.memberPosition) === memberPosition);
            if (mapping) {
                const switchId = Number(mapping.switchId);
                $gameSwitches.setValue(switchId, true);
            }
        }
    };

    // Reset switches when the actor selection window is hidden (e.g., exiting targeting)
    Window_BattleActor.prototype.hide = function() {
        memberSwitchMapping.forEach(mapping => {
            const switchId = Number(mapping.switchId);
            $gameSwitches.setValue(switchId, false);
        });

        originalHideActorWindow.call(this);
    };
})();
