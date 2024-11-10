/*:
 * @target MZ
 * @plugindesc Displays an image with specified size and position with plugin commands to control visibility and position.
 * @author Bloodkin
 *
 * @command setImageVisibility
 * @text Set Image Visibility
 * @desc Sets the visibility of the image.
 *
 * @arg visible
 * @type boolean
 * @text Visible
 * @desc Choose whether the image is visible or not.
 * @default true
 *
 * @command setImagePosition
 * @text Set Image Position
 * @desc Sets the position of the image.
 *
 * @arg x
 * @type number
 * @text X Coordinate
 * @desc The X coordinate for the image position.
 * @default 0
 *
 * @arg y
 * @type number
 * @text Y Coordinate
 * @desc The Y coordinate for the image position.
 * @default 0
 */

(() => {
    const pluginName = 'MapIcon';
    let flowerSprite = null;

    const createFlowerSprite = () => {
        if (!flowerSprite) {
            flowerSprite = new Sprite();
            flowerSprite.bitmap = ImageManager.loadPicture('Flower100HP');
            flowerSprite.bitmap.addLoadListener(() => {
                flowerSprite.scale.x = 40 / flowerSprite.bitmap.width;
                flowerSprite.scale.y = 25 / flowerSprite.bitmap.height;
            });
            flowerSprite.visible = false;
            SceneManager._scene.addChild(flowerSprite);
        }
    };

    const setImageVisibility = (visible) => {
        if (flowerSprite) {
            flowerSprite.visible = visible;
        }
    };

    const setImagePosition = (x, y) => {
        if (flowerSprite) {
            flowerSprite.x = x;
            flowerSprite.y = y;
        }
    };

    PluginManager.registerCommand(pluginName, 'setImageVisibility', args => {
        const visible = args.visible === 'true';
        setImageVisibility(visible);
    });

    PluginManager.registerCommand(pluginName, 'setImagePosition', args => {
        const x = Number(args.x);
        const y = Number(args.y);
        setImagePosition(x, y);
    });

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        createFlowerSprite();
    };

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        if (flowerSprite) {
            this.removeChild(flowerSprite);
            flowerSprite = null;
        }
        _Scene_Map_terminate.call(this);
    };

})();
