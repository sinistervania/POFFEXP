/*:
 * @target MZ
 * @plugindesc Manages weapon transformation states in battle with multi-state support, applying only after target confirmation (onActorOk).
 * @pluginauthor Modified from Bloodkin's original
 */

(() => {
    const pluginName = 'WeaponTransformationSystem';

    // Transformation configurations with multi-state support
    const transformations = [
        {
            skillId: 485, // Greatsword
            stateIds: [764, 772],
            removeStateIds: [765, 766, 767, 768, 769, 773, 774, 775, 776, 777]
        },
        {
            skillId: 312, // Gauntlets
            stateIds: [765, 773],
            removeStateIds: [764, 766, 767, 768, 769, 772, 774, 775, 776, 777]
        },
        {
            skillId: 484, // Daggers
            stateIds: [766, 774],
            removeStateIds: [764, 765, 767, 768, 769, 772, 773, 775, 776, 777]
        },
        {
            skillId: 249, // Arming Blade
            stateIds: [767, 775],
            removeStateIds: [764, 765, 766, 768, 769, 772, 773, 774, 776, 777]
        },
        {
            skillId: 248, // Spear
            stateIds: [768, 776],
            removeStateIds: [764, 765, 766, 767, 769, 772, 773, 774, 775, 777]
        },
        {
            skillId: 309, // Rapier
            stateIds: [769, 777],
            removeStateIds: [764, 765, 766, 767, 768, 772, 773, 774, 775, 776]
        }
    ];

    // Track initial states and queued transformations
    const initialStatesTracker = new Map();
    const transformationQueue = new Map();  // Store transformations to apply only onActorOk

    function isTransformationSkill(skillId) {
        return transformations.some(config => config.skillId === skillId);
    }

    function getTransformationConfig(skillId) {
        return transformations.find(config => config.skillId === skillId);
    }

    // Store initial states before transformations for later reversion
    function storeInitialStates(actor) {
        if (!initialStatesTracker.has(actor.actorId())) {
            initialStatesTracker.set(actor.actorId(), [...actor._states]);
        }
    }

    // Restore initial states if the action is canceled
    function restoreInitialStates(actor) {
        const initialStates = initialStatesTracker.get(actor.actorId());
        if (initialStates) {
            // Remove all transformation states before restoring
            actor._states.forEach(stateId => {
                if (!initialStates.includes(stateId)) {
                    actor.removeState(stateId);
                }
            });

            // Reapply the stored initial states
            initialStates.forEach(stateId => {
                if (!actor.isStateAffected(stateId)) {
                    actor.addState(stateId);
                }
            });

            actor.refresh();
            initialStatesTracker.delete(actor.actorId());
            transformationQueue.delete(actor.actorId()); // Clear any queued transformations
        }
    }

    // Queue transformations during onSkillOk instead of applying them
    const _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        const actor = BattleManager.actor();
        const action = BattleManager.inputtingAction();
        const skill = action ? action.item() : null;

        if (actor && skill && isTransformationSkill(skill.id)) {
            console.log("Queuing transformation onSkillOk - not applying yet.");
            const config = getTransformationConfig(skill.id);
            if (config) {
                // Queue the transformation to apply later
                transformationQueue.set(actor.actorId(), config);

                // Store the initial states to restore if the action is canceled
                storeInitialStates(actor);
            }
        }

        _Scene_Battle_onSkillOk.call(this);
    };

    // Apply queued transformations only on onActorOk after target confirmation
    const _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const actor = BattleManager.actor();

        if (actor && transformationQueue.has(actor.actorId())) {
            const config = transformationQueue.get(actor.actorId());
            console.log(`Applying queued transformation for skillId ${config.skillId} onActorOk.`);

            // Remove existing transformation states as defined in removeStateIds
            config.removeStateIds.forEach(stateId => {
                if (actor.isStateAffected(stateId)) {
                    actor.removeState(stateId);
                }
            });

            // Apply the new transformation states as defined in stateIds
            config.stateIds.forEach(stateId => {
                if (!actor.isStateAffected(stateId)) {
                    actor.addState(stateId);
                }
            });

            actor.refresh(); // Refresh actor to apply state changes visually
            transformationQueue.delete(actor.actorId()); // Clear the transformation queue for the actor
        }

        // Call the original onActorOk function
        _Scene_Battle_onActorOk.call(this);
    };

    // Override commandCancel to restore initial states if the action is canceled
    const _Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
        const actor = BattleManager.actor();
        if (actor) {
            console.log("Restoring initial states due to action cancellation.");
            restoreInitialStates(actor);
        }

        // Call the original commandCancel function
        _Scene_Battle_commandCancel.call(this);
    };

})();
