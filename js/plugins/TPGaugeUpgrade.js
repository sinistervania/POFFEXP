/*:
 * @target MZ
 * @plugindesc (TPGaugeUpgrade) Changes the maximum TP for actor 1 based on variable 234.
 * @author Bloodkin
 * @help This plugin sets the default maximum TP for actor 1 to 50 and increases it by 10 for every addition to variable 234.
 */

(() => {
    const defaultMaxTp = 50;
    const incrementPerVariable = 10;
    const variableId = 234;
    
    // Store the original maxTp method
    const _Game_Actor_maxTp = Game_Actor.prototype.maxTp;
    
    // Override the maxTp method
    Game_Actor.prototype.maxTp = function() {
        if (this.actorId() === 1) {
            const variableValue = $gameVariables.value(variableId);
            return defaultMaxTp + (incrementPerVariable * variableValue);
        }
        return _Game_Actor_maxTp.call(this);
    };

    // Hook into the method that adds to variables to update max TP dynamically
    const _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        _Game_Variables_setValue.call(this, variableId, value);
        
        // Refresh the actor if variable 234 is updated
        if (variableId === 234) {
            const actor = $gameActors.actor(1);
            if (actor) {
                actor.refresh();
            }
        }
    };
})();
