(function() {
    SRD.MenuBackgrounds.ensureImagesLoaded = function() {
        if (this.imagesLoaded) {
            console.log("Images already loaded.");
            return;
        }
        console.log("Loading images for the first time.");
        var backgrounds = this.backgrounds;
        for (var key in backgrounds) {
            if (backgrounds.hasOwnProperty(key)) {
                var filename = backgrounds[key];
                if (filename) {
                    console.log("Loading image:", filename);
                    ImageManager.loadBitmap('img/SumRndmDde/menu/', filename, 0, true);
                }
            }
        }
        this.imagesLoaded = true; // Prevent subsequent loads
    };

    var _Scene_MenuBase_create = Scene_MenuBase.prototype.create;
    Scene_MenuBase.prototype.create = function() {
        console.log("Creating Menu Base and ensuring images are loaded.");
        SRD.MenuBackgrounds.ensureImagesLoaded(); // Trigger image loading
        _Scene_MenuBase_create.call(this);
    };

    var _Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
    Scene_MenuBase.prototype.createBackground = function() {
        if (SRD.MenuBackgrounds.backgrounds[this._menuBackgroundConstructorName]) {
            this._backgroundSprite = new TilingSprite();
            this._backgroundSprite.anchor.x = 0.5;
            this._backgroundSprite.anchor.y = 0.5;
            this._backgroundSprite.origin.x = -(Graphics.boxWidth / 2);
            this._backgroundSprite.origin.y = -(Graphics.boxHeight / 2);
            this._backgroundSprite.move(Graphics.boxWidth / 2, Graphics.boxHeight / 2, Graphics.boxWidth, Graphics.boxHeight);

            const filename = SRD.MenuBackgrounds.backgrounds[this._menuBackgroundConstructorName];
            const bit = ImageManager.loadBitmap('img/SumRndmDde/menu/', filename, 0, true);

            let newWidth = bit.width;
            let newHeight = bit.height;
            if (SRD.MenuBackgrounds.scale) {
                newWidth = Graphics.boxWidth;
                newHeight = Graphics.boxHeight;
            }
            this._backgroundSprite.bitmap = new Bitmap(newWidth, newHeight);
            this._backgroundSprite.bitmap.blt(bit, 0, 0, bit.width, bit.height, 0, 0, newWidth, newHeight);
            this.addChild(this._backgroundSprite);
        } else {
            _Scene_MenuBase_createBackground.call(this);
        }
    };
})();
