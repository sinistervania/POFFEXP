(() => {
    const leechStateId = 76; // Replace with your leech state ID
    const armorIdWithLeech = 119; // Replace with your armor's ID

    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        _Game_Actor_changeEquip.call(this, slotId, item);
        this.checkLeechArmor();
    };

    Game_Actor.prototype.checkLeechArmor = function() {
        if (this.hasArmor(armorIdWithLeech)) {
            this.addState(leechStateId);
        } else {
            this.removeState(leechStateId);
        }
    };

    Game_Actor.prototype.hasArmor = function(armorId) {
        return this.armors().some(armor => armor.id === armorId);
    };
})();
