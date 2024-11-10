/*:
 * @target MZ
 * @plugindesc Sets custom fonts for the game with fallbacks
 * @author Your Name
 *
 * @help CustomFontPlugin.js
 *
 * This plugin sets "EBGaramond-Regular" as the main font and
 * "CormorantGaramond-Regular" as the number font.
 */

(function() {
    // Load EBGaramond as the main game font
    FontManager.load("GameFont", "EBGaramond-Regular.ttf");
    
    // Load Cormorant Garamond as the number font
    FontManager.load("NumberFont", "CormorantGaramond-Regular.ttf");

    // Extend the original FontManager.isReady to ensure custom fonts are loaded
    var _FontManager_isReady = FontManager.isReady;
    FontManager.isReady = function() {
        if (!this.isLoaded("GameFont") || !this.isLoaded("NumberFont")) {
            return false;
        }
        return _FontManager_isReady.call(this);
    };

    // Check if a specific font is loaded
    FontManager.isLoaded = function(family) {
        return this._states[family] === "loaded";
    };

    // Setup fallback fonts if the custom fonts fail to load
    var _Graphics_createRenderer = Graphics._createRenderer;
    Graphics._createRenderer = function() {
        _Graphics_createRenderer.call(this);
        document.fonts.onloadingdone = function(e) {
            e.fontfaces.forEach(function(fontFace) {
                if (!document.fonts.check("12px " + fontFace.family)) {
                    console.warn(fontFace.family + " didn't load, using fallback fonts.");
                    document.body.style.fontFamily = "Cormorant Garamond, EB Garamond, sans-serif";
                }
            });
        };
    };
})();
