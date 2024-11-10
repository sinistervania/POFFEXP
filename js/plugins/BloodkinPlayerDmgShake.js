/*:
 * @target MZ
 * @plugindesc Shakes the screen when the player takes damage during combat, with customizable intensity thresholds based on damage taken.
 * @author Bloodkin
 * @help BloodkinPlayerDmgShake - v1.0.0
 *
 * This plugin shakes the screen when the player takes damage in combat.
 * You can define multiple thresholds, where the screen shake intensity
 * increases with the amount of damage taken.
 *
 * @param DamageThresholds
 * @text Damage Thresholds
 * @desc Set the damage thresholds and corresponding shake intensities.
 * @type struct<DamageShake>[]
 * @default ["{\"damage\":\"50\",\"shakePower\":\"3\",\"shakeSpeed\":\"5\",\"shakeDuration\":\"10\"}","{\"damage\":\"100\",\"shakePower\":\"6\",\"shakeSpeed\":\"8\",\"shakeDuration\":\"20\"}","{\"damage\":\"200\",\"shakePower\":\"9\",\"shakeSpeed\":\"12\",\"shakeDuration\":\"30\"}"]
 *
 */

/*~struct~DamageShake:
 * @param damage
 * @text Damage Threshold
 * @desc The amount of damage at which this level of screen shake should occur.
 * @type number
 * @default 50
 *
 * @param shakePower
 * @text Shake Power
 * @desc The intensity of the screen shake.
 * @type number
 * @default 3
 *
 * @param shakeSpeed
 * @text Shake Speed
 * @desc The speed of the screen shake.
 * @type number
 * @default 5
 *
 * @param shakeDuration
 * @text Shake Duration
 * @desc The duration of the screen shake (in frames).
 * @type number
 * @default 10
 */

(() => {
    const pluginName = "BloodkinPlayerDmgShake";

    const parameters = PluginManager.parameters(pluginName);
    const thresholds = JSON.parse(parameters["DamageThresholds"]).map(t => JSON.parse(t));

    const applyShake = (damage) => {
        for (let i = thresholds.length - 1; i >= 0; i--) {
            const threshold = thresholds[i];
            if (damage >= threshold.damage) {
                $gameScreen.startShake(threshold.shakePower, threshold.shakeSpeed, threshold.shakeDuration);
                break;
            }
        }
    };

    const _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
    Game_Battler.prototype.onDamage = function(value) {
        _Game_Battler_onDamage.call(this, value);
        if (this.isActor()) {
            applyShake(value);
        }
    };
})();
