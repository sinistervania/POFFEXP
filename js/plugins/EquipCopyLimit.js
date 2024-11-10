//=============================================================================
// Equip Copy Limit Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows armor pieces to belong to multiple ETypes and sets a maximum copy limit for equipment.
 *
 * @param Equip Copy Limit Notetag
 * @desc The notetag used to set the copy limit for an equipment item.
 * @default <Equip Copy Limit: 1>
 *
 * @param Added EType Notetag
 * @desc The notetag used to specify additional ETypes for armor.
 * @default <Added EType: 1>
 *
 * @help
 * This plugin allows armor pieces to belong to multiple ETypes and sets a maximum copy limit for equipment.
 * To use, add the following notetags to your armor items:
 *
 * Armor Notetags:
 *   <Added EType: x>
 *   <Added ETypes: x, x, x>
 *   Used to specify additional ETypes for an armor piece.
 *
 *   <Equip Copy Limit: x>
 *   Sets the maximum number of copies that an actor can wear of this equipment.
 *   This can be bypassed using Event Commands and/or Script Calls.
 *
 * Usage Example:
 *   Actors can only equip one copy of the "One-of-a-Kind Ring" at any time despite having empty accessory slots
 *   because the ring has a <Equip Copy Limit: 1> notetag.
 *
 * This plugin does not work with weapons.
 */

(function() {
    var parameters = PluginManager.parameters('EquipCopyLimit');
    var equipCopyLimitNotetag = String(parameters['Equip Copy Limit Notetag']);
    var addedETypeNotetag = String(parameters['Added EType Notetag']);

    // Function to parse notetags and apply the effects
function parseNotetags(item) {
    var notetags = item.note.split(/[\r\n]+/);
    item.addedETypes = [];
    item.copyLimit = 1; // Default copy limit

    for (var i = 0; i < notetags.length; i++) {
        var line = notetags[i];
        if (line.match(/<Equip Copy Limit:\s*(\d+)>/i)) {
            item.copyLimit = parseInt(RegExp.$1);
        } else if (line.match(/<Added ETypes?:\s*(\d+(?:,\s*\d+)*)>/i)) {
            var typeIds = RegExp.$1.split(',').map(Number);
            item.addedETypes = item.addedETypes.concat(typeIds);
        }
    }
}

    // Override the function that checks if an actor can equip an item
Game_Actor.prototype.canEquip = function(item) {
    if (!item) {
        return false;
    }
    if (!this.isEquipTypeValid(item)) {
        return false;
    }
    
    var equippedCount = this.equips().reduce(function(acc, equip) {
        return acc + (equip && equip.id === item.id ? 1 : 0);
    }, 0);
    
    return equippedCount < item.copyLimit;
};

// Add a new method to check if an item's ETypes are valid for equip
Game_Actor.prototype.isEquipTypeValid = function(item) {
    var validTypes = [item.etypeId].concat(item.addedETypes || []);
    for (var i = 0; i < validTypes.length; i++) {
        if (!this.isEquipTypeLocked(validTypes[i]) && !this.isEquipTypeSealed(validTypes[i])) {
            return true;
        }
    }
    return false;
};

    // Parse notetags for all armor items when the game starts
    var _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.call(this);
        $dataArmors.forEach(function(armor) {
            if (armor) {
                parseNotetags(armor);
            }
        });
    };
})();
