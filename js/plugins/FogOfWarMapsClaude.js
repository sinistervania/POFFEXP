/*:
* @target MZ
* @plugindesc Advanced Fog of War Plugin with Shape, Radius Control, Configurable Parameters, and Map IDs
* @author Claude
* @help FogOfWarMapsClaude - v1.4.0
*
* This plugin provides an advanced fog of war feature with shape, radius control, configurable parameters, and specific map activation.
* Events with <Light> in their note tag will create a faded clear radius in the fog, which disappears when the event is erased.
*
* The enableFog command will now enable fog on any map, regardless of whether it's listed in the Fog Maps parameter.
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
* @desc List of map IDs where fog of war should be active by default.
* @default []
*
* @param lightRadius
* @text Light Radius
* @type number
* @default 50
* @min 1
* @desc Radius of the clear area around events with <Light> note tag.
*
* @command enableFog
* @text Enable Fog
* @desc Enables the fog of war on the current map.
*
* @command disableFog
* @text Disable Fog
* @desc Disables the fog of war on the current map.
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
    const pluginName = 'FogOfWarMapsClaude';
    const parameters = PluginManager.parameters(pluginName);
    let fogEnabled = parameters['enableFog'] === 'true';
    let fogRadiusX = parseInt(parameters['defaultRadiusX'], 10) || 100;
    let fogRadiusY = parseInt(parameters['defaultRadiusY'], 10) || 100;
    let fogShape = parameters['defaultShape'] || 'Circle';
    const defaultFogMaps = JSON.parse(parameters['Fog Maps']).map(Number);
    const lightRadius = parseInt(parameters['lightRadius'], 10) || 50;

    // New: Set to store maps with fog enabled
    const fogEnabledMaps = new Set(defaultFogMaps);

    class FogOfWarSprite extends Sprite {
        constructor() {
            super();
            this.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this.z = 1;  // Set z-index
            this.redraw();
        }

        redraw() {
            const context = this.bitmap.context;
            this.bitmap.clear();
            
            // Draw the main fog
            this.drawMainFog(context);
            
            // Clear areas for light sources
            this.clearLightAreas(context);
        }

        drawMainFog(context) {
            const centerX = $gamePlayer.screenX();
            const centerY = $gamePlayer.screenY();
            const radius = fogRadiusX; // Use fogRadiusX for both the x and y axis for a circular gradient

            // Create a radial gradient
            const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(0,0,0,0)'); // Completely transparent at the center
            gradient.addColorStop(1, 'rgba(0,0,0,1)'); // Fully opaque at the edges

            // Fill the entire bitmap with the gradient
            context.fillStyle = gradient;
            context.fillRect(0, 0, Graphics.width, Graphics.height);
        }

        clearLightAreas(context) {
            $gameMap.events().forEach(event => {
                if (event.event().note.includes('<Light>') && !event._erased) {
                    const screenX = event.screenX();
                    const screenY = event.screenY();
                    context.globalCompositeOperation = 'destination-out';
                    const gradient = context.createRadialGradient(screenX, screenY, 0, screenX, screenY, lightRadius);
                    gradient.addColorStop(0, 'rgba(0,0,0,1)'); // Fully clear at the center
                    gradient.addColorStop(1, 'rgba(0,0,0,0)'); // No effect at the edges
                    context.fillStyle = gradient;
                    context.beginPath();
                    context.arc(screenX, screenY, lightRadius, 0, Math.PI * 2, false);
                    context.fill();
                    context.globalCompositeOperation = 'source-over';
                }
            });
        }

        update() {
            super.update();
            this.redraw(); // Ensure the fog is redrawn to update with player movement
        }
    }

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        if (fogEnabledMaps.has($gameMap.mapId())) {
            this.createFogOfWar();
        }
    };

    Scene_Map.prototype.createFogOfWar = function() {
        this._fogOfWarSprite = new FogOfWarSprite();
        this._spriteset.addChild(this._fogOfWarSprite);
    };

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        if (this.children.includes(this._fogOfWarSprite)) {
            this._fogOfWarSprite.update();
        }
    };

    PluginManager.registerCommand(pluginName, 'enableFog', args => {
        fogEnabledMaps.add($gameMap.mapId());
        if (SceneManager._scene instanceof Scene_Map) {
            if (!SceneManager._scene._fogOfWarSprite) {
                SceneManager._scene.createFogOfWar();
            }
        }
    });

    PluginManager.registerCommand(pluginName, 'disableFog', args => {
        fogEnabledMaps.delete($gameMap.mapId());
        if (SceneManager._scene instanceof Scene_Map) {
            if (SceneManager._scene._fogOfWarSprite) {
                SceneManager._scene._spriteset.removeChild(SceneManager._scene._fogOfWarSprite);
                SceneManager._scene._fogOfWarSprite = null;
            }
        }
    });

    PluginManager.registerCommand(pluginName, 'setFogRadius', args => {
        fogRadiusX = Number(args.radiusX) || fogRadiusX;
        fogRadiusY = Number(args.radiusY) || fogRadiusY;
    });

    PluginManager.registerCommand(pluginName, 'setFogShape', args => {
        fogShape = args.shape || fogShape;
    });
})();