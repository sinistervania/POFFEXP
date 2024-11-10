/*:
 * @target MZ
 * @plugindesc Displays the highlighted enemy's name in the battle log during target selection.
 * @author Bloodkin
 * @help This plugin displays the name of the highlighted enemy in the battle log.
 */

(() => {
    const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function(index) {
        _Window_BattleEnemy_select.call(this, index);
        if (index >= 0) {
            const enemy = this.enemy();
            if (enemy) {
                const enemyName = enemy.name();
                if (BattleManager._logWindow) {
                    BattleManager._logWindow.addText("Targeting: " + enemyName);
                    BattleManager._logWindow.refresh();
                }
            }
        }
    };
})();
