/*:
 * @target MZ
 * @plugindesc Grants or removes specific states when the player selects certain skills in combat. Reverts changes on cancellation. Supports transformations and multiple actions.
 * @author Bloodkin
 * 
 * @param SkillStateMapping
 * @text Skill to State Mapping
 * @type struct<SkillState>[]
 * @desc Define which skills grant or remove specific states.
 * 
 * @help
 * QueWeaponSwapAbilities
 * ============================================================================
 * Instructions:
 * ============================================================================
 * Use the plugin parameter to set which skills apply or remove which states.
 * When the player selects a skill during battle, the corresponding state(s)
 * will be added or removed from the actor.
 * If the selection is canceled, the state changes will be reverted.
 * 
 * This plugin supports transformation skills that alter available skills and
 * multiple actions per turn.
 */

/*~struct~SkillState:
 * @param skillId
 * @text Skill ID
 * @type number
 * @desc The ID of the skill that will grant or remove a state.
 * 
 * @param addStateId
 * @text State ID to Add
 * @type number
 * @desc The ID of the state to be applied when the skill is selected.
 * 
 * @param removeStateId
 * @text State ID to Remove
 * @type number
 * @desc The ID of the state to be removed when the skill is selected.
 */

(() => {
    const parameters = PluginManager.parameters('QueWeaponSwapAbilities');
    const skillStateMapping = JSON.parse(parameters['SkillStateMapping']).map(data => JSON.parse(data));
    
    let _actionStateChanges = {}; // To track state changes per action
    
    const _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        const action = BattleManager.inputtingAction();
        if (!action || !action.item()) {
            // If there's no action or item, skip processing to avoid errors.
            return _Scene_Battle_onSkillOk.call(this);
        }
        
        const skill = $dataSkills[action.item().id];  // Get the skill from the action
        const actor = BattleManager.actor();

        if (skill && actor) {
            // Initialize tracking for this action
            if (!_actionStateChanges[actor.actorId()]) {
                _actionStateChanges[actor.actorId()] = {};
            }
            _actionStateChanges[actor.actorId()][skill.id] = {
                added: [],
                removed: []
            };

            // Check if the skill matches any in the mapping
            skillStateMapping.forEach(mapping => {
                if (Number(mapping.skillId) === skill.id) {
                    // Apply the corresponding state
                    if (mapping.addStateId && !actor.isStateAffected(Number(mapping.addStateId))) {
                        actor.addState(Number(mapping.addStateId));
                        _actionStateChanges[actor.actorId()][skill.id].added.push(Number(mapping.addStateId));  // Track added state
                    }
                    // Remove the corresponding state
                    if (mapping.removeStateId && actor.isStateAffected(Number(mapping.removeStateId))) {
                        actor.removeState(Number(mapping.removeStateId));
                        _actionStateChanges[actor.actorId()][skill.id].removed.push(Number(mapping.removeStateId));  // Track removed state
                    }
                }
            });

            // Refresh the actor's command window to reflect new available skills
            this._actorCommandWindow.refresh();
            // Force re-selection of the skill window to show updated skills
            this._actorCommandWindow.activate();
            this._skillWindow.show();
            this._skillWindow.activate();
        }

        _Scene_Battle_onSkillOk.call(this);
    };

    const _Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function() {
        const actor = BattleManager.actor();
        const action = BattleManager.inputtingAction();
        if (!action || !action.item()) {
            // If there's no action or item, skip processing
            return _Scene_Battle_onSkillCancel.call(this);
        }
        
        const skill = $dataSkills[action.item().id];  // Get the skill from the action

        if (skill && actor && _actionStateChanges[actor.actorId()] && _actionStateChanges[actor.actorId()][skill.id]) {
            const changes = _actionStateChanges[actor.actorId()][skill.id];

            // Revert added states
            changes.added.forEach(stateId => {
                if (actor.isStateAffected(stateId)) {
                    actor.removeState(stateId);
                }
            });

            // Revert removed states
            changes.removed.forEach(stateId => {
                if (!actor.isStateAffected(stateId)) {
                    actor.addState(stateId);
                }
            });

            // Clear the tracked changes for this skill
            delete _actionStateChanges[actor.actorId()][skill.id];
        }

        _Scene_Battle_onSkillCancel.call(this);
    };
})();
