/*:
 * @target MZ
 * @plugindesc Allows for custom grid sizes in RPG Maker MZ (e.g., 96x96).
 * @author YourName
 *
 * @param GridSize
 * @type number
 * @min 1
 * @desc Set the custom grid size (default: 48).
 * @default 96
 */

(() => {
    const params = PluginManager.parameters("CustomGridSize");
    const gridSize = Number(params["GridSize"] || 96);

    // Adjust Tile Size
    Object.defineProperty(Tilemap.prototype, "tileWidth", {
        get: function() {
            return gridSize;
        }
    });

    Object.defineProperty(Tilemap.prototype, "tileHeight", {
        get: function() {
            return gridSize;
        }
    });

    // Adjust event grid snapping
    Game_Map.prototype.roundXWithDirection = function(x, d) {
        const gridOffset = gridSize / 48;
        return Math.round((x + (d === 6 ? 1 : d === 4 ? -1 : 0)) * gridOffset) / gridOffset;
    };

    Game_Map.prototype.roundYWithDirection = function(y, d) {
        const gridOffset = gridSize / 48;
        return Math.round((y + (d === 2 ? 1 : d === 8 ? -1 : 0)) * gridOffset) / gridOffset;
    };
})();
