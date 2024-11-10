/*:
 * @target MZ
 * @plugindesc Displays the description of the attack skill in the message window when used in RPG Maker MZ.
 * @author Bloodkin
 *
 * @help DisplaySkillDescription.js
 *
 * This plugin displays the description of each skill in the message window when it is used in battle.
 */

(() => {
    // Override the useSkill function to display skill descriptions
    const _Game_Battler_useSkill = Game_Battler.prototype.useSkill;
    Game_Battler.prototype.useSkill = function(skill) {
        // Call the original method
        _Game_Battler_useSkill.call(this, skill);
        
        // Check if this is an actor and the game is in battle
        if (this.isActor() && $gameParty.inBattle()) {
            let skillDescription = skill.description; // Get the skill description
            if (skillDescription) {
                // Add the skill description to the message window
                $gameMessage.add(this.name() + " uses " + skill.name + ": " + skillDescription);
            }
        }
    };
})();
