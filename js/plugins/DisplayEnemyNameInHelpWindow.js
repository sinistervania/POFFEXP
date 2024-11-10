/*:
 * @target MZ
 * @plugindesc Displays the targeted enemy's name in the help window during battle selection in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help DisplayEnemyNameInHelpWindow.js
 *
 * This plugin displays the name of the enemy you're targeting
 * in the help window during battle selection.
 */

(() => {
    const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        const enemy = this._enemyWindow.enemy();
        if (enemy) {
            this._helpWindow.setText(enemy.name());
        }
        _Scene_Battle_onEnemyOk.call(this);
    };

    const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        this._helpWindow.clear();
        _Scene_Battle_onEnemyCancel.call(this);
    };

    const _Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
        _Scene_Battle_selectEnemySelection.call(this);
        this._helpWindow.setText("Select an Enemy");
    };
})();
