(() => {
    // Store the original functions
    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    const _Window_BattleSkill_processCancel = Window_BattleSkill.prototype.processCancel;
    const _Window_ActorCommand_processCancel = Window_ActorCommand.prototype.processCancel;
    const _BattleManager_startInput = BattleManager.startInput;
    const _BattleManager_startTurn = BattleManager.startTurn;
    
    // Weapon state IDs that need to be managed
    const WEAPON_STATES = [764, 765, 766, 767, 768, 769];
    const PAIRED_STATES = [772, 773, 774, 775, 776, 777];
    const ALL_STATES = [...WEAPON_STATES, ...PAIRED_STATES];

    // Base state to paired state mapping
    const BASE_STATE_MAPPING = {
        34: 776,  // Spear
        35: 775,  // Arming
        74: 777,  // Rapier
        78: 773,  // Gauntlets
        187: 774, // Daggers
        188: 772  // Greatsword
    };

    let isProcessingBaseStates = false;

    // Transformation configurations
    const transformations = [
        {
            skillId: 485, //Greatsword
            stateIds: [764, 772],
            removeStateIds: [765, 766, 767, 768, 769, 773, 774, 775, 776, 777]
        },
        {
            skillId: 312, //Gauntlets
            stateIds: [765, 773],
            removeStateIds: [764, 766, 767, 768, 769, 772, 774, 775, 776, 777]
        },
        {
            skillId: 484, //Daggers
            stateIds: [766, 774],
            removeStateIds: [764, 765, 767, 768, 769, 772, 773, 775, 776, 777]
        },
        {
            skillId: 249, //Arming Blade
            stateIds: [767, 775],
            removeStateIds: [764, 765, 766, 768, 769, 772, 773, 774, 776, 777]
        },
        {
            skillId: 248, //Spear
            stateIds: [768, 776],
            removeStateIds: [764, 765, 766, 767, 769, 772, 773, 774, 775, 777]
        },
        {
            skillId: 309, //Rapier
            stateIds: [769, 777],
            removeStateIds: [764, 765, 766, 767, 768, 772, 773, 774, 775, 776]
        }
    ];

    // Add turn start hook to remove weapon states
    BattleManager.startTurn = function() {
        const actor = $gameParty.members()[0];
        if (actor) {
            // Remove all weapon states at start of turn
            WEAPON_STATES.forEach(stateId => {
                if (actor.isStateAffected(stateId)) {
                    actor.removeState(stateId);
                }
            });
            // Reset transformation history as well
            actor._transformationHistory = [];
            actor._currentActionIndex = 0;
            // Check base states after removing weapon states
            checkBaseStates(actor);
        }
        _BattleManager_startTurn.call(this);
    };

    // Check and apply base state mappings
    function checkBaseStates(actor) {
        if (isProcessingBaseStates || !actor) return;
        
        isProcessingBaseStates = true;
        
        // Only proceed if no weapon states are active
        const hasWeaponState = WEAPON_STATES.some(stateId => actor.isStateAffected(stateId));
        if (!hasWeaponState) {
            // Check each base state and apply corresponding paired state
            for (const [baseStateId, pairedStateId] of Object.entries(BASE_STATE_MAPPING)) {
                if (actor.isStateAffected(Number(baseStateId))) {
                    if (!actor.isStateAffected(pairedStateId)) {
                        actor.addState(pairedStateId);
                    }
                } else if (actor.isStateAffected(pairedStateId)) {
                    actor.removeState(pairedStateId);
                }
            }
        }
        
        isProcessingBaseStates = false;
    }

    // Initialize on battle start
    BattleManager.startInput = function() {
        const actor = $gameParty.members()[0];
        if (actor) {
            actor._transformationHistory = [];
            actor._currentActionIndex = 0;
            checkBaseStates(actor);
        }
        return _BattleManager_startInput.call(this);
    };

    // Handler for any cancellation
    function handleCancel() {
        const actor = $gameParty.members()[0];
        if (actor && actor._transformationHistory.length > 0) {
            // Remove the last transformation's states
            const lastTransformation = actor._transformationHistory.pop();
            if (lastTransformation) {
                lastTransformation.stateIds.forEach(stateId => {
                    actor.removeState(stateId);
                });
            }

            // Reapply the previous transformation if it exists
            const previousTransformation = actor._transformationHistory[actor._transformationHistory.length - 1];
            if (previousTransformation) {
                previousTransformation.stateIds.forEach(stateId => {
                    actor.addState(stateId);
                });
            }
            
            actor._currentActionIndex--;
            checkBaseStates(actor);
        }
    }

    // Hook into cancel handlers where necessary

    Window_ActorCommand.prototype.processCancel = function() {
        handleCancel();
        _Window_ActorCommand_processCancel.call(this);
    };

    // Apply transformation when action is confirmed
    Scene_Battle.prototype.onActorOk = function() {
        const actor = BattleManager.actor();
        if (actor === $gameParty.members()[0]) {
            const skillWindow = SceneManager._scene._skillWindow;
            if (skillWindow && skillWindow.item()) {
                const skill = skillWindow.item();
                const skillId = skill.id;
                const transformation = transformations.find(t => t.skillId === skillId);
                if (transformation) {
                    // First, remove all transformation states
                    ALL_STATES.forEach(stateId => {
                        if (actor.isStateAffected(stateId)) {
                            actor.removeState(stateId);
                        }
                    });
                    
                    // Then apply the new transformation states
                    transformation.stateIds.forEach(stateId => {
                        actor.addState(stateId);
                    });
                    
                    // Store the transformation in history
                    actor._transformationHistory.push(transformation);
                    actor._currentActionIndex++;
                }
            }
        }
        
        _Scene_Battle_onActorOk.call(this);
    };

    // Add a check for base states after state changes
    const _Game_Battler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        _Game_Battler_addState.call(this, stateId);
        if (this === $gameParty.members()[0]) {
            checkBaseStates(this);
        }
    };

    const _Game_Battler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function(stateId) {
        _Game_Battler_removeState.call(this, stateId);
        if (this === $gameParty.members()[0]) {
            checkBaseStates(this);
        }
    };

})();