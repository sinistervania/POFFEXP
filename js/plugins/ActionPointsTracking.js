/*:
 * @target MZ
 * @plugindesc Manages action points based on target confirmations in battle, ensuring correct timing for deductions and refunds.
 * @author Bloodkin
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
 *
 * @help Ensures action points are deducted only after target confirmation for targeted actions and immediately for consumable items.
 */

(() => {
    const parameters = PluginManager.parameters('ActionPointsTracking');
    const actor1VariableId = Number(parameters['actor1VariableId'] || 1);
    const actor2VariableId = Number(parameters['actor2VariableId'] || 1);
    const actor3VariableId = Number(parameters['actor3VariableId'] || 1);
    const actor4VariableId = Number(parameters['actor4VariableId'] || 1);
    const actor5VariableId = Number(parameters['actor5VariableId'] || 1);
    const actor6VariableId = Number(parameters['actor6VariableId'] || 1);

    let deductionCounts = {}; // Object to track the number of deductions for each actor

    // Function to deduct points for a specific actor
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
            }
        }
    };

    // Function to refund points for a specific actor
    const refundPoints = function(actorId) {
        const actionPointsVariableId = getActionPointsVariableId(actorId);
        if (actionPointsVariableId > 0 && deductionCounts[actorId] > 0) {
            const actionPoints = $gameVariables.value(actionPointsVariableId);
            const maxPoints = $gameVariables.value(343); // Assuming cap is always variable 343
            if (actionPoints < maxPoints) {
                $gameVariables.setValue(actionPointsVariableId, Math.min(actionPoints + 1, maxPoints));
                deductionCounts[actorId]--;
            }
        }
    };

    // Get the action points variable ID for a specific actor
    const getActionPointsVariableId = function(actorId) {
        switch (actorId) {
            case 1:
                return actor1VariableId;
            case 2:
                return actor2VariableId;
            case 3:
                return actor3VariableId;
            case 4:
                return actor4VariableId;
            case 5:
                return actor5VariableId;
            case 6:
                return actor6VariableId;
            default:
                return 0; // Return 0 if actor ID is invalid
        }
    };

    // Override the cancel handling in the actor command selection
    const originalActorCommandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
        const actor = BattleManager.actor();
        if (actor && deductionCounts[actor.actorId()] > 0) {
            refundPoints(actor.actorId());
        }
        originalActorCommandCancel.call(this);
    };

    // Confirm actions on enemy or actor (ally) target
    const originalEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId());
        }
        originalEnemyOk.call(this);
    };

    const originalActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId());
        }
        originalActorOk.call(this);
    };

    // Handle skill confirmations
    const originalOnSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            const item = this._skillWindow.item();
            if (item && ([3, 4, 11, 2, 7, 8].includes(item.scope))) {
                deductPoints(actor.actorId());
            }
        }
        originalOnSkillOk.call(this);
    };

    // Adjusted item confirmations to correctly handle consumable and targeted items
    const originalOnItemOk = Scene_Battle.prototype.onItemOk;
    Scene_Battle.prototype.onItemOk = function() {
        const actor = BattleManager.actor();
        if (actor) {
            const item = this._itemWindow.item();
            if (item) {
                // Immediate deduction for items with a scope of targeting all enemies
                if ([2, 10].includes(item.scope)) {
                    deductPoints(actor.actorId());
                } else if ([1, 7, 8, 9].includes(item.scope)) { // Targeted items
                    // Deduct points only after a target is confirmed
                    Scene_Battle.prototype.confirmItemUse = this.onItemOk.bind(this);
                    this.onEnemyOk = function() {
                        deductPoints(actor.actorId());
                        Scene_Battle.prototype.confirmItemUse();
                    };
                    this.onActorOk = function() {
                        deductPoints(actor.actorId());
                        Scene_Battle.prototype.confirmItemUse();
                    };
                } else { // Non-targeted, consumable items
                    deductPoints(actor.actorId());
                }
            }
        }
        originalOnItemOk.call(this);
    };

    // Correct the guard command to deduct points
    const originalCommandGuard = Scene_Battle.prototype.commandGuard;
    Scene_Battle.prototype.commandGuard = function() {
        const actor = BattleManager.actor();
        if (actor) {
            deductPoints(actor.actorId());
        }
        originalCommandGuard.call(this);
    };
})();