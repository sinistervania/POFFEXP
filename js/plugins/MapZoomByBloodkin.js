/*:
 * @target MZ
 * @plugindesc Allows setting specific zoom levels for selected maps.
 * @author Bloodkin
 *
 * @param Zoom Settings
 * @text Zoom Settings
 * @type struct<ZoomSetting>[]
 * @desc Set the zoom levels for specific maps.
 *
 * @help
 * This plugin allows you to set specific zoom levels for certain maps.
 * Set the map ID and the desired zoom level in the plugin parameters.
 */

/*~struct~ZoomSetting:
 *
 * @param Map ID
 * @text Map ID
 * @type number
 * @desc The ID of the map to zoom.
 *
 * @param Zoom Scale
 * @text Zoom Scale
 * @type number
 * @decimals 2
 * @desc The scale of the zoom. Less than 1 to zoom out, more than 1 to zoom in.
 */

(() => {
    const pluginName = "MapZoomByBloodkin";
    const parameters = PluginManager.parameters(pluginName);
    const zoomSettings = JSON.parse(parameters['Zoom Settings']).map(setting => JSON.parse(setting));

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this.applyZoom();
    };

    Scene_Map.prototype.applyZoom = function() {
        const mapId = $gameMap.mapId();
        const setting = zoomSettings.find(z => parseInt(z['Map ID']) === mapId);
        if (setting) {
            const zoomScale = parseFloat(setting['Zoom Scale']);
            this.setZoom(zoomScale);
        }
    };

    Scene_Map.prototype.setZoom = function(zoomScale) {
        const spriteset = this._spriteset;
        if (spriteset) {
            spriteset.scale.x = zoomScale;
            spriteset.scale.y = zoomScale;
            spriteset.x = Graphics.width / 2 * (1 - zoomScale);
            spriteset.y = Graphics.height / 2 * (1 - zoomScale);
            
            // Adjust map position to keep the player centered
            const player = this._spriteset.findChildByName('PlayerCharacter');
            if (player) {
                const centerX = (Graphics.width / 2) / zoomScale;
                const centerY = (Graphics.height / 2) / zoomScale;
                this._spriteset.x = Graphics.width / 2 - player.x * zoomScale + centerX;
                this._spriteset.y = Graphics.height / 2 - player.y * zoomScale + centerY;
            }
        }
    };
    
})();
