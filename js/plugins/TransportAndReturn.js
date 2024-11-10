/*:
 * @target MZ
 * @plugindesc Provides a plugin command to transport the player to another map and then back to the current map to reset events.
 * @author Bloodkin
 * 
 * @command transportAndReturn
 * @text Transport and Return
 * @desc Transport the player to another map and then back to the current map.
 * 
 * @arg tempMapId
 * @type number
 * @text Temporary Map ID
 * @desc The ID of the map to transport the player temporarily.
 */

(() => {
    const pluginName = 'TransportAndReturn';

    PluginManager.registerCommand(pluginName, 'transportAndReturn', args => {
        const tempMapId = Number(args.tempMapId);
        const currentMapId = $gameMap.mapId();
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        const direction = $gamePlayer.direction();
        
        // Transport to temporary map
        $gamePlayer.reserveTransfer(tempMapId, 0, 0, direction, 0);
        
        // Wait until the transfer is complete
        setTimeout(() => {
            // Transport back to the original map
            $gamePlayer.reserveTransfer(currentMapId, x, y, direction, 0);
        }, 1000); // Adjust the delay as necessary
    });
})();
