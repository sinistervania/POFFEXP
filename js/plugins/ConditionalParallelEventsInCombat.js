/*:
 * @target MZ
 * @plugindesc Allows specific parallel events to be run in combat based on switch conditions.
 * @author Bloodkin
 *
 * @param eventSwitchPairs
 * @text Event-Switch Pairs
 * @desc Pairs of common event IDs and game switch IDs that determine which events can run based on switch status.
 * @type struct<EventSwitchPair>[]
 * @default []
 *
 * @command runConditionalParallelEvent
 * @text Run Conditional Parallel Event
 * @desc Triggers a specified common event to run in parallel during battle if its paired switch is ON.
 *
 * @arg commonEventId
 * @text Common Event ID
 * @desc The ID of the common event to run.
 * @type common_event
 * @default 1
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
    const pluginName = "ConditionalParallelEventsInCombat";
    let rawParameters = PluginManager.parameters(pluginName);
    let eventSwitchPairs = JSON.parse(rawParameters['eventSwitchPairs']).map(pair => {
        return { commonEventId: Number(pair.commonEventId), switchId: Number(pair.switchId) };
    });

    PluginManager.registerCommand(pluginName, "runConditionalParallelEvent", args => {
        const commonEventId = Number(args.commonEventId);
        const pair = eventSwitchPairs.find(pair => pair.commonEventId === commonEventId);
        if ($gameParty.inBattle() && pair && $gameSwitches.value(pair.switchId)) {
            $gameTemp.reserveCommonEvent(commonEventId);
        }
    });
})();
