/*:
 * @target MZ
 * @plugindesc Custom MP bar that moves and scales along with the enemy's breathing animation, only visible if the enemy has greater than 0 Max MP. The gauge changes color when full.
 * @author Bloodkin
 *
 * @param Default Scale
 * @type number
 * @min 0.1
 * @max 5.0
 * @decimals 2
 * @desc Default scale of the MP bar.
 * @default 1.0
 *
 * @param Default Offset X
 * @type number
 * @min -1000
 * @max 1000
 * @desc Default X offset of the MP bar.
 * @default 0
 *
 * @param Default Offset Y
 * @type number
 * @min -1000
 * @max 1000
 * @desc Default Y offset of the MP bar.
 * @default 40
 *
 * @param MP Gauge Width
 * @type number
 * @min 1
 * @max 1000
 * @desc The width of the MP bar.
 * @default 150
 *
 * @param MP Gauge Height
 * @type number
 * @min 1
 * @max 100
 * @desc The height of the MP bar.
 * @default 10
 *
 * @param Bar Color 1
 * @type number
 * @min 0
 * @max 31
 * @desc The first color of the MP bar gradient based on system colors (0-31).
 * @default 20
 *
 * @param Bar Color 2
 * @type number
 * @min 0
 * @max 31
 * @desc The second color of the MP bar gradient based on system colors (0-31).
 * @default 21
 *
 * @param Full MP Bar Color 1
 * @type number
 * @min 0
 * @max 31
 * @desc The first color of the MP bar gradient when MP is full based on system colors (0-31).
 * @default 18
 *
 * @param Full MP Bar Color 2
 * @type number
 * @min 0
 * @max 31
 * @desc The second color of the MP bar gradient when MP is full based on system colors (0-31).
 * @default 19
 *
 * @param Background Color
 * @type number
 * @min 0
 * @max 31
 * @desc The background color of the MP bar based on system colors (0-31).
 * @default 19
 *
 * @param Outline Size
 * @type number
 * @min 1
 * @max 10
 * @desc The size of the black outline around the MP bar.
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
 * @desc The speed at which the ghost MP drains to match the current MP.
 * @default 3
 *
 * @param Ghost Bar Color
 * @type number
 * @min 0
 * @max 31
 * @desc The color of the ghost MP bar based on system colors (0-31).
 * @default 18
 *
 * @param Frame Image
 * @type file
 * @dir img/pictures
 * @desc The image to overlay on top of the MP bar.
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
 * This plugin allows you to create custom MP bars for enemies,
 * with customizable scaling, offsets, width, height, colors, an adjustable black outline, a ghost MP gauge that shows MP lost, and an image overlay. The MP bar will move and scale in sync with the enemy's breathing animation, and only be visible if the enemy has greater than 0 Max MP. The MP gauge will change color when full.
 *
 * Notetags:
 * <MpGaugeScale: x>
 * <MpGaugeOffsetX: x>
 * <MpGaugeOffsetY: y>
 * 
 * Where x and y are numbers to adjust scale and offset.
 */
(() => {
    const parameters = PluginManager.parameters('BloodkinEnemyMPBar');
    const defaultScale = parseFloat(parameters['Default Scale'] || 1.0);
    const defaultOffsetX = parseInt(parameters['Default Offset X'] || 0);
    const defaultOffsetY = parseInt(parameters['Default Offset Y'] || 40);
    const mpGaugeWidth = parseInt(parameters['MP Gauge Width'] || 150);
    const mpGaugeHeight = parseInt(parameters['MP Gauge Height'] || 10);
    const barColor1Index = parseInt(parameters['Bar Color 1'] || 20);
    const barColor2Index = parseInt(parameters['Bar Color 2'] || 21);
    const fullMpBarColor1Index = parseInt(parameters['Full MP Bar Color 1'] || 18);
    const fullMpBarColor2Index = parseInt(parameters['Full MP Bar Color 2'] || 19);
    const backgroundColorIndex = parseInt(parameters['Background Color'] || 19);
    const outlineSize = parseInt(parameters['Outline Size'] || 2);
    const shakeIntensity = parseInt(parameters['Shake Intensity'] || 4);
    const shakeDuration = parseInt(parameters['Shake Duration'] || 15);
    const ghostDrainSpeed = parseInt(parameters['Ghost Drain Speed'] || 3);
    const ghostBarColorIndex = parseInt(parameters['Ghost Bar Color'] || 18);
    const frameImage = String(parameters['Frame Image'] || 'GaugeFrame');
    const breathingScaleFactor = parseFloat(parameters['Breathing Scale Factor'] || 1.01);
    const breathingSpeed = Number(parameters['Breathing Speed'] || 120);

    class Sprite_EnemyMPGauge extends Sprite {
        constructor(enemy) {
            super();
            this._enemy = enemy;
            this._mpGaugeWidth = mpGaugeWidth;
            this._mpGaugeHeight = mpGaugeHeight;
            this._mpGaugeScale = this._enemy.enemy().meta.MpGaugeScale || defaultScale;
            this._mpGaugeOffsetX = this._enemy.enemy().meta.MpGaugeOffsetX || defaultOffsetX;
            this._mpGaugeOffsetY = this._enemy.enemy().meta.MpGaugeOffsetY || defaultOffsetY;
            this._shakeDuration = 0;
            this._previousMp = this._enemy.mp; 
            this._ghostMp = this._enemy.mp; 
            this._breathingStartFrame = 0;
            this._barColor1 = ColorManager.textColor(barColor1Index);
            this._barColor2 = ColorManager.textColor(barColor2Index);
            this.createBitmap();
            this.createFrameSprite();
        }

        createBitmap() {
            this.bitmap = new Bitmap(this._mpGaugeWidth + outlineSize * 2, this._mpGaugeHeight + outlineSize * 2);
            this.update();
        }

        createFrameSprite() {
            this._frameSprite = new Sprite();
            this._frameSprite.bitmap = ImageManager.loadPicture(frameImage);
            this._frameSprite.x = -outlineSize;
            this._frameSprite.y = -outlineSize;
            this._frameSprite.scale.x = (this._mpGaugeWidth + outlineSize * 2) / this._frameSprite.bitmap.width;
            this._frameSprite.scale.y = (this._mpGaugeHeight + outlineSize * 2) / this._frameSprite.bitmap.height;
            this.addChild(this._frameSprite);
        }

        update() {
            super.update();
            this.updateVisibility(); // Check if the MP gauge should be visible
            if (this.visible) { // Only update if visible
                this.checkMpChange(); 
                this.updateShake(); 
                this.updateGhostMp(); 
                this.updatePosition();
                this.redraw();
                this.updateFrameSprite(); 
                this.syncWithBreathing(); 
                this.updateFullMpColor(); // Update the color if MP is full
            }
        }

        updateVisibility() {
            this.visible = !this._enemy.isHidden() && !this._enemy.isDead() && this._enemy.mmp > 0;
        }

        checkMpChange() {
            if (this._enemy.mp < this._previousMp) {
                this._shakeDuration = shakeDuration; 
                this._ghostMp = this._previousMp; 
            }
            this._previousMp = this._enemy.mp; 
        }

        updateShake() {
            if (this._shakeDuration > 0) {
                this.x += Math.random() * shakeIntensity - shakeIntensity / 2;
                this.y += Math.random() * shakeIntensity - shakeIntensity / 2;
                this._shakeDuration--;
            } else {
                this.updatePosition();
            }
        }

        updateGhostMp() {
            if (this._ghostMp > this._enemy.mp) {
                this._ghostMp -= ghostDrainSpeed / 60;
                if (this._ghostMp < this._enemy.mp) {
                    this._ghostMp = this._enemy.mp;
                }
            }
        }

        updateFrameSprite() {
            if (this._frameSprite) {
                this._frameSprite.scale.x = (this._mpGaugeWidth + outlineSize * 2) / this._frameSprite.bitmap.width;
                this._frameSprite.scale.y = (this._mpGaugeHeight + outlineSize * 2) / this._frameSprite.bitmap.height;
            }
        }

        updatePosition() {
            const spriteHeight = this._enemy.spriteHeight ? this._enemy.spriteHeight() : (this._enemy.bitmap ? this._enemy.bitmap.height : 64);
            const gaugeXOffset = this._mpGaugeOffsetX - this._mpGaugeWidth / 2;
            const gaugeYOffset = this._mpGaugeOffsetY - spriteHeight;
            const scale = this.scale.x;
            const adjustedYOffset = gaugeYOffset * scale;

            if (this._shakeDuration <= 0) {
                this.x = this._enemy.screenX() + gaugeXOffset - outlineSize;
                this.y = this._enemy.screenY() - spriteHeight + adjustedYOffset - outlineSize;
            }
            this.scale.set(this._mpGaugeScale, this._mpGaugeScale);
        }

        syncWithBreathing() {
            const hoveredEnemy = this.getHoveredEnemy();
            if (this._enemy === hoveredEnemy) {
                const scale = 1 + (Math.sin((Graphics.frameCount - this._breathingStartFrame) / breathingSpeed) * (breathingScaleFactor - 1));
                this.scale.set(scale * this._mpGaugeScale, scale * this._mpGaugeScale);
                this.updatePosition();
            } else {
                this.scale.set(this._mpGaugeScale, this._mpGaugeScale);
                this._breathingStartFrame = Graphics.frameCount;
                this.updatePosition();
            }
        }

        updateFullMpColor() {
            if (this._enemy.mpRate() === 1) {
                this._barColor1 = ColorManager.textColor(fullMpBarColor1Index);
                this._barColor2 = ColorManager.textColor(fullMpBarColor2Index);
            } else {
                this._barColor1 = ColorManager.textColor(barColor1Index);
                this._barColor2 = ColorManager.textColor(barColor2Index);
            }
        }

        redraw() {
            const mpRate = this._enemy.mpRate();
            const ghostMpRate = this._ghostMp / this._enemy.mmp;
            this.bitmap.clear();
            const color1 = this._barColor1;
            const color2 = this._barColor2;
            const backgroundColor = ColorManager.textColor(backgroundColorIndex);
            const ghostColor = ColorManager.textColor(ghostBarColorIndex);

            this.bitmap.fillRect(0, 0, this._mpGaugeWidth + outlineSize * 2, this._mpGaugeHeight + outlineSize * 2, '#000000');
            this.bitmap.fillRect(outlineSize, outlineSize, this._mpGaugeWidth, this._mpGaugeHeight, backgroundColor);
            this.bitmap.fillRect(outlineSize, outlineSize, this._mpGaugeWidth * ghostMpRate, this._mpGaugeHeight, ghostColor);
            this.bitmap.gradientFillRect(outlineSize, outlineSize, this._mpGaugeWidth * mpRate, this._mpGaugeHeight, color1, color2);
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
        this._enemyMpGauges = [];
        for (const enemySprite of this._enemySprites) {
            if (enemySprite._battler.mmp > 0) {
                const mpGauge = new Sprite_EnemyMPGauge(enemySprite._battler);
                this._battleField.addChild(mpGauge);
                this._enemyMpGauges.push(mpGauge);
            }
        }
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        this.updateEnemyMpGaugeHover();
    };

    Scene_Battle.prototype.updateEnemyMpGaugeHover = function() {
        const hoveredEnemy = this._enemyWindow && this._enemyWindow.active ? this._enemyWindow.enemy() : null;
        this._spriteset._enemyMpGauges.forEach(mpGauge => {
            if (mpGauge._enemy !== hoveredEnemy) {
                mpGauge.scale.set(mpGauge._mpGaugeScale, mpGauge._mpGaugeScale);
                mpGauge._breathingStartFrame = Graphics.frameCount;
                mpGauge.updatePosition();
            }
        });
    };
})();
