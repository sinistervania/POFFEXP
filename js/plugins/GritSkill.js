/*:
 * @target MZ
 * @plugindesc Executes Common Event 912 when Actor 1 takes damage.
 * @help This plugin executes Common Event 912 whenever Actor 1 takes damage.
 */

(() => {
    const commonEventID = 912;

    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);
        if (target.isActor() && target.actorId() === 1 && this.isHpEffect() && this.isForOpponent()) {
            if (target.result().hpDamage > 0) {
                $gameTemp.reserveCommonEvent(commonEventID);
            }
        }
    };
})();
