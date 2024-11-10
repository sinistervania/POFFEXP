/*:
* @target MZ
* @plugindesc Custom Counterattack Logic for State ID 114 with reduced damage.
* @Bloodkin

* @param Counter Attack Skill ID
* @text Counter Attack Skill ID
* @desc The skill ID to be used for the counterattack.
* @type skill
* @default 1

* @param Reduced Damage Rate
* @text Reduced Damage Rate
* @desc The rate of damage taken during a counterattack (0.5 for 50% damage).
* @type number
* @min 0
* @max 1
* @default 0.5
*/

(() => {
    const parameters = PluginManager.parameters('YourPluginName');
    const counterStateId = 114; // Custom state ID for counterattack
    const counterAttackSkillId = parseInt(parameters['Counter Attack Skill ID'] || 1);
    const reducedDamageRate = parseFloat(parameters['Reduced Damage Rate'] || 0.5);

    const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
        if (target.isStateAffected(counterStateId)) {
            value *= reducedDamageRate; // Apply reduced damage
            _Game_Action_executeDamage.call(this, target, value);
            target.forceCounterAttack(counterAttackSkillId);
        } else {
            _Game_Action_executeDamage.call(this, target, value);
        }
    };

    Game_Battler.prototype.forceCounterAttack = function(skillId) {
        if (!this.isEnemy()) return; // Counterattacks are for enemies only
        const action = new Game_Action(this);
        action.setSkill(skillId);
        this._actions.unshift(action); // Add the counterattack to the front of the action queue
    };
})();
