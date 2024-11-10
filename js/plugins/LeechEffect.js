/*:
 * @target MZ
 * @plugindesc Adds a leech effect to specified skills, allowing the user to gain HP based on a percentage of the damage dealt. Supports stacking effects.
 * @author ChatGPT
 *
 * @param Leech Skills
 * @type number[]
 * @desc The IDs of the skills that will have the leech effect.
 * @default []
 *
 * @param Leech Percentage
 * @type number
 * @min 0
 * @max 100
 * @desc The percentage of damage dealt that will be converted to HP per state.
 * @default 50
 *
 * @help LeechEffect.js
 *
 * This plugin allows you to assign a leech effect to certain skills.
 * Actors using these skills will gain HP equivalent to a percentage of the damage dealt.
 * If multiple leech states are present, the effect will stack.
 */

(() => {
    const pluginName = 'LeechEffect';
    const parameters = PluginManager.parameters(pluginName);
    const leechSkills = JSON.parse(parameters['Leech Skills']).map(Number);
    const leechPercentage = Number(parameters['Leech Percentage']) / 100;

    const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        _Game_Action_executeHpDamage.call(this, target, value);

        if (this.subject().isActor() && leechSkills.includes(this.item().id)) {
            const leechStateIds = [76, 68]; // The leech state IDs to check
            let totalHealAmount = 0;

            leechStateIds.forEach(id => {
                if (this.subject().isStateAffected(id)) {
                    totalHealAmount += value * leechPercentage;
                }
            });

            if (totalHealAmount > 0) {
                this.subject().gainHp(totalHealAmount);
                this.subject().startDamagePopup();
            }
        }
    };
})();
