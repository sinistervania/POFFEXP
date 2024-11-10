(() => {
    const armorIdWithProwler = 114; // ID of Prowler's Cloak armor
    const prowlerChance = 0.20; // 20% chance to trigger
    const commonEventId = 64; // ID of Combat Prowler's proc common event

    const _Game_Actor_onTurnEnd = Game_Actor.prototype.onTurnEnd;
    Game_Actor.prototype.onTurnEnd = function() {
        _Game_Actor_onTurnEnd.call(this);
        this.checkForProwlerCloak();
    };

    Game_Actor.prototype.checkForProwlerCloak = function() {
        if (this.isEquipped($dataArmors[armorIdWithProwler]) && Math.random() < prowlerChance) {
            $gameTemp.reserveCommonEvent(commonEventId);
        }
    };

    const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        _Game_Action_executeHpDamage.call(this, target, value);
        
        // Remove Prowler state if the actor does damage
        if (this.subject().isActor() && value > 0) {
            this.subject().removeState(77); // ID of Prowler state
        }
    };
})();
