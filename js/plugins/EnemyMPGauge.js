/*:
 * @target MZ
 * @plugindesc Adds custom MP gauges to certain enemies in battle, with delayed initialization
 * @author Bloodkin
 *
 * @param defaultColor
 * @text Default Gauge Color
 * @desc Default color of the MP gauge (CSS color value).
 * @default #3399FF
 *
 * @param offsetX
 * @text Offset X
 * @desc Default horizontal offset of the MP gauge.
 * @type number
 * @default 0
 *
 * @param offsetY
 * @text Offset Y
 * @desc Default vertical offset of the MP gauge.
 * @type number
 * @default 0
 *
 * @help This plugin adds a custom MP gauge to specified enemies in battle.
 * Use note tags in enemy notes to customize each enemy:
 * <MPGauge: true> - Enables the gauge for this enemy.
 * <MPGaugeColor: #color> - Sets a custom color for the gauge.
 * <MPGaugeOffsetX: number> - Custom horizontal offset.
 * <MPGaugeOffsetY: number> - Custom vertical offset.
 */

(() => {
    const pluginName = "EnemyMPGauge";
    const parameters = PluginManager.parameters(pluginName);
    const defaultColor = parameters['defaultColor'];
    const offsetX = Number(parameters['offsetX']);
    const offsetY = Number(parameters['offsetY']);

    // Function to parse note tags
    function getEnemyNoteTags(enemy) {
        let note = enemy.note;
        let hasGauge = /<MPGauge:\s*(true)>/i.test(note);
        let color = /<MPGaugeColor:\s*#([a-f\d]{6})>/i.exec(note);
        let offset_x = /<MPGaugeOffsetX:\s*(-?\d+)>/i.exec(note);
        let offset_y = /<MPGaugeOffsetY:\s*(-?\d+)>/i.exec(note);
        return {
            hasGauge: hasGauge,
            color: color ? `#${color[1]}` : defaultColor,
            offsetX: offset_x ? Number(offset_x[1]) : offsetX,
            offsetY: offset_y ? Number(offset_y[1]) : offsetY,
        };
    }

    // Extend Sprite_Enemy to include MP gauge creation
    const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this._mpGauge = null;
        this._mpGaugeTags = null;
    };

    const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function(battler) {
        _Sprite_Enemy_setBattler.call(this, battler);
        if (battler.isEnemy()) {
            const enemy = $dataEnemies[battler.enemyId()];
            const tags = getEnemyNoteTags(enemy);
            if (tags.hasGauge) {
                this._mpGaugeTags = tags;
                this.createEnemyMPGauge(tags); // Attempt to create gauge if ready
            }
        }
    };

    Sprite_Enemy.prototype.createEnemyMPGauge = function(tags) {
        if (!this._mpGauge && this.bitmap && this.bitmap.isReady()) {
            this._mpGauge = new Sprite();
            this._mpGauge.bitmap = new Bitmap(100, 10); // Gauge dimensions
            this._mpGauge.x = (this.bitmap.width - 100) / 2 + tags.offsetX;
            this._mpGauge.y = this.bitmap.height - 10 - 5 + tags.offsetY;
            this.addChild(this._mpGauge);
            this._mpGaugeColor = tags.color;
            this.updateEnemyMPGauge(); // Draw the initial gauge state
        }
    };

    Sprite_Enemy.prototype.updateEnemyMPGauge = function() {
        if (this._mpGauge) {
            const mpRate = this._enemy.mpRate();
            this._mpGauge.bitmap.clear();
            this._mpGauge.bitmap.fillRect(0, 0, 100, 10, 'rgba(0, 0, 0, 0.6)');
            this._mpGauge.bitmap.gradientFillRect(0, 0, 100 * mpRate, 10, this._mpGaugeColor, this._mpGaugeColor, true);
        }
    };

    const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_updateBitmap.call(this);
        this.updateEnemyMPGauge(); // Update gauge each frame
        if (!this._mpGauge && this._mpGaugeTags && this.bitmap && this.bitmap.isReady()) {
            // Ensure the gauge is created once the bitmap is ready
            this.createEnemyMPGauge(this._mpGaugeTags);
        }
    };
})();
