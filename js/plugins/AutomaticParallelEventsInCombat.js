/*:
 * @target MZ
 * @plugindesc Automatically triggers specified common events in combat based on switch conditions.
 * @author Bloodkin
 *
 * @param eventSwitchPairs
 * @text Event-Switch Pairs
 * @desc Pairs of common event IDs and game switch IDs that determine which events can run based on switch status.
 * @type struct<EventSwitchPair>[]
 * @default []
 */

/*~struct~EventSwitchPair:
 * @param commonEventId
 * @text Common Event ID
 * @desc The ID of the common event.
 * @type common_event
 *
 * @param switchId
 * @text Switch ID
 * @desc The ID of the switch that enables the common event.
 * @type switch
 */

(() => {
    const pluginName = "AutomaticParallelEventsInCombat";
    let parameters = PluginManager.parameters(pluginName);
    let eventSwitchPairs = JSON.parse(parameters['eventSwitchPairs']).map(pair => ({
        commonEventId: Number(pair.commonEventId),
        switchId: Number(pair.switchId),
        eventTriggered: false // This flag will be used to prevent multiple triggers of the same event
    }));

    // Alias the BattleManager's update method to inject our custom logic
    const _BattleManager_update = BattleManager.update;
    BattleManager.update = function() {
        _BattleManager_update.call(this);
        // Only check and trigger events if a battle is ongoing
        if (this._phase) {
            checkAndTriggerEvents();
        }
    };

    function checkAndTriggerEvents() {
        eventSwitchPairs.forEach(pair => {
            const switchIsOn = $gameSwitches.value(pair.switchId);
            if (switchIsOn && !pair.eventTriggered) {
                $gameTemp.reserveCommonEvent(pair.commonEventId);
                pair.eventTriggered = true; // Prevent multiple triggers
            } else if (!switchIsOn && pair.eventTriggered) {
                pair.eventTriggered = false; // Reset to allow re-triggering if the switch is turned on again
            }
        });
    }
})();

