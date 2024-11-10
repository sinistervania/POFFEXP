//=============================================================================
// Custom Skill Selection
// Version: 1.5.0
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Allows selection of skills regardless of MP, but cancels action if MP is insufficient, skill is sealed, or has the occasion set to "Never".
 * @author Your Name
 *
 * @help CustomSkillSelection.js
 *
 * This plugin allows selection of skills regardless of the actor's current MP.
 * However, if an actor does not have enough MP to use the selected skill, if
 * the skill is sealed, or if the skill has the occasion set to "Never", the
 * action will be automatically canceled right before execution.
 *
 * This plugin doesn't provide any plugin commands.
 *
 * Compatibility:
 * - This plugin should be compatible with most plugins.
 *
 * Terms of Use:
 * - This plugin is free for commercial and non-commercial use.
 * - You may edit this plugin for your own use, but you may not claim ownership
 *   over the modified version.
 * - If you share the modified version, you must provide credit to the original
 *   author(s).
 *
 * @param Enabled
 * @text Plugin Enabled
 * @type boolean
 * @desc Enable or disable the plugin. Set to true to enable.
 * @default true
 */

(() => {
    const pluginName = 'CustomSkillSelection';
    const parameters = PluginManager.parameters(pluginName);
    const pluginEnabled = JSON.parse(parameters['Enabled']);

    // Override the executeHandler method to check MP, sealed skills, and occasion before executing
    const _Scene_Battle_executeHandler = Scene_Battle.prototype.executeHandler;
    Scene_Battle.prototype.executeHandler = function() {
        const action = BattleManager.inputtingAction();
        if (action && action.isSkill()) {
            const skill = action.item();
            const actor = action.subject();
            if (actor && actor.canUse(skill) && !actor.isSkillSealed(skill.id) && skill.occasion !== 1) {
                _Scene_Battle_executeHandler.call(this);
            } else {
                this._skillWindow.activate();
                this._skillWindow.refresh();
            }
        } else {
            _Scene_Battle_executeHandler.call(this);
        }
    };

    // Override isEnabled method to remove MP restriction
    Window_BattleSkill.prototype.isEnabled = function(item) {
        if (!pluginEnabled) return false;
        return true;
    };

    // Override includes method to exclude skills with the occasion set to "Never"
    Window_BattleSkill.prototype.includes = function(item) {
        if (!item) return false;
        return item.occasion !== 1;
    };

    // Override canUseItem to consider sealed skills
    Game_BattlerBase.prototype.canUseItem = function(item) {
        if (!this.canUseSkill(item)) {
            return false;
        }
        if (DataManager.isSkill(item)) {
            return !this.isSkillSealed(item.id);
        }
        return true;
    };
})();
