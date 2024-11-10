/*:
 * @target MZ
 * @plugindesc Randomize Room Assignments for Doors in Specific Groups
 * @author Bloodkin

 * @param roomGroup1
 * @text Room Group 1
 * @desc List of common event IDs for Room Group 1, separated by commas.
 * @type number[]
 * @default []

 * @command assignRooms
 * @text Assign Rooms
 * @desc Assigns rooms to doors based on the specified room group.
 * @arg roomGroupNumber
 * @type number
 * @default 1
 */

(() => {
    const pluginName = 'RoomGroupRandomizer';

    PluginManager.registerCommand(pluginName, 'assignRooms', args => {
        const roomGroupNumber = args.roomGroupNumber;
        const paramKey = `roomGroup${roomGroupNumber}`;
        const roomGroup = JSON.parse(PluginManager.parameters(pluginName)[paramKey] || "[]");
        shuffleArray(roomGroup);
        $gameVariables.setValue(roomGroupNumber, roomGroup);
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
})();
