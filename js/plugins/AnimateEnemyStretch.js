/*:
 * @target MZ
 * @plugindesc Animates enemy images by slightly stretching their height and width with offsets for each enemy.
 * @author Bloodkin
 * 
 * @param stretchSpeed
 * @text Stretch Speed
 * @type number
 * @min 0.01
 * @max 2
 * @decimals 2
 * @default 0.05
 * @desc Speed of the stretching animation.
 * 
 * @param stretchAmount
 * @text Stretch Amount
 * @type number
 * @min 0
 * @max 0.05
 * @decimals 2
 * @default 0.01
 * @desc Maximum amount of stretching (e.g., 0.01 means up to 1% stretching).
 * 
 * @help This plugin animates enemy images by slightly stretching their height and width with offsets for each enemy.
 */

(() => {
    const parameters = PluginManager.parameters('AnimateEnemyStretch');
    const stretchSpeed = Number(parameters['stretchSpeed'] || 0.05);
    const stretchAmount = Number(parameters['stretchAmount'] || 0.01);

    const _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
    Sprite_Enemy.prototype.initialize = function(battler) {
        _Sprite_Enemy_initialize.call(this, battler);
        this._stretchOffset = Math.random() * Math.PI * 2;
    };

    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        this.updateStretch();
    };

    Sprite_Enemy.prototype.updateStretch = function() {
        if (!this._stretchTime) this._stretchTime = 0;
        this._stretchTime += stretchSpeed;

        const stretchFactorHeight = 1 + Math.sin(this._stretchTime + this._stretchOffset) * stretchAmount;
        const stretchFactorWidth = 1 + Math.sin(this._stretchTime + this._stretchOffset) * (stretchAmount / 2);
        this.scale.x = stretchFactorWidth;
        this.scale.y = stretchFactorHeight;
    };
})();
