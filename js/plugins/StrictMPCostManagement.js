/*:
 * @target MZ
 * @plugindesc Ensures that skills cannot be cast without sufficient MP, preventing MP from going negative in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help StrictMPCostManagement.js
 *
 * This plugin prevents skills from being executed if there's insufficient MP at the time of casting.
 */

(() => {
    // Override the method responsible for consuming MP
    const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
    Game_BattlerBase.prototype.paySkillCost = function(skill) {
        // Check if the battler has enough MP to pay the cost
        if (this._mp >= this.skillMpCost(skill)) {
            // If enough MP, call original method to deduct MP
            _Game_BattlerBase_paySkillCost.call(this, skill);
        } else {
            // If not enough MP, notify player (optional) and prevent MP deduction
            if (this.isActor()) {
                $gameMessage.add(this.name() + " does not have enough MP to cast " + skill.name + ".");
            }
            // Optionally, you can handle other side effects here
        }
    };

    // Optional: Prevent skill execution if not enough MP
    const _Game_Battler_useSkill = Game_Battler.prototype.useSkill;
    Game_Battler.prototype.useSkill = function(skill) {
        if (this.isActor() && this._mp < this.skillMpCost(skill)) {
            // Prevent skill execution and notify player
            $gameMessage.add(this.name() + " does not have enough MP to cast " + skill.name + ".");
            return;
        }
        _Game_Battler_useSkill.call(this, skill);
    };
})();
