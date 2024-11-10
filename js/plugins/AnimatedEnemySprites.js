/*:
 * @target MZ
 * @plugindesc Allows animated GIF frames for enemies in battle using multiple static images.
 * @author Bloodkin
 *
 * @param enemyAnimations
 * @text Enemy Animations
 * @type struct<EnemyAnimation>[]
 * @desc Define the animation frames for each enemy ID.
 * @default []
 *
 * @help This plugin allows you to use animated frames for enemies in battle.
 * Configure the animation frames for each enemy ID in the parameters.
 */

/*~struct~EnemyAnimation:
 * @param enemyId
 * @text Enemy ID
 * @desc The database ID of the enemy.
 * @type number
 * @default 0
 *
 * @param frames
 * @text Frames
 * @desc The list of frame image paths for this enemy's animation.
 * @type file[]
 * @dir img/enemies/
 * @default []
 */

(() => {
    const pluginName = "AnimatedEnemySprites";
    const parameters = PluginManager.parameters(pluginName);
    const enemyAnimations = JSON.parse(parameters['enemyAnimations'] || '[]').map(JSON.parse);

    const animationMap = new Map();
    enemyAnimations.forEach(entry => {
        const enemyId = Number(entry.enemyId);
        const frames = Array.isArray(entry.frames) ? entry.frames.map(f => f.framePath) : JSON.parse(entry.frames).map(f => f.framePath);
        animationMap.set(enemyId, frames);
    });

    class AnimatedEnemy extends Sprite_Enemy {
        constructor(enemy) {
            super();
            this._enemy = enemy;
            this._frames = animationMap.get(this._enemy.enemyId()) || [];
            this._currentFrameIndex = 0;
            this._frameDuration = 100; // Adjust based on desired animation speed
            this._lastFrameUpdate = 0;
            this._bitmapLoaded = false;
            this.loadBitmaps();
        }

        loadBitmaps() {
            if (this._frames.length > 0) {
                const firstFramePath = this._frames[0];
                this.bitmap = ImageManager.loadEnemy(firstFramePath, 0);
                this.bitmap.addLoadListener(() => {
                    this._bitmapLoaded = true;
                });
            }
        }

        update() {
            super.update();
            if (this._bitmapLoaded && Date.now() - this._lastFrameUpdate > this._frameDuration) {
                this._currentFrameIndex = (this._currentFrameIndex + 1) % this._frames.length;
                this._lastFrameUpdate = Date.now();
                this.updateBitmap();
            }
        }

        updateBitmap() {
            const framePath = this._frames[this._currentFrameIndex];
            if (this.bitmap && this.bitmap.url !== `img/enemies/${framePath}`) {
                this.bitmap = ImageManager.loadEnemy(framePath, 0);
            }
        }
    }

    // Safeguard the updateFrame function to work with other plugins that might modify Sprite_Enemy
    const _Sprite_Enemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
    Sprite_Enemy.prototype.updateFrame = function() {
        if (this._bitmapLoaded) {
            _Sprite_Enemy_updateFrame.call(this);
        }
    };

    // Safeguard the updateStateSprite function to work with other plugins that might modify Sprite_Enemy
    const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
    Sprite_Enemy.prototype.updateStateSprite = function() {
        if (this._bitmapLoaded) {
            _Sprite_Enemy_updateStateSprite.call(this);
        }
    };

    const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        if (animationMap.has(this._enemy.enemyId())) {
            // Only override for animated enemies
            return;
        }
        _Sprite_Enemy_updateBitmap.call(this);
    };

    const _Game_Enemy_battlerSprite = Game_Enemy.prototype.battlerSprite;
    Game_Enemy.prototype.battlerSprite = function() {
        if (animationMap.has(this.enemyId())) {
            return new AnimatedEnemy(this);
        }
        return _Game_Enemy_battlerSprite.call(this);
    };
})();
