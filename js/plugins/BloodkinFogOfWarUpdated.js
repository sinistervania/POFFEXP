/*:
* @target MZ
* @plugindesc Advanced Fog of War Plugin with Shape, Radius Control, and Configurable Parameters
* @author Bloodkin
* @help BloodkinFogOfWarUpdated - v1.4.0
*
* This plugin provides a fog of war feature with shape, radius control, and configurable parameters.
*
* @param enableFog
* @text Enable Fog
* @type boolean
* @on Enable
* @off Disable
* @desc Whether to enable the fog of war by default.
* @default true
*
* @param defaultRadiusX
* @text Default Radius X
* @type number
* @default 100
* @min 1
* @desc Default horizontal radius of the visible area in the fog of war.
*
* @param defaultRadiusY
* @text Default Radius Y
* @type number
* @default 100
* @min 1
* @desc Default vertical radius of the visible area in the fog of war.
*
* @param defaultShape
* @text Default Shape
* @type select
* @option Circle
* @option Rectangle
* @default Circle
* @desc Default shape of the fog of war.
*
* @command enableFog
* @text Enable Fog
* @desc Enables the fog of war.
*
* @command disableFog
* @text Disable Fog
* @desc Disables the fog of war.
*
* @command setFogRadius
* @text Set Fog Radius
* @desc Sets the radius of the visible area in the fog of war.
* @arg radiusX
* @type number
* @default 100
* @min 1
* @arg radiusY
* @type number
* @default 100
* @min 1
*
* @command setFogShape
* @text Set Fog Shape
* @desc Sets the shape of the fog of war.
* @arg shape
* @type select
* @option Circle
* @option Rectangle
* @default Circle
*/

(() => {
    const parameters = PluginManager.parameters('BloodkinFogOfWarUpdated');
    let fogEnabled = parameters['enableFog'] === 'true';
    let fogRadiusX = parseInt(parameters['defaultRadiusX'], 10) || 100;
    let fogRadiusY = parseInt(parameters['defaultRadiusY'], 10) || 100;
    let fogShape = parameters['defaultShape'] || 'Circle';

    class FogOfWarSprite extends Sprite {
        constructor() {
            super();
            this.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this.redraw();
        }

        redraw() {
            this.bitmap.fillAll('black');
            if (fogShape === 'Circle') {
                this.drawCircle();
            } else if (fogShape === 'Rectangle') {
                this.drawRectangle();
            }
        }

        drawCircle() {
            const x = $gamePlayer.screenX() - fogRadiusX;
            const y = $gamePlayer.screenY() - fogRadiusY - 48;
            this.bitmap.clearRect(x, y, fogRadiusX * 2, fogRadiusY * 2 + 48);
        }

        drawRectangle() {
            const x = $gamePlayer.screenX() - fogRadiusX / 2;
            const y = $gamePlayer.screenY() - fogRadiusY - 24;
            this.bitmap.clearRect(x, y, fogRadiusX, fogRadiusY * 2);
        }

        update() {
            super.update();
            this.redraw(); // Redraw fog every frame
        }
    }

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        if (fogEnabled) {
            this.createFogOfWar();
        }
    };

    Scene_Map.prototype.createFogOfWar = function() {
        this._fogOfWarSprite = new FogOfWarSprite();
        this._fogOfWarSprite.z = 0; // Ensure fog is behind UI elements
        this.addChild(this._fogOfWarSprite);
    };

    PluginManager.registerCommand('BloodkinFogOfWarUpdated', 'enableFog', args => {
        fogEnabled = true;
    });

    PluginManager.registerCommand('BloodkinFogOfWarUpdated', 'disableFog', args => {
        fogEnabled = false;
    });

    PluginManager.registerCommand('BloodkinFogOfWarUpdated', 'setFogRadius', args => {
        fogRadiusX = Number(args.radiusX) || fogRadiusX;
        fogRadiusY = Number(args.radiusY) || fogRadiusY;
    });

    PluginManager.registerCommand('BloodkinFogOfWarUpdated', 'setFogShape', args => {
        fogShape = args.shape || fogShape;
    });
})();
