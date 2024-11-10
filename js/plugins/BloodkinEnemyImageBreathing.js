/*:
 * @target MZ
 * @plugindesc Adds a subtle, slow breathing effect to enemy sprites in combat, only applying to the enemy currently hovered over by the player.
 * The breathing effect resets when the player hovers over an enemy.
 * @author Bloodkin
 * 
 * @param Scale Factor
 * @text Scale Factor
 * @type number
 * @decimals 3
 * @min 1.00
 * @max 1.02
 * @desc The maximum scale factor for the breathing effect. Default: 1.01 (1% increase)
 * @default 1.01
 * 
 * @param Breathing Speed
 * @text Breathing Speed
 * @type number
 * @min 20
 * @max 240
 * @desc The speed of the breathing effect in frames. Set between 20 and 240.
 * @default 120
 * 
 * @help
 * This plugin, named BloodkinEnemyImageBreathing, adds a subtle, slow breathing animation to enemy sprites during combat. 
 * The effect only applies to the enemy that the player is currently hovering over with the cursor.
 * The breathing animation resets each time the player hovers over an enemy.
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinEnemyImageBreathing');
    const scaleFactor = parseFloat(parameters['Scale Factor'] || '1.01');
    const breathingSpeed = Number(parameters['Breathing Speed'] || 120);

    let lastHoveredEnemy = null;
    let frameCounter = 0;

    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        this.updateBreathingEffect();
    };

    Sprite_Enemy.prototype.updateBreathingEffect = function() {
        const hoveredEnemy = this.getHoveredEnemy();
        if (this._battler === hoveredEnemy) {
            if (this._battler !== lastHoveredEnemy) {
                frameCounter = 0; // Reset the breathing animation when hovering starts
                lastHoveredEnemy = this._battler;
            }
            const scale = 1 + (Math.sin(frameCounter / breathingSpeed) * (scaleFactor - 1));
            this.scale.set(scale, scale);
            frameCounter++;
        } else {
            this.scale.set(1, 1); // Reset scale if not hovered
            if (this._battler === lastHoveredEnemy) {
                lastHoveredEnemy = null;
            }
        }
    };

    Sprite_Enemy.prototype.getHoveredEnemy = function() {
        const enemyWindow = SceneManager._scene._enemyWindow;
        if (enemyWindow && enemyWindow.active) {
            return enemyWindow.enemy();
        }
        return null;
    };

})();
