/*:
 * @target MZ
 * @plugindesc Manages action points and transformation states in battle.
 * @author Claude
 * 
 * @param actor1VariableId
 * @text Actor 1 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 1.
 * @default 1
 * 
 * @param actor2VariableId
 * @text Actor 2 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 2.
 * @default 1
 * 
 * @param actor3VariableId
 * @text Actor 3 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 3.
 * @default 1
 * 
 * @param actor4VariableId
 * @text Actor 4 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 4.
 * @default 1
 * 
 * @param actor5VariableId
 * @text Actor 5 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 5.
 * @default 1
 * 
 * @param actor6VariableId
 * @text Actor 6 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 6.
 * @default 1
 */

(() => {
    const pluginName = 'TransformationAndActionPoints';
    const parameters = PluginManager.parameters(pluginName);
    const actor1VariableId = Number(parameters['actor1VariableId'] || 1);
    const actor2VariableId = Number(parameters['actor2VariableId'] || 1);
    const actor3VariableId = Number(parameters['actor3VariableId'] || 1);
    const actor4VariableId = Number(parameters['actor4VariableId'] || 1);
    const actor5VariableId = Number(parameters['actor5VariableId'] || 1);
    const actor6VariableId = Number(parameters['actor6VariableId'] || 1);

    // Action point tracking
    let deductionCounts = {};

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

    // Function to deduct points
    const deductPoints = function(actorId) {
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
                console.log(`Deducted point from actor ${actorId}, new count: ${deductionCounts[actorId]}`);
            }
        }
    };

    // Function to refund points and handle transformation reversion
    const refundPoints = function(actorId) {
        const actionPointsVariableId = getActionPointsVariableId(actorId);
        if (actionPointsVariableId > 0 && deductionCounts[actorId] > 0) {
            const actionPoints = $gameVariables.value(actionPointsVariableId);
            const maxPoints = $gameVariables.value(343);
            if (actionPoints < maxPoints) {
                $gameVariables.setValue(actionPointsVariableId, Math.min(actionPoints + 1, maxPoints));
                deductionCounts[actorId]--;
                console.log(`Refunded point to actor ${actorId}, remaining deductions: ${deductionCounts[actorId]}`);

                // Handle transformation reversion if needed
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
                    actor.refresh();
                }
            }

            // Handle action point deduction for certain skill scopes
            if (skill && ([3, 4, 11, 2, 7, 8].includes(skill.scope))) {
                deductPoints(actor.actorId());
            }
        }
        
        _Scene_Battle_onSkillOk.call(this);
    };

    // Override target selection handling
    const _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId());
        }
        _Scene_Battle_onEnemyOk.call(this);
    };

    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId());
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
                    deductPoints(actor.actorId());
                } else if ([1, 7, 8, 9].includes(item.scope)) {
                    Scene_Battle.prototype.confirmItemUse = this.onItemOk.bind(this);
                    this.onEnemyOk = function() {
                        deductPoints(actor.actorId());
                        Scene_Battle.prototype.confirmItemUse();
                    };
                    this.onActorOk = function() {
                        deductPoints(actor.actorId());
                        Scene_Battle.prototype.confirmItemUse();
                    };
                } else {
                    deductPoints(actor.actorId());
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
            deductPoints(actor.actorId());
        }
        _Scene_Battle_commandGuard.call(this);
    };

    // Override update for battle manager to handle state restoration timing
    const _BattleManager_update = BattleManager.update;
    BattleManager.update = function(active) {
        if (this._phase === 'turn' && this._subject && this._subject.isActor() && stateRestorationQueued) {
            restoreInitialStates(this._subject);
            return;
        }
        _BattleManager_update.call(this, active);
    };

    // Ensure state restoration happens before processing turn
    const _BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function() {
        if (this._subject && this._subject.isActor() && stateRestorationQueued) {
            restoreInitialStates(this._subject);
            return;
        }
        _BattleManager_processTurn.call(this);
    };

    // Modified startAction to ensure states are restored
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        if (this._subject && this._subject.isActor()) {
            if (stateRestorationQueued) {
                restoreInitialStates(this._subject);
                return;
            }
        }
        _BattleManager_startAction.call(this);
    };

    // Clean up at battle end
    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        queuedTransformations.clear();
        initialStatesTracker.clear();
        deductionCounts = {};
        stateRestorationQueued = false;
        _BattleManager_endBattle.call(this, result);
    };
})();