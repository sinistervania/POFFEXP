/*:
 * @target MZ
 * @plugindesc Displays MP gauges for enemies in front-view battles with background color change and animation when full, including transformations and position offsets via note tags.
 * @author Bloodkin
 */

(() => {
    const parameters = PluginManager.parameters('CustomMPBars');

    const fullGaugeColors = [
        '#ff0000', '#dc0000', '#bf0000', '#9d0000', '#820000',
        '#5e0000', '#3f0000', '#210000', '#090000', '#090000',
        '#210000', '#3f0000', '#5e0000', '#820000', '#9d0000',
        '#bf0000', '#dc0000', '#ff0000'
    ];

    function createMPGaugeSprite(battler) {
        const mpGaugeSprite = new Sprite();
        mpGaugeSprite.bitmap = new Bitmap(100, 10); // Change size as needed
        mpGaugeSprite.bitmap.fillAll('#333333'); // Lighten the black color
        mpGaugeSprite.bitmap.fillRect(1, 2, 98, 6, '#4787ff'); // Adjust the initial fill size (move down by 1 pixel)
        mpGaugeSprite.anchor.x = 0.5;
        mpGaugeSprite.anchor.y = 0.5; // Anchor to the center vertically
        mpGaugeSprite.full = false; // Track whether the gauge is full
        mpGaugeSprite.colorIndex = 0; // Index for cycling colors
        mpGaugeSprite.colorCycleCounter = 0; // Counter to slow down the cycle
        return mpGaugeSprite;
    }

    function updateMPGaugePosition(mpGaugeSprite, battlerSprite) {
        // Read offset values from enemy note tags
        const enemy = battlerSprite._enemy.enemy();
        const offsetX = enemy.meta.MPGaugeOffsetX ? Number(enemy.meta.MPGaugeOffsetX) : -174; // Default value if not specified
        const offsetY = enemy.meta.MPGaugeOffsetY ? Number(enemy.meta.MPGaugeOffsetY) : 21; // Default value if not specified

        mpGaugeSprite.x = battlerSprite.x + battlerSprite.width / 2 + offsetX;
        mpGaugeSprite.y = battlerSprite.y - battlerSprite.height - offsetY;
    }

    function updateMPGaugeVisibility() {
        this._enemyMPGauges.forEach(mpGauge => {
            const { sprite, battler } = mpGauge;
            const mpRate = battler._enemy.mp / battler._enemy.mmp;
            sprite.visible = battler._enemy.mmp > 0;

            if (sprite.visible) {
                sprite.bitmap.clear();

                if (mpRate === 1) { // If MP is full
                    const color = fullGaugeColors[mpGauge.colorIndex];
                    sprite.bitmap.fillAll(color); // Cycle through red colors
                    sprite.bitmap.fillRect(1, 2, 98, 6, '#4787ff'); // Keep the gauge blue and move it down by 1 pixel

                    // Update color index for animation
                    mpGauge.colorCycleCounter++;
                    if (mpGauge.colorCycleCounter >= 4) { // Change color every 4 frames (slower)
                        mpGauge.colorIndex = (mpGauge.colorIndex + 1) % fullGaugeColors.length;
                        mpGauge.colorCycleCounter = 0;
                    }
                } else {
                    sprite.bitmap.fillAll('#333333'); // Lighten the black color
                    sprite.bitmap.fillRect(1, 2, 98 * mpRate, 6, '#4787ff'); // Blue gauge and move it down by 1 pixel

                    // Reset color index and counter
                    mpGauge.colorIndex = 0;
                    mpGauge.colorCycleCounter = 0;
                }

                updateMPGaugePosition(sprite, battler);
            }
        });
    }

    const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.call(this);
        this._enemyMPGauges = [];
        this._spriteset._enemySprites.forEach(enemySprite => {
            if (enemySprite._enemy && enemySprite._enemy.isEnemy()) {
                const mpGaugeSprite = createMPGaugeSprite(enemySprite._enemy);
                updateMPGaugePosition(mpGaugeSprite, enemySprite);
                mpGaugeSprite.visible = enemySprite._enemy.mmp > 0;
                this.addChild(mpGaugeSprite);
                this._enemyMPGauges.push({ sprite: mpGaugeSprite, battler: enemySprite });
            }
        });

        // Listen for enemy transformations
        const _Game_Enemy_transform = Game_Enemy.prototype.transform;
        Game_Enemy.prototype.transform = function(enemyId) {
            _Game_Enemy_transform.call(this, enemyId);
            SceneManager._scene.updateMPGaugeVisibility();
        };
    };

    Scene_Battle.prototype.updateMPGaugeVisibility = updateMPGaugeVisibility;

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        this.updateMPGaugeVisibility();
    };
})();
