/*:
 * @target MZ
 * @plugindesc Displays an MP bar above enemy sprites in front-facing combat
 * @author Your Name
 *
 * @help EnemyMPBar.js
 *
 * This plugin displays an MP bar above each enemy sprite in front-facing combat.
 */

(() => {
  // A new sprite class for the MP bar
  class Sprite_EnemyMPBar extends Sprite {
    constructor(enemy) {
      super();
      this._enemy = enemy;
      this.createBitmap();
    }

    createBitmap() {
      this.bitmap = new Bitmap(100, 5); // Width and height of the MP bar
      this.update();
    }

    update() {
      super.update();
      this.redraw();
      this.x = this._enemy.screenX() - this.width / 2;
      this.y = this._enemy.screenY() - 100; // Adjust this value as needed
    }

    redraw() {
      const rate = this._enemy.mpRate();
      this.bitmap.clear();
      this.bitmap.fillRect(0, 0, this.bitmap.width * rate, this.bitmap.height, 'blue');
      this.bitmap.strokeRect(0, 0, this.bitmap.width, this.bitmap.height, 'white');
    }
  }

  // Extending the existing Spriteset_Battle class
  const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.call(this);
    this.createEnemyMPBars();
  };

  Spriteset_Battle.prototype.createEnemyMPBars = function() {
    this._enemyMPBars = [];
    for (const enemy of this._enemySprites) {
      if (enemy._battler.isEnemy()) {
        const mpBarSprite = new Sprite_EnemyMPBar(enemy._battler);
        this._enemyMPBars.push(mpBarSprite);
        this.addChild(mpBarSprite);
      }
    }
  };

  // Update MP bars along with the enemy sprites
  const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_update.call(this);
    for (const mpBarSprite of this._enemyMPBars) {
      mpBarSprite.update();
    }
  };
})();
