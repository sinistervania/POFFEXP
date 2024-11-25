/*:
 * @target MZ
 * @plugindesc Custom MP and TP bars for Actor 1 with ghost gauge, shake effect, and markers.
 * @author Bloodkin
 *
 * @param Frame Image
 * @type file
 * @dir img/pictures
 * @desc The image to overlay on top of the gauges.
 * @default GaugeFrame
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinPlayerGauges');
    const frameImage = String(parameters['Frame Image'] || 'GaugeFrame');

    const SETTINGS = {
        mp: {
            scale: 1.0,
            offsetX: -320,
            offsetY: 500,
            gaugeWidth: 260,
            gaugeHeight: 24,
            barColor1: '#737373',
            barColor2: '#f5f5f5',
            stateColors: {
                35: { color1: '#980000', color2: '#ff4c4c' },
                34: { color1: '#466415', color2: '#a4ee1a' },
                74: { color1: '#1d53b5', color2: '#4692ee' },
                187: { color1: '#37004c', color2: '#ac39fd' },
                188: { color1: '#5e1d07', color2: '#ff7300' },
                78: { color1: '#7c7730', color2: '#dddd00' }
            },
            backgroundColor: 19,
            ghostColor: 7,
            ghostDrainSpeed: 60,
            shakeDuration: 15,
            shakeIntensity: 1
        },
        tp: {
            scale: 1.0,
            offsetX: +80,
            offsetY: 500,
            gaugeWidth: 260,
            gaugeHeight: 24,
            barColor1: '#52d1ff',
            barColor2: '#ffffff',
            backgroundColor: 19,
            ghostColor: 7,
            ghostDrainSpeed: 60,
            shakeDuration: 15,
            shakeIntensity: 1
        },
        outlineSize: 2
    };

    class Sprite_ActorGauge extends Sprite {
        constructor(actor, type) {
            super();
            this._actor = actor;
            this._type = type;
            this._settings = SETTINGS[type];
            
            this._gaugeWidth = this._settings.gaugeWidth;
            this._gaugeHeight = this._settings.gaugeHeight;
            this._gaugeScale = this._settings.scale;
            this._gaugeOffsetX = this._settings.offsetX;
            this._gaugeOffsetY = this._settings.offsetY;
            this._shakeDuration = 0;
            this._previousValue = this._getCurrentValue();
            this._ghostValue = this._getCurrentValue();
            
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
            
            this._gaugeContainer = new Sprite();
            this._gaugeContainer.anchor.x = 0.5;
            this._gaugeContainer.anchor.y = 0.5;
            this.addChild(this._gaugeContainer);
            
            this.createBitmap();
            this.createFrameSprite();
            
            this.updatePosition();
            
            this._gaugeContainer.rotation = (0 * Math.PI) / 180;
        }

        _getCurrentValue() {
            return this._type === 'mp' ? this._actor.mp : this._actor.tp;
        }

        _getMaxValue() {
            return this._type === 'mp' ? this._actor.mmp : 100;
        }

        _getValueRate() {
            return this._type === 'mp' ? this._actor.mpRate() : this._actor.tpRate();
        }

        createBitmap() {
            const gaugeSprite = new Sprite();
            gaugeSprite.bitmap = new Bitmap(this._gaugeWidth + SETTINGS.outlineSize * 2,
                                          this._gaugeHeight + SETTINGS.outlineSize * 2);
            this._gaugeBitmap = gaugeSprite.bitmap;
            this._gaugeContainer.addChild(gaugeSprite);
        }

        createFrameSprite() {
            this._frameSprite = new Sprite();
            this._frameSprite.bitmap = ImageManager.loadPicture(frameImage);
            this._frameSprite.x = -SETTINGS.outlineSize;
            this._frameSprite.y = -SETTINGS.outlineSize;
            this._frameSprite.bitmap.addLoadListener(() => {
                this._frameSprite.scale.x = (this._gaugeWidth + SETTINGS.outlineSize * 2) / this._frameSprite.bitmap.width;
                this._frameSprite.scale.y = (this._gaugeHeight + SETTINGS.outlineSize * 2) / this._frameSprite.bitmap.height;
            });
            this._gaugeContainer.addChild(this._frameSprite);
        }

        update() {
            super.update();
            this.updateVisibility();
            if (this.visible) {
                this.checkValueChange();
                this.updateShake();
                this.updateGhostValue();
                if (this._shakeDuration <= 0) {
                    this.updatePosition();
                }
                this.redraw();
            }
        }

        updateVisibility() {
            this.visible = this._actor.isAlive();
        }

        checkValueChange() {
            const currentValue = this._getCurrentValue();
            if (currentValue < this._previousValue) {
                this._shakeDuration = this._settings.shakeDuration;
                this._ghostValue = this._previousValue;
            }
            this._previousValue = currentValue;
        }

        updateShake() {
            if (this._shakeDuration > 0) {
                const baseX = Graphics.boxWidth / 2 + this._gaugeOffsetX;
                const baseY = Graphics.boxHeight / 2 + this._gaugeOffsetY;
                this.x = baseX + (Math.random() * this._settings.shakeIntensity - this._settings.shakeIntensity / 2);
                this.y = baseY + (Math.random() * this._settings.shakeIntensity - this._settings.shakeIntensity / 2);
                this._shakeDuration--;
            }
        }

        updateGhostValue() {
            if (this._ghostValue > this._getCurrentValue()) {
                this._ghostValue -= this._settings.ghostDrainSpeed / 60;
                if (this._ghostValue < this._getCurrentValue()) {
                    this._ghostValue = this._getCurrentValue();
                }
            }
        }

        updatePosition() {
            this.x = Graphics.boxWidth / 2 + this._gaugeOffsetX;
            this.y = Graphics.boxHeight / 2 + this._gaugeOffsetY;
            this.scale.set(this._gaugeScale, this._gaugeScale);
        }

        getGaugeColors() {
            if (this._type === 'mp') {
                for (const stateId in SETTINGS.mp.stateColors) {
                    if (this._actor.isStateAffected(Number(stateId))) {
                        return {
                            color1: SETTINGS.mp.stateColors[stateId].color1,
                            color2: SETTINGS.mp.stateColors[stateId].color2
                        };
                    }
                }
                return {
                    color1: SETTINGS.mp.barColor1,
                    color2: SETTINGS.mp.barColor2
                };
            } else {
                return {
                    color1: this._settings.barColor1,
                    color2: this._settings.barColor2
                };
            }
        }

        redraw() {
            const valueRate = this._getValueRate();
            const ghostRate = this._ghostValue / this._getMaxValue();
            this._gaugeBitmap.clear();
            
            const gaugeColors = this.getGaugeColors();
            const backgroundColor = ColorManager.textColor(this._settings.backgroundColor);
            const ghostColor = ColorManager.textColor(this._settings.ghostColor);

            this._gaugeBitmap.fillRect(0, 0, this._gaugeWidth + SETTINGS.outlineSize * 2,
                this._gaugeHeight + SETTINGS.outlineSize * 2, '#000000');

            this._gaugeBitmap.fillRect(SETTINGS.outlineSize, SETTINGS.outlineSize,
                this._gaugeWidth, this._gaugeHeight, backgroundColor);

            const ghostWidth = Math.floor(this._gaugeWidth * ghostRate);
            if (ghostWidth > 0) {
                this._gaugeBitmap.fillRect(SETTINGS.outlineSize, SETTINGS.outlineSize,
                    ghostWidth, this._gaugeHeight, ghostColor);
            }

            const currentWidth = Math.floor(this._gaugeWidth * valueRate);
            if (currentWidth > 0) {
                this._gaugeBitmap.gradientFillRect(SETTINGS.outlineSize, SETTINGS.outlineSize,
                    currentWidth, this._gaugeHeight, gaugeColors.color1, gaugeColors.color2);
            }

            this.drawMarkers();
        }

        drawMarkers() {
            const maxValue = this._getMaxValue();
            const increment = 100;
            const totalIncrements = Math.floor(maxValue / increment);
            const markerWidth = 2;
            const markerHeight = this._gaugeHeight;
            
            for (let i = 1; i <= totalIncrements; i++) {
                const ratio = (i * increment) / maxValue;
                if (ratio < 1) {
                    const xPos = Math.floor(SETTINGS.outlineSize + this._gaugeWidth * ratio - markerWidth / 2);
                    this._gaugeBitmap.fillRect(xPos - 1, SETTINGS.outlineSize,
                        markerWidth + 1, markerHeight, '#000000');
                    this._gaugeBitmap.fillRect(xPos, SETTINGS.outlineSize,
                        markerWidth, markerHeight, '#e1cb89');
                }
            }
        }
    }

    const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.call(this);
        const actor1 = $gameParty.members()[0];
        if (actor1) {
            this._actorMpGauge = new Sprite_ActorGauge(actor1, 'mp');
            this._actorTpGauge = new Sprite_ActorGauge(actor1, 'tp');
            this._spriteset.addChild(this._actorMpGauge);
            this._spriteset.addChild(this._actorTpGauge);
            this._actorMpGauge.z = -5;
            this._actorTpGauge.z = -5;
        }
    };
})();