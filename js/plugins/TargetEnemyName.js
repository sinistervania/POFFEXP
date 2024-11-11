/*:
 * @target MZ
 * @plugindesc Displays the name and state icons of the currently hovered enemy in the help window during target selection for attacks and skills without a skill type.
 * @author Bloodkin
 *
 * @help TargetEnemyName.js
 *
 * This plugin enhances the target selection experience by displaying the name
 * and state icons of the currently hovered enemy in the help window during battle.
 * It now includes updates for the basic "Attack" command.
 *
 * There are no plugin commands or parameters needed for this plugin.
 */

(() => {
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this._enemyWindow.setHelpWindow(this._helpWindow);
        this._helpWindow.height = this._helpWindow.height * 2 / 3;
        this._helpWindow.createContents();
        
    };

    const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function(index) {
        _Window_BattleEnemy_select.call(this, index);
        this.updateHelp();
        
    };

    const _Window_BattleEnemy_deselect = Window_BattleEnemy.prototype.deselect;
    Window_BattleEnemy.prototype.deselect = function() {
        _Window_BattleEnemy_deselect.call(this);
        this.updateHelp();
        
    };

    const _Window_BattleEnemy_callUpdateHelp = Window_BattleEnemy.prototype.callUpdateHelp;
    Window_BattleEnemy.prototype.callUpdateHelp = function() {
        _Window_BattleEnemy_callUpdateHelp.call(this);
        if (!this._cursorAll && !this._selecting && this.active && this._helpWindow) {
            this._helpWindow.clear();
        }
        
    };

    Window_BattleEnemy.prototype.updateHelp = function() {
        if (this._helpWindow) {
            this._helpWindow.contents.clear();
            if (this.enemy()) {
                const enemy = this.enemy();
                const enemyName = enemy.name();
                const textWidth = this._helpWindow.contents.measureTextWidth(enemyName);
                const padding = (this._helpWindow.width - textWidth) / 2;
                this._helpWindow.drawText(enemyName, padding, 0, textWidth, 'center');
                const iconsX = padding + textWidth + 4;
                this.drawActorIcons(enemy, iconsX, 0);
                
            }
            this._helpWindow.show(); // Ensure the help window is visible during target selection
        }
    };

    Window_BattleEnemy.prototype.drawActorIcons = function(actor, x, y) {
        const iconWidth = ImageManager.iconWidth;
        let icons = actor.states().map(state => state.iconIndex).filter(iconIndex => iconIndex > 0);
        for (let i = 0; i < icons.length; i++) {
            this._helpWindow.drawIcon(icons[i], x + i * iconWidth, y);
        }
        
    };

    const _Window_BattleEnemy_cursorRight = Window_BattleEnemy.prototype.cursorRight;
    Window_BattleEnemy.prototype.cursorRight = function(wrap) {
        _Window_BattleEnemy_cursorRight.call(this, wrap);
        this.updateHelp();
        
    };

    const _Window_BattleEnemy_cursorLeft = Window_BattleEnemy.prototype.cursorLeft;
    Window_BattleEnemy.prototype.cursorLeft = function(wrap) {
        _Window_BattleEnemy_cursorLeft.call(this, wrap);
        this.updateHelp();
        
    };

    // Hide help window when action starts
    Scene_Battle.prototype.startAction = function() {
        this._helpWindow.hide();
        const subject = BattleManager._subject;
        const action = subject.currentAction();
        const targets = action.makeTargets();
        this._logWindow.startAction(subject, action, targets);
    };

})();  
