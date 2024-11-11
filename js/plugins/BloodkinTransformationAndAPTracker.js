/*:
 * @target MZ
 * @plugindesc Manages action points and transformation states in battle for Bloodkin, with state-specific AP tracking and multi-state support.
 * @author Claude
 */

(() => {
    const pluginName = 'BloodkinTransformationAndAPTracker';
    
    // Hardcoded variable IDs
    const actor1VariableId = 592;
    const actor2VariableId = 593;
    const actor3VariableId = 593;
    const actor4VariableId = 593;
    const actor5VariableId = 593;
    const actor6VariableId = 593;

    let lastActor1Value = null;

    // Action point tracking
    let deductionCounts = {};
    let actionProcessed = new Set();
    let apStateMapping = new Map(); // Maps actorId -> [{apIndex: number, states: number[], transformationId: number}]

    // Transformation configurations with multi-state support
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

    const STATES_TO_REMOVE = [764, 765, 766, 767, 768, 769];

    // Transformation state tracking
    const queuedTransformations = new Map();
    const initialStatesTracker = new Map();
    let stateRestorationQueued = false;

    const getActionPointsVariableId = function(actorId) {
        switch (actorId) {
            case 1: return actor1VariableId;
            case 2: return actor2VariableId;
            case 3: return actor3VariableId;
            case 4: return actor4VariableId;
            case 5: return actor5VariableId;
            case 6: return actor6VariableId;
            default: return 0;
        }
    };

    const deductPoints = function(actorId, isTransformation = false, stateData = null) {
        const actionPointsVariableId = getActionPointsVariableId(actorId);
        if (actionPointsVariableId > 0) {
            const actionPoints = $gameVariables.value(actionPointsVariableId);
            if (actionPoints > 0) {
                $gameVariables.setValue(actionPointsVariableId, actionPoints - 1);
                if (!deductionCounts[actorId]) {
                    deductionCounts[actorId] = 1;
                } else {
                    deductionCounts[actorId]++;
                }

                // If this is a transformation, store the exact states and transformation data
                if (isTransformation && stateData) {
                    if (!apStateMapping.has(actorId)) {
                        apStateMapping.set(actorId, []);
                    }
                    apStateMapping.get(actorId).push({
                        apIndex: deductionCounts[actorId],
                        states: stateData.stateIds,
                        transformationId: stateData.transformationId
                    });
                }
            }
        }
    };

    const removeTransformationStatesForActor1 = function() {
        const actor = $gameActors.actor(1);
        if (actor) {
            STATES_TO_REMOVE.forEach(stateId => {
                if (actor.isStateAffected(stateId)) {
                    actor.removeState(stateId);
                }
            });
            actor.refresh();
        }
    };

    const refundPoints = function(actorId) {
        const actionPointsVariableId = getActionPointsVariableId(actorId);
        if (actionPointsVariableId > 0 && deductionCounts[actorId] > 0) {
            const actionPoints = $gameVariables.value(actionPointsVariableId);
            const maxPoints = $gameVariables.value(343);
            if (actionPoints < maxPoints) {
                const currentDeductionIndex = deductionCounts[actorId];
                
                // Find the exact states associated with this AP point
                const stateMapping = apStateMapping.get(actorId);
                if (stateMapping) {
                    const mappingIndex = stateMapping.findIndex(
                        mapping => mapping.apIndex === currentDeductionIndex
                    );
                    
                    if (mappingIndex !== -1) {
                        const actor = $gameActors.actor(actorId);
                        if (actor) {
                            const stateData = stateMapping[mappingIndex];
                            
                            // Remove states associated with this AP
                            stateData.states.forEach(stateId => {
                                actor.removeState(stateId);
                            });

                            // Also remove any other transformation states that might be lingering
                            if (actor.isStateAffected(764) || 
                                actor.isStateAffected(765) || 
                                actor.isStateAffected(766) || 
                                actor.isStateAffected(767) || 
                                actor.isStateAffected(768) || 
                                actor.isStateAffected(769)) {
                                
                                STATES_TO_REMOVE.forEach(stateId => {
                                    if (actor.isStateAffected(stateId)) {
                                        actor.removeState(stateId);
                                    }
                                });
                            }
                            
                            actor.refresh();
                            actor.assignweaponTransformationId();
                        }
                        // Remove this mapping since the AP was refunded
                        stateMapping.splice(mappingIndex, 1);
                    }
                }

                $gameVariables.setValue(actionPointsVariableId, Math.min(actionPoints + 1, maxPoints));
                deductionCounts[actorId]--;
            }
        }
    };

    function isTransformationSkill(skillId) {
        return transformations.some(config => config.skillId === skillId);
    }

    function getTransformationConfig(skillId) {
        return transformations.find(c => c.skillId === skillId);
    }

    function restoreInitialStates(battler) {
        if (!battler || !battler.isActor()) return;

        const initialStates = initialStatesTracker.get(battler.actorId());
        if (initialStates) {
            [78, 188].forEach(stateId => {
                if (battler.isStateAffected(stateId)) {
                    battler.removeState(stateId);
                }
            });
            
            initialStates.forEach(stateId => {
                if (!battler._states.includes(stateId)) {
                    battler.addState(stateId);
                }
            });
            
            battler.refresh();
            initialStatesTracker.delete(battler.actorId());
            queuedTransformations.delete(battler.actorId());
            stateRestorationQueued = false;
        }
    }
    const _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        const actor = BattleManager.actor();
        const skill = this._skillWindow.item();
        
        if (actor && skill) {
            const actionKey = `${actor.actorId()}_${skill.id}`;
            if (actionProcessed.has(actionKey)) {
                _Scene_Battle_onSkillOk.call(this);
                return;
            }
            
            actionProcessed.add(actionKey);
            
            if (isTransformationSkill(skill.id)) {
                const config = getTransformationConfig(skill.id);
                if (config) {
                    // Remove previous states
                    config.removeStateIds.forEach(stateId => {
                        if (actor.isStateAffected(stateId)) {
                            actor.removeState(stateId);
                        }
                    });
    
                    // Apply new states
                    config.stateIds.forEach(stateId => {
                        actor.addState(stateId);
                    });
    
                    // Refresh actor states and transformation ID
                    actor.refresh();
                    actor.assignweaponTransformationId();
                }
            }
        }
        
        _Scene_Battle_onSkillOk.call(this);
    };
    

    const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            const actionKey = `${actor.actorId()}_enemy_select`;
            if (!actionProcessed.has(actionKey)) {
                actionProcessed.add(actionKey);
                deductPoints(actor.actorId(), false);
            }
        }
        _Scene_Battle_onEnemyOk.call(this);
    };

    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            const actionKey = `${actor.actorId()}_actor_select`;
            if (!actionProcessed.has(actionKey)) {
                actionProcessed.add(actionKey);
                deductPoints(actor.actorId(), false);
            }
        }
        _Scene_Battle_onActorOk.call(this);
    };

    const _Scene_Battle_onItemOk = Scene_Battle.prototype.onItemOk;
    Scene_Battle.prototype.onItemOk = function() {
        const actor = BattleManager.actor();
        const item = this._itemWindow.item();
        
        if (actor && item) {
            const actionKey = `${actor.actorId()}_item_${item.id}`;
            if (actionProcessed.has(actionKey)) {
                _Scene_Battle_onItemOk.call(this);
                return;
            }
            
            actionProcessed.add(actionKey);
            
            if ([0].includes(item.scope)) {
                deductPoints(actor.actorId(), false);
            } else if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(item.scope)) {
                Scene_Battle.prototype.confirmItemUse = this.onItemOk.bind(this);
                this.onEnemyOk = function() {
                    if (!actionProcessed.has(`${actionKey}_target`)) {
                        actionProcessed.add(`${actionKey}_target`);
                        deductPoints(actor.actorId(), false);
                    }
                    Scene_Battle.prototype.confirmItemUse();
                };
                this.onActorOk = function() {
                    if (!actionProcessed.has(`${actionKey}_target`)) {
                        actionProcessed.add(`${actionKey}_target`);
                        deductPoints(actor.actorId(), false);
                    }
                    Scene_Battle.prototype.confirmItemUse();
                };
            } else {
                deductPoints(actor.actorId(), false);
            }
        }
        _Scene_Battle_onItemOk.call(this);
    };

    // Modified cancel command to ensure proper order
    const _Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
        const actor = BattleManager.actor();
        if (actor && deductionCounts[actor.actorId()] > 0) {
            refundPoints(actor.actorId());
            revertAP_History(actor);
            actor.refresh();
            actor.assignweaponTransformationId();
            actionProcessed.clear();
        }
        _Scene_Battle_commandCancel.call(this);
    };

    const _Scene_Battle_commandGuard = Scene_Battle.prototype.commandGuard;
    Scene_Battle.prototype.commandGuard = function() {
        const actor = BattleManager.actor();
        if (actor) {
            const actionKey = `${actor.actorId()}_guard`;
            if (!actionProcessed.has(actionKey)) {
                actionProcessed.add(actionKey);
                deductPoints(actor.actorId(), false);
            }
        }
        _Scene_Battle_commandGuard.call(this);
    };

    const _BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        removeTransformationStatesForActor1();
        actionProcessed.clear();
        _BattleManager_startTurn.call(this);
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        apStateMapping.clear();
        queuedTransformations.clear();
        initialStatesTracker.clear();
        deductionCounts = {};
        stateRestorationQueued = false;
        lastActor1Value = null;
        actionProcessed.clear();
        _BattleManager_endBattle.call(this, result);
    };

    //////////////
    //AP_History//
    //////////////

    AP_History = [];
    
    const Alias_AP_History_Game_Actor_initialize = Game_Actor.prototype.initialize;
    Game_Actor.prototype.initialize = function(actorId) {
        Alias_AP_History_Game_Actor_initialize.call(this, actorId);
        this._weaponTransformationId = 1;
    };
    const Alias_AP_History_BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function() {
        Alias_AP_History_BattleManager_startInput.call(this);

        const actor = BattleManager.actor();
        if (actor) {            
            AP_History = [];
            
            AP_History[0] = {
                weaponTransformationId: JsonEx.makeDeepCopy(actor._weaponTransformationId),
                states: JsonEx.makeDeepCopy(actor._states)
            };
        }
    };
    
    const Alias_AP_History_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        Alias_AP_History_BattleManager_startBattle.call(this);
        resetAP_History();
        
        // Apply initial weapon transformation ID to Actor 1 based on states
        const actor = $gameActors.actor(1);
        if (actor) {
            // Check each state condition first
            if(actor.isStateAffected(188)){
                actor._weaponTransformationId = 473;  // Greatsword
            }
            else if(actor.isStateAffected(187)){
                actor._weaponTransformationId = 480;  // Daggers
            }
            else if(actor.isStateAffected(78)){
                actor._weaponTransformationId = 578;  // Gauntlets
            }
            else if(actor.isStateAffected(74)){
                actor._weaponTransformationId = 308;  // Rapier
            }
            else if(actor.isStateAffected(35)){
                actor._weaponTransformationId = 598;  // Arming Blade
            }
            else if(actor.isStateAffected(34)){
                actor._weaponTransformationId = 4;    // Spear
            }
            else {
                actor._weaponTransformationId = 1;    // Default
            }
            actor.refresh();
        }
    };
    
    resetAP_History = function(actor) {
        AP_History = [];
    };
        
    updateAP_History = function(actor) {
        if (actor) {
            AP_History.push({
                weaponTransformationId: JsonEx.makeDeepCopy(actor._weaponTransformationId),
                states: JsonEx.makeDeepCopy(actor._states)
            });
        }
    };
    
    // Modified revertAP_History to work better with state removal
    revertAP_History = function(actor) {
        if (actor && AP_History.length >= 1) {
            const currentState = AP_History[AP_History.length - 1];
            AP_History.pop();
            
            const previousState = AP_History[AP_History.length - 1] || AP_History[0];
            
            if (previousState) {
                // Clear current transformation states first
                STATES_TO_REMOVE.forEach(stateId => {
                    if (actor.isStateAffected(stateId)) {
                        actor.removeState(stateId);
                    }
                });

                // Set the exact states from the previous state
                BattleManager._currentActor._weaponTransformationId = JsonEx.makeDeepCopy(previousState.weaponTransformationId);
                BattleManager._currentActor._states = JsonEx.makeDeepCopy(previousState.states);
                
                // Refresh everything
                BattleManager._currentActor.refresh();
                SceneManager._scene._actorCommandWindow.refresh();
            }
        }
    };

    const Alias_AP_History_Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        Alias_AP_History_Scene_Battle_onSkillOk.call(this);
        const actor = BattleManager.actor();
        if (actor) {
            updateAP_History(actor);
        }
    };

    const Alias_AP_History_Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        Alias_AP_History_Scene_Battle_onEnemyOk.call(this);
        const actor = BattleManager.actor();
        if (actor) {
            updateAP_History(actor);
        }
    };

    const Alias_AP_History_Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        Alias_AP_History_Scene_Battle_onActorOk.call(this);
        const actor = BattleManager.actor();
        if (actor) {
            updateAP_History(actor);
        }
    };

    const Alias_AP_History_Scene_Battle_onItemOk = Scene_Battle.prototype.onItemOk;
    Scene_Battle.prototype.onItemOk = function() {
        Alias_AP_History_Scene_Battle_onItemOk.call(this);
        const actor = BattleManager.actor();
        if (actor) {
            updateAP_History(actor);
        }
    };

    const Alias_AP_History_Scene_Battle_commandGuard = Scene_Battle.prototype.commandGuard;
    Scene_Battle.prototype.commandGuard = function() {
        Alias_AP_History_Scene_Battle_commandGuard.call(this);
        const actor = BattleManager.actor();
        if (actor) {
            updateAP_History(actor);
        }
    };

    const Alias_AP_History_Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
        Alias_AP_History_Scene_Battle_commandCancel.call(this);
        const actor = BattleManager.actor();
        if (actor) {
            revertAP_History(actor);
        }
    };
    
    Game_BattlerBase.prototype.assignweaponTransformationId = function() {
        if(BattleManager._currentActor){
            const actor = BattleManager._currentActor;
            
            // Check each state condition first
            if(actor.isStateAffected(188)){
                if(actor.isStateAffected(764)){
                    actor._weaponTransformationId = 473;  // Phantom Greatsword
                } else if(actor.isStateAffected(765)){
                    actor._weaponTransformationId = 578;  // Phantom Gauntlets 
                } else if(actor.isStateAffected(766)){
                    actor._weaponTransformationId = 480;  // Phantom Daggers
                } else if(actor.isStateAffected(767)){
                    actor._weaponTransformationId = 598;  // Phantom Arming Blade
                } else if(actor.isStateAffected(768)){
                    actor._weaponTransformationId = 4;    // Phantom Spear
                } else if(actor.isStateAffected(769)){
                    actor._weaponTransformationId = 308;  // Phantom Rapier
                } else {
                    actor._weaponTransformationId = 473;  // Default Greatsword
                }
                return actor._weaponTransformationId;
            }
            if(actor.isStateAffected(187)){
                if(actor.isStateAffected(764)){
                    actor._weaponTransformationId = 473;
                } else if(actor.isStateAffected(765)){
                    actor._weaponTransformationId = 578;
                } else if(actor.isStateAffected(766)){
                    actor._weaponTransformationId = 480;
                } else if(actor.isStateAffected(767)){
                    actor._weaponTransformationId = 598;
                } else if(actor.isStateAffected(768)){
                    actor._weaponTransformationId = 4;
                } else if(actor.isStateAffected(769)){
                    actor._weaponTransformationId = 308;
                } else {
                    actor._weaponTransformationId = 480;  // Default Daggers
                }
                return actor._weaponTransformationId;
            }
            if(actor.isStateAffected(78)){
                if(actor.isStateAffected(764)){
                    actor._weaponTransformationId = 473;
                } else if(actor.isStateAffected(765)){
                    actor._weaponTransformationId = 578;
                } else if(actor.isStateAffected(766)){
                    actor._weaponTransformationId = 480;
                } else if(actor.isStateAffected(767)){
                    actor._weaponTransformationId = 598;
                } else if(actor.isStateAffected(768)){
                    actor._weaponTransformationId = 4;
                } else if(actor.isStateAffected(769)){
                    actor._weaponTransformationId = 308;
                } else {
                    actor._weaponTransformationId = 578;  // Default Gauntlets
                }
                return actor._weaponTransformationId;
            }
            if(actor.isStateAffected(74)){
                if(actor.isStateAffected(764)){
                    actor._weaponTransformationId = 473;
                } else if(actor.isStateAffected(765)){
                    actor._weaponTransformationId = 578;
                } else if(actor.isStateAffected(766)){
                    actor._weaponTransformationId = 480;
                } else if(actor.isStateAffected(767)){
                    actor._weaponTransformationId = 598;
                } else if(actor.isStateAffected(768)){
                    actor._weaponTransformationId = 4;
                } else if(actor.isStateAffected(769)){
                    actor._weaponTransformationId = 308;
                } else {
                    actor._weaponTransformationId = 308;  // Default Rapier
                }
                return actor._weaponTransformationId;
            }
            if(actor.isStateAffected(35)){
                if(actor.isStateAffected(764)){
                    actor._weaponTransformationId = 473;
                } else if(actor.isStateAffected(765)){
                    actor._weaponTransformationId = 578;
                } else if(actor.isStateAffected(766)){
                    actor._weaponTransformationId = 480;
                } else if(actor.isStateAffected(767)){
                    actor._weaponTransformationId = 598;
                } else if(actor.isStateAffected(768)){
                    actor._weaponTransformationId = 4;
                } else if(actor.isStateAffected(769)){
                    actor._weaponTransformationId = 308;
                } else {
                    actor._weaponTransformationId = 598;  // Default Arming Blade
                }
                return actor._weaponTransformationId;
            }
            if(actor.isStateAffected(34)){
                if(actor.isStateAffected(764)){
                    actor._weaponTransformationId = 473;
                } else if(actor.isStateAffected(765)){
                    actor._weaponTransformationId = 578;
                } else if(actor.isStateAffected(766)){
                    actor._weaponTransformationId = 480;
                } else if(actor.isStateAffected(767)){
                    actor._weaponTransformationId = 598;
                } else if(actor.isStateAffected(768)){
                    actor._weaponTransformationId = 4;
                } else if(actor.isStateAffected(769)){
                    actor._weaponTransformationId = 308;
                } else {
                    actor._weaponTransformationId = 4;    // Default Spear
                }
                return actor._weaponTransformationId;
            } else {
                actor._weaponTransformationId = 1;    // Default if no states match
                return actor._weaponTransformationId;
            }
        }
    };
    
    Game_BattlerBase.prototype.attackSkillId = function() {
        if(BattleManager._currentActor){
            const actor = BattleManager._currentActor;
            return actor._weaponTransformationId;
        }
    };
})();
