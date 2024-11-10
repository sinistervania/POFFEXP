/*:
 * @target MZ
 * @plugindesc Allows running parallel events in combat through a plugin command.
 * @author Bloodkin
 *
 * @command runParallelEvent
 * @text Run Parallel Event
 * @desc Triggers a common event to run in parallel during battle.
 *
 * @arg commonEventId
 * @text Common Event ID
 * @desc The ID of the common event to run.
 * @type common_event
 * @default 1
 */

(() => {
    const pluginName = "RunParallelEventInCombat";

    PluginManager.registerCommand(pluginName, "runParallelEvent", args => {
        const commonEventId = Number(args.commonEventId);
        if ($gameParty.inBattle()) {
            $gameTemp.reserveCommonEvent(commonEventId);
        }
    });
})();
