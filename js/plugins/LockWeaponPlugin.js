(function() {
    const lockedWeaponId = 50; // Replace 50 with the ID of the weapon you want to lock

    // Override the method that checks if an item can be unequipped
    Game_Actor.prototype.isEquipChangeOk = function(slotId) {
        const item = this.equips()[slotId];
        // Check if the item in the slot is the locked weapon
        if (item && item.id === lockedWeaponId && item.etypeId === 50) { // 50 is typically the ID for the weapon slot
            return false; // Prevent unequipping
        }
        return Game_BattlerBase.prototype.isEquipChangeOk.call(this, slotId);
    };
})();
