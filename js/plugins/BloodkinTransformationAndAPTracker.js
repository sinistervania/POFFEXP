/*:
 * @target MZ
 * @plugindesc Manages action points and transformation states in battle for Bloodkin, with state-specific AP tracking.
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
    
    // Track transformation AP costs
    let transformationApCosts = new Map(); // Maps actorId to array of transformation AP indices

    // Transformation configurations
    const transformations = [
        {
            skillId: 312,
            stateId: 765,
            removeStateIds: [764, 766, 767, 768, 769]
        },
        {
            skillId: 485,
            stateId: 764,
            removeStateIds: [765, 766, 767, 768, 769]
        },
        {
            skillId: 484,
            stateId: 766,
            removeStateIds: [764, 765, 767, 768, 769]
        },
        {
            skillId: 249,
            stateId: 767,
            removeStateIds: [764, 765, 766, 768, 769]
        },
        {
            skillId: 248,
            stateId: 768,
            removeStateIds: [764, 765, 766, 767, 769]
        },
        {
            skillId: 309,
            stateId: 769,
            removeStateIds: [764, 765, 766, 767, 768]
        }
    ];

    // Array of states to remove
    const STATES_TO_REMOVE = [764, 765, 766, 767, 768, 769];

    // Transformation state tracking
    const queuedTransformations = new Map();
    const initialStatesTracker = new Map();
    let stateRestorationQueued = false;

    // Get the action points variable ID for a specific actor
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

    // Function to deduct points and track if it's for a transformation
    const deductPoints = function(actorId, isTransformation = false) {
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

                // If this is a transformation cost, track its index
                if (isTransformation) {
                    if (!transformationApCosts.has(actorId)) {
                        transformationApCosts.set(actorId, []);
                    }
                    transformationApCosts.get(actorId).push(deductionCounts[actorId]);
                    console.log(`Tracked transformation AP cost at index ${deductionCounts[actorId]}`);
                }

                console.log(`Deducted point from actor ${actorId}, new count: ${deductionCounts[actorId]}`);
            }
        }
    };

    // Function to remove transformation states from Actor 1 and reset actions
    const removeTransformationStatesForActor1 = function() {
        const actor = $gameActors.actor(1);
        if (actor) {
            STATES_TO_REMOVE.forEach(stateId => {
                if (actor.isStateAffected(stateId)) {
                    console.log(`Removing state ${stateId} from Actor 1`);
                    actor.removeState(stateId);
                }
            });
            actor.clearActions(); // Reset actions
            actor.refresh();
        }
    };

    // Modified refundPoints to check if the refunded AP was used for transformation
    const refundPoints = function(actorId) {
        const actionPointsVariableId = getActionPointsVariableId(actorId);
        if (actionPointsVariableId > 0 && deductionCounts[actorId] > 0) {
            const actionPoints = $gameVariables.value(actionPointsVariableId);
            const maxPoints = $gameVariables.value(343);
            if (actionPoints < maxPoints) {
                const currentDeductionIndex = deductionCounts[actorId];
                const transformationCosts = transformationApCosts.get(actorId) || [];
                const isTransformationAp = transformationCosts.includes(currentDeductionIndex);

                $gameVariables.setValue(actionPointsVariableId, Math.min(actionPoints + 1, maxPoints));
                deductionCounts[actorId]--;

                console.log(`Refunded point to actor ${actorId}, remaining deductions: ${deductionCounts[actorId]}`);
                console.log(`Was transformation AP? ${isTransformationAp}`);

                // Only remove states if this was the AP used for transformation
                if (isTransformationAp && actorId === 1) {
                    removeTransformationStatesForActor1();
                }

                // Remove the tracked AP cost
                if (isTransformationAp) {
                    const costs = transformationApCosts.get(actorId);
                    const index = costs.indexOf(currentDeductionIndex);
                    if (index > -1) {
                        costs.splice(index, 1);
                    }
                    if (costs.length === 0) {
                        transformationApCosts.delete(actorId);
                    }
                }

                const actor = $gameActors.actor(actorId);
                if (actor && queuedTransformations.has(actorId)) {
                    restoreInitialStates(actor);
                }
            }
        }
    };

    // Check if a skill is a transformation skill
    function isTransformationSkill(skillId) {
        return transformations.some(config => config.skillId === skillId);
    }

    // Get transformation config for a skill
    function getTransformationConfig(skillId) {
        return transformations.find(c => c.skillId === skillId);
    }

    // Handle state restoration
    function restoreInitialStates(battler) {
        if (!battler || !battler.isActor()) return;

        const initialStates = initialStatesTracker.get(battler.actorId());
        if (initialStates) {
            console.log('Restoring states for:', battler.name());
            
            // Remove transformation states
            [78, 188].forEach(stateId => {
                if (battler.isStateAffected(stateId)) {
                    battler.removeState(stateId);
                }
            });
            
            // Restore initial states
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

    // Handle skill selection in battle
    const _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        const actor = BattleManager.actor();
        const skill = this._skillWindow.item();
        
        if (actor && skill) {
            // Handle transformation skills
            if (isTransformationSkill(skill.id)) {
                const config = getTransformationConfig(skill.id);
                if (config) {
                    console.log('Applying transformation');
                    initialStatesTracker.set(actor.actorId(), actor._states.slice());
                    stateRestorationQueued = true;
                    
                    config.removeStateIds.forEach(stateId => {
                        if (actor.isStateAffected(stateId)) {
                            actor.removeState(stateId);
                        }
                    });

                    actor.addState(config.stateId);
                    queuedTransformations.set(actor.actorId(), config);
                    
                    // Deduct points and track as transformation cost
                    deductPoints(actor.actorId(), true);
                    
                    actor.refresh();
                    return;
                }
            }

            // Handle regular skill action point deduction
            if (skill && ([3, 4, 11, 2, 7, 8].includes(skill.scope))) {
                deductPoints(actor.actorId(), false);
            }
        }
        
        _Scene_Battle_onSkillOk.call(this);
    };

    // Override target selection handling
    const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId(), false);
        }
        _Scene_Battle_onEnemyOk.call(this);
    };

    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId(), false);
        }
        _Scene_Battle_onActorOk.call(this);
    };

    // Handle item usage
    const _Scene_Battle_onItemOk = Scene_Battle.prototype.onItemOk;
    Scene_Battle.prototype.onItemOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            const item = this._itemWindow.item();
            if (item) {
                if ([2, 10].includes(item.scope)) {
                    deductPoints(actor.actorId(), false);
                } else if ([1, 7, 8, 9].includes(item.scope)) {
                    Scene_Battle.prototype.confirmItemUse = this.onItemOk.bind(this);
                    this.onEnemyOk = function() {
                        deductPoints(actor.actorId(), false);
                        Scene_Battle.prototype.confirmItemUse();
                    };
                    this.onActorOk = function() {
                        deductPoints(actor.actorId(), false);
                        Scene_Battle.prototype.confirmItemUse();
                    };
                } else {
                    deductPoints(actor.actorId(), false);
                }
            }
        }
        _Scene_Battle_onItemOk.call(this);
    };

    // Handle cancellations and command handling
    const _Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
        const actor = BattleManager.actor();
        if (actor && deductionCounts[actor.actorId()] > 0) {
            refundPoints(actor.actorId());
        }
        _Scene_Battle_commandCancel.call(this);
    };

    // Guard command handling
    const _Scene_Battle_commandGuard = Scene_Battle.prototype.commandGuard;
    Scene_Battle.prototype.commandGuard = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId(), false);
        }
        _Scene_Battle_commandGuard.call(this);
    };

    // Override startTurn to remove transformation states from Actor 1
    const _BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        console.log("Removing transformation states from Actor 1 at the start of turn.");
        removeTransformationStatesForActor1();
        _BattleManager_startTurn.call(this);
    };

    // Clean up at battle end
    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        queuedTransformations.clear();
        initialStatesTracker.clear();
        deductionCounts = {};
        transformationApCosts.clear();
        stateRestorationQueued = false;
        lastActor1Value = null;
        _BattleManager_endBattle.call(this, result);
    };
})();
