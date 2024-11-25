(() => {
    // Debug logging
    const debug = true;
    function log(...args) {
        if (debug) console.log('[BloodkinPhantom]', ...args);
    }

    // Store the original functions
    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    const _Window_BattleSkill_processOk = Window_BattleSkill.prototype.processOk;
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

    // New hook into skill selection
    Window_BattleSkill.prototype.processOk = function() {
        const skill = this.item();
        const actor = BattleManager.actor();
        
        log('Skill selected:', skill ? skill.id : 'none');
        
        if (actor === $gameParty.members()[0] && skill) {
            const transformation = transformations.find(t => t.skillId === skill.id);
            if (transformation) {
                log('Found transformation for skill:', skill.id);
                
                // Remove existing states
                ALL_STATES.forEach(stateId => {
                    if (actor.isStateAffected(stateId)) {
                        log(`Removing state ${stateId}`);
                        actor.removeState(stateId);
                    }
                });
                
                // Apply new states
                transformation.stateIds.forEach(stateId => {
                    log(`Adding state ${stateId}`);
                    actor.addState(stateId);
                });
                
                // Update history
                if (!actor._transformationHistory) {
                    actor._transformationHistory = [];
                }
                actor._transformationHistory.push(transformation);
                actor._currentActionIndex = (actor._currentActionIndex || 0) + 1;
                
                log('States after transformation:', 
                    ALL_STATES.filter(id => actor.isStateAffected(id)));
            }
        }
        
        _Window_BattleSkill_processOk.call(this);
    };

    function checkBaseStates(actor) {
        if (isProcessingBaseStates || !actor) return;
        
        isProcessingBaseStates = true;
        log('Checking base states');
        
        const hasWeaponState = WEAPON_STATES.some(stateId => actor.isStateAffected(stateId));
        if (!hasWeaponState) {
            Object.entries(BASE_STATE_MAPPING).forEach(([baseStateId, pairedStateId]) => {
                baseStateId = Number(baseStateId);
                if (actor.isStateAffected(baseStateId)) {
                    if (!actor.isStateAffected(pairedStateId)) {
                        log(`Adding paired state ${pairedStateId} for base state ${baseStateId}`);
                        actor.addState(pairedStateId);
                    }
                } else if (actor.isStateAffected(pairedStateId)) {
                    log(`Removing paired state ${pairedStateId}`);
                    actor.removeState(pairedStateId);
                }
            });
        }
        
        isProcessingBaseStates = false;
    }

    // Handle cancellation
    function handleCancel() {
        const actor = $gameParty.members()[0];
        if (actor && actor._transformationHistory && actor._transformationHistory.length > 0) {
            log('Processing cancel');
            
            const lastTransformation = actor._transformationHistory.pop();
            if (lastTransformation) {
                lastTransformation.stateIds.forEach(stateId => {
                    actor.removeState(stateId);
                });
            }

            const previousTransformation = actor._transformationHistory[actor._transformationHistory.length - 1];
            if (previousTransformation) {
                previousTransformation.stateIds.forEach(stateId => {
                    actor.addState(stateId);
                });
            }
            
            actor._currentActionIndex = Math.max(0, (actor._currentActionIndex || 1) - 1);
            checkBaseStates(actor);
        }
    }

    // Turn start handling
    BattleManager.startTurn = function() {
        const actor = $gameParty.members()[0];
        if (actor) {
            log('Start turn - clearing weapon states');
            WEAPON_STATES.forEach(stateId => {
                if (actor.isStateAffected(stateId)) {
                    actor.removeState(stateId);
                }
            });
            actor._transformationHistory = [];
            actor._currentActionIndex = 0;
            checkBaseStates(actor);
        }
        _BattleManager_startTurn.call(this);
    };

    // Cancel handlers
    Window_ActorCommand.prototype.processCancel = function() {
        handleCancel();
        _Window_ActorCommand_processCancel.call(this);
    };

    // Battle start initialization
    BattleManager.startInput = function() {
        const actor = $gameParty.members()[0];
        if (actor) {
            if (!actor._transformationHistory) {
                actor._transformationHistory = [];
            }
            actor._currentActionIndex = 0;
            checkBaseStates(actor);
        }
        return _BattleManager_startInput.call(this);
    };

    // State change hooks
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