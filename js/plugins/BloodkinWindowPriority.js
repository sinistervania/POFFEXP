(function() {
  const _Window_Command_initialize = Window_Command.prototype.initialize;
  Window_Command.prototype.initialize = function(rect) {
    _Window_Command_initialize.call(this, rect);
    this.createCustomSprite();
  };

  Window_Command.prototype.createCustomSprite = function() {
    this._customSprite = new Sprite();
    this._customSprite.bitmap = ImageManager.loadSystem('CommandWindow');
    this.addChildToBack(this._customSprite);
  };
})();
