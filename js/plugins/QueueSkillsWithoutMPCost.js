/*:
 * @target MZ
 * @plugindesc Allows all actors to queue skills without having enough MP, but cancels if MP is insufficient at cast time in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help QueueSkillsWithoutMPCost.js
 *
 * This plugin allows all actors to queue skills without initially having enough MP.
 * The skill will be canceled if the actor does not have enough MP at the time of casting.
 */

(() => {
    // Override to allow queuing the skill without immediate MP check during command selection
    const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
        // Return true during skill selection phase to bypass MP check
        if ($gameParty.inBattle()) {
            return true;
        }
        return _Game_BattlerBase_canPaySkillCost.call(this, skill);
    };

    // Override to perform MP check at the time of skill execution
    const _Game_Battler_useSkill = Game_Battler.prototype.useSkill;
    Game_Battler.prototype.useSkill = function(skill) {
        if (this.isActor()) {
            // Check MP at the time of casting
            if (!this.canPaySkillCost(skill)) {
                // Notify player that MP is insufficient
                $gameMessage.add(this.name() + " do not have enough Energy to cast " + skill.name + ".");
                return; // Prevent skill execution
            }
        }
        // Call original method if MP is sufficient
        _Game_Battler_useSkill.call(this, skill);
    };
})();
