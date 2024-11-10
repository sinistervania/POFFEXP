/*:
* @target MZ
* @plugindesc Advanced Fog of War Plugin with Shape, Radius Control, Configurable Parameters, and Map IDs
* @author Bloodkin
* @help BloodkinFogOfWarMaps - v1.4.1
*
* This plugin provides an advanced fog of war feature with shape, radius control, configurable parameters, and specific map activation.
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
* @param Fog Maps
* @type number[]
* @desc List of map IDs where fog of war should be active.
* @default []
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
    const pluginName = 'BloodkinFogOfWarMaps';
    const parameters = PluginManager.parameters(pluginName);
    let fogEnabled = parameters['enableFog'] === 'true';
    let fogRadiusX = parseInt(parameters['defaultRadiusX'], 10) || 100;
    let fogRadiusY = parseInt(parameters['defaultRadiusY'], 10) || 100;
    let fogShape = parameters['defaultShape'] || 'Circle';
    const fogMaps = JSON.parse(parameters['Fog Maps']).map(Number);

    class FogOfWarSprite extends Sprite {
        constructor() {
            super();
            this.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this.redraw();
        }

        redraw() {
            const context = this.bitmap.context;
            const centerX = $gamePlayer.screenX();
            const centerY = $gamePlayer.screenY();
            const radius = fogRadiusX; // Use fogRadiusX for both the x and y axis for a circular gradient

            // Create a radial gradient
            const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(0,0,0,0)'); // Completely transparent at the center
            gradient.addColorStop(1, 'rgba(0,0,0,1)'); // Fully opaque at the edges

            // Fill the entire bitmap with the gradient
            this.bitmap.clear();
            context.fillStyle = gradient;
            context.fillRect(0, 0, Graphics.width, Graphics.height);
        }

        update() {
            super.update();
            this.redraw(); // Ensure the fog is redrawn to update with player movement
        }
    }

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        if (fogEnabled && fogMaps.includes($gameMap.mapId())) {
            this.createFogOfWar();
        }
    };

    Scene_Map.prototype.createFogOfWar = function() {
        this._fogOfWarSprite = new FogOfWarSprite();
        this.addChild(this._fogOfWarSprite);
    };

    PluginManager.registerCommand(pluginName, 'enableFog', args => {
        fogEnabled = true;
    });

    PluginManager.registerCommand(pluginName, 'disableFog', args => {
        fogEnabled = false;
    });

    PluginManager.registerCommand(pluginName, 'setFogRadius', args => {
        fogRadiusX = Number(args.radiusX) || fogRadiusX;
        fogRadiusY = Number(args.radiusY) || fogRadiusY;
    });

    PluginManager.registerCommand(pluginName, 'setFogShape', args => {
        fogShape = args.shape || fogShape;
    });
})();
