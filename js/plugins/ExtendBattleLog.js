/*:
 * @target MZ
 * @plugindesc Extends the Battle Log to include skill descriptions when skills are used in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help ExtendBattleLog.js
 *
 * This plugin extends the Battle Log window to show descriptions of skills when they are used in battle.
 */

(() => {
    // Extend the display action method to include skill descriptions
    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        _Window_BattleLog_displayAction.call(this, subject, item);
        if (item.meta && item.meta.showDescInLog && item.description) {
            this.push('addText', subject.name() + ' uses ' + item.name + ': ' + item.description);
        }
    };
})();
