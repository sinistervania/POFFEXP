/*:
 * @target MZ
 * @plugindesc Allows for camera zoom based on parameter settings and centers the camera on the player.
 * @author Bloodkin
 *
 * @param defaultZoom
 * @text Default Zoom Level
 * @type number
 * @decimals 2
 * @default 1.00
 * @desc Default zoom level for the game (1.00 = 100%, no zoom)
 *
 * @help This plugin allows you to set a default zoom level.
 */

(() => {
  const pluginName = "CameraZoom";
  const parameters = PluginManager.parameters(pluginName);
  const defaultZoom = Number(parameters["defaultZoom"] || 1.00);

  // Function to apply zoom and center camera on the player
  function applyZoomAndCenter() {
    // Ensure the current scene is Scene_Map and the spriteset and tilemap are available
    if (!(SceneManager._scene instanceof Scene_Map) || !SceneManager._scene._spriteset || !SceneManager._scene._spriteset._tilemap) {
      return;
    }
    
    const scale = defaultZoom;
    const tilemap = SceneManager._scene._spriteset._tilemap;
    tilemap.scale.x = scale;
    tilemap.scale.y = scale;
    
    // Update camera position to center on the player
    const screenWidth = Graphics.width / scale;
    const screenHeight = Graphics.height / scale;
    const centerX = $gamePlayer.screenX();
    const centerY = $gamePlayer.screenY();
    const mapWidth = $gameMap.width() * $gameMap.tileWidth();
    const mapHeight = $gameMap.height() * $gameMap.tileHeight();

    let offsetX = centerX - screenWidth / 2;
    let offsetY = centerY - screenHeight / 2;

    // Clamp the camera position to the map bounds
    offsetX = Math.min(Math.max(0, offsetX), mapWidth - screenWidth);
    offsetY = Math.min(Math.max(0, offsetY), mapHeight - screenHeight);

    tilemap.x = -offsetX * scale;
    tilemap.y = -offsetY * scale;
  }

  // Extend Scene_Map to apply zoom and center camera after it starts
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    applyZoomAndCenter();
  };

  // Extend Scene_Map update function to continuously adjust camera
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    applyZoomAndCenter();
  };

  // Extend Game_Player.performTransfer to apply zoom after map transfers
  const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
  Game_Player.prototype.performTransfer = function() {
    _Game_Player_performTransfer.call(this);
    if (this.isTransferring()) {
        applyZoomAndCenter();
    }
  };
})();
