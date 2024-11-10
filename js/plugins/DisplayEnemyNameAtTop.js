/*:
 * @target MZ
 * @plugindesc Displays the highlighted enemy's name in a custom window at the top of the screen during target selection in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help DisplayEnemyNameAtTop.js
 *
 * This plugin creates a custom window at the top of the battle screen to display the name
 * of the currently highlighted enemy during target selection in battles.
 */

(() => {
    // Define a new window for displaying the targeted enemy name
    class Window_EnemyName extends Window_Base {
        constructor(rect) {
            super(rect);
            this._enemyName = '';
        }

        setEnemyName(name) {
            if (this._enemyName !== name) {
                this._enemyName = name;
                this.refresh();
            }
        }

        refresh() {
            this.contents.clear();
            if (this._enemyName) {
                this.drawText(this._enemyName, 0, 0, this.width, 'center');
            }
        }
    }

    // Extend Scene_Battle to include the new window
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this.createEnemyNameWindow();
    };

    Scene_Battle.prototype.createEnemyNameWindow = function() {
        const rect = this.enemyNameWindowRect();
        this._enemyNameWindow = new Window_EnemyName(rect);
        this.addWindow(this._enemyNameWindow);
    };

    Scene_Battle.prototype.enemyNameWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    // Modify enemy selection to update the new window
    const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function(index) {
        _Window_BattleEnemy_select.call(this, index);
        if (index >= 0) {
            const enemy = this.enemy();
            if (enemy) {
                SceneManager._scene._enemyNameWindow.setEnemyName(enemy.name());
            }
        } else {
            SceneManager._scene._enemyNameWindow.setEnemyName('');
        }
    };
})();
