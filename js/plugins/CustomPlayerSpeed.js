/*:
 * @target MZ
 * @plugindesc Adjust player movement speed to a custom intermediate value.
 * @author Bloodkin
 * 
 * @param Custom Speed
 * @text Custom Player Speed
 * @desc Set the custom movement speed between 3 (x2 Slower) and 4 (Normal).
 * @type number
 * @min 3
 * @max 4
 * @decimals 2
 * @default 3.5
 * 
 * @help
 * This plugin allows the player to move at a custom speed between
 * 3 (x2 Slower) and 4 (Normal). The speed value can be a decimal.
 *
 * Use the plugin parameter to set the desired movement speed.
 * The speed is adjusted dynamically during gameplay.
 */

(() => {
    const params = PluginManager.parameters('CustomPlayerSpeed');
    const customSpeed = parseFloat(params['Custom Speed'] || 3.5);

    const _Game_Player_updateDashing = Game_Player.prototype.updateDashing;
    Game_Player.prototype.updateDashing = function() {
        _Game_Player_updateDashing.call(this);
        this._customSpeed = customSpeed;
    };

    const _Game_Player_realMoveSpeed = Game_Player.prototype.realMoveSpeed;
    Game_Player.prototype.realMoveSpeed = function() {
        return this._customSpeed !== undefined ? this._customSpeed : _Game_Player_realMoveSpeed.call(this);
    };
})();
