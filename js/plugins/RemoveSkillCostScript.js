/*:
 * @target MZ
 * @plugindesc Removes MP/TP cost restrictions while maintaining seal checks
 * @author Claude
 * @help 
 * This plugin allows skills to be selected without enough MP/TP,
 * but maintains all other restrictions (seals, states, etc.)
 * and still applies the costs when skills are actually used.
 */

(function() {
    // Store the original isEnabled method
    const _Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
    
    // Override the isEnabled method for skill selection
    Window_SkillList.prototype.isEnabled = function(item) {
        if (item) {
            return this._actor && this.canSelectSkill(item);
        }
        return false;
    };
    
    // New helper method to check skill selection conditions
    Window_SkillList.prototype.canSelectSkill = function(item) {
        if (!this._actor || !item) return false;
        
        return (
            DataManager.isSkill(item) && 
            !this._actor.isSkillTypeSealed(item.stypeId) &&
            !this._actor.isSkillSealed(item.id) &&
            this._actor.isAlive()
        );
    };
    
    // Store the original meetsSkillConditions method
    const _Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
    
    // Override meetsSkillConditions to ignore costs but keep other restrictions
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        if (SceneManager._scene instanceof Scene_Skill) {
            // In skill menu, check everything except MP/TP
            return (
                this.isAlive() &&
                !this.isSkillTypeSealed(skill.stypeId) &&
                !this.isSkillSealed(skill.id)
            );
        }
        // Use original method for actual skill execution
        return _Game_BattlerBase_meetsSkillConditions.call(this, skill);
    };
})();