/*:
 * @target MZ
 * @plugindesc Simple Plugin to adjust the Title position on the Title Screen
 * @author ChatGPT
 *
 * @param Title Y Position
 * @desc Adjust the Y position of the Game Title
 * @type number
 * @default 400
 *
 * @help This plugin allows you to adjust the vertical position of the game title on the title screen.
 *
 * There are no plugin commands for this plugin.
 */

(() => {
    const pluginName = "ChangeTitlePosition";
    let parameters = PluginManager.parameters(pluginName);
    let titleYPosition = Number(parameters['Title Y Position'] || 200);

    Scene_Title.prototype.createForeground = function() {
        this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._gameTitleSprite);
        if ($dataSystem.optDrawTitle) {
            this.drawGameTitle();
        }
    };

    Scene_Title.prototype.drawGameTitle = function() {
        const x = 20;
        const y = titleYPosition;
        const maxWidth = Graphics.width - x * 2;
        const text = $dataSystem.gameTitle;
        const bitmap = this._gameTitleSprite.bitmap;
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.outlineColor = 'black';
        bitmap.outlineWidth = 8;
        bitmap.fontSize = 72;
        bitmap.drawText(text, x, y, maxWidth, 48, 'center');
    };
})();
