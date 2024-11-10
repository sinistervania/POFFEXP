/*:
* @target MZ
* @plugindesc Gunman Take Aim Mechanic for RPG Maker MZ
* @author Bloodkin
*/

(() => {
    const _Game_Action_prepare = Game_Action.prototype.prepare;
    Game_Action.prototype.prepare = function() {
        _Game_Action_prepare.apply(this, arguments);
        if (this.item().id === 387) { // Headshot skill ID
            const user = this.subject();
            if (!user.isStateAffected(93)) { // Take Aim state ID
                this._forcing = false;
            }
        }
    };
})();
