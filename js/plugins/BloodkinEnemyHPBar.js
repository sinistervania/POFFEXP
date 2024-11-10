/*:
 * @target MZ
 * @plugindesc Custom HP bar that moves and scales along with the enemy's breathing animation, including an adjustable black outline and a ghost health gauge.
 * @author Bloodkin
 *
 * @param Default Scale
 * @type number
 * @min 0.1
 * @max 5.0
 * @decimals 2
 * @desc Default scale of the HP bar.
 * @default 1.0
 *
 * @param Default Offset X
 * @type number
 * @min -1000
 * @max 1000
 * @desc Default X offset of the HP bar.
 * @default 0
 *
 * @param Default Offset Y
 * @type number
 * @min -1000
 * @max 1000
 * @desc Default Y offset of the HP bar.
 * @default 40
 *
 * @param Bar Color 1
 * @type number
 * @min 0
 * @max 31
 * @desc The first color of the HP bar gradient based on system colors (0-31).
 * @default 20
 *
 * @param Bar Color 2
 * @type number
 * @min 0
 * @max 31
 * @desc The second color of the HP bar gradient based on system colors (0-31).
 * @default 21
 *
 * @param Background Color
 * @type number
 * @min 0
 * @max 31
 * @desc The background color of the HP bar based on system colors (0-31).
 * @default 19
 *
 * @param Outline Size
 * @type number
 * @min 0
 * @max 10
 * @desc The size of the black outline around the HP bar.
 * @default 2
 *
 * @param Shake Intensity
 * @type number
 * @min 1
 * @max 10
 * @desc The intensity of the shake effect when the enemy takes damage.
 * @default 4
 *
 * @param Shake Duration
 * @type number
 * @min 1
 * @max 60
 * @desc The duration of the shake effect in frames.
 * @default 15
 *
 * @param Ghost Drain Speed
 * @type number
 * @min 1
 * @max 20
 * @desc The speed at which the ghost health drains to match the current HP.
 * @default 3
 *
 * @param Ghost Bar Color
 * @type number
 * @min 0
 * @max 31
 * @desc The color of the ghost health bar based on system colors (0-31).
 * @default 18
 *
 * @param Frame Image
 * @type file
 * @dir img/pictures
 * @desc The image to overlay on top of the HP bar.
 * @default GaugeFrame
 *
 * @param Breathing Scale Factor
 * @type number
 * @decimals 3
 * @min 1.001
 * @max 1.05
 * @desc The maximum scale factor for the breathing effect. Default: 1.01 (1% increase)
 * @default 1.01
 * 
 * @param Breathing Speed
 * @type number
 * @min 20
 * @max 240
 * @desc The speed of the breathing effect in frames. Default: 120
 * @default 120
 *
 * @help
 * This plugin allows you to create custom HP bars for enemies,
 * with customizable scaling, offsets, colors, an adjustable black outline, a shaking effect when the enemy takes damage, and a ghost health gauge that shows damage inflicted. The HP bar will move and scale in sync with the enemy's breathing animation.
 *
 * Notetags:
 * <HpGaugeScale: x>
 * <HpGaugeOffsetX: x>
 * <HpGaugeOffsetY: y>
 * 
 * Where x and y are numbers to adjust scale and offset.
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinEnemyHPBar');
    const defaultScale = parseFloat(parameters['Default Scale'] || 1.0);
    const defaultOffsetX = parseInt(parameters['Default Offset X'] || 0);
    const defaultOffsetY = parseInt(parameters['Default Offset Y'] || 40);
    const barColor1Index = parseInt(parameters['Bar Color 1'] || 20);
    const barColor2Index = parseInt(parameters['Bar Color 2'] || 21);
    const backgroundColorIndex = parseInt(parameters['Background Color'] || 19);
    const outlineSize = parseInt(parameters['Outline Size'] || 2);
    const shakeIntensity = parseInt(parameters['Shake Intensity'] || 4);
    const shakeDuration = parseInt(parameters['Shake Duration'] || 15);
    const ghostDrainSpeed = parseInt(parameters['Ghost Drain Speed'] || 3);
    const ghostBarColorIndex = parseInt(parameters['Ghost Bar Color'] || 18);
    const frameImage = String(parameters['Frame Image'] || 'GaugeFrame');
    const breathingScaleFactor = parseFloat(parameters['Breathing Scale Factor'] || 1.01);
    const breathingSpeed = Number(parameters['Breathing Speed'] || 120);

    class Sprite_EnemyHPGauge extends Sprite {
        constructor(enemy) {
            super();
            this._enemy = enemy;
            this._hpGaugeWidth = 150; // Set the width of the HP gauge
            this._hpGaugeHeight = 10; // Set the height of the HP gauge
            this._hpGaugeScale = this._enemy.enemy().meta.HpGaugeScale || defaultScale;
            this._hpGaugeOffsetX = this._enemy.enemy().meta.HpGaugeOffsetX || defaultOffsetX;
            this._hpGaugeOffsetY = this._enemy.enemy().meta.HpGaugeOffsetY || defaultOffsetY;
            this._shakeDuration = 0;
            this._previousHp = this._enemy.hp; // Store the initial HP
            this._ghostHp = this._enemy.hp; // Initialize ghost HP
            this._breathingStartFrame = 0;
            this.createBitmap();
            this.createFrameSprite();
        }

        createBitmap() {
            this.bitmap = new Bitmap(this._hpGaugeWidth + outlineSize * 2, this._hpGaugeHeight + outlineSize * 2);
            this.update();
        }

        createFrameSprite() {
            this._frameSprite = new Sprite();
            this._frameSprite.bitmap = ImageManager.loadPicture(frameImage);
            this._frameSprite.x = -outlineSize;
            this._frameSprite.y = -outlineSize;
            this._frameSprite.scale.x = (this._hpGaugeWidth + outlineSize * 2) / this._frameSprite.bitmap.width;
            this._frameSprite.scale.y = (this._hpGaugeHeight + outlineSize * 2) / this._frameSprite.bitmap.height;
            this.addChild(this._frameSprite);
        }

        update() {
            super.update();
            this.updateVisibility(); // Check if the HP gauge should be visible
            if (this.visible) { // Only update if visible
                this.checkHpChange(); // Check if HP has changed
                this.updateShake(); // Apply shake effect
                this.updateGhostHp(); // Update ghost HP gauge
                this.updatePosition();
                this.redraw();
                this.updateFrameSprite(); // Ensure the frame stays aligned with the gauge
                this.syncWithBreathing(); // Sync HP bar with breathing
            }
        }

        updateVisibility() {
            this.visible = !this._enemy.isHidden() && !this._enemy.isDead();
        }

        checkHpChange() {
            if (this._enemy.hp < this._previousHp) {
                this._shakeDuration = shakeDuration; // Trigger shake when HP decreases
                this._ghostHp = this._previousHp; // Set ghost HP to the previous HP
            }
            this._previousHp = this._enemy.hp; // Update the previous HP
        }

        updateShake() {
            if (this._shakeDuration > 0) {
                this.x += Math.random() * shakeIntensity - shakeIntensity / 2;
                this.y += Math.random() * shakeIntensity - shakeIntensity / 2;
                this._shakeDuration--;
            } else {
                // Reset position after shaking
                this.updatePosition();
            }
        }

        updateGhostHp() {
            if (this._ghostHp > this._enemy.hp) {
                this._ghostHp -= ghostDrainSpeed / 60;
                if (this._ghostHp < this._enemy.hp) {
                    this._ghostHp = this._enemy.hp;
                }
            }
        }

        updateFrameSprite() {
            if (this._frameSprite) {
                this._frameSprite.scale.x = (this._hpGaugeWidth + outlineSize * 2) / this._frameSprite.bitmap.width;
                this._frameSprite.scale.y = (this._hpGaugeHeight + outlineSize * 2) / this._frameSprite.bitmap.height;
            }
        }

        updatePosition() {
            const spriteHeight = this._enemy.spriteHeight ? this._enemy.spriteHeight() : (this._enemy.bitmap ? this._enemy.bitmap.height : 64); // Safely get height
            const gaugeXOffset = this._hpGaugeOffsetX - this._hpGaugeWidth / 2;
            const gaugeYOffset = this._hpGaugeOffsetY - spriteHeight; // Position the gauge above the enemy's head

            const scale = this.scale.x; // Get the current scale
            const adjustedYOffset = gaugeYOffset * scale; // Adjust Y offset based on scale

            if (this._shakeDuration <= 0) {
                this.x = this._enemy.screenX() + gaugeXOffset - outlineSize;
                this.y = this._enemy.screenY() - spriteHeight + adjustedYOffset - outlineSize;
            }
            this.scale.set(this._hpGaugeScale, this._hpGaugeScale);
        }

        syncWithBreathing() {
            const hoveredEnemy = this.getHoveredEnemy();
            if (this._enemy === hoveredEnemy) {
                const scale = 1 + (Math.sin((Graphics.frameCount - this._breathingStartFrame) / breathingSpeed) * (breathingScaleFactor - 1));
                this.scale.set(scale * this._hpGaugeScale, scale * this._hpGaugeScale);
                this.updatePosition(); // Update position to sync with scale changes
            } else {
                this.scale.set(this._hpGaugeScale, this._hpGaugeScale); // Reset scale if not hovered
                this._breathingStartFrame = Graphics.frameCount; // Reset animation start frame
                this.updatePosition(); // Reset position when not hovered
            }
        }

        redraw() {
            const hpRate = this._enemy.hpRate();
            const ghostHpRate = this._ghostHp / this._enemy.mhp;
            this.bitmap.clear();
            const color1 = ColorManager.textColor(barColor1Index);
            const color2 = ColorManager.textColor(barColor2Index);
            const backgroundColor = ColorManager.textColor(backgroundColorIndex);
            const ghostColor = ColorManager.textColor(ghostBarColorIndex);

            // Draw the HP bar outline
            this.bitmap.fillRect(0, 0, this._hpGaugeWidth + outlineSize * 2, this._hpGaugeHeight + outlineSize * 2, '#000000'); // Black outline

            // Draw the HP bar background
            this.bitmap.fillRect(outlineSize, outlineSize, this._hpGaugeWidth, this._hpGaugeHeight, backgroundColor);

            // Draw the ghost HP bar
            this.bitmap.fillRect(outlineSize, outlineSize, this._hpGaugeWidth * ghostHpRate, this._hpGaugeHeight, ghostColor);

            // Draw the HP bar foreground
            this.bitmap.gradientFillRect(outlineSize, outlineSize, this._hpGaugeWidth * hpRate, this._hpGaugeHeight, color1, color2);
        }

        getHoveredEnemy() {
            const enemyWindow = SceneManager._scene._enemyWindow;
            if (enemyWindow && enemyWindow.active) {
                return enemyWindow.enemy();
            }
            return null;
        }
    }

    const _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() {
        _Spriteset_Battle_createEnemies.call(this);
        this._enemyHpGauges = [];
        for (const enemySprite of this._enemySprites) {
            const hpGauge = new Sprite_EnemyHPGauge(enemySprite._battler);
            this._battleField.addChild(hpGauge);
            this._enemyHpGauges.push(hpGauge);
        }
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        this.updateEnemyHpGaugeHover();
    };

    Scene_Battle.prototype.updateEnemyHpGaugeHover = function() {
        const hoveredEnemy = this._enemyWindow && this._enemyWindow.active ? this._enemyWindow.enemy() : null;
        this._spriteset._enemyHpGauges.forEach(hpGauge => {
            if (hpGauge._enemy !== hoveredEnemy) {
                hpGauge.scale.set(hpGauge._hpGaugeScale, hpGauge._hpGaugeScale); // Reset scale if hover is canceled or changed
                hpGauge._breathingStartFrame = Graphics.frameCount; // Reset breathing start frame
                hpGauge.updatePosition(); // Reset position when not hovered
            }
        });
    };
})();
