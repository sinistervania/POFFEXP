//=============================================================================
// EquipSlotTags.js
//=============================================================================

/*:
* @plugindesc Allows specifying equipment slot types via note tags on armor items.
* @author Bloodkin
*
* @help
* Use <SlotTags: SlotType1, SlotType2, ...> in an armor item's note field
* to specify which equipment slots it can be equipped to.
*
* Example:
* <SlotTags: Weapon, Shield>
*
* This will allow the armor item to be equipped in the "Weapon" and "Shield" slots.
*
*/

(function() {

    var alias_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;

Game_Actor.prototype.changeEquip = function(slotId, item) {
    if (item && item.meta.SlotTags) {
        var slotTypes = item.meta.SlotTags.split(',').map(function(tag) {
            return tag.trim();
        });
        if (slotTypes.includes($dataSystem.equipTypes[slotId])) {
            alias_Game_Actor_changeEquip.call(this, slotId, item);
        } else {
            // Display a message or handle the case where the equipment doesn't match the allowed slot types.
        }
    } else {
        alias_Game_Actor_changeEquip.call(this, slotId, item);
    }
};

    
})();
