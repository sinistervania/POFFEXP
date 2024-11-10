const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    _Game_Action_executeHpDamage.call(this, target, value);
    
    // Check if the attacker has the leech effect
    if (this.subject().isActor()) {
        const leechStateId = 76; // Your Leech state ID
        if (this.subject().isStateAffected(leechStateId)) {
            const healAmount = value * 0.50; // 50% of the damage dealt
            this.subject().gainHp(healAmount);
            this.subject().startDamagePopup();
        }
    }
};
