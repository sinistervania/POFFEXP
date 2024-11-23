/*:
 * @target MZ
 * @plugindesc Adds an MP gauge with an overlay image, customizable rotation, and styling for Actor 1.
 * @author Bloodkin
 *
 * @param Frame Image
 * @type file
 * @dir img/pictures
 * @desc The image to overlay on top of the MP bar.
 * @default GaugeFrame
 *
 * @param Default Scale
 * @type number
 * @min 0.1
 * @max 5.0
 * @decimals 1
 * @desc Default scale for the MP bar.
 * @default 1.0
 *
 * @param Bar Width
 * @type number
 * @min 1
 * @desc Width of the MP bar.
 * @default 10
 *
 * @param Bar Height
 * @type number
 * @min 1
 * @desc Height of the MP bar.
 * @default 120
 *
 * @param Offset X
 * @type number
 * @desc X offset from the center of the screen.
 * @default -280
 *
 * @param Offset Y
 * @type number
 * @desc Y offset from the center of the screen.
 * @default -20
 *
 * @param Outline Size
 * @type number
 * @desc Thickness of the outline around the bar.
 * @default 2
 *
 * @param Default Bar Color
 * @type string
 * @desc Default color for the MP bar (hex code).
 * @default #f5f5f5
 *
 * @help
 * ============================================================================
 * Bloodkin MP Gauge for Actor 1
 * ============================================================================
 * This plugin creates a customizable MP gauge for Actor 1. The gauge includes
 * an overlay image, supports dynamic rotation, and customizable dimensions.
 */

(() => {
    // =========================================================================
    // Plugin Parameters
    // =========================================================================

    const pluginName = "BloodkinMPGauge";
    const parameters = PluginManager.parameters(pluginName);

    const CONFIG = {
        frameImage: String(parameters["Frame Image"] || "GaugeFrame"),
        defaultScale: parseFloat(parameters["Default Scale"] || 1.0),
        barWidth: parseInt(parameters["Bar Width"] || 15),
        barHeight: parseInt(parameters["Bar Height"] || 120),
        offsetX: parseInt(parameters["Offset X"] || -120),
        offsetY: parseInt(parameters["Offset Y"] || +50),
        outlineSize: parseInt(parameters["Outline Size"] || 2),
        defaultBarColor: String(parameters["Default Bar Color"] || "#f5f5f5"),
    };

    // =========================================================================
    // Sprite_AllyMPGauge
    // =========================================================================

    class Sprite_AllyMPGauge extends Sprite {
        constructor(actor) {
            super();
            this._actor = actor;
            this._mpGaugeWidth = CONFIG.barWidth;
            this._mpGaugeHeight = CONFIG.barHeight;
            this._scale = CONFIG.defaultScale;
            this.createBitmap();
            this.createFrameSprite();
        }

        createBitmap() {
            this.bitmap = new Bitmap(
                this._mpGaugeWidth + CONFIG.outlineSize * 2,
                this._mpGaugeHeight + CONFIG.outlineSize * 2
            );

            // Rotate the gauge 270 degrees
            this.rotation = (0 * Math.PI) / 180;
            this.update();
        }

        createFrameSprite() {
            this._frameSprite = new Sprite();
            const frameBitmap = ImageManager.loadPicture(CONFIG.frameImage);

            frameBitmap.addLoadListener(() => {
                if (frameBitmap.width === 0 || frameBitmap.height === 0) {
                    console.error(`Image ${CONFIG.frameImage} not found in img/pictures.`);
                    return;
                }

                // Set up the frame sprite
                this._frameSprite.bitmap = frameBitmap;

                // Rotate the frame 270 degrees
                this._frameSprite.rotation = (270 * Math.PI) / 180;

                // Scale to match gauge dimensions
                this._frameSprite.scale.x = (this._mpGaugeWidth + CONFIG.outlineSize * 2) / frameBitmap.width;
                this._frameSprite.scale.y = (this._mpGaugeHeight + CONFIG.outlineSize * 2) / frameBitmap.height;

                // Position the frame sprite
                this._frameSprite.x = this._mpGaugeWidth / 2 + CONFIG.outlineSize;
                this._frameSprite.y = this._mpGaugeHeight / 2 + CONFIG.outlineSize;

                // Ensure frame is drawn over the gauge
                this.addChild(this._frameSprite);
            });
        }

        update() {
            super.update();
            this.updatePosition();
            this.redraw();
        }

        updatePosition() {
            const screenCenterX = Graphics.boxWidth / 2;
            const screenCenterY = Graphics.boxHeight / 2;

            this.x = screenCenterX + CONFIG.offsetX;
            this.y = screenCenterY + CONFIG.offsetY;
            this.scale.set(this._scale, this._scale);
        }

        redraw() {
            const mpRate = this._actor.mpRate();
            this.bitmap.clear();
            const backgroundColor = "#000000";
            const barColor = CONFIG.defaultBarColor;

            // Draw the MP bar outline
            this.bitmap.fillRect(
                0,
                0,
                this._mpGaugeWidth + CONFIG.outlineSize * 2,
                this._mpGaugeHeight + CONFIG.outlineSize * 2,
                backgroundColor
            );

            // Draw the MP bar background
            this.bitmap.fillRect(
                CONFIG.outlineSize,
                CONFIG.outlineSize,
                this._mpGaugeWidth,
                this._mpGaugeHeight,
                backgroundColor
            );

            // Draw the MP bar foreground
            this.bitmap.fillRect(
                CONFIG.outlineSize,
                CONFIG.outlineSize,
                this._mpGaugeWidth,
                this._mpGaugeHeight * mpRate,
                barColor
            );
        }
    }

    // =========================================================================
    // Spriteset_Battle - Create MP Gauge for Actor 1 Only
    // =========================================================================

    const _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function () {
        _Spriteset_Battle_createActors.call(this);

        // Create MP Gauge only for Actor 1
        const actor1 = $gameActors.actor(1);
        if (actor1) {
            this._allyMpGauge = new Sprite_AllyMPGauge(actor1);
            this._battleField.addChild(this._allyMpGauge);
        }
    };
})();
