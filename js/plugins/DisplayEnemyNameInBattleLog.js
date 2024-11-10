/*:
 * @target MZ
 * @plugindesc Displays the highlighted enemy's name in the battle log window during target selection in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help DisplayEnemyNameInBattleLog.js
 *
 * This plugin displays the name of the currently highlighted enemy in the battle log window
 * during target selection in battles.
 */

(() => {
    // Extend Window_BattleEnemy to update the battle log when an enemy is highlighted
    const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function(index) {
        _Window_BattleEnemy_select.call(this, index);
        if (index >= 0) {
            const enemy = this.enemy();
            if (enemy) {
                const name = enemy.name();
                $gameMessage.add("Targeting: " + name); // Display enemy name in the battle log
                BattleManager._logWindow.refresh(); // Refresh the log window to show the new message
            }
        }
    };

    // Optional: Clear messages when moving cursor away from enemies
    const _Window_BattleEnemy_deselect = Window_BattleEnemy.prototype.deselect;
    Window_BattleEnemy.prototype.deselect = function() {
        _Window_BattleEnemy_deselect.call(this);
        $gameMessage.clear(); // Clear the battle log when no enemy is selected
        BattleManager._logWindow.refresh();
    };
})();
