/*:
 * @target MZ
 * @plugindesc Shows enemy name in the description box when selecting targets in combat.
 * @author Bloodkin
 * @help ShowEnemyNameInHelpWindow.js
 *
 * This plugin shows the enemy name in the description box when selecting
 * targets in combat for RPG Maker MZ.
 */

(() => {
    // Extending the updateHelp method of Window_BattleEnemy to show enemy name
    const _Window_BattleEnemy_updateHelp = Window_BattleEnemy.prototype.updateHelp;
    Window_BattleEnemy.prototype.updateHelp = function() {
        _Window_BattleEnemy_updateHelp.call(this);
        if (this._enemy) {
            this._helpWindow.setText(this._enemy.name());
        }
    };

    // Extending the select method to include enemy reference
    const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function(index) {
        _Window_BattleEnemy_select.call(this, index);
        if (index >= 0) {
            const enemy = $gameTroop.members()[index];
            this._enemy = enemy;
        } else {
            this._enemy = null;
        }
    };
})();
