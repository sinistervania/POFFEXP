/*:
 * @target MZ
 * @plugindesc Forces enemies to re-evaluate their actions immediately before they take action if any condition is no longer met, similar to MP-based skills. Ensures forced actions take precedence over plugin logic.
 * @author Bloodkin
 *
 * @help This plugin extends the functionality that already exists for MP-based skills to all enemy skills. If an enemy's conditions for any skill are no longer met during the turn, the enemy will redecide their action.
 */

(() => {
    // Hook into the method that processes enemy actions
    const _BattleManager_startAction = BattleManager.startAction;

    BattleManager.startAction = function() {
        const subject = this._subject;
        if (subject.isEnemy() && subject.isAlive() && !subject.isForcedAction()) {
            subject.decideAction();
        }
        _BattleManager_startAction.call(this);
    };

    // Hook into the method that starts each turn
    const _BattleManager_startTurn = BattleManager.startTurn;

    BattleManager.startTurn = function() {
        _BattleManager_startTurn.call(this);
        if (this._allBattlers) {
            this._allBattlers.forEach(battler => {
                if (battler.isEnemy() && battler.isAlive() && !battler.isForcedAction()) {
                    battler.decideAction();
                }
            });
        } else {
            console.warn("No battlers found at startTurn");
        }
    };

    // Method to decide the best action based on current conditions
    Game_Enemy.prototype.decideAction = function() {
        this.clearActions();
        const actionList = this.enemy().actions;
        const validActions = actionList.filter(action => this.isActionValid(action));
        if (validActions.length > 0) {
            const action = this.selectPriorityAction(validActions);
            const gameAction = new Game_Action(this);
            gameAction.setSkill(action.skillId);
            this.setAction(0, gameAction);
        }
    };

    // Method to select an action based on priority ratings
    Game_Enemy.prototype.selectPriorityAction = function(actions) {
        const highestRating = Math.max(...actions.map(a => a.rating));
        const actionsWithin1 = actions.filter(a => a.rating >= highestRating - 1);
        const actionsWithin2 = actions.filter(a => a.rating >= highestRating - 2);
        const totalWeight = actionsWithin1.length * 2 + actionsWithin2.length;
        let random = Math.random() * totalWeight;
        for (const action of actionsWithin1) {
            if (random < 2) {
                return action;
            }
            random -= 2;
        }
        for (const action of actionsWithin2) {
            if (random < 1) {
                return action;
            }
            random -= 1;
        }
        return actions[0]; // Fallback to the first action
    };

    // Check if the action meets all conditions
    Game_Enemy.prototype.isActionValid = function(action) {
        const conditionType = action.conditionType;
        const param1 = action.conditionParam1;
        const param2 = action.conditionParam2;

        if (!this.meetsCondition(action)) {
            return false;
        }

        const skill = $dataSkills[action.skillId];
        if (skill) {
            return this.meetsUsableSkillConditions(skill);
        }

        return true;
    };

    Game_Enemy.prototype.meetsTurnCondition = function(param1, param2) {
        const n = $gameTroop.turnCount();
        if (param2 === 0) {
            return n === param1;
        } else {
            return n > 0 && n >= param1 && n % param2 === param1 % param2;
        }
    };

    Game_Enemy.prototype.meetsHpCondition = function(param1, param2) {
        const hpRate = this.hpRate() * 100;
        if (param2 === 0) {
            return hpRate <= param1;
        } else {
            return hpRate >= param1;
        }
    };

    Game_Enemy.prototype.meetsMpCondition = function(param1, param2) {
        const mpRate = this.mpRate() * 100;
        if (param2 === 0) {
            return mpRate <= param1;
        } else {
            return mpRate >= param1;
        }
    };

    Game_Enemy.prototype.meetsStateCondition = function(param) {
        return this.isStateAffected(param);
    };

    Game_Enemy.prototype.meetsPartyLevelCondition = function(param) {
        return $gameParty.highestLevel() >= param;
    };

    Game_Enemy.prototype.meetsSwitchCondition = function(param) {
        return $gameSwitches.value(param);
    };

    Game_Enemy.prototype.meetsUsableSkillConditions = function(skill) {
        if (this.isSkillSealed(skill.id)) return false;
        if (this.isSkillTypeSealed(skill.stypeId)) return false;
        if (!this.canPaySkillCost(skill)) return false;
        if (this.isSkillSealed(skill.id)) return false;
        return true;
    };

    // Backup original method
    const _Game_BattlerBase_meetsUsableItemConditions = Game_BattlerBase.prototype.meetsUsableItemConditions;

    Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
        if (this.isEnemy()) {
            return this.meetsUsableSkillConditions(item);
        } else {
            return _Game_BattlerBase_meetsUsableItemConditions.call(this, item);
        }
    };

    // Check if the battler has a forced action
    Game_Battler.prototype.isForcedAction = function() {
        return this._actions.some(action => action.isForced());
    };

    Game_Action.prototype.isForced = function() {
        return this._forcing;
    };

})();
