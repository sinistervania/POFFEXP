/*:
 * @target MZ
 * @plugindesc Allows toggling the restriction for the cursor to stay within save slots 1-19 on the save screen, off by default.
 * @author Bloodkin
 * 
 * @command enableCursorRestriction
 * @text Enable Cursor Restriction
 * @desc Restricts the cursor to save slots 1-19.
 * 
 * @command disableCursorRestriction
 * @text Disable Cursor Restriction
 * @desc Allows the cursor to move freely among all save slots.
 * 
 * @help This plugin provides commands to toggle the restriction for the cursor to stay within save slots 1-19 on and off.
 */

(() => {
    const pluginName = 'FixSaveScreenCursor';
    let cursorRestrictionEnabled = false;

    PluginManager.registerCommand(pluginName, 'enableCursorRestriction', () => {
        cursorRestrictionEnabled = true;
    });

    PluginManager.registerCommand(pluginName, 'disableCursorRestriction', () => {
        cursorRestrictionEnabled = false;
    });

    const _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_create.call(this);
        this._listWindow.setHandler('ok', this.onSavefileOk.bind(this));
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
    };

    const _Scene_File_start = Scene_File.prototype.start;
    Scene_File.prototype.start = function() {
        _Scene_File_start.call(this);
        this.fixCursorPosition();
    };

    Scene_File.prototype.fixCursorPosition = function() {
        if (cursorRestrictionEnabled) {
            const index = this._listWindow.index();
            if (index >= 19) {
                this._listWindow.select(18);
            }
        }
    };

    const _Window_SavefileList_select = Window_SavefileList.prototype.select;
    Window_SavefileList.prototype.select = function(index) {
        if (cursorRestrictionEnabled && index >= 19) {
            index = 18;
        }
        _Window_SavefileList_select.call(this, index);
    };

    const _Window_SavefileList_isEnabled = Window_SavefileList.prototype.isEnabled;
    Window_SavefileList.prototype.isEnabled = function(savefileId) {
        if (cursorRestrictionEnabled && savefileId >= 20) {
            return false;
        }
        return _Window_SavefileList_isEnabled.call(this, savefileId);
    };
})();
