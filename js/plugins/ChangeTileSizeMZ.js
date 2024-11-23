//=============================================================================
// ChangeTileSizeMZ_Debug.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adjusts map tile size to 96x96 pixels with debug tools for A1 animations.
 * @author ChatGPT
 *
 * @param Tile Size
 * @type number
 * @desc Custom size of tiles in pixels.
 * @default 96
 *
 * @param Tileset Image Folder
 * @type string
 * @desc Folder where the custom tilesets are located.
 * @default img/tilesets96x96/
 */

(() => {
  const pluginName = "ChangeTileSizeMZ_Debug";
  const parameters = PluginManager.parameters(pluginName);
  const tileSize = parseInt(parameters['Tile Size'] || 96);
  const tilesetsFolder = String(parameters['Tileset Image Folder'] || 'img/tilesets96x96/');
  const scaleFactor = tileSize / 48;

  // Override tile dimensions globally
  Game_Map.prototype.tileWidth = function() {
      return tileSize;
  };

  Game_Map.prototype.tileHeight = function() {
      return tileSize;
  };

  // Load tilesets from the custom folder
  ImageManager.loadTileset = function(filename) {
      if (!filename) {
          console.error("Tileset filename is missing or invalid.");
          return this.loadEmptyBitmap();
      }
      console.log(`Loading tileset: ${tilesetsFolder}${filename}`);
      return this.loadBitmap(tilesetsFolder, filename);
  };

  // Manual mapping of A1 water animations
  const autotileFrames = {
      2048: [
          { x: 0, y: 0 },       // Frame 1
          { x: 96, y: 0 },      // Frame 2
          { x: 192, y: 0 },     // Frame 3
      ],
      2049: [
          { x: 0, y: 96 },      // Frame 1
          { x: 96, y: 96 },     // Frame 2
          { x: 192, y: 96 },    // Frame 3
      ],
      2050: [
          { x: 0, y: 192 },     // Frame 1
          { x: 96, y: 192 },    // Frame 2
          { x: 192, y: 192 },   // Frame 3
      ],
      // Add more tiles as needed
  };

  // Debug placeholder to test rendering logic
  const renderPlaceholder = function(bitmap, dx, dy, color = 'red') {
      bitmap.fillRect(dx, dy, tileSize, tileSize, color);
  };

  // Autotile rendering logic
  Tilemap.prototype._drawAutotile = function(bitmap, tileId, dx, dy) {
      const size = tileSize; // Custom tile size (96x96)
      const autotileBitmap = this.bitmaps[5]; // A1 tileset is always set 5

      if (!autotileBitmap || !autotileBitmap.isReady()) {
          console.error(`Autotile bitmap missing or not loaded for tileId ${tileId}`);
          renderPlaceholder(bitmap, dx, dy, 'black'); // Render black placeholder for missing tileset
          return;
      }

      // Get the frame positions for the tileId
      const frames = autotileFrames[tileId];
      if (!frames) {
          console.error(`No animation frames defined for tileId ${tileId}`);
          renderPlaceholder(bitmap, dx, dy, 'blue'); // Render blue placeholder for undefined frames
          return;
      }

      // Determine the current animation frame
      const frameIndex = Math.floor(Graphics.frameCount / 20) % frames.length;
      const frame = frames[frameIndex];
      if (!frame) {
          console.error(`Frame ${frameIndex} not found for tileId ${tileId}`);
          renderPlaceholder(bitmap, dx, dy, 'yellow'); // Render yellow placeholder for missing frame
          return;
      }

      const sx = frame.x; // Source X position
      const sy = frame.y; // Source Y position

      // Log frame rendering details for debugging
      console.log(`Rendering autotile: tileId=${tileId}, frameIndex=${frameIndex}, sx=${sx}, sy=${sy}, dx=${dx}, dy=${dy}`);

      // Attempt to render the frame
      try {
          bitmap.blt(autotileBitmap, sx, sy, size, size, dx, dy, size, size);
      } catch (e) {
          console.error(`Failed to render autotile: tileId=${tileId}, Error: ${e.message}`);
          renderPlaceholder(bitmap, dx, dy, 'purple'); // Render purple placeholder for rendering errors
      }
  };

  // Adjust regular tile rendering
  Tilemap.prototype._drawTile = function(bitmap, tileId, dx, dy) {
      const setNumber = Tilemap.getTilesetType(tileId);
      const size = tileSize; // Custom tile size (96x96)
      const sx = (tileId % 8) * size; // Column
      const sy = Math.floor(tileId / 8) * size; // Row

      // Test with placeholder if bitmap missing
      if (!this.bitmaps[setNumber] || !this.bitmaps[setNumber].isReady()) {
          console.error(`Bitmap missing or not ready for setNumber ${setNumber}, tileId=${tileId}`);
          renderPlaceholder(bitmap, dx, dy, 'green');
          return;
      }

      // Render regular tile
      try {
          bitmap.blt(this.bitmaps[setNumber], sx, sy, size, size, dx, dy, size, size);
      } catch (e) {
          console.error(`Failed to render regular tile: tileId=${tileId}, Error: ${e.message}`);
          renderPlaceholder(bitmap, dx, dy, 'orange'); // Render orange placeholder for rendering errors
      }
  };

  console.log(`Tile size set to ${tileSize}x${tileSize}`);
})();
